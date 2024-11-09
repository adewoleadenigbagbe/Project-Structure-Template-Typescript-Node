import { Request, Response } from 'express';
import { inject, injectable } from "inversify";

import { TYPES } from "@src/di/types";
import { IQuestionService } from "@src/infastructure/services/question.service";

import { Controller,Route } from "../decorators/index";
import { StatusCodes } from 'http-status-codes';
import { ICreateQuestionRequest } from '@src/infastructure/dtos/question.model';

@Controller('/questions')
@injectable()
export class QuestionController{
    constructor(
        @inject(TYPES.QuestionService) private service: IQuestionService
    ){}

    @Route('post')
    //@AuthGuard()
    //@Validator({ query: UserQuerySchema })
    public async CreateQuestion(req:Request<[],ICreateQuestionRequest>, res:Response){
        const result = await this.service.create(req.body);
        if (result.statusCode === StatusCodes.CREATED){
            return res.status(StatusCodes.NO_CONTENT).json({id:result.id});
        }

        return res.status(result.statusCode).json(result.errors);
    }

    @Route('put','/id')
    public async UpVoteQuestion(req:Request<string>, res:Response){
        const result = await this.service.upVoteQuestion(req.params)
        if (result.statusCode === StatusCodes.NO_CONTENT){
            return res.status(StatusCodes.NO_CONTENT);
        }

        return res.status(result.statusCode).json(result.errors);
    }

    @Route('put','/id')
    public async DownVoteQuestion(req:Request<string>, res:Response){
        const result = await this.service.downVoteQuestion(req.params)
        if (result.statusCode === StatusCodes.NO_CONTENT){
            return res.status(StatusCodes.NO_CONTENT);
        }

        return res.status(result.statusCode).json(result.errors);
    }
}