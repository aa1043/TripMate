const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    const isBlacklisted=await userModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token is blacklisted' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');//select field to exclude password from the result
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user; // Attach user to request object
        return next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}