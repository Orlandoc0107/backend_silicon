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

// comparar password
const comparePassword = async (password, hashedPassword ) => {
    try {
        const esIgual = await bcryt.compare(password, hashedPassword);
        return esIgual;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { hashPassword, comparePassword }