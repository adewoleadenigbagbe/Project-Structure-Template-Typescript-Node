import helmet from 'helmet';
import { Server } from 'node:http';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser'

import { inject, injectable } from 'inversify';
import { TYPES } from '@src/di/types';

import { AppError } from './utils/appError';
import { ServerConfig } from '@src/configs/env.config';
import 'configs/logger.config';

import sequelize from '@src/configs/sequelize.config'
import { RedisService } from './infastructure/redis/redis-service';
import { defineRoutes } from './middlewares/defineRoutes';
import { UserController, AuthController, SubscriptionController, QuestionController,AnswerController } from './api/controllers';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from './utils/catchAsync';
import { corsHandler } from './middlewares';
import { loggerHandler } from './middlewares/loggerHandler';

@injectable()
export class App{
    private isInitialized: boolean = false;

    constructor(
        @inject(TYPES.Express) private express: Express,
        @inject(TYPES.Server) private server: Server,
        @inject(TYPES.RedisService) private redisService: RedisService,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.AuthController) private authController: AuthController,
        @inject(TYPES.SubscriptionController) private subscriptionController: SubscriptionController,
        @inject(TYPES.QuestionController) private questionController: QuestionController,
        @inject(TYPES.AnswerController) private answerController: AnswerController,
   ) {}


    public async Initialize(){
        this.setExpressSettings();
        this.initializePreMiddlewares();
        this.initializeControllers();

        this.isInitialized = true;
    }

    public Start(){
        if(!this.isInitialized){
            throw new AppError("Error trying to start the app", StatusCodes.INTERNAL_SERVER_ERROR)
        }

        logger.log('----------------------------------------');
        logger.log('Starting Server');
        logger.log('----------------------------------------');
        this.server.listen(ServerConfig.port, () => {
        logger.log('----------------------------------------');
        logger.log(`Server started on ${ServerConfig.host}:${ServerConfig.port}`);
        logger.log('----------------------------------------');
        });
    }

    public async shutdown(callback: (err?: Error) => void) {
        await this.redisService.close();
        await sequelize.close();
        this.server?.close(callback);
      }


    private setExpressSettings() {
        logger.log('----------------------------------------');
        logger.log('Initializing API');
        logger.log('----------------------------------------');

        this.express.use(helmet());
        this.express.use(cookieParser());
        this.express.use(express.urlencoded({extended:true}));
        this.express.use(express.json())
        this.express.disable('x-powered-by');
    }

    private initializeControllers() {
        logger.log('----------------------------------------');
        logger.log('Define Routes & Controllers');
        logger.log('----------------------------------------');
        this.express.get('/health-check', (_, res) => {
          res.status(StatusCodes.OK).json({ status: 'success', health: '100%' });
        });
        defineRoutes([this.authController, this.userController,this.answerController, this.questionController, this.subscriptionController], this.express);
        this.express.use(
          '*',
          catchAsync(async (req) => {
            throw new AppError(
              `Can't find ${req.originalUrl} on this server`,
              StatusCodes.NOT_FOUND,
            );
          }),
        );
    }

    private initializePreMiddlewares() {
        logger.log('----------------------------------------');
        logger.log('Configuration Pre Middlewares');
        logger.log('----------------------------------------');
        this.express.use(corsHandler);
        this.express.use(loggerHandler);
    }

    // private initializePostMiddlewares(): void {
    //     logger.log('----------------------------------------');
    //     logger.log('Configuration Post Middlewares');
    //     logger.log('----------------------------------------');
    //     this.express.use(globalErrorHandler);
    // }
}

