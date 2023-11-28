import jwt from 'jsonwebtoken';
import User from "../Models/User.js";

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const { isAdmin } = await User.findById(decodedToken.id);
            if (isAdmin) {
                next();
            } else {
                res.status(403).json({ message: 'You do not have permission for this action!', success: false });
            }
        } else
            res.status(424).json({ message: "You do not have permission for this action!", success: false });

    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!', success: false });
    }
};