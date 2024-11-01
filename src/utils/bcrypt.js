const bcryt = require("bcryptjs");

// encriptar password
const hashPassword = async (password) => {
    try {
        const contra_cifrada = await bcryt.hash(password, 10);
        return contra_cifrada;
    } catch (error) {
        console.log(error);
    }
};

// hashPassword('123456789').then(hashed => {
//     console.log(hashed);
// }).catch(error => {
//     console.log(error);
// });

// const pass = '$2a$10$aOny1nOD9hSPmI27dyysyO.x5Z5Y2EFOSrpDMCtW1hLgn/g2Fl8Su';

// comparar password
const comparePassword = async (password, hashedPassword ) => {
    try {
        const esIgual = await bcryt.compare(password, hashedPassword);
        return esIgual;
    } catch (error) {
        console.log(error);
    }
};

// comparePassword('123456789', pass).then(comparePassword => {
//     console.log(comparePassword);
// }).catch(error => {
//     console.log(error);
// });

module.exports = { hashPassword, comparePassword }