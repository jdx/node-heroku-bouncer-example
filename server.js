const app = require('express')()
const session = require('express-session')

const production = process.env.NODE_ENV === 'production'

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: production }
}))

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is listening on :${port}`)
})
