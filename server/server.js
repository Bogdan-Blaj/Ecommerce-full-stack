//========================================
//                  SERVER
//========================================
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');

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


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})


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
const { Payment } = require('./models/payment');


//========================================
//              MIDDLEWARES
//========================================
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');
const { response } = require('express');
const { json } = require('body-parser');

//========================================
//                PRODUCTS
//========================================

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                //filter price between an interval
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})



//By Arrival + Sort
// /articles?sortBy=createdAt&order=desc&limit=100

//BY SELL
// /articles?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles', (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, articles) => {
        if(err)
            return res.status(400).send(err);
        res.send(articles);
    })
});



// /api/product/article?id=something,somethingElse&type=single
app.get('/api/product/articles_by_id', (req,res) => {
    // check if type is array or single (we are searching for 1 or more products)
    //this can be used because we are using bodyParser and have urlencoded
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        //get the ids
        let ids = req.query.id.split(',');
        //convert to array
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({'_id' : {$in : items}}).
    populate('brand').
    populate('wood').
    exec((err, docs) => {
        return res.status(200).send(docs)
    })
});


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

app.get('/api/users/logout', auth, (req, res) => {
    
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
});

//check we are authenticated, admin, call formidable and then use the req and res
// to upload we have the files, the callback and the configuration
// we have req.file.XXX , where XXX we set it where we call this medhod in fileUpload.js and path because it's in memory
app.post('/api/users/uploadimage', auth, admin, formidable(), (req,res) =>{
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id : result.public_id,
            url : result.url
        })
    }, {
        public_id : `${Date.now()}`,
        resource_type : 'auto'
    })
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
    let public_id = req.query.public_id;
    cloudinary.uploader.destroy(public_id, (error, result) => {
        if(error)
            return res.json({success : false, error});
        res.status(200).send('ok');
    })
})

app.post('/api/users/addToCart', auth, (req, res) => {

    User.findOne({_id: req.user._id}, (err, doc) => {
        //check if the product is in the cart already
        let duplicate = false;
        doc.cart.forEach((item) => {
            if(item.id == req.query.productId){
                duplicate = true;
            }
        })
        if(duplicate){
            //find by user id and cart item id the product, then increment the value
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id" : mongoose.Types.ObjectId(req.query.productId)},
                {$inc : {"cart.$.quantity" : 1} },
                {new : true},//returns all the item 
                () => {
                    if(err)
                    return res.json({success : false , err});
                    res.status(200).json(doc.cart);
                }
            )
        } else {
            // product not in cart
            User.findOneAndUpdate(
                {_id : req.user._id},
                { $push: { cart : {
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity: 1,
                    date : Date.now()
                } }},
                { new : true},
                (err, doc) => {
                    if(err)
                        return res.json({success : false , err});
                    res.status(200).json(doc.cart);
                }
            )
        }
    })
});

app.get('/api/users/removeFromCart',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
            { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
            find({'_id':{ $in: array }}).
            populate('brand').
            populate('wood').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
})

app.post('/api/users/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {};

    //user history
    req.body.cartDetail.forEach(item => {
        history.push({
            dateOfPurchase : date.now(),
            name : item.name,
            brand: item.brand,
            id: item._id,
            price : item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    //payments dash
    transactionData.user = {
        id: req.user._id,
        name : req.user.name,
        lastname : req.user.lastname,
        email : req.user.email
    }
    transactionData.data = req.user.paymentData;
    transactionData.product = history;
    
    //
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history:history }, $set:{ cart:[] } },
        { new: true },
        (err, user) => {
            if(err)
                return res.json({success : false, err});

            //create new payment
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if(err)
                    return res.json({success : false, err});

                let products = [];
                doc.products.forEach(item => {
                    products.push({
                        id: item.id,
                        quantity : item.quantity
                    })
                })
                //using assync
                async.eachSeries(products,(item,callback)=>{ 
                    Product.update(
                        {_id: item.id},
                        { $inc:{
                            "sold": item.quantity
                        }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err});
                    sendEmail(user.email,user.name,null,"purchase",transactionData)
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
});