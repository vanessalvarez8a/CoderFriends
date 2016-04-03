var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(session({secret: 'my-session-secret'}))


passport.use(new GitHubStrategy({
    clientID: 'a3907b2f02706a2330f9',
    clientSecret: 'b5a87d1917ffd5634bec1bcbc6a696a42e51788d',
    callbackURL: "http://localhost:9071/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


////// Note: Without this it would not work the log in ///////////
var requireAuth = function(req, res, next) {
  console.log()
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

app.get('/api/github/following', requireAuth, function(req, res) {
  res.send('hello');
})

app.listen(9071, function() {
  console.log('app is listening on port 9071');
})
