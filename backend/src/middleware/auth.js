import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Token is expired or invalid' });
      }
      req.adminId = decoded.id;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server authentication error' });
  }
};

export default authMiddleware;
