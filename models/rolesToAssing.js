const dbF = require('../utils/db');
const { DataTypes, Model } = require("sequelize");

class RolesToAssing extends Model {}

RolesToAssing.init({
  roleid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  },
  guildid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  messageid: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbF,
  tableName:"rolestoassing",
  modelName:"RolesToAssing",
  timestamps: false
})

module.exports = RolesToAssing;