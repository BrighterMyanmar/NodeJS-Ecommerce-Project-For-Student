const Helper = require('./helper');

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
    validateParam : (schema , name) => {
        return (req,res,next) => {
            let result = schema.validate({id: req['params'][name]});
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
                let authenticated = await Helper.verifyToken(req);
                if(authenticated)next();
                else res.send({ msg: "Tokenization Error!"});
            }

        }
    }
    
}