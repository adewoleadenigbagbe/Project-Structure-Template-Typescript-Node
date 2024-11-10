import { Request, Response } from 'express';
import { inject, injectable } from "inversify";

import { TYPES } from "@src/di/types";
import { IUserService } from "@src/infastructure/services/user.service";

import { Controller,Route,AuthourizeGuard } from "../decorators/index";
import { StatusCodes } from 'http-status-codes';
@Controller('/users')
@injectable()
export class UserController{
    constructor(
        @inject(TYPES.UserService) private service: IUserService
    ){}

    @Route('get','/email')
    @AuthourizeGuard()
    //@Validator({ query: UserQuerySchema })
    public async GetUserEmail(req:Request<string>, res:Response){
        const result = await this.service.getUserbyEmail(req.params);
        if (result.statusCode === StatusCodes.OK){
            return res.status(StatusCodes.OK).json(result.user)
        }
        return res.status(result.statusCode).json(result.errors);
    }

    @Route('get','/id')
    @AuthourizeGuard()
    public async GetUserId(req:Request<string>, res:Response){
        const result = await this.service.getUserbyId(req.params)
        if (result.statusCode === StatusCodes.OK){
            return res.status(StatusCodes.OK).json(result.user)
        }
        return res.status(result.statusCode).json(result.errors);
    }
}