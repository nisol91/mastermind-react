import React, { Component } from 'react';
import axios from 'axios';


export default class Top extends Component {

	constructor(props) {
		super(props);

		this.state = {
			scores: [],
		}
	}
	componentDidMount() {
		axios.get('http://localhost:4040/player')
			.then(response => {
				this.setState({ scores: response.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}


	render() {
		let count = 0

		//==================IL MODO CORRETTO PER ITERARE IN UN ARRAY DI OGGETTI========================
		const listItems = this.state.scores.map((item, i) =>
			<tr key={i}>
				<th scope="row">{count += 1}</th>
				<td>{item.name}</td>
				<td>{item.time}</td>
				<td>{item.pts}</td>
			</tr>
		);
		return (
			<div className="top">
				<h3>Top 10 players</h3>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Time</th>
							<th scope="col">Pts</th>
						</tr>
					</thead>
					<tbody>
						{listItems}
					</tbody>
				</table>
			</div>

		);
	}
}