
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(64),
    }
  }, {})

  User.associate = models => {
    //association definitions here
    User.hasMany(models.Url, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.UUID,
        allowNull: false
      },
      as: 'urls',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return User
}