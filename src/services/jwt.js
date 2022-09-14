const jwt = require('jsonwebtoken');

const SECRET = "secreto!";

function createToken(user, expiresIn) {
    const {id, email} = user;
    const payload = { id, email};

    return jwt.sign(payload, SECRET, { expiresIn: expiresIn})
}


function decodeToken(token) {
    return jwt.decode(token, SECRET);
}

module.exports = {
    createToken,
    decodeToken
}