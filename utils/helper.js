const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Redis = require('./redis');

let verifyToken = async req => {
    let token = req.headers.authorization.split(" ")[1];
    let decode = jwt.verify(token,process.env.SECRET_KEY);
    let redisUser = await Redis.getObj(decode.id);
    if(redisUser) return true;
    else return false;
}

module.exports = {
    encode : password => bcrypt.hashSync(password,10),
    comparePass : (plain,hash) => bcrypt.compareSync(plain,hash),
    makeToken : payload =>jwt.sign(payload,process.env.SECRET_KEY),
    verifyToken
}
