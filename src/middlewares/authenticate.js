const moment = require('moment');
const jwt = require('../services/jwt');

const SECRET = "secreto!";

function ensureAuth(req,res, next) {
    if(!req.headers.authoritation) return res.status(403).send({msg: "No token in Authoritation"})

    const token = req.headers.authoritation.replace(/['"]/g,"");

    const payload = jwt.decodeToken(token, SECRET);
    try {

        if (payload.exp <= moment.unix()) {
            return send.status(404).send({msg: "Token was expired!"});
        }
    } catch (error) {
        return res.status(404).send({msg: "Invalid Token"});
    }

    req.user = payload;
    next();
}


module.exports = {
    ensureAuth
}