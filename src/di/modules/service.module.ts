import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '@src/di/types';
import {
  UserService,
  IUserService,
  IQuestionService, 
  QuestionService
} from '@src/infastructure/services'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserService>(TYPES.UserService).to(UserService).inTransientScope();
  bind<IQuestionService>(TYPES.UserService).to(QuestionService).inTransientScope();
};

export const ServicesModule = new ContainerModule(initializeModule);