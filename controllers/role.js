const TB = require('../models/role');

let add = async (req, res) => {
    let existRole = await TB.findOne({ "name": req.body.name });
    if (!existRole) {
        let data = new TB(req.body);
        let result = await data.save();
        res.send({ con: true, 'msg': "Role Saved!", result });
    } else {
        res.send({ con: false, 'msg': "Role နာမည် ရှိပြီးသား!" });
    }
}
let all = async (req, res) => {
    let result = await TB.find();
    res.send({ con: true, 'msg': "All Roles!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Role!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single Role!", result });
}
let drop = async (req, res) => {
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single Role!", result });
}

let addPermit = async (req, res) => {
    let role = await TB.findById(req.body.roleId);
    let index = role.permits.indexOf(req.body.permitId);
    if (index == -1) {
        await TB.findByIdAndUpdate(req.body.roleId, { $push: { permits: req.body.permitId } });
        let result = await TB.findById(req.body.roleId).populate('permits');
        res.send({ con: true, 'msg': "Role added Permit!", result });
    } else {
        res.send({ con: false, 'msg': "Permit Already Exist!" });
    }
}

let removePermit = async (req, res) => {
    let role = await TB.findById(req.body.roleId);
    let index = role.permits.indexOf(req.body.permitId);
    if (index == -1) {
        res.send({ con: false, 'msg': "Permit Not Exist!" });
    } else {
        await TB.findByIdAndUpdate(req.body.roleId, { $pull: { permits: req.body.permitId } });
        let result = await TB.findById(req.body.roleId).populate('permits');
        res.send({ con: true, 'msg': "Role added Permit!", result });
    }
}

module.exports = {
    add,
    all,
    get,
    patch,
    drop,
    addPermit,
    removePermit
}
