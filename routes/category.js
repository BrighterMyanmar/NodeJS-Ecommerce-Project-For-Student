const router = require('express-promise-router')();
const controller = require('../controllers/category');
const {saveSingleFiles} = require('../utils/gallery');
const { CategorySchema,AllSchema} = require('../utils/schema');
const { validateBody,validateParam,validateRole} = require('../utils/validator')

router.post('/',[validateRole("Owner"),validateBody(CategorySchema.create),saveSingleFiles(),controller.add])
router.get('/',controller.all)

router.route('/:id')
    .get([validateParam(AllSchema.id, 'id'), controller.get])
    .patch([validateParam(AllSchema.id, 'id'), controller.patch])
    .delete([validateParam(AllSchema.id, 'id'), controller.drop])

module.exports = router;