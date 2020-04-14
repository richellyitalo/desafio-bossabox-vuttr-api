'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tool_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tools',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags');
  },
};
