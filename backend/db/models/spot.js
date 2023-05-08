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
        Spot.belongsTo(models.Venue, { foreignKey: "ownerId" });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country: {
        type: DataTypes.INTEGER,
      },
      lat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lng: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
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
