const Sequelize = require("sequelize");

module.exports = class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatRoom",
        tableName: "chatrooms",
        comment: "채팅방",

        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.ChatRoom.belongsTo(db.User);
    db.ChatRoom.belongsTo(db.Recruits);
    db.ChatRoom.hasMany(db.ChatMsg);
  }
};
