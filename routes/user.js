const router = require('express-promise-router')();
const controller = require('../controllers/user');


router.post('/',controller.login);
router.post('/register',controller.register);
router.get('/',controller.all);
router.post('/add/role',controller.addRole);
router.post('/remove/role',controller.removeRole);
router.post('/add/permit',controller.addPermit);
router.post('/remove/permit',controller.removePermit);
router.get('/checkPermit',controller.hasPermit);

router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;