const router = require('express-promise-router')();
const controller = require('../controllers/permit');
const { validateBody,validateParam } = require('../utils/validator');
const { RoleSchema,AllSchema } = require('../utils/schema');

router.post('/',[validateBody(RoleSchema.create),controller.add])
router.get('/',controller.all)

router.route('/:id')
    .get([validateParam(AllSchema.id,"id"),controller.get])
    .patch([validateParam(AllSchema.id,"id"),controller.patch])
    .delete([validateParam(AllSchema.id,"id"),controller.drop])

module.exports = router;