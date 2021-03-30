const dbF = require('../utils/db');
const { DataTypes, Model } = require("sequelize");

class Birthday extends Model {}

Birthday.init({
  userid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  guildid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usertonotify: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdaydate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  sequelize: dbF,
  modelName: 'Birthday',
  tableName:"birthday",
  timestamps: false
})

module.exports = Birthday;