const router = require('express-promise-router')();
const controller = require('../controllers/role');


router.post('/',controller.add);
router.get('/',controller.all);
router.post('/add/permit',controller.addPermit);
router.post('/remove/permit',controller.removePermit);

router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;