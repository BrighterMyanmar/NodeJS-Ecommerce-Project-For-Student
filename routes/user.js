const router = require('express-promise-router')();
const controller = require('../controllers/user');


router.post('/',controller.login);
router.post('/register',controller.register);
router.get('/',controller.all);
router.post('/add/role',controller.addRole);
router.post('/remove/role',controller.removeRole);
router.post('/add/permit',controller.addPermit);
router.post('/remove/permit',controller.removePermit);
router.get('/checkPermit/:userId/:permitId',async (req,res) => {
    let con = await controller.hasPermit(req.params.userId,req.params.permitId);
    if(con) console.log("User has that permission");
    else console.log("User has not that permission");
});

router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;