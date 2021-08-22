const router = require('express-promise-router')();
const controller = require('../controllers/subcat');
const { saveSingleFiles } = require('../utils/gallery');
const { SubCatSchema,AllSchema } = require('../utils/schema');
const { validateBody,validateParam} = require('../utils/validator')


router.post('/', [validateBody(SubCatSchema.create),saveSingleFiles(), controller.add])
router.get('/', controller.all)

router.route('/:id')
    .get([validateParam(AllSchema.id,'id'),controller.get])
    .patch([validateParam(AllSchema.id,'id'),controller.patch])
    .delete([validateParam(AllSchema.id,'id'),controller.drop])

module.exports = router;