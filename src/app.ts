import helmet from 'helmet';
import { Server } from 'node:http';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser'

import { inject, injectable } from 'inversify';
import { TYPES } from '@src/di/types';

import { AppError } from './utils/errorHandler';
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
        this.server.listen()
    }


    private setExpressSettings() {
        this.express.use(helmet());
        this.express.use(cookieParser());
        this.express.use(express.urlencoded({extended:true}));
        this.express.use(express.json())
        this.express.disable('x-powered-by');
    }
}

