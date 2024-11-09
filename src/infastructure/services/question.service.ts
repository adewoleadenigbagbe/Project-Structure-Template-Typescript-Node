import { injectable } from 'inversify'
import {StatusCodes} from 'http-status-codes'

import {ICreateQuestionRequest,
    ICreateQuestionResponse,
    IVoteQuestionResponse} 
from '@src/infastructure/dtos/question.model'
import { Question } from '../database/models/question'
import { tagBuilder } from '@src/utils/formattags'


export interface IQuestionService{
    create(request:ICreateQuestionRequest): Promise<ICreateQuestionResponse>
    upVoteQuestion(id:string):Promise<IVoteQuestionResponse>
    downVoteQuestion(id:string):Promise<IVoteQuestionResponse>
}

@injectable()
export class QuestionService implements IQuestionService{
    public async create(request:ICreateQuestionRequest): Promise<ICreateQuestionResponse> {
        const {title,tags,text,userId} = request;
        const tt = tagBuilder(tags!)
        const question = await Question.create({
            title: title,
            tags: tt,
            text: text,
            userId: userId
        });

        if(!question){
            return {statusCode:StatusCodes.BAD_REQUEST,errors:["Question could not save"]}
        }

       return {statusCode:StatusCodes.CREATED, id: question.getDataValue("Id")}
    }


    public async upVoteQuestion(id: string): Promise<IVoteQuestionResponse> {
        const affectedResult = await Question.increment('upvote', { where: { questionId: id }});
        if (!affectedResult){
            return {statusCode:StatusCodes.BAD_REQUEST,errors:["could not upvote question"]}
        }
        return {statusCode:StatusCodes.NO_CONTENT}
    }

    public async downVoteQuestion(id: string): Promise<IVoteQuestionResponse> {
        const affectedResult = await Question.decrement('downvote', { where: { questionId: id }});
        if (!affectedResult){
            return {statusCode:StatusCodes.BAD_REQUEST,errors:["could not downvote question"]}
        }
        return {statusCode:StatusCodes.NO_CONTENT}
    }
}