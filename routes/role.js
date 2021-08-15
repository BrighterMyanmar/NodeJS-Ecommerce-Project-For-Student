const router = require('express-promise-router')();
const controller = require('../controllers/role');
const { validateToken, validateParam } = require('../utils/validator');
const { AllSchema } = require('../utils/schema');

router.post('/', [validateToken(), controller.add]);
router.get('/', controller.all);
router.post('/add/permit', controller.addPermit);
router.post('/remove/permit', controller.removePermit);

router.route('/:id')
    .get([validateParam(AllSchema.id,'id'), controller.get])
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;