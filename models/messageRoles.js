const dbF = require('../utils/db');
const { DataTypes, Model } = require("sequelize");

class MessageRoles extends Model {}

MessageRoles.init({
  channelid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guildid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  }
}, {
  sequelize: dbF,
  tableName:"messageroles",
  modelName:"MessageRoles",
  timestamps: false
})

module.exports = MessageRoles;