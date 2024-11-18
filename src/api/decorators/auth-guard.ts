
import { container } from '@src/di/container';
import { TYPES } from '@src/di/types';
import { AuthHandler } from '@src/middlewares/authHandler';
import { AppError } from '@src/utils/appError';
import { RouteHandler } from '@src/utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

export function AuthourizeGuard() {
    return function (target: object, _: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: RouteHandler) {
        if (!container) {
          throw new AppError('Container not set', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const authHandler = container.get<AuthHandler>(TYPES.AuthHandler);
        const handlerMiddleware = await authHandler.handler();
  
        return new Promise((resolve, reject) => {
          handlerMiddleware(args[0], args[1], (error) => {
            if (error) {
              reject(error);
            } else {
              originalMethod.apply(this, args).then(resolve).catch(reject);
            }
          });
        });
      };
      return descriptor;
    };
  }