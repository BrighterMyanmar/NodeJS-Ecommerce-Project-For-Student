const TB = require('../models/product');

let add = async (req, res) => {
    let data = new TB(req.body);
    let result = await data.save();
    res.send({ con: true, 'msg': "Product Saved!", result });
}
let all = async (req, res) => {
    let result = await TB.find();
    res.send({ con: true, 'msg': "All Products!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Product!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Product!", result });
}
let drop = async (req, res) => {
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Product!", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}
