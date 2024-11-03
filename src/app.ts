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

@injectable()
export class App{
    private isInitialized: boolean = false;

    constructor(
        @inject(TYPES.Express) private express: Express,
        @inject(TYPES.Server) private server: Server  

   ) {}


    public async Initialize(){
        this.setExpressSettings();

        this.isInitialized = true;
    }

    public Start(){
        if(!this.isInitialized){
            throw new AppError("Application Start", "Error trying to start the app")
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
        //await this.redisService.close();
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
}

