const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();


const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        uniqure: 1
    },
    password : {
        type: String,
        required: true,
        minlength: 5
    },
    name : {
        type: String,
        required: true,
        maxlength: 30
    },
    lastname : {
        type: String,
        required: true,
        maxlength: 30
    },
    cart : {
        type : Array,
        default: []
    },
    history : {
        type: Array,
        default: []
    },
    role : {
        type: Number,
        default : 0
    },
    token : {
        type: String
    }
});

//========================================
//            Encrypt Password
//========================================

//ES5 for compatibility reasons
userSchema.pre('save', function(next){
    var user = this;
    
    //listening to changing the password field, else move forward
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if (err)
                return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err)
                    return next(err);

                user.password = hash;
                next();
            });
        })
    }
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(error, isMatch){
        if(error)
            return cb(error);

        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;

    //save token
    user.save(function(err, user){
        if(err)
            return cb(err);

        cb(null, user)
    })
}

//========================================
//            SAVE in DB
//========================================
const User = mongoose.model('User', userSchema);

module.exports =  {User}