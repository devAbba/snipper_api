const shortid = require("shortid");

module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define("Url", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    full: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    short: {
      type: DataTypes.STRING,
      defaultValue: shortid(),
      unique: true,
      allowNUll: false
    },
    userId: DataTypes.UUID

  }, {})

  Url.associate = models => {
    //associations defined here
    Url.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    })

    Url.hasOne(models.Analytics, {
      foreignKey: {
        name: 'urlId',
        type: DataTypes.UUID,
        allowNUll: false
      },
      as: 'analytics',
      onDelete: 'CASCADE',
      OnUpdate: 'CASCADE'
    })
  }
  
  return Url
}