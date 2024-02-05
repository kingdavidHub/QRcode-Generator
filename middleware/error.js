const errorJs = (err, req, res, next) => {
  const newError = new Error('Not Found');
  res.status(404 || err.status);
  res.redirect('/');
  next(newError);
}


export default errorJs;