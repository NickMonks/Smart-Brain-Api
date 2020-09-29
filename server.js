const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

// Endpoints
const register  = require('./controllers/register');
const signin    = require('./controllers/signin');
const profile   = require('./controllers/profile');
const image     = require('./controllers/image');

// Middleware to parse the req.body.email
app.use(bodyParser.json());
app.use(cors());


const db = knex({
  client: 'pg',
  connection: {
  	host: process.env.DATABASE_URL,
  	ssl: true
  }
});


app.get('/',            (req, res) => { res.send('Root home working succesfully')})
app.post('/signin',     (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register',   (req, res) => { register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req,res,db,bcrypt)})
app.put('/image',       (req, res) => { image.handleImage(req,res,db,bcrypt)})
app.post('/imageurl',   (req, res) => { image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})


