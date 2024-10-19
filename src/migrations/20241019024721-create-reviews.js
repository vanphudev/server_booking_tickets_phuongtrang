'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      review_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      review_rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      review_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW') 
      },
      review_comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_locked: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0 
      },
      last_lock_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW') 
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), 
        onUpdate: Sequelize.fn('NOW') 
      },
      route_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'routes', 
          key: 'route_id' 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers', 
          key: 'customer_id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
