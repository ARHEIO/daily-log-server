
const adminMiddleware = (req, res, next) => {
  let email = 'aliquam@tristique.net';
  req.user = { email }
  next();
}

module.exports = adminMiddleware;
