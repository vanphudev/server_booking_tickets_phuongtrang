'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      route_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true, 
      },
      route_name: {
        type: Sequelize.STRING(500),
        allowNull: false, 
        unique: true, 
      },
      route_duration: {
        type: Sequelize.BIGINT,
        allowNull: true, 
        validate: { min: 0 },
      },
      route_distance: {
        type: Sequelize.BIGINT,
        allowNull: true, 
        validate: { min: 0 },
      },
      route_url_gps: {
        type: Sequelize.TEXT,
        allowNull: false, 
      },
      origin_office_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'offices',
          key: 'id',
        },
      },
      destination_office_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'offices',
          key: 'id',
        },
      },
      route_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true, 
        validate: { min: 0 },
      },
      is_default: {
        type: Sequelize.TINYINT,
        allowNull: false, 
        defaultValue: 0,
      },
      is_locked: {
        type: Sequelize.TINYINT,
        allowNull: false, 
        defaultValue: 0,
      },
      last_lock_at: {
        type: Sequelize.DATE,
        allowNull: true, 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'), 
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW'), 
      },
      way_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'ways',
          key: 'way_id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  },
};
