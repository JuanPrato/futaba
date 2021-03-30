const { readFileSync } = require("fs");
const { join } = require("path");
const { Sequelize } = require('sequelize');


const dbF = new Sequelize({
          dialect: 'postgres',
          dialectOptions: {
               ssl:{
                    require: true,
                    rejectUnauthorized: false,
               },
          },
          host: process.env.DBHOST || "localhost",
          database: process.env.DATABASE || "postgres",
          username: process.env.DBUSERNAME || "postgres", 
          password: process.env.DBPASSWORD || "postgres",
          port: 5432,
     });

dbF.query(readFileSync(join(__dirname, '../schema.sql'), 'utf8'));

module.exports = dbF;