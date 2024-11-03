import { Model,DataTypes } from 'sequelize'
import {v7} from 'uuid'

import sequelize from '@src/configs/sequelize.config'
import { Question } from './question'
import { User } from './user'


export class Subscription extends Model {
}
Subscription.init(
  {
    Id: {
       type: DataTypes.UUID,
       allowNull: false,
       defaultValue: v7(),
       primaryKey: true
    },
    QuestionId: {
       type: DataTypes.UUID,
       allowNull: false,
    },
    UserId:{
        type: DataTypes.UUID,
        allowNull: false
    }
  },
  { sequelize, modelName: 'Subscription',timestamps: true }
)

Subscription.belongsTo(User, {
  foreignKey: 'UserId'
})

Subscription.belongsTo(Question, {
  foreignKey: 'QuestionId'
})


