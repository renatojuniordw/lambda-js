const { sign } = require('jsonwebtoken');

function createToken(username, id) {
    return sign({ username, id }, process.env.JWT_SECRET, {
        expiresIn: '12h',
        audience: 'fiap-auth'
    });
}

module.exports = {
    createToken
};