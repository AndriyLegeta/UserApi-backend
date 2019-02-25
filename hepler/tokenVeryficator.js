const jwt = require('jsonwebtoken');
module.exports = async (token, secretWorld) => {
    let unixNow = Math.floor(Date.now() / 1000); //  сек
    let user = null;

    if (!token || !secretWorld) throw new Error('Have not token or secret word');

    jwt.verify(token, secretWorld, (err, decoded) => {  // перевіряємо токен
        if (err) throw new Error('You have bad auth.');
        if (decoded.exp <= unixNow) throw new Error('TOKEN EXPIRED'); // якщо дата закінчення строку (exp) менша за в даний час то токен вмер
        user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.userMail
        }
    });
    console.log(user);
    if (!user) throw new Error('DON\'T HACK MY SITE');

    return user
};