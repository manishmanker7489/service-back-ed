import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied. No token provided.");
  try {
    const decoded = jwt.verify(token, "your_jwt_secret_user");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};


export const authProvider = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied. No token provided.");
  try {
    const decoded = jwt.verify(token, "your_jwt_secret_provider");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

export const authBoth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied. No token provided.');
  try {
    const decodedProvider = jwt.verify(token, 'your_jwt_secret_provider');
    req.user = decodedProvider;
    next();
  } catch (err) {
    try {
      const decodedUser = jwt.verify(token, 'your_jwt_secret_user');
      req.user = decodedUser;
      next();
    } catch (err) {
      res.status(400).send('Invalid token.');
    }
  }
};


