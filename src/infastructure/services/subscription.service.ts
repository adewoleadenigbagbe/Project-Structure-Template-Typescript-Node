import { injectable } from 'inversify'
import {StatusCodes} from 'http-status-codes'

import { Subscription, User,Question } from '../database/models';
import { ICreateSubscriptionRequest,
    ICreateSubscriptionResponse, 
    IGetSubscriptionQuestionResponse,
    IGetSubscriptionQuestionRequest,
    ISubscriptionModel
} from '../dtos/subscription.model';


export interface ISubscriptionService {
    createSubscription(request:ICreateSubscriptionRequest):Promise<ICreateSubscriptionResponse>
    getSubscriptionbyQuestionId(request:IGetSubscriptionQuestionRequest):Promise<IGetSubscriptionQuestionResponse>
}

@injectable()
export class SubscriptionService implements ISubscriptionService{
   public async createSubscription(request:ICreateSubscriptionRequest):Promise<ICreateSubscriptionResponse>{
       const {questionId,userId} = request;
       const subscription = await Subscription.create({
           QuestionId : questionId,
           UserId : userId
       }); 
       
       if(!subscription){
        return {statusCode:StatusCodes.BAD_REQUEST,errors:["could not save subscription"]}
       }

       return {statusCode:StatusCodes.CREATED,id:subscription.getDataValue("Id")};     
   }

   public async getSubscriptionbyQuestionId(request:IGetSubscriptionQuestionRequest):Promise<IGetSubscriptionQuestionResponse>{
    const {questionId} = request;
     const subscriptionsInfo  = await Subscription.findAll({include:[{model:Question,attributes:['Title','Text'],where:{questionId:questionId}},{model:User,attributes:['Email']}]})
     if(!subscriptionsInfo){
        return {statusCode:StatusCodes.BAD_REQUEST,errors:["could not save subscription"]}
     }

     const result:ISubscriptionModel[] = subscriptionsInfo.map((s:Subscription) => (
        {
            email: s.getDataValue('Email'),
            text: s.getDataValue('Text'),
            title: s.getDataValue('Title')
        }));

     return {statusCode:StatusCodes.OK, subsriptions: result}
   }
}
    
