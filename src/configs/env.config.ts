import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const IsTest = process.env.NODE_ENV === 'test';
export const IsDev = process.env.NODE_ENV === 'development';
export const IsProd = process.env.NODE_ENV === 'production';

export const ServerConfig = {
    host: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 4903,
};

export const DbConfig: Options = {
    logging: IsDev,
    dialect: 'mysql',
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!
  };

  export const HASHING_SALT = process.env.HASHING_SALT!;
  