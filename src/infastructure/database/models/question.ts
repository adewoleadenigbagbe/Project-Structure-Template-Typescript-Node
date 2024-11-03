import { Model,DataTypes } from 'sequelize'
import {v7} from 'uuid'

import sequelize from '@src/configs/sequelize.config'
import { User } from './user'

export class Question extends Model {
}
Question.init(
  {
    Id: {
       type: DataTypes.UUID,
       allowNull: false,
       defaultValue: v7(),
       primaryKey: true
    },
    Title: {
       type: DataTypes.STRING(200),
       allowNull: false
    },
    Text:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Tags:{
        type : DataTypes.TEXT,
         allowNull: false
    },
    Upvote:{
        type : DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    Downvote:{
        type : DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
  },
  { sequelize, modelName: 'Question',timestamps: true }
)

Question.belongsTo(User, {
  foreignKey: 'UserId'
})
