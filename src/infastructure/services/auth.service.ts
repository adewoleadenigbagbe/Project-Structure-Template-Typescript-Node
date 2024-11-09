import { GenerateJwt } from "@src/utils/jwt";
import { User } from "../database/models";
import { ICreateUserRequest, ICreateUserResponse, ILoginUserRequest,ILoginUserResponse } from "../dtos/auth.model";
import { StatusCodes } from "http-status-codes";

export interface IAuthService{
    register(request:ICreateUserRequest):Promise<ICreateUserResponse>
    signin(request:ILoginUserRequest):Promise<ILoginUserResponse>
}

export class AuthService implements IAuthService{
    public async register(request: ICreateUserRequest):Promise<ICreateUserResponse> {
       const {name,email,password} = request;
       const existingUser = await User.findOne({where: {email: email}});
       if (existingUser){
         return {statusCode:StatusCodes.BAD_REQUEST, errors:["email already existed"]}
       }

       let newuser:User|null
       try{
             newuser = await User.create({
                Name: name,
                Email: email,
                passwor: password
            })
       } catch(err){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            }else{
                errorMessage = String(err)
            }
            return {statusCode:StatusCodes.INTERNAL_SERVER_ERROR, errors:[errorMessage]}
       }
       
       return {statusCode:StatusCodes.OK,Id: newuser.getDataValue("Id")}
    }

    public async signin(request: ILoginUserRequest): Promise<ILoginUserResponse> {
        const {email} = request;
        const user = await User.findOne({where: {email: email}})
        if(!user){
            return {statusCode: StatusCodes.BAD_REQUEST, errors: ["invalid email"]}
        }

        const id:string = user.getDataValue("Id");

        const token = GenerateJwt(id,email);
        return {statusCode: StatusCodes.OK, token: token}
    }
    
}