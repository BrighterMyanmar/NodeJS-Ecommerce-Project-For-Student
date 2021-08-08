const TB = require('../models/permit');

let add = async (req, res) => {
    let existPermit = await TB.findOne({ name: req.body.name });
    if (!existPermit) {
        let data = new TB(req.body);
        let result = await data.save();
        res.send({ con: true, 'msg': "Permit Saved!", result });
    } else {
        res.send({ con: false, 'msg': "Permit Already Exist!" });
    }
}
let all = async (req, res) => {
    let result = await TB.find();
    res.send({ con: true, 'msg': "All Permits!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Permit!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Permit!", result });
}
let drop = async (req, res) => {
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Permit!", result });
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
}
