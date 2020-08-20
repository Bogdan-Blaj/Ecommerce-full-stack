//========================================
//                  SERVER
//========================================
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//========================================
//                  MODELS
//========================================
const { User } = require('./models/user');


//========================================
//                  USERS
//========================================
app.post('/api/users/register', (req, res) => {
    //create new User
    const user = new User(req.body);

    //save user
    user.save((err, doc) => {
        if(err)
            return res.json({success: false, err});
        res.status(200).json({
            success : true,
            userdata: doc
        });
    });
})

app.post('/api/users/login', (req, res) => {

    //find the email for the user
    User.findOne({'email' : req.body.email} , (err, user) =>{
        if(!user)
            return res.json({loginSuccess : false, message : 'Authentication failed, email not found'});

        //check the password
        user.comparePassword(req.body.password, (error, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess : false, message : 'Wrong password'});

            //generate token
            user.generateToken((err, user) => {
                console.log('generateToken', err, user);
                if(err)
                    return res.status(400).send(err);
                
                //store token as a cookie
                res.cookie('w_auth', user.token).status(200).json({
                        loginSuccess : true
                })
            })
            
        })
    })
})


//========================================
//                  SERVER
//========================================
//create env variable
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})