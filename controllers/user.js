const TB = require('../models/user');
const Helper = require('../utils/helper');
const Redis = require('../utils/redis');
const RoleTB = require('../models/role');
const PermitTB = require('../models/permit');

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
                "id": phoneUser._id,
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

let hasRoleByName = async (userId,roleName) => {
    let role = await RoleTB.findOne({name:roleName});
    if(role) return await hasRole(userId,role._id);
    else return false;
}
let hasRole = async (userId, checkRoleId) => {
    let user = await TB.findByIdAndUpdate(userId).populate('roles');
    let foundRole = user.roles.find((role) => role._id == checkRoleId);
    if (foundRole) return true;
    return false;
}

let hasPermitByName = async (userId,permitName) => {
    let permit = await PermitTB.findOne({name:permitName});
    if(permit) return await hasPermit(userId,permit._id);
    else return false;
   
}
let hasPermit = async (userId,permitId) => {
    let user = await TB.findByIdAndUpdate(userId).populate('permits');
    let foundPermit = user.permits.find((permit) => permit._id == permitId);
    if (foundPermit) {
        return true;
    } else {
        let roleUser = await TB.findByIdAndUpdate(userId).populate('roles');
        let permits = [];
        roleUser.roles.map((role) => role.permits.forEach((permit) => permits.push(permit._id)));
        let foundPermit = permits.filter((permit) => permit == permitId);
        if (foundPermit.length > 0) {
            return true;
        } else {
            return false;
        }
    }
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
    hasRole,
    hasPermit,
    hasRoleByName,
    hasPermitByName
}
