// 评论控制器，包括回复内容
const { sequelize } = require('../models')
const { material: MaterialModel, usermaterial: UserMaterialModel, reply: ReplyModel, user: UserModel } = require('../models')
const { decodeToken, checkAuth } = require('../lib/token')

const fetchUserMaterialList = async userId =>
    UserMaterialModel.findAndCountAll({
        where: { userId },
        attributes: ['id', 'userId', 'content', 'createdAt'],
        include: [
            { model: UserModel, as: 'user', attributes: ['username'] }
        ],
        order: [['createdAt', 'DESC']]
    })

module.exports = {
    // 创建
    async userMaterial(ctx) {
        const { userId } = decodeToken(ctx)
        const { materialId, content, getDate, returnDate } = ctx.request.body
        await UserMaterialModel.usermaterial({ userId, materialId, content, getDate, returnDate, managerUserId: '', isConfirm: 0  })

        const data = await fetchUserMaterialList(materialId)

        ctx.body = { code: 200, message: 'success', ...data }
    },

    // 更新状态
    async update(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { userMaterialId, isConfirm } = ctx.request.body
            if (articleId) {
                await ArticleModel.update({ isConfirm }, { where: { id: userMaterialId } })

                ctx.body = { code: 200, message: '物品借用关系修改成功' }
            } else {
                ctx.body = { code: 403, message: '参数不能为空' }
            }
        }
    },
}
