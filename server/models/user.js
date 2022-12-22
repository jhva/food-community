const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        username: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },

        refreshToken: {
          type: Sequelize.STRING(350),
          allowNull: true,
        },
        isMarketing: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "일반사용자",
        },
        oauthId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "foodUser",
        comment: "유저",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Recruit);
    db.User.hasMany(db.Board);
    db.User.hasMany(db.AttendRecruit);
    db.User.hasMany(db.ChatRoom);
    db.User.hasMany(db.ChatMsg);
  }
};
