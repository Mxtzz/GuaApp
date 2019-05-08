const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    reply: ReplyModel,
    user: UserModel,
    club: ClubModel,
    sequelize
} = require('../models')

const { decodeToken, checkAuth } = require('../lib/token')

module.exports = {
    // 创建社团
    async create(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { userId } = decodeToken(ctx)
            const { title, content } = ctx.request.body
            const data = await ClubModel.create(
                { userId, title, content }
            )
            ctx.body = { code: 200, message: '成功创建社团', data }
        }
    },

    // 修改社团
    async update(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { clubId, title, content } = ctx.request.body
            if (clubId) {
                await ClubModel.update({ title, content }, { where: { id: clubId } })
            
                ctx.body = { code: 200, message: '社团修改成功' }
            } else {
                ctx.body = { code: 403, message: '社团 id 不能为空' }
            }
        }
    },

    // 获取社团详情
    async getClubById(ctx) {
        const id = ctx.params.id
        const data = await ClubModel.findOne({
            where: { id },
            include: [
                { model: TagModel, attributes: ['name'] },
                { model: CategoryModel, attributes: ['name'] },
                {
                    model: CommentModel,
                    attributes: ['id', 'userId', 'content', 'createdAt'],
                    include: [
                        {
                            model: ReplyModel,
                            attributes: ['id', 'userId', 'content', 'createdAt'],
                            include: [{ model: UserModel, as: 'user', attributes: ['username'] }]
                        },
                        { model: UserModel, as: 'user', attributes: ['username'] }
                    ]
                }
            ],
            order: [[CommentModel, 'createdAt', 'DESC']],
            row: true
        })

        ctx.body = { code: 200, data }
    },

    /**
     * 查询社团列表
     *
     * @param {Number} offset - 当前页码 默认1
     * @param {Number} limit - 限制查询数量 默认 10
     * ...
     */
    async getClubList(ctx) {
        let { page = 1, pageSize = 10, title } = ctx.query,
            offset = (page - 1) * pageSize,
            where = title ? { title: { $like: `%${title}%` } } : {}

        pageSize = parseInt(pageSize) // 处理 pageSize

        const data = await ClubModel.findAndCountAll({
            where,
            include: [
                { model: UserModel, as: 'user', attributes: ['username', 'nickname'] }
            ],
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            row: true,
            distinct: true
        })

        ctx.body = { code: 200, ...data }
    },

    // 删除社团
    async delete(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { clubId } = ctx.query
            if (clubId) {
                if (clubId !== -1) {
                    await ClubModel.destroy({ where: { id: clubId } })
                    await sequelize.query(
                        // `
                        //   delete article, tag, category, comment, reply from article
                        //   inner join tag on article.id=tag.clubId
                        //   inner join category on article.id=category.clubId
                        //   inner join comment on article.id=comment.clubId
                        //   inner join reply on comment.id=reply.commentId
                        //   where article.id=${clubId}
                        // `
                        // `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.clubId=${clubId}`
                    )
                    ctx.body = { code: 200, message: '成功删除社团' }
                } else {
                    ctx.body = { code: 403, message: '禁止删除！' }
                }
            } else {
                ctx.body = { code: 403, message: '社团id不能为空' }
            }
        }
    }
}
