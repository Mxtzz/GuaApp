const moment = require('moment')
// material 表
module.exports = (sequelize, dataTypes) => {
    const Material = sequelize.define(
        'material',
        {
            id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
            title: { type: dataTypes.STRING(255), allowNull: false },
            content: { type: dataTypes.TEXT },
            userId: { type: dataTypes.INTEGER(11) },
            count: { type: dataTypes.INTEGER(11) },
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

    Material.associate = models => {
        Material.hasMany(models.tag)
        Material.hasMany(models.category)
        Material.hasMany(models.comment)
        Material.hasMany(models.reply)
        Material.belongsTo(models.user, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        })
    }

    return Material
}
