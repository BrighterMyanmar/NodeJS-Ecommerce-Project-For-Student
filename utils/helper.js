const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    encode : password => bcrypt.hashSync(password,10),
    comparePass : (plain,hash) => bcrypt.compareSync(plain,hash),
    makeToken : payload =>jwt.sign(payload,process.env.SECRET_KEY)
}