const Router = require('koa-router')
const router = new Router()
const ClubController = require('../controllers/club')

router.post('/create', ClubController.create)
router.put('/update', ClubController.update)
router.get('/get/:id', ClubController.getClubById)
router.get('/getList', ClubController.getClubList)
router.delete('/delete', ClubController.delete)

module.exports = router
