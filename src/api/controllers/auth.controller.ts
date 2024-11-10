import { injectable, inject } from "inversify";
import { Request, Response } from 'express';
import { Controller,Route } from "../decorators/index";
import { TYPES } from "@src/di/types";

import { IAuthService } from "@src/infastructure/services";
import { ICreateUserRequest, ILoginUserRequest } from "@src/infastructure/dtos/auth.model";
import { RedisService } from "@src/infastructure/redis/redis-service";
import { StatusCodes } from "http-status-codes";
import { JwtConfig, RedisConfig } from "@src/configs/env.config";
import { ValidateJwt } from "@src/utils/jwt";


@Controller('/Auth')
@injectable()
export class AuthController{
    constructor(
        @inject(TYPES.AuthService) private service: IAuthService,
        @inject(TYPES.RedisService) private redisService: RedisService
    ){}
    
    @Route('post', '/signup')
    public async Signup(req:Request<[],ICreateUserRequest>, res:Response){
        const result = await this.service.register(req.body);
        if(result.statusCode === StatusCodes.OK){
            return res.status(StatusCodes.OK).json(result.Id)
        }
        return res.status(result.statusCode).json(result.errors);
    }

    @Route('post', '/signin')
    public async Signin(req:Request<[],ILoginUserRequest>, res:Response){
        const result = await this.service.signin(req.body);
        if(result.statusCode === StatusCodes.OK){
            return res.status(StatusCodes.OK).json(result.accesstoken)
        }
        return res.status(result.statusCode).json(result.errors);
    }

    @Route('post', '/signout')
    public async Logout(req:Request, res:Response){
        if(req.headers.authorization?.startsWith('Bearer')){
            const accessToken = req.headers.authorization?.split(' ')[1];
            if (accessToken){
                const result = ValidateJwt(accessToken, JwtConfig.secretKey)
                if(result.payload!){
                    const userId = result.payload["Id"];
                    const client = this.redisService.getClient(RedisConfig);
                    client.del(userId);
                    client.set(userId,accessToken)
                }
            } 
            
        }
        return res.status(StatusCodes.NO_CONTENT);
    }    
}