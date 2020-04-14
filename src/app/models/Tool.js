import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        link: Sequelize.STRING,
        description: Sequelize.STRING,
        // tags: {
        //   type: Sequelize.STRING,
        //   get(tags) {
        //     const rawValue = this.getDataValue(tags);
        //     return rawValue ? rawValue.split(',') : [];
        //   },
        // },
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    // this.addHook('beforeSave', async (tool, options) => {
    //   // if (tool.tags) {
    //   //   user.password_hash = await bcrypt.hash(`${user.password}`, 8);
    //   // }
    // });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Tag, { foreignKey: 'tool_id', as: 'tags' });
  }
}

export default Tool;
