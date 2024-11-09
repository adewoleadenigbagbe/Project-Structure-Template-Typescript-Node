import {ContainerModule, interfaces} from 'inversify'
import {TYPES} from '@src/di/types'
import {UserController,QuestionController} from '@src/api/controllers'

const initializeModule = (bind: interfaces.Bind) => {
    bind<UserController>(TYPES.UserController).to(UserController).inTransientScope();
    bind<QuestionController>(TYPES.QuestionController).to(QuestionController).inTransientScope();
};

export const ControllersModule = new ContainerModule(initializeModule);