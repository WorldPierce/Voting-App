'use strict';
var mongoose = require('mongoose');
var Polls = require('../models/polls.js');
// //var Poll = mongoose.model('Polls', Polls);
// var cavsPoll = new Polls({
//     title: 'Will the Cavs Win Next Year?',
//     options:[
//         {name: "Yes", votes: 0},
//         {name:"No", votes: 0}
//     ]
// })

// cavsPoll.save((err, cavsPoll) =>{
//     if(err) return console.log(err);
//     // console.log(cavsPoll);
//     Polls.find({})
//             .populate('title')
//             .populate('options')
//             .exec(function(error, posts) {
//                 console.log(JSON.stringify(posts, null, "\t"))
//             })
    
// })

// Poll.find({},{_id:0, _v:0},(err, docs) =>{
//     if(err) return console.log(err);
//     console.log(docs);
//     docs.map(function(poll){
//         console.log(poll);
//     })
// })

function PollHandler(){
    this.getList = (req,res)=>{
        Polls.find({},(err, docs) =>{
			if(err) return console.log(err);
			console.log(docs);
			res.send(docs);
		})
    }
    
}

module.exports = PollHandler;