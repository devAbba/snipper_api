module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define('Analytics', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    urlId: DataTypes.UUID
  }, {})

  Analytics.associate = models => {
    //associations defined here
    Analytics.belongsTo(models.Url, {
      foreignKey: 'urlId',
      as: 'analytics'
    })
  }
  
  return Analytics
}