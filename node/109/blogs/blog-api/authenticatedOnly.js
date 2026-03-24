export default (req, res, next) => {
  if (req.session.userName) {
    return next();
  }

  const error = new Error('You must be logged in');
  error.statusCode = 401
  next(error);
}
