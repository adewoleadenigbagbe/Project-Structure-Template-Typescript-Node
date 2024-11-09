import { injectable } from 'inversify'
import {StatusCodes} from 'http-status-codes'

import { ICreateAnswerRequest, ICreateAnswerResponse } from '../dtos/answer.model'
import { Answer } from '../database/models/answer'


export interface IAnswerService{
    create(request:ICreateAnswerRequest): Promise<ICreateAnswerResponse>
}

@injectable()
export class AnswerService implements IAnswerService{
    public async create(request:ICreateAnswerRequest): Promise<ICreateAnswerResponse> {
        const {questionId,text,userId} = request;
        const answer = await Answer.create({
            Text: text,
            UserId: userId,
            QuestionId: questionId
        });

        if(!answer){
            return {statusCode:StatusCodes.BAD_REQUEST,errors:["Answer could not save"]}
        }

       return {statusCode:StatusCodes.CREATED, id: answer.getDataValue("Id")}
    }
}