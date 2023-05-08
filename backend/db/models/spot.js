"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true,
      }),
        Spot.hasMany(models.Review, {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true,
        }),
        Spot.hasMany(models.SpotImage, {
          foreignKey: "spotId",
          onDelete: "CASCADE",
          hooks: true,
        }),
        Spot.belongsTo(models.User, { foreignKey: "ownerId" });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lng: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      sequelize,
      modelName: "Spot",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: {},
        },
      },
    }
  );
  return Spot;
};
