// server.js

// BASE SETUP
// =============================================================================
// NOTE: package.json -> The tilde matches the most recent minor version (the middle number). ~0.0.3 will match all 0.0.x versions but will miss 0.1.0.
// It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.
//
//
// call the packages we need
var express    = require('express') 
    , bodyParser = require('body-parser')
    // , nconf = require('nconf')
    , passport = require('passport')
    , cors = require('cors')
    , stylus = require('stylus')
    , nib = require('nib')
    , session = require('express-session')
    , app        = express();                 // define our app using express

// nconf.env(['only', 'load', 'these', 'values', 'from', 'process.env']);

 // nconf.overrides({
 //    'always': 'be this value'
 //  });

 // console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));


// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// Configure templates with stylus and jade
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Register serialialization function
server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
  Client.findOne({ _id: id }, function (err, client) {
    if (err) { return callback(err); }
    return callback(null, client);
  });
});

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
//mongodb://localhost/vca
mongoose.connect('mongodb://localhost/vca'); // connect to our database

var userController = require('./controllers/user')
    ,employeeController = require('./controllers/employee')
    ,companyController = require('./controllers/company')
    ,questionController = require('./controllers/question')
    ,authController = require('./controllers/auth')
    ,clientController = require('./controllers/client')
    ,oauth2Controller = require('/controllers/oauth2')
    ,mailController = require('./controllers/mail');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Invoking API.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'welcome to our api!' }); 
});

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

// create a employee (accessed at POST http://localhost:8080/api/employees)
router.route('/employees')
    .post(employeeController.postEmployee) // create a employee (accessed at POST http://localhost:8080/api/employee)
    .get(employeeController.getEmployees); // get all the employees (accessed at GET http://localhost:8080/api/employees)

// PUT must be idempotent so we should send all the data to update. If we want to partially update the resource we must use PATCH

// on routes that end in /employees/:employee_id
// ----------------------------------------------------
 router.route('/employees/:employee_id')
     .get(employeeController.getEmployee) // get the employee with that id (accessed at GET http://localhost:8080/api/employees/:employee_id)
     .put(employeeController.updateEmployee) // update the employee with this id (accessed at PUT http://localhost:8080/api/employees/:employee_id)
     .delete(employeeController.deleteEmployee);
   
router.route('/companies')
    .post(companyController.postCompany)
    .get(companyController.getCompanies);

router.route('/companies/:company_id')
    .get(companyController.getCompany)
    .put(companyController.updateCompany)
    .delete(companyController.deleteCompany);

router.route('/questions')
    .post(questionController.postQuestion)
    .get(questionController.getQuestions);

router.route('/questions/:question_id')
    .get(questionController.getQuestion)
    .put(questionController.updateQuestion)
     .delete(questionController.deleteQuestion);

router.route('/users')
    .post(userController.postUser)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .post(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.updateUser)
     .delete(authController.isAuthenticated, userController.deleteUser);


router.route('/mail')
    .post(mailController.send)
// more routes for our API will happen here

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);


// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port: ' + port);
