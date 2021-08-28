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
    validatePage: (schema, name) => {
        return (req, res, next) => {
            let result = schema.validate({ page: req['params'][name] });
            if (result.error) {
                res.send({ con: false, 'msg': result.error.details[0].message })
            } else {
                next()
            }
        }
    },
    validateToken: () => {
        return async (req, res, next) => {
            if (!req.headers.authorization) throw new Error("No Beara Token");
            else {
                let redisUser = await Helper.verifyToken(req);
                req.body["user"] = redisUser;
                if (redisUser) next();
                else throw new Error("Tokenization Error!")
            }
        }
    },
    validateRole: roleName => {
        return async (req, res, next) => {
            let redisUser = await Helper.verifyToken(req);
            if (redisUser) {
                let bol = await UserController.hasRoleByName(redisUser._id, roleName);
                if (bol) next()
                throw new Error("Validation Error!");
            } throw new Error("Tokenization Error!")
        }
    },
    validatePermit: permitName => {
        return async (req, res, next) => {
            let redisUser = await Helper.verifyToken(req);
            if (redisUser) {
                let bol = await UserController.hasPermitByName(redisUser._id, permitName);
                if (bol) next()
                throw new Error("Validation Error!" );
            } throw new Error("Tokenization Error!")
        }
    }

}