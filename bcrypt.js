const bcrypt = require('bcrypt');
const saltRounds = 10;
const genPass = async (pwd) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
};
const compPass = async (pwd, hash) => {
    const match = await bcrypt.compare(pwd, hash);
    return match;
};
module.exports = {compPass: compPass, genPass: genPass }