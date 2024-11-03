import { Model,DataTypes } from 'sequelize'
import {v7} from 'uuid'

import sequelize from '@src/configs/sequelize.config'
import { Question } from './question'
import { User } from './user'


export class Answer extends Model {
}
Answer.init(
  {
    Id: {
       type: DataTypes.UUID,
       allowNull: false,
       defaultValue: v7(),
       primaryKey: true
    },
    Text:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
  { sequelize, modelName: 'Answer',timestamps: true }
)

Answer.belongsTo(User, {
  foreignKey: 'UserId'
})

Answer.belongsTo(Question, {
  foreignKey: 'QuestionId'
})


