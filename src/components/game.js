import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import posed from 'react-pose';



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
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			number: [],
			numberShow: false,
			inputShow: false,
			userInput: '',
			ris: '',
			turno: true,
			lenght: 3,
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


		this.setState({
			userInput: this.state.userInput,
			inputShow: true,
			ris: result,
			turno: !this.state.turno
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
				<div className="diff">
					<h6>Difficoltà</h6>
					<div onClick={() => this.setDiff(3)} className="btn btn-primary margin mybtn">3 cifre</div>
					<div onClick={() => this.setDiff(4)} className="btn btn-primary margin mybtn">4 cifre</div>
					<div onClick={() => this.setDiff(5)} className="btn btn-primary margin mybtn">5 cifre</div>

				</div>
				{this.state.turno ? <div>Tocca a Giocatore 1</div> : <div>Tocca a Giocatore 2</div>}


				<Box className={NavClasses} pose={this.state.numberShow ? 'visible' : 'hidden'}>
					Secret Number: {this.state.number}
				</Box>



				<form onSubmit={this.onSubmit} className="game">
					<div className="form-group game">
						<label>Person Name:  </label>
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
							value="Controlla"
							className="btn btn-primary mybtn" />
					</div>
				</form>
				{this.state.inputShow ? <div>
					YOU HAVE CHOSEN -> {this.state.userInput}
					<div>numero giusto posto sbagliato: {this.state.ris[0]}</div>
					<div>numero giusto posto giusto: {this.state.ris[1]}</div>
					<div className="secretNumber">{this.state.ris[2]}</div>

				</div> : null}
				<div onClick={() => this.resa()} className="btn btn-primary mybtn">Arrenditi</div>
				<div class="top">
					<h3>Top 10 players</h3>

				</div>
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

	let winMsg = 'Hai vinto!'
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