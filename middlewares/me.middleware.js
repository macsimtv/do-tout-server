const jwt = require("jsonwebtoken");

class MeMiddleware {
  static async getUser(req, res, next) {
    const token =
      req.headers.authorization &&
      extractBearerToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: "Error. Need a token" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Error. Bad token" });
      } else {
        req.user = decodedToken;
        return next();
      }
    });
  }
}

module.exports = MeMiddleware;

const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};
