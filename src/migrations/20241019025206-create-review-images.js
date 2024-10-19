'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('review_images', {
      review_image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      review_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reviews', 
          key: 'review_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      review_image_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      review_image_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true 
        }
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('review_images');
  }
};
