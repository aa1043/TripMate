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