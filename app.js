
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mong = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/oclothes')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var add = require('./routes/add');
var closet = require('./routes/closet');
var edit = require('./routes/edit');
var feed = require('./routes/feed');
var item = require('./routes/item');
var login = require('./routes/login');
var register = require('./routes/register');
var requests = require('./routes/requests');
var userlist = require('./routes/userlist');
//var borrow = require('./routes/borrow');


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("secrets secrets are no fun"));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*// passport config
var Account = require('./routes/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');*/



// Add routes here
app.get('/', index.view);
app.get('/add', add.view);
app.get('/closet', closet.view);
app.get('/edit', edit.view);
app.get('/feed', feed.view);
app.get('/item', item.view);
app.get('/login', login.view);
app.get('/register', register.view);
app.get('/requests', requests.view);
app.get('/userlist', userlist.wrap(db));
app.post('/adduser', register.adduser(db));
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
