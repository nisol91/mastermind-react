const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for player
let Player = new Schema({
	name: {
		type: String
	},
	time: {
		type: Number
	},
	pts: {
		type: Number
	}
}, {
		collection: 'player'
	});

module.exports = mongoose.model('Player', Player);