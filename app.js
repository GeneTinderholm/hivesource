const express = require('express');
const app = express();
var server = require('http').createServer(app);


// ----------------------------------------
// App Variables
// ----------------------------------------
app.locals.appName = 'Hive-Source';


//----------------------------------------
//Models
//----------------------------------------

let models = require('./models/');
const User = require("./models/User");


// ----------------------------------------
// ENV
// ----------------------------------------
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSION_SECRET || 'secret'
  ]
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


// ----------------------------------------
// Flash Messages
// ----------------------------------------
const flash = require('express-flash-messages');
app.use(flash());


// ----------------------------------------
// Method Override
// ----------------------------------------
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));


// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header('Referer') || '/';
  next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));


//----------------------------------------
//Websockets
//----------------------------------------
const io = require('socket.io')(server);
const projectsIo = require('./routers/sockets/projects')(io);
app.use(
  '/socket.io',
  express.static('node_modules/socket.io-client/dist/'),
);

// io.on('connection', client => {
//   console.log('connection up');
//   console.log(client);
//   client.emit('loadclient', "client");
// });
//----------------------------------------
//Mongoose
//----------------------------------------
const mongoose = require('mongoose');

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

//----------------------------------------
//Passport/local strategy
//----------------------------------------
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      console.log(user);
      if (err) return done(err);
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: "Invalid username/password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());


//----------------------------------------
//Route protection
//----------------------------------------
app.use((req, res, next) => {
  // const myUrl = url.parse(req.url);
  if (!req.user && ( req.path !== "/login" && req.path !== "/signup" )) {
    res.redirect("/login");
  } else if(req.user && ( req.path == "/login" || req.path == "/signup" )){
    res.redirect('/');
  } else {
    next();
  }
});

// ----------------------------------------
// Routes
// ----------------------------------------
const index = require('./routers/index');
const login = require('./routers/login');
const logout = require('./routers/logout');
const signup = require('./routers/signup');
const projects = require('./routers/projects');

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/projects', projects);

// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
  process.argv[2] ||
  3000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }\n`);
});
server.listen(port);

if (require.main === module) {
  app.listen.apply(app, args);
}
// if (require.main === module) {
//   server.listen(port,() => {
//   console.log(`Listening: http://${ host }:${ port }\n`);
// });
// }
// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render('errors/500', { error: err });
});


module.exports = app;






