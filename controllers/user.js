const User = require('../models/user');

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
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
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


// code to fetch user information
exports.getUserInfo = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "User information fetched successfully",
            users: users
        });
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}