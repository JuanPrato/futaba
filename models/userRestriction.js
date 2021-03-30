const dbF = require('../utils/db');
const { DataTypes, Model } = require("sequelize");

class UserToDestroyMessage extends Model {}

UserToDestroyMessage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  userid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbF,
  tableName:"usertodestroymessage",
  modelName:"Usertodestroymessage",
  timestamps: false
})

module.exports = UserToDestroyMessage;