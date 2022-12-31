const Sequelize = require("sequelize");

module.exports = class ChatMsg extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        msg: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatMsg",
        tableName: "chatMsgs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.ChatMsg.belongsTo(db.User);
    db.ChatMsg.belongsTo(db.Recruits);
  }
};
