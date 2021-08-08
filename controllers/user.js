const TB = require('../models/user');
const Helper = require('../utils/helper');
const Redis = require('../utils/redis');

let register = async (req, res) => {
    let emailUser = await TB.findOne({ email: req.body.email });
    if (emailUser) {
        res.send({ con: false, 'msg': "Email is already in use!" });
    } else {
        let phoneUser = await TB.findOne({ phone: req.body.phone });
        if (phoneUser) {
            res.send({ con: false, 'msg': "Phone is already in use!" });
        } else {
            req.body.password = Helper.encode(req.body.password);
            let data = new TB(req.body);
            await data.save(data);
            res.send({ con: true, 'msg': "Register Success!" });
        }
    }
}

let login = async (req, res) => {
    let phoneUser = await TB.findOne({ phone: req.body.phone });
    if (phoneUser) {
        let bol = Helper.comparePass(req.body.password, phoneUser.password);
        if (bol) {
            let user = {
                "id": phoneUser.id,
                "name": phoneUser.name,
                "email": phoneUser.email,
                "phone": phoneUser.phone,
                "token": ""
            };
            let token = Helper.makeToken(user);
            user.token = token;
            await Redis.setObj(user.id, user);
            res.send({ con: true, 'msg': "Login Success!", result: user });
        } else {

            res.send({ con: false, 'msg': "Creditial Error!" });
        }
    } else {
        res.send({ con: false, 'msg': "Creditial Error!" });
    }
}

let addRole = async (req, res) => {
    let user = await TB.findById(req.body.userId);
    let roles = user.roles;
    let index = roles.indexOf(req.body.roleId);
    if (index == -1) {
        await TB.findByIdAndUpdate(req.body.userId, { $push: { roles: req.body.roleId } });
        let result = await TB.findById(req.body.userId).populate('roles');
        res.send({ con: true, 'msg': "Role Addes!", result });
    } else {
        res.send({ con: false, 'msg': "Role already Exist!" });
    }
}
let removeRole = async (req, res) => {
    let user = await TB.findById(req.body.userId);
    let roles = user.roles;
    let index = roles.indexOf(req.body.roleId);
    if (index == -1) {
        res.send({ con: false, 'msg': "Role not Exist!" });
    } else {
        await TB.findByIdAndUpdate(req.body.userId, { $pull: { roles: req.body.roleId } });
        let result = await TB.findById(req.body.userId).populate('roles');
        res.send({ con: true, 'msg': "Role Addes!", result });
    }
}
let addPermit = async (req, res) => {
    let user = await TB.findById(req.body.userId);
    let permits = user.permits;
    let index = permits.indexOf(req.body.permitId);
    if (index == -1) {
        await TB.findByIdAndUpdate(req.body.userId, { $push: { permits: req.body.permitId } });
        let result = await TB.findById(req.body.userId).populate('permits');
        res.send({ con: true, 'msg': "Permit Added!", result });
    } else {
        res.send({ con: false, 'msg': "Permit already Exist!" });
    }
}

let removePermit = async (req, res) => {
    let user = await TB.findById(req.body.userId);
    let permits = user.permits;
    let index = permits.indexOf(req.body.permitId);
    if (index == -1) {
        res.send({ con: false, 'msg': "Permit not Exist!" });
    } else {
        await TB.findByIdAndUpdate(req.body.userId, { $pull: { permits: req.body.permitId } });
        let result = await TB.findById(req.body.userId).populate('permits');
        res.send({ con: true, 'msg': "Permit Addes!", result });
    }
}

let all = async (req, res) => {
    let result = await TB.find();
    res.send({ con: true, 'msg': "All Users!", result });
}
let get = async (req, res) => {
    let result = await TB.findById(req.params.id).populate('roles').populate('permits');
    res.send({ con: true, 'msg': "Single User!", result });
}
let patch = async (req, res) => {
    await TB.findByIdAndUpdate(req.params.id, req.body);
    let result = await TB.findById(req.params.id);
    res.send({ con: true, 'msg': "Single User!", result });
}
let drop = async (req, res) => {
    let result = await TB.findByIdAndDelete(req.params.id);
    res.send({ con: true, 'msg': "Single User!", result });
}

module.exports = {
    register,
    login,
    addRole,
    removeRole,
    addPermit,
    removePermit,
    all,
    get,
    patch,
    drop,
}
