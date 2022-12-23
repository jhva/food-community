const Sequelize = require("sequelize");

module.exports = class Recruit extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },
        maxinum: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          comment: "모집인원",
        },
        content: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        status: {
          type: Sequelize.STRING(10),
          allowNull: true,
          unique: false,
          comment: "모집 상태",
          defaultValue: "모집 중",
        },
        statusNumber: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
          comment: "maxinum 컬럼이랑 비교할 컬럼",
          defaultValue: 1,
        },
        lat: {
          type: Sequelize.DOUBLE,

          allowNull: false,
        },
        lng: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Recruit",
        tableName: "recruits",
        comment: "모집구분",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Recruit.belongsTo(db.User);
    db.Recruit.hasMany(db.AttendRecruit);
    db.Recruit.hasMany(db.ChatRoom);
  }
};
