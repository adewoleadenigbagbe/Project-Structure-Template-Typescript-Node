import { JwtConfig, RedisConfig } from "@src/configs/env.config";
import { error } from "@src/configs/logger.config";
import { TYPES } from "@src/di/types";
import { RedisService } from "@src/infastructure/redis/redis-service";
import { AppError } from "@src/utils/appError";
import { catchAsync } from "@src/utils/catchAsync";
import { ValidateJwt } from "@src/utils/jwt";
import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

@injectable()
export class AuthHandler{
    constructor(
        @inject(TYPES.RedisService) private redisService: RedisService,
    ){}
    private async AuthorizeUser(req:Request,_:Response){
        if(!req.headers.authorization?.startsWith('Bearer')){
            throw new AppError("Auth Headers missing. please provide an access token",StatusCodes.UNAUTHORIZED);
        }

        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken){
            throw new AppError("unauthorized to access this resource.please provide an access token",StatusCodes.UNAUTHORIZED);
        }

        const result = ValidateJwt(accessToken, JwtConfig.secretKey)
        if(result.error){
            throw new AppError(String(error),StatusCodes.UNAUTHORIZED);
        }
        
        //check if the token has been blacklisted
        const client =this.redisService.getClient(RedisConfig)
        const userId = result.payload!["Id"];

        const blacklistedToken = await client.get(userId)
        if(blacklistedToken === accessToken){
            throw new AppError("Token already expired.. Login again",StatusCodes.UNAUTHORIZED);
        }

        return
    }

    public async handler(){
        return catchAsync(
            async(req:Request,res:Response,next:NextFunction) => {
                await this.AuthorizeUser(req,res);
                next()
            }
        )
    }
}