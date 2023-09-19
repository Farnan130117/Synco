const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

// Your secret key for JWT (keep it secret)
const secretKey = 'jwt-secret-key'; // it may come from .env file after setup

// DB config: mongoose
mongoose.connect('mongodb://127.0.0.1:27017/SyncoDB');

// Controller

/*----------- registration-------------- */
app.post('/register', (req, res) => {
   // console.log("Register request coming")
    const {name, email, password} = req.body;
   //console.log(name);
   
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})
/*----------- login -------------- */
app.post('/login', (req, res) => {
    // console.log("Login request coming")

    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    /*-------------- important------------------- */
                  const token = jwt.sign({email: user.email, role: user.role},
                    secretKey , {expiresIn: '1d'}) 
                    res.cookie('token', token)
                    return res.json({Status: "Success", role: user.role})

                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})
/*----------- Dashboard -------------- */

const varifyUser = (req, res, next) => { // this function verify auth token & role
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, secretKey, (err, decoded) => { // "secretKey" need to secure with more secured text or value, which can be setup in env file 
            if(err) {
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    //console.log(decoded)
                    req.email = decoded.email;
                    req.role = decoded.role;
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard',varifyUser ,(req, res) => {
   // res.json("Success")
   // console.log(req.email)
   return res.json({email: req.email, role: req.role})
})


/*----------- Dashboard -------------- */
  app.get('/logout', (req, res) => {
    console.log("logout request coming")
    res.clearCookie('token');
    return res.json("Success")
})

//PORT config
app.listen(3001, () => {
    console.log("Server is Running")
})