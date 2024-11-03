import { Sequelize } from 'sequelize'

import { DbConfig } from '@src/configs/env.config';

const sequelize = new Sequelize(DbConfig);

export default sequelize