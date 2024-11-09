import { injectable, inject } from "inversify";
import { Request, Response } from 'express';
import { Controller,Route } from "../decorators/index";
import { TYPES } from "@src/di/types";

import { IAuthService } from "@src/infastructure/services";
import { ICreateUserRequest, ILoginUserRequest } from "@src/infastructure/dtos/auth.model";


@Controller('/Auth')
@injectable()
export class AuthController{
    constructor(
        @inject(TYPES.AuthService) private service: IAuthService
    ){}
    
    @Route('post', '/signup')
    public async Signup(req:Request<[],ICreateUserRequest>, res:Response){
        this.service.register(req.body);
    }

    @Route('post', '/signin')
    public async Signin(req:Request<[],ILoginUserRequest>, res:Response){
        this.service.signin(req.body);
    }

    @Route('post', '/signin')
    public async Logout(req:Request, res:Response){
    }    
}