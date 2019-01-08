function get(req, res, next) {
  res.send('Working perfect')
}

function post(req, res, next) {
  res.send('Working perfect')
}

module.exports = {
  get,
  post
}
