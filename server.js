'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require("body-parser");
var cors = require("cors");
var swig = require("swig");


var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
var Polls = require('./app/models/polls');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());

routes(app, passport);

// app.get('/login', (req,res)=>{
// // 	var cavsPoll = new Polls({
// // 	    title: 'Will the Cavs Win Next Year?',
// // 	    options:[
// // 	        {name: "Yes", votes: 0},
// // 	        {name:"No", votes: 0}
// // 	    ]
// // 	})
// // 	cavsPoll.save((err, cavsPoll) =>{
// //     if(err) return console.log(err);
// //     // console.log(cavsPoll);
// //     Polls.find({})
// //             .populate('title')
// //             .populate('options')
// //             .exec(function(error, posts) {
// //                 console.log(JSON.stringify(posts, null, "\t"))
// //             })
// // 	})
// // Polls.find({},(err, docs) =>{
// // 				    if(err) return console.log(err);
// // 				    //console.log(docs);
// // 				   // res.render(docs);
// // 				    docs.map(function(poll){
// // 				        console.log(poll);
// // 				        //addPoll(poll);
// // 				        //res.json(poll);
// // 			    	})
// // 				})
//  })

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
