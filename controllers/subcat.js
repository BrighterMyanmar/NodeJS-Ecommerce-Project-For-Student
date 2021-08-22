const TB = require('../models/subcat');
const CatTB = require('../models/category');

let add = async (req, res) => {
    let existSubCat = await TB.findOne({ name: req.body.name });
    if (existSubCat) {
        res.send({ con: false, 'msg': "Sub Category Name already exist!" });
    } else {
        let data = new TB(req.body);
        let result = await data.save();
        let category = await CatTB.findByIdAndUpdate(req.body.catid, { $push: { subcats: result._id } })
        res.send({ con: true, 'msg': "Sub Category Saved!", result });
    }

}
let all = async (req, res) => {
    let result = await TB.find().populate('childcats');
    res.send({ con: true, 'msg': "All Sub Categories!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Sub Category!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Sub Category!", result });
}
let drop = async (req, res) => {
    let subcat = await TB.findById(req.params.id);
    await CatTB.findByIdAndUpdate(subcat.catid,{$pull : {'subcats':subcat._id}})
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Sub Category!", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}
