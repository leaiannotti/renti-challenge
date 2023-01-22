const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    // Extract the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); // if there isn't any token
  
    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
//Middleware to check auth
function checkRole(requiredRole) {
    return function(req, res, next) {
      // Get the user's role from the JWT token
      const userRole = req.user.role;
  
      // Check if the user has the required role
      if (userRole === requiredRole) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  }

  module.exports = {
    authenticateJWT,
    checkRole
  }