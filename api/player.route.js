const express = require('express');
const playerRoutes = express.Router();

// model
let Player = require('./player.model');


//=============CRUD OPERATIONS=============


// store
playerRoutes.route('/add').post(function (req, res) {
	let player = new Player(req.body);
	player.save()
		.then(player => {
			res.status(200).json({ 'player': 'player added successfully' });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

// get
playerRoutes.route('/').get(function (req, res) {
	Player.find(function (err, players) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(players);
		}
	}).sort({ time: 1 }).limit(10);
});





module.exports = playerRoutes;