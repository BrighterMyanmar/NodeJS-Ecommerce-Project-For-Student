const router = require('express-promise-router')();
const controller = require('../controllers/order');
const {validateToken} = require('../utils/validator');



router.post('/',[validateToken(),controller.add])
router.get('/',controller.all)

router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;