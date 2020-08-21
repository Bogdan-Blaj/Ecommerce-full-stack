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
mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


//Start Listening
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})

//========================================
//                  MODELS
//========================================
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');


//========================================
//              MIDDLEWARES
//========================================
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//========================================
//                PRODUCTS
//========================================
app.post('/api/product/article', auth, admin, (req,res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if(err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

//========================================
//                  WOODS
//========================================
app.post('/api/product/wood', auth, admin, (req,res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if(err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            wood: doc
        })
    })
})


app.get('/api/product/wood', (req,res) => {
    Wood.find({}, (err, woods) => {
        if(err)
            return res.status(400).send(err);

        return res.status(200).send(woods);
    })
})


//========================================
//                  BRAND
//========================================
app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if(err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
});

app.get('/api/product/brand', (req,res) => {
    Brand.find({}, (err, brands) => {
        if(err)
            return res.status(400).send(err);

        return res.status(200).send(brands);
    })
})


//========================================
//                  USERS
//========================================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin : req.user.role === 0 ? false : true,
        isAuth: true,
        email : req.user.email,
        name : req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart : req.user.cart,
        history : req.user.history
    })
})

app.post('/api/users/register', (req, res) => {
    //create new User
    const user = new User(req.body);

    //save user
    user.save((err, doc) => {
        if(err)
            return res.json({success: false, err});
        res.status(200).json({
            success : true,
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

app.get('/api/user/logout', auth, (req, res) => {
    
    //update user record
    User.findOneAndUpdate(
        { _id : req.user._id},
        { token : ''},
        (err, doc) => {
            if(err)
                return res.json({
                    success: false, 
                    err
                });
            
            return res.status(200).send({
                success : true
            });
        }
    )
})
