const express = require('express');
const router = express.Router();
const {body}=require('express-validator')
const user_controller = require('../controllers/user_controller');

router.post('/register' ,[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],user_controller.registerUser)

module.exports = (router)