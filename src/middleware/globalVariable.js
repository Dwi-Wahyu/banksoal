var globalVariable = (req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin
  res.locals.nama = req.session.nama
  next()
}

module.exports = globalVariable
