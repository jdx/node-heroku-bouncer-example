const app = require('express')()
const session = require('express-session')
const bouncer = require('heroku-bouncer')

const production = process.env.NODE_ENV === 'production'

// setup logging
app.use(require('morgan')('dev'))

app.use(session({
  secret: process.env.SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: production }
}))

// render a page with a login button
app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.use(bouncer())

app.get('/dashboard', (req, res, next) => {
  // get user info here
  console.dir(req.session.herokuAccount)

  res.render('dashboard.ejs', {
    email: req.session.herokuAccount.email
  })
})

app.get('/auth/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    res.redirect('/')
  })
})

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is listening on :${port}`)
})
