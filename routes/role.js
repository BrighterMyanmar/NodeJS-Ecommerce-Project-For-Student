const router = require('express-promise-router')();
const controller = require('../controllers/role');
const { validateBody, validateToken, validateParam } = require('../utils/validator');
const { RoleSchema,AllSchema } = require('../utils/schema');

router.post('/', [validateBody(RoleSchema.create), validateToken(), controller.add]);
router.get('/', controller.all);
router.post('/add/permit', [validateBody(RoleSchema.addPermit), controller.addPermit]);
router.post('/remove/permit', [validateBody(RoleSchema.addPermit), controller.removePermit]);

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), controller.get])
    .patch([validateParam(AllSchema.id, 'id'),controller.patch])
    .delete([validateParam(AllSchema.id, 'id'),controller.drop])

module.exports = router;