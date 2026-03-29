const bcrypt = require("bcrypt");

function hashPassword(req, res, next) {
    if (req.body.password && req.body.password.length > 7) {
        req.body.passwordHash = bcrypt.hash(req.body.password, 10);
        delete req.body.password;
    } else {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    next();
}

module.exports = hashPassword;