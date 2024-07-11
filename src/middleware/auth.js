const auth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next()
  } else {
    res.redirect("/")
  }
}

module.exports = auth
