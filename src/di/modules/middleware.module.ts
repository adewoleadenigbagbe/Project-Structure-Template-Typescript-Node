import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '@src/di/types';
import {AuthHandler} from '@src/middlewares'

const initializeModule = (bind: interfaces.Bind) => {
  bind<AuthHandler>(TYPES.AuthHandler).to(AuthHandler).inTransientScope();
};

export const ServicesModule = new ContainerModule(initializeModule);