var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var methodOverride = require("method-override")

var flash = require('connect-flash')
var session = require('express-session')
var morgan = require ('morgan')

var passport = require('passport')
var MongoStore = require('connect-mongo') (session)

var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.' + process.env.NODE_ENV })

mongoose.connect(process.env.MONGO_URI)

// middleware for using morgan to log all your requests on terminal
app.use(morgan('dev'))

app.set('view engine', 'ejs')
// Middleware: run methodOverride for put requests
app.use(methodOverride('_method'));
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  // store in database session in mongo
  store: new MongoStore ({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))

var usersRoutes = require('./routes/users')
var reviewsAPIRoutes = require('./routes/reviews_api')

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data

// Calling a exported function: input = package passport (from config folder) in for configuration
require('./config/passport') (passport)

app.use('/', usersRoutes)
// only handle ajax request
app.use('/api/reviews', reviewsAPIRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server started')
