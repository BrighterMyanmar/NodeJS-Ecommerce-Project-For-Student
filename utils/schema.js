const Joi = require('joi');

module.exports = {
    "UserSchema": {
        "register": Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(9).max(11).required(),
            password: Joi.string().min(8).max(30).required()
        }),
        "login": Joi.object({
            phone: Joi.string().min(9).max(11).required(),
            password: Joi.string().min(8).max(30).required()
        })
    },
    "AllSchema": {
        id: Joi.object({
            "id": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
