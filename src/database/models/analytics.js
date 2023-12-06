module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define('Analytics', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url_id: DataTypes.UUID,
    clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    
  }, {})

  Analytics.associate = models => {
    //associations defined here
    Analytics.belongsTo(models.Url, {
      foreignKey: 'url_id',
      as: 'analytics'
    })
  }
  
  return Analytics
}