const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
const OrderController = require("../controllers/order");
const { validateBody, validatePage, validateToken } = require('../utils/validator');
const { UserSchema, AllSchema } = require('../utils/schema');

router.post("/login", [validateBody(UserSchema.login), UserController.login]);
router.post("/register", [validateBody(UserSchema.register), UserController.register]);
router.get("/cats", CategoryController.all);
router.get("/products/:page", [validatePage(AllSchema.page, "page"), ProductController.paginate]);
router.post('/orders',[validateToken(),OrderController.add]);
router.get('/orders',[validateToken(),OrderController.getMyOrder]);

module.exports = router;