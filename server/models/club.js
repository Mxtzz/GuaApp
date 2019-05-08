const moment = require('moment')
// club 表
module.exports = (sequelize, dataTypes) => {
    const Club = sequelize.define(
        'club',
        {
            id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
            title: { type: dataTypes.STRING(255), allowNull: false },
            content: { type: dataTypes.TEXT },
            userId: { type: dataTypes.INTEGER(11) },
            createdAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            updatedAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        },
        {
            timestamps: true
        }
    )

    Club.associate = models => {
        Club.belongsTo(models.user, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        })
    }

    return Club
}
