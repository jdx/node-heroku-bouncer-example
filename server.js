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

app.use(bouncer())

// render a page with a login button
app.get('/', (req, res) => {
  console.dir(req.session)
  res.render('home.ejs')
})

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is listening on :${port}`)
})
