import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  return next();
};
