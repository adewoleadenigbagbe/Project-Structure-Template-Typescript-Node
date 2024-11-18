import { Options } from 'sequelize';
import { RedisOptions } from 'ioredis';
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

export const RedisConfig: RedisOptions = {
    host: process.env.REDIS_HOST!,
    port: +process.env.REDIS_PORT!,
    username: process.env.REDIS_USER!,
    password: process.env.REDIS_PASSWORD!,
    showFriendlyErrorStack: true,
    enableOfflineQueue: false,
    maxRetriesPerRequest: null,
    ...(IsProd && {
      tls: {
        rejectUnauthorized: false,
      },
    }),
    db: 0,
};

  export const JwtConfig = {
    secretKey: process.env.JWT_SECRET_KEY!,
    defaultExpiresIn: process.env.JWT_DEFAULT_EXPIRES_IN!,
  };

  export const HASHING_SALT = process.env.HASHING_SALT!;
  