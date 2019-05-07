const {
    material: MaterialModel,
    tag: TagModel,
    category: CategoryModel,
    comment: CommentModel,
    reply: ReplyModel,
    user: UserModel,
    sequelize
} = require('../models')

const { decodeToken, checkAuth } = require('../lib/token')

module.exports = {
    // 创建物品
    async create(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { userId } = decodeToken(ctx)
            const { title, content, count, categories, tags } = ctx.request.body
            const tagList = tags.map(t => ({ name: t }))
            const categoryList = categories.map(c => ({ name: c }))
            const data = await MaterialModel.create(
                { userId, title, content, count, tags: tagList, categories: categoryList },
                // { include: [TagModel, CategoryModel] }
            )
            ctx.body = { code: 200, message: '成功创建物品', data }
        }
    },

    // 修改物品
    async update(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { materialId, title, content, categories, tags } = ctx.request.body
            if (materialId) {
                const tagList = tags.map(tag => ({ name: tag, materialId }))
                const categoryList = categories.map(cate => ({ name: cate, materialId }))
                await MaterialModel.update({ title, content }, { where: { id: materialId } })
                await TagModel.destroy({ where: { materialId } })
                await TagModel.bulkCreate(tagList)
                await CategoryModel.destroy({ where: { materialId } })
                await CategoryModel.bulkCreate(categoryList)

                ctx.body = { code: 200, message: '文章修改成功' }
            } else {
                ctx.body = { code: 403, message: '文章 id 不能为空' }
            }
        }
    },

    // 获取物品详情
    async getMaterialById(ctx) {
        const id = ctx.params.id
        const data = await MaterialModel.findOne({
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
     * 查询物品列表
     *
     * @param {Number} offset - 当前页码 默认1
     * @param {Number} limit - 限制查询数量 默认 10
     * ...
     */
    async getMaterialList(ctx) {
        let { page = 1, pageSize = 10, title, tag, category, rangTime } = ctx.query,
            offset = (page - 1) * pageSize,
            where = title ? { title: { $like: `%${title}%` } } : {}

        // const tagFilter = tag ? { name: { $like: `%${tag}%` } } : {}
        // const categoryFilter = category ? { name: { $like: category } } : {}
        const tagFilter = tag ? { name: tag } : {}
        // const categoryFilter = category ? { name: category } : {}

        pageSize = parseInt(pageSize) // 处理 pageSize

        const data = await MaterialModel.findAndCountAll({
            where,
            include: [
                // { model: TagModel, attributes: ['name'], where: tagFilter },
                // { model: CategoryModel, attributes: ['name'], where: categoryFilter },
                { model: UserModel, as: 'user', attributes: ['username'] }
            ],
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            row: true,
            distinct: true
        })

        ctx.body = { code: 200, ...data }
    },

    // 删除物品
    async delete(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            const { materialId } = ctx.query
            if (materialId) {
                if (materialId !== -1) {
                    await TagModel.destroy({ where: { materialId } })
                    await MaterialModel.destroy({ where: { id: materialId } })
                    await sequelize.query(
                        // `
                        //   delete article, tag, category, comment, reply from article
                        //   inner join tag on article.id=tag.articleId
                        //   inner join category on article.id=category.articleId
                        //   inner join comment on article.id=comment.articleId
                        //   inner join reply on comment.id=reply.commentId
                        //   where article.id=${articleId}
                        // `
                        `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.articleId=${articleId}`
                    )
                    ctx.body = { code: 200, message: '成功删除物品' }
                } else {
                    ctx.body = { code: 403, message: '禁止删除！' }
                }
            } else {
                ctx.body = { code: 403, message: '物品 id 不能为空' }
            }
        }
    }
}
