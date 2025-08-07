const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');
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