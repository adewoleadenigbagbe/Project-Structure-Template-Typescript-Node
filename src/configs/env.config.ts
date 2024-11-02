export const isTest = process.env.NODE_ENV === 'test';

export const ServerConfig = {
    host: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 4903,
};
  