const Router = require('koa-router')
const router = new Router()
const MaterialController = require('../controllers/club')

router.post('/create', MaterialController.create)
router.put('/update', MaterialController.update)
router.get('/get/:id', MaterialController.getMaterialById)
router.get('/getList', MaterialController.getMaterialList)
router.delete('/delete', MaterialController.delete)

module.exports = router
