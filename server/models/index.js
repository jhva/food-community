const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];



const Board =require('./board');
const User = require("./user");
const ChatMsg= require("./chatMsg");
const Recruit = require("./recruit");
const Comment = require('./comment');
const ChatRoom= require('./chatroom');
const AttendRecruit =require('./attendRecruit');



const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.sequelize = sequelize;
db.User = User;
db.AttendRecruit=AttendRecruit;
db.Recruit = Recruit;
db.Board = Board;
db.Comment=Comment;
db.ChatMsg=ChatMsg;
db.ChatRoom =ChatRoom;



// db.Sequelize = Sequelize;
AttendRecruit.init(sequelize);
Recruit.init(sequelize);
Comment.init(sequelize);
ChatMsg.init(sequelize);
ChatRoom.init(sequelize);
Board.init(sequelize);
User.init(sequelize);


db.sequelize = sequelize;

AttendRecruit.associate(db);
Recruit.associate(db);
Comment.associate(db);
ChatMsg.associate(db);
ChatRoom.associate(db);
Board.associate(db);
User.associate(db);


module.exports = db;
