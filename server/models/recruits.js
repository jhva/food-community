const Sequelize = require("sequelize");

module.exports = class Recruits extends Sequelize.Model {
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
    db.Recruits.belongsTo(db.User);
    db.Recruits.hasMany(db.ChatRoom);
    db.Recruits.hasMany(db.AttendRecruit);
    // db.Recruits.hasOne(db.ChatRoom);
    db.Recruits.hasMany(db.ChatMsg);
  }
};
