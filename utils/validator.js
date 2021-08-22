const Helper = require('./helper');
const UserController = require('../controllers/user');

module.exports = {
    validateBody: schema => {
        return (req, res, next) => {
            let result = schema.validate(req.body);
            if (result.error) {
                res.send({ con: false, 'msg': result.error.details[0].message })
            } else {
                next()
            }
        }
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let result = schema.validate({ id: req['params'][name] });
            if (result.error) {
                res.send({ con: false, 'msg': result.error.details[0].message })
            } else {
                next()
            }
        }
    },
    validateToken: () => {
        return async (req, res, next) => {
            if (!req.headers.authorization) {
                res.send({ msg: "No Beara Token" })
            } else {
                let redisUser = await Helper.verifyToken(req);
                if (redisUser) next();
                else res.send({ msg: "Tokenization Error!" });
            }
        }
    },
    validateRole: roleName => {
        return async (req, res, next) => {
            let redisUser = await Helper.verifyToken(req);
            if (redisUser) {
                let bol = await UserController.hasRoleByName(redisUser._id, roleName);
                if (bol) next()
                else res.send({ msg: "Validation Error!" });
            } else res.send({ msg: "Tokenization Error!" });
        }
    },
    validatePermit: permitName => {
        return async (req, res, next) => {
            let redisUser = await Helper.verifyToken(req);
            if (redisUser) {
                let bol = await UserController.hasPermitByName(redisUser._id, permitName);
                if (bol) next()
                else res.send({ msg: "Validation Error!" });
            } else res.send({ msg: "Tokenization Error!" });
        }
    }

}