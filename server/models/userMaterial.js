const moment = require('moment')
// article 表
module.exports = (sequelize, dataTypes) => {
    const UserMaterial = sequelize.define(
        'usermaterial',
        {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            clubId: dataTypes.INTEGER(11), // 所属社团
            userId: dataTypes.INTEGER(11),
            materialId: dataTypes.INTEGER(11),
            managerUserId: dataTypes.INTEGER(11),
            isConfirm: dataTypes.INTEGER(11),
            getDate: dataTypes.DATE,
            returnDate: dataTypes.DATE,
            content: { type: dataTypes.TEXT, allowNull: false }, // 详情
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

    UserMaterial.associate = models => {
        UserMaterial.belongsTo(models.material, {
            as: 'material',
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        })

        UserMaterial.belongsTo(models.user, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        })
    }

    return UserMaterial
}
