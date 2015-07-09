var mongoose = require('mongoose')
	,bcrypt  = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema   = new Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;
  console.log("User: " + user.mail + "Pwd: " + user.password);

  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
	  	return callback();
  } 

  // Password changed so we need to hash it
  bcrypt.genSalt(10, function(err, salt) {
    if (err){
    	console.log("Error: " + err);
    	return callback(err);	
    } 

    bcrypt.hash(user.password, salt, null, function(err, hash) {
    	console.log("HASH: " + hash);
      if (err){
      	console.log("Error: " + err);
      	return callback(err);	
      } 

      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);