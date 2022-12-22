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
        },
        content: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        status: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        statusNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
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
