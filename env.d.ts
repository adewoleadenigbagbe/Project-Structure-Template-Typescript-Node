declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        TEST_MODEL: 'mock' | 'real';
  
        PORT?: string;
        HOSTNAME?: string;
  
        DB_HOST?: string;
        DB_PORT?: string;
        DB_NAME?: string;
        DB_USERNAME?: string;
        DB_PASSWORD?: string;
  
        REDIS_URL?: string;
        REDIS_HOST?: string;
        REDIS_PORT?: string;
  
  
        JWT_SECRET_KEY?: string;
        JWT_DEFAULT_EXPIRES_IN?: string;
  
        HASHING_SALT?: string;
  
        // Add other environment variables here
      }
    }
  }
  
  export {};