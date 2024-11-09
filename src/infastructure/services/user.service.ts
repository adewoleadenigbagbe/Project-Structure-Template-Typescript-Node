import { injectable } from 'inversify'
import {StatusCodes} from 'http-status-codes'

import { IGetUserResponse } from '../dtos/user.model'
import {User} from '@src/infastructure/database/models/user'

export interface IUserService{
    getUserbyEmail(email:string): Promise<IGetUserResponse>
    getUserbyId(id:string):Promise<IGetUserResponse>
}

@injectable()
export class UserService implements IUserService{
    public async getUserbyEmail(email: string): Promise<IGetUserResponse> {
        const user = await User.findOne({where: {email: email}})
        if (!user){
            return {statusCode:StatusCodes.NOT_FOUND,errors:["User not found"]}
        }
        return {statusCode:StatusCodes.OK,errors: null,user:{id:user.getDataValue("Id"),name: user.getDataValue("name"),email:user.getDataValue("email")}}
    }

    public async getUserbyId(id: string): Promise<IGetUserResponse> {
        const user = await User.findByPk(id)
        if (!user){
            return {statusCode:StatusCodes.NOT_FOUND,errors:["User not found"]}
        }
        return {statusCode:StatusCodes.OK,errors: null,user:{id:user.getDataValue("Id"),name: user.getDataValue("name"),email:user.getDataValue("email")}}
    }
    
}