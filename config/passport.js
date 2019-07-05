const JWTStrategy = require('passport-jwt/lib').Strategy;
const extractJWT = require('passport-jwt/lib').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use('super_admin',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='super_admin') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('world',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='world') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('lvpei',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='lvpei') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('all_lvpei',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='lvpei' || user.role === 'super_admin') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('non_super',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            if(user.role==='lvpei' || user.role === 'world') {
              return done(null,user);
            } else {
              return done(null,false);
            }          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.use('all',
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            return done(null,user);
          }
          return done(null,false);
        })
        .catch(err=>console.log(err));
    })
  );
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
//
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
