import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import posed from 'react-pose';
import axios from 'axios';
import Top from './top';



//transizioni
const Box = posed.div({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 4000 }
	}
});





class Game extends Component {
	constructor(props) {
		super(props);
		this.onChangeUserInput = this.onChangeUserInput.bind(this);
		this.onChangePlayerName = this.onChangePlayerName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmit_name = this.onSubmit_name.bind(this);


		this.state = {
			number: [],
			numberShow: false,
			inputShow: false,
			userInput: '',
			ris: '',
			turno: true,
			lenght: 3,
			playerName: '',
			yourNameShow: false,
			inizio: '',
		}
	}
	componentDidMount() {
		this.setState({
			number: randomNum(3)
		});
	}
	onChangeUserInput(e) {
		this.setState({
			userInput: e.target.value
		});
	}
	onChangePlayerName(e) {
		this.setState({
			playerName: e.target.value
		});
		console.log('ok');
	}
	resa() {
		this.setState({
			numberShow: true
		})
	}
	setDiff(n) {
		this.setState({
			number: randomNum(n),
			lenght: n,
		})
	}

	onSubmit(e) {
		console.log(this.state.number);

		e.preventDefault();
		let result = compare(this.state.number, strToArr(this.state.userInput))
		console.log('risultato: ' + result);
		console.log(result);


		//calcolo tempo
		let fine = Date.now()
		let crono = (fine - this.state.inizio) / 1000

		console.log(crono);

		//aggiorno stato
		this.setState({
			userInput: this.state.userInput,
			inputShow: true,
			ris: result,
			turno: !this.state.turno,
		})


		//====posto il vincitore

		if (result[2] !== '') {

			const obj = {
				name: this.state.playerName,
				time: crono,
				pts: crono
			};
			axios.post('http://localhost:4040/player/add', obj)
				.then(res => console.log(res.data));
		}
		//====


	}
	onSubmit_name(e) {
		const data = new Date()
		const start = `min ${data.getMinutes()} sec ${data.getSeconds()}`
		console.log(start);

		const inizio = Date.now()

		console.log(inizio);



		e.preventDefault();
		this.setState({
			playerName: this.state.playerName,
			yourNameShow: true,
			inizio: inizio
		})
	}
	render() {
		let NavClasses = 'secretNumber hidden';
		if (!this.state.numberShow) {
			NavClasses += ' hidden';
		} else if (this.state.numberShow) {
			NavClasses += ' show';
		}


		return (

			<div className="game">
				<h1 className="title">Mastermind</h1>

				<form onSubmit={this.onSubmit_name} className="game">
					<div className="form-group game">
						<label>Insert your name</label>
						<input
							type="text"
							className="form-control"
							value={this.state.playerName}
							onChange={this.onChangePlayerName}
						/>
					</div>
					<div className="form-group">
						<input type="submit"
							value="Confirm and start playing"
							className="btn btn-primary mybtn" />
					</div>
				</form>
				<div className="nome"><Box pose={this.state.yourNameShow ? 'visible' : 'hidden'}>your name: </Box><h3>{this.state.playerName}</h3></div>
				<div className="diff">
					<h6>Difficulty</h6>
					<div onClick={() => this.setDiff(3)} className="btn btn-primary margin mybtn">3 figures</div>
					<div onClick={() => this.setDiff(4)} className="btn btn-primary margin mybtn">4 figures</div>
					<div onClick={() => this.setDiff(5)} className="btn btn-primary margin mybtn">5 figures</div>

				</div>
				{this.state.turno ? <div>Up to Player 1</div> : <div>Up to Player 2</div>}


				<Box className={NavClasses} pose={this.state.numberShow ? 'visible' : 'hidden'}>
					Secret Number: {this.state.number}
				</Box>



				<form onSubmit={this.onSubmit} className="game">
					<div className="form-group game">
						<input
							type="text"
							className="form-control"
							value={this.state.userInput}
							onChange={this.onChangeUserInput}
							maxLength={this.state.lenght}
						/>
					</div>
					<div className="form-group">
						<input type="submit"
							value="Check"
							className="btn btn-primary mybtn" />
					</div>
				</form>

				{this.state.inputShow ? <div>
					YOU HAVE CHOSEN -> {this.state.userInput}
					<div>right number wrong place: {this.state.ris[0]}</div>
					<div>right number right place: {this.state.ris[1]}</div>
					<div className="secretNumber">{this.state.ris[2]}</div>

				</div> : null}
				<div onClick={() => this.resa()} className="btn btn-primary mybtn">Give up and reveal the secret number</div>
				<Top data={this.state.scores} />
			</div>
		);
	}
}

export default Game;


//============HELPERS===============

function randomNum(n) {
	let numbers = []
	for (let i = 0; i < n; i++) {
		numbers.push(Math.floor(Math.random() * (0 + 9)))
	}
	return numbers;
}

function strToArr(str) {
	let arr = Array.from(str).map(Number);
	return arr
}
function compare(arr1, arr2) {
	console.log(arr2);

	let winMsg = 'You won!!'
	let count = 0
	let giusti = 0

	for (let i = 0; i < arr1.length; i++) {

		if (arr1[i] === arr2[i]) {
			count += 1
			console.log('numero corretto ' + arr2[i]);
			console.log(count);
		} else {
			for (let j = 0; j < arr1.length; j++) {
				if (arr2[i] === arr1[j]) {
					console.log('giusto ma sbagliata posiz: ' + arr2[i]);
					giusti += 1
				} else {
					console.log('numero sbagliato: ' + arr2[i]);
				}
			}
		}
		if (count === 3) {
			console.log('hai vinto');

			return ['', '', winMsg]
		}
		// console.log('numero giusto posto sbagliato: ' + giusti);
		// console.log('numero giusto posto giusto: ' + count);
	}
	return [giusti, count, '']

}