const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Board",
        tableName: "board",
        comment: "게시판",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.User);
    db.Board.hasMany(db.Comment);
  }
};
