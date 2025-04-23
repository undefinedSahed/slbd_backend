import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../utils/errorResponse.js'; // Adjust the path if needed

export const authenticateUser = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(
            new ErrorResponse(401, "Unauthorized: Missing or invalid Authorization header")
        );
    }

    const accessToken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        const { id: user_id, role } = decoded;

        if (!user_id && role == "user") {
            return res.status(400).json(
                new ErrorResponse(400, "User ID not found in token")
            );
        }


        req.user = { user_id, role };
        next(); 

    } catch (error) {

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json(
                new ErrorResponse(401, "Unauthorized: Invalid token")
            );
        }

        return res.status(500).json(
            new ErrorResponse(500, "Server error: " + error.message)
        );
    }
};
