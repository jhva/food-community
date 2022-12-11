const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
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
        password: {
          type: Sequelize.STRING(100),
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
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
