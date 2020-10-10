const User = require('../models/user');

exports.signUp = async(req, res, next) => {
    const {name, email, password,age} = req.body;
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    try {
        const result = await user.save();
        res.status(200).json({
            message: "Sign up successful",
            result: result
        });
    }catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        const message = err.message;
        const data = err.data;
        res.status(status).json({
            message: message,
            data: data
        });
    }
};
