
import {JwtConfig } from '@src/configs/env.config';
import {JwtPayload, sign,verify} from 'jsonwebtoken';


export function GenerateJwt(id:string, email:string):string{
    const {secretKey,defaultExpiresIn} = JwtConfig;
    const token = sign({id:id,email:email},secretKey,{expiresIn:defaultExpiresIn})
    return token;
}

export function ValidateJwt(token:string, secret: string){
    let response :{
        payload: JwtPayload| null
        error: unknown 
    }
    try{
        const payload = verify(token,secret) as JwtPayload
        response = {payload, error:null}
    }catch(err){
        response = {payload:null,error:err}
    }
    return response
}
