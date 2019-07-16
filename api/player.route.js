const express = require('express');
const playerRoutes = express.Router();

// Require  model in our routes module
let Player = require('./player.model');


//=============CRUD OPERATIONS=============


// Defined store route
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

// Defined get data(index or listing) route
playerRoutes.route('/').get(function (req, res) {
	Player.find(function (err, players) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(players);
		}
	});
});





module.exports = playerRoutes;