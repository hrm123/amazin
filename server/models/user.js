const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    name: String,
    password: String,
    picure: String,
    isSeller: { type: Boolean, default: false},
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    created: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(er, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(pwd){
    return bcrypt.compareSync(pwd, this.password);
};

UserSchema.methods.gravatar = function(size){
    if(! this.size) size = 200;
    if(!this.email) {
        return "htps://gravatar.com/avatar/?s" + size + '&d=retro';
    }
    else {
    var md5 = cryptto.createHash('md5').update(this.email).digest('hex');
    return "htps://gravatar.com/avatar/" + md5 + "?s" + size + '&d=retro';
    }
};

module.exports = mongoose.model('User', UserSchema);
