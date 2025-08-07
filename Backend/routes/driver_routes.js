const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const driver_controller = require('../controllers/driver_controller');
const authMiddleware = require('../middlewares/auth_middleware');
router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required')
],driver_controller.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
], driver_controller.loginDriver);
module.exports=router;

router.get('/profile', authMiddleware.authDriver, driver_controller.getDriverProfile);

router.get('/logout', authMiddleware.authDriver, driver_controller.logoutDriver);