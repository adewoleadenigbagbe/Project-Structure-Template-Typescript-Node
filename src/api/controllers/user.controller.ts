import { Request, Response } from 'express';
import { inject, injectable } from "inversify";

import { TYPES } from "@src/di/types";
import { IUserService } from "@src/infastructure/services/user.service";

import { Controller,Route } from "../decorators/index";
@Controller('/users')
@injectable()
export class UserController{
    constructor(
        @inject(TYPES.UserService) private service: IUserService
    ){}

    @Route('get','/email')
    //@AuthGuard()
    //@Validator({ query: UserQuerySchema })
    public async GetUserEmail(req:Request<string>, res:Response){
        const resp = await this.service.getUserbyEmail(req.params)
    }
}