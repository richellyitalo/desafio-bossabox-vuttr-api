import Sequelize from 'sequelize';

import Tool from '../app/models/Tool';
import Tag from '../app/models/Tag';
import User from '../app/models/User';
import databaseConfigs from '../config/database';

const env = process.env.NODE_ENV || 'production';
const dataBaseConfig = databaseConfigs[env];

const models = [Tool, Tag, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
