const Sequelize = require("sequelize");

module.exports = class AttendRecruit extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
{},
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "AttendRecruit",
                tableName: "attend_recruit",
                comment: "모집 참석여부",
              paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.AttendRecruit.belongsTo(db.User);

    }
};
