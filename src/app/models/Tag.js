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

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Tool, { foreignKey: 'tool_id', as: 'tool' });
  }
}

export default Tag;
