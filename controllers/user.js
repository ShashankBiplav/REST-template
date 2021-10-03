const User = require('../models/user');
const formidable = require('formidable');
const fs = require("fs");

// code for user signup
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

// code for handling file uploads
exports.upload = async (req, res, next) => {
    try {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            // your form fields will be found inside 'fields' variable
            // your form files will be inside files variable
            if (err) {
                return res.status(400).json({
                    status: "Failure",
                    msg: "Some error occurred " + err.message,
                });
            }
            let oldPath = files.upload.path;
            let newPath = `./uploads/${files.upload.name}`;
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    return res.status(400).json({
                        status: "Failure",
                        msg: "Failed to upload file. " + err.message,
                    });
                }
                res.status(201).json({
                    status: "Success",
                    msg: "File uploaded successfully",
                    newPath
                });
            });
        });
    } catch (e) {
        next(e);
    }
}