const TB = require('../models/category');

let add = async (req, res) => {
    // let existName = await TB.findOne({ name: req.body.name });
    // if (existName) {
    //     res.send({ con: false, 'msg': "Category Already Exist!" });
    // } else {
    //     let data = new TB(req.body);
    //     let result = await data.save();
    //     res.send({ con: true, 'msg': "Category Saved!", result });
    // }
    res.send({ con: true, 'msg': "Category Saved!", result:req.body });
}
let all = async (req, res) => {
    let result = await TB.find().populate({
        path: 'subcats',
        model: 'subcat',
        populate : {
            path:'childcats',
            model:'childcat'
        }
    })
    res.send({ con: true, 'msg': "All Categories!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Category!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Category!", result });
}
let drop = async (req, res) => {
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Category!", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}
