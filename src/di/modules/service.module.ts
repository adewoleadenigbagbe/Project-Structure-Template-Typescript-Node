import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from '@src/di/types';
import {
  UserService,
  IUserService,
  IQuestionService, 
  QuestionService,
  IAnswerService,
  AnswerService,
  ISubscriptionService,
  SubscriptionService
} from '@src/infastructure/services'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserService>(TYPES.UserService).to(UserService).inTransientScope();
  bind<IQuestionService>(TYPES.QuestionService).to(QuestionService).inTransientScope();
  bind<IAnswerService>(TYPES.AnswerService).to(AnswerService).inTransientScope();
  bind<ISubscriptionService>(TYPES.SubscriptionService).to(SubscriptionService).inTransientScope();
};

export const ServicesModule = new ContainerModule(initializeModule);