
import { Request, Response } from 'express';
import { inject, injectable } from "inversify";

import { TYPES } from "@src/di/types";

import { Controller,Route } from "../decorators/index";
import { StatusCodes } from 'http-status-codes';
import { ISubscriptionService } from '@src/infastructure/services';
import { ICreateSubscriptionRequest, IGetSubscriptionQuestionRequest } from '@src/infastructure/dtos/subscription.model';


@Controller('/subscriptions')
@injectable()
export class SubscriptionController{
    constructor(
        @inject(TYPES.SubscriptionService) private service: ISubscriptionService
    ){}

    @Route('post')
    //@AuthGuard()
    //@Validator({ query: UserQuerySchema })
    public async CreateSubscription(req:Request<[],ICreateSubscriptionRequest>, res:Response){
        const result = await this.service.createSubscription(req.body);
        if (result.statusCode === StatusCodes.CREATED){
            return res.status(StatusCodes.CREATED).json({id:result.id});
        }

        return res.status(result.statusCode).json(result.errors);
    }

    @Route('get')
    public async GetSubscription(req:Request<IGetSubscriptionQuestionRequest>, res:Response){
        const result = await this.service.getSubscriptionbyQuestionId(req.params);
        if (result.statusCode === StatusCodes.OK){
            return res.status(StatusCodes.OK).json({subscriptions: result.subsriptions});
        }

        return res.status(result.statusCode).json(result.errors);
    }
}

