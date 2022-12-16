const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
//만든 파일 import
// const User = require("./user");
// const Hashtag = require("./hashtag");
// const Post = require("./post");
const User = require("./user.js");
const Recruit = require("./recruit");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Recruit = Recruit;

// db.Sequelize = Sequelize;
User.init(sequelize);
Recruit.init(sequelize);

db.sequelize = sequelize;

User.associate(db);
Recruit.associate(db);

module.exports = db;
