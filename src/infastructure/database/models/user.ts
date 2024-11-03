import { Model,DataTypes } from 'sequelize'
import {v7} from 'uuid'
import bcrypt from 'bcrypt'

import sequelize from '@src/configs/sequelize.config'
import { HASHING_SALT } from '@src/configs/env.config';

export class User extends Model {
  async IsPasswordMatch(password: string):Promise<boolean>{
    return await bcrypt.compare(password, this.getDataValue("password"));
  }
}
User.init(
  {
    Id: {
       type: DataTypes.UUID,
       allowNull: false,
       defaultValue: v7(),
       primaryKey: true
    },
    Name: {
       type: DataTypes.STRING,
       allowNull: false
    },
    Password:{
        type: DataTypes.STRING,
        allowNull: false,
        set(value:string) {
          const salt = bcrypt.genSaltSync(+HASHING_SALT);
          const hash = bcrypt.hashSync(value, salt + this.getDataValue("Email"));
          this.setDataValue('password', hash);
        },
    },
    Email:{
        type : DataTypes.STRING,
         allowNull: false
    },
  },
  { sequelize, modelName: 'User',timestamps: true
});

