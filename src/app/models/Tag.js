import Sequelize, { Model } from 'sequelize';

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    // this.addHook('beforeSave', async (tool) => {
    //   if (tool.tags) {
    //     user.password_hash = await bcrypt.hash(`${user.password}`, 8);
    //   }
    // });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Tool, { foreignKey: 'tool_id', as: 'tool' });
  }
}

export default Tag;
