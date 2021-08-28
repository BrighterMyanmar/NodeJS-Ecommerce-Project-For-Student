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
        }),
        "addRole":Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        "addPermit":Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    "RoleSchema": {
        "create": Joi.object({
            name: Joi.string().required(),
        }),
        "addPermit": Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    "CategorySchema": {
        "create": Joi.object({
            name: Joi.string().required()
        })
    },
    "SubCatSchema": {
        "create": Joi.object({
            name: Joi.string().required(),
            catid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    "ChildCatSchema": {
        "create": Joi.object({
            name: Joi.string().required(),
            subcatid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    "ProductSchema": {
        "create": Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            brand: Joi.string().required(),
            catid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            subcatid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            childcatid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    "AllSchema": {
        id: Joi.object({
            "id": Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        page: Joi.object({
            "page": Joi.string().required()
        })
    }
}
