const Router = require('koa-router')
const router = new Router()
const UserMaterialController = require('../controllers/userMaterial')

router.post('/userMaterial', UserMaterialController.userMaterial)
router.put('/update', UserMaterialController.update)
// router.get('/get/:id', UserMaterialController.getUserMaterialById)
// router.get('/getList', UserMaterialController.getUserMaterialList)

module.exports = router
