const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
        modelName: "Comment",
        tableName: "comments",
        comment: "댓글",

        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Board);
    // {
    //   foreignKey: "id",
    //   onDelete: "cascade",
    //   hooks: true,
    // }
    db.Comment.belongsTo(db.User);
  }
};
