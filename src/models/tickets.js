'use strict';
const { Model, DataTypes } = require('sequelize');

class tickets extends Model {
  static associate(models) {
    // Định nghĩa mối quan hệ với trips
    tickets.belongsTo(models.trips, {
      foreignKey: 'trip_id',
      as: 'trip',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Định nghĩa mối quan hệ với booking_seats
    tickets.belongsTo(models.booking_seats, {
      foreignKey: 'booking_seat_id',
      as: 'bookingSeat',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
}

// Khởi tạo model tickets
tickets.init(
  {
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'trip_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    booking_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'booking_seats',
        key: 'booking_seat_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    ticket_name_chair: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_export_ticket: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1,
      },
    },
    ticket_amount: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0.01,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.fn('NOW'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.fn('NOW'),
      onUpdate: DataTypes.fn('NOW'),
    },
  },
  {
    sequelize,
    modelName: 'tickets',
    tableName: 'tickets',
    timestamps: false, 
  }
);

module.exports = tickets;
