const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.registerDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle} = req.body;
    const isDriverAlreadyExist=await driverModel.findOne({ email });
    if (isDriverAlreadyExist) {
        return res.status(400).json({ error: "Driver already exists with this email" });
    }
    const hashedPassword = await driverModel.hashPassword(password);
    try {
        const driver = await driverService.createDriver({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password: hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        });
        const token = driver.generateAuthToken();
        return res.status(201).json(driver);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const driver = await driverModel.findOne({ email }).select('+password'); // +password because password is set to select: false in the schema
    if (!driver) {
        return res.status(401).json({ error: "Driver not found,Please Register first" });
    }

    const isMatch = await driver.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = driver.generateAuthToken();

    res.cookie("token", token, {
        secure:true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({
        message: "Login successful",
        driver: {
            id: driver._id,
            email: driver.email,
            fullname: driver.fullname,
            vehicle: driver.vehicle
        },
        token
    });
}

module.exports.getDriverProfile = async (req, res) => {
    res.status(200).json(req.driver);
}

module.exports.logoutDriver = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    
    try {
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}








