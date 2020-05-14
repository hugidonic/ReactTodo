import React, { Component } from 'react';
import './AddTodo.css';

export default class AddTodo extends Component {

	state = {
		label: ''
	}

	onInputChange = e => {
		this.setState({
			label: e.target.value
		});
	}

	onSubmitHandler = e => {
		e.preventDefault()

		this.props.addItem(this.state.label)
		this.setState({
			label: ''
		})
	}

	
	render(){
		let { label } = this.state		
		return (
			<form onSubmit={this.onSubmitHandler} className="d-flex">
				<input 
					type="text"
					className="form-control search-input"
					placeholder="Start typing..."
					onChange={this.onInputChange}
					value={label}
				/>
				<button
					
					className="btn btn-info"
					onClick={this.onSubmitHandler}	>Add Todo</button>
			</form>
		)
	}
}
