import {ContainerModule, interfaces} from 'inversify'
import {TYPES} from '@src/di/types'
import {UserController,QuestionController, AnswerController,SubscriptionController} from '@src/api/controllers'

const initializeModule = (bind: interfaces.Bind) => {
    bind<UserController>(TYPES.UserController).to(UserController).inTransientScope();
    bind<QuestionController>(TYPES.QuestionController).to(QuestionController).inTransientScope();
    bind<AnswerController>(TYPES.AnswerController).to(AnswerController).inTransientScope();
    bind<SubscriptionController>(TYPES.SubscriptionController).to(SubscriptionController).inTransientScope();
};

export const ControllersModule = new ContainerModule(initializeModule);