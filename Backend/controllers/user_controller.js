const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, fullname, password } = req.body;

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