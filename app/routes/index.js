'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollLoader.server.js');
var Polls = require('../models/polls');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mongoose.connect(process.env.MONGO_URI);

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	function addPoll(poll){
		//var list = document.getElementById('polls');
		$('#polls').appendChild('<li class="listElem">'+poll.title+'</li>');
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	var Polls = require('../models/polls.js');
	
	
	// app.get('/login', displayPolls.getList);

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
	// 		//add el to db
	// 		// var cavsPoll = new Polls({
	//   //  	title: 'Will Trump get Re-Elected?',
	//   //  	options:[
	//   //  		{name: "Yes", votes: 0},
	//   //      	{name:"No", votes: 0}
	//   //  	]
	// 		// })
	//add data to mongo 
	// 		// cavsPoll.save((err, data) =>{
	//   //  		if(err) return console.log(err);
	// 		// 	console.log(data);
	    
	// 		//     Polls.find({},(err, docs) =>{
	// 		// 	    if(err) return console.log(err);
	// 		// 	    console.log(docs);
	// 		// 	    docs.map(function(poll){
	// 		// 	        console.log(poll);
	// 		//     	})
	// 		// 	})
	// 		// })
	// 		// res.send(Polls.find((err,data)=>{
	// 		// 	if(err) return console.log(err);
	// 		// 	console.log(data);
	// 		// }))
	// 		// var obj;
	// 		Polls.find({},(err, docs) =>{
	// 			    if(err) return console.log(err);
	// 			    //console.log(docs);
	// 			   // res.render(docs);
				   
				  
	// 			    docs.map(function(poll){
	// 			        console.log(poll);
	// // 		// 	        //addPoll(poll);
	// // 		// 	        //res.json(poll);
	// 		    	})
	// 			})
	// 		//displayPolls.getList
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
		
		app.route('/polls')
		.get(pollHandler.getList);
		// .get( function (req, res) {
		// 	//get all data from mongo
		// 	Polls.find({},(err, docs) =>{
		// 	if(err) return console.log(err);
		// 		    console.log(docs);
		// 		   // res.render(docs);
	 //       res.json(docs);
		// 		})
		// });

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
