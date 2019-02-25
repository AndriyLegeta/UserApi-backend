const jwt = require('jsonwebtoken');
const secretWorld = require('../constants/secretWords').secret;
const refreshSecret = require('../constants/secretWords').refreshSecret;
const resetPassWord = require('../constants/secretWords').resetPassWord;


module.exports.accessAndRefresh = (id, name) => {
    const accessToken = jwt.sign({id: id}, secretWorld, {expiresIn: 99999999}); // створюємо токен jwt.sign(вміст, секрете слово по якому шифрують, expiresIn час життя)
    const refreshToken = jwt.sign({id: id, name: name}, refreshSecret, {expiresIn: 999999999999});
    const tokens = { // cтворюємо обєкт токен в якого є токен доступу і рефреш токен
        accessToken, // токен доступу коротке життя
        refreshToken // токен для обновлень
    };
    if (!tokens) throw new Error('TOKEN WAS NOT CREATED');
    return tokens;
};

module.exports.resetPassword = (id, userMail) => {
    const resetToken = jwt.sign({id, userMail}, resetPassWord, {expiresIn: 9999});
    if (!resetToken) throw new Error(`Token was not created`);
    return resetToken;
};