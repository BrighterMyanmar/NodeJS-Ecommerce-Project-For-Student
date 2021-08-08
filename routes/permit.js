const router = require('express-promise-router')();
const controller = require('../controllers/permit');


router.post('/',controller.add)
router.get('/',controller.all)

router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;