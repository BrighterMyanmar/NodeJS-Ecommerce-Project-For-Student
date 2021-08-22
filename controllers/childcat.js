const TB = require('../models/childcat');
const SubCatTB = require('../models/subcat');

let add = async (req, res) => {
    let exitName = await TB.findOne({ name: req.body.name });
    if (exitName) {
        res.send({ con: true, 'msg': "Child Cat Name already in use!" });
    } else {
        let data = new TB(req.body);
        let result = await data.save();

        await SubCatTB.findByIdAndUpdate(req.body.subcatid, { $push: { childcats: result._id } })

        res.send({ con: true, 'msg': "Child Cat Saved!", result});
    }
}
let all = async (req, res) => {
    let result = await TB.find();
    res.send({ con: true, 'msg': "All Child Categories!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Child Cat!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Child Cat!", result });
}
let drop = async (req, res) => {
    let childcat = await TB.findById(req.params.id);
    await SubCatTB.findByIdAndUpdate(childcat.subcatid,{$pull:{childcats:childcat._id}})
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Child Cat!", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}
