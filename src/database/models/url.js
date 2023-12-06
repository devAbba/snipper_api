const shortid = require("shortid");

module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define("Url", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
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

  }, {})

  Url.associate = models => {
    //associations defined here
    Url.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author'
    })

    Url.hasOne(models.Analytics, {
      foreignKey: {
        name: 'url_id',
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