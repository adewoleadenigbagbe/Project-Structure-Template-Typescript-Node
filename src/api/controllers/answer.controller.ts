import { Request, Response } from 'express';
import { inject, injectable } from "inversify";

import { TYPES } from "@src/di/types";

import { Controller,Route } from "../decorators/index";
import { StatusCodes } from 'http-status-codes';
import { ICreateAnswerRequest } from '@src/infastructure/dtos/answer.model';
import { IAnswerService } from '@src/infastructure/services';

@Controller('/answers')
@injectable()
export class AnswerController{
    constructor(
        @inject(TYPES.AnswerService) private service: IAnswerService
    ){}

    @Route('post')
    //@AuthGuard()
    //@Validator({ query: UserQuerySchema })
    public async CreateAnswer(req:Request<[],ICreateAnswerRequest>, res:Response){
        const result = await this.service.create(req.body);
        if (result.statusCode === StatusCodes.CREATED){
            return res.status(StatusCodes.NO_CONTENT).json({id:result.id});
        }

        return res.status(result.statusCode).json(result.errors);
    }
}