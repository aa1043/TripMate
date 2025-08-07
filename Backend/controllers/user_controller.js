const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require('express-validator');
const blacklistToken= require('../models/blacklistToken.model');
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, fullname, password } = req.body;

        const isUserAlreadyExist=await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');// +password because password is set to select: false in the schema
        if (!user) {
            return res.status(401).json({ error: "User not found,Please Register first" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token, {
            secure:true,
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];
        await blacklistToken.create({ token });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}