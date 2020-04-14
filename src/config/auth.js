export default {
  secret: process.env.AUTH_SECRET || 'secret',
  expiresIn: '7d',
};
