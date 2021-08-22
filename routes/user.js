const router = require('express-promise-router')();
const controller = require('../controllers/user');
const {UserSchema,AllSchema} = require('../utils/schema');
const {validateBody,validateParam} = require('../utils/validator');


router.post('/',[validateBody(UserSchema.login),controller.login]);
router.post('/register',[validateBody(UserSchema.register),controller.register]);
router.get('/',controller.all);

router.post('/add/role',[validateBody(UserSchema.addRole),controller.addRole]);
router.post('/remove/role',[validateBody(UserSchema.addRole),controller.removeRole]);
router.post('/add/permit',[validateBody(UserSchema.addPermit),controller.addPermit]);
router.post('/remove/permit',[validateBody(UserSchema.addPermit),controller.removePermit]);

router.route('/:id')
    .get([validateParam(AllSchema.id,'id'),controller.get])
    .patch([validateParam(AllSchema.id,'id'),controller.patch])
    .delete([validateParam(AllSchema.id,'id'),controller.drop])

module.exports = router;