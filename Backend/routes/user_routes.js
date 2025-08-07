const express = require('express');
const router = express.Router();
const {body}=require('express-validator')
const user_controller = require('../controllers/user_controller');
const auth_middleware = require("../middlewares/auth_middleware");

router.post('/register' ,[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],user_controller.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
], user_controller.loginUser)

router.get('/profile',auth_middleware.authUser, 
    user_controller.getUserProfile)

router.get('/logout', auth_middleware.authUser, 
    user_controller.logoutUser)
module.exports = (router)