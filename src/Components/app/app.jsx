import React, {Component} from 'react';
import {v4} from 'uuid'

import AppHeader from '../AppHeader'
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import AddTodo from '../AddTodo';

import './app.css'

export default class App extends Component{

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome React App'),
			this.createTodoItem('Have a lunch'),
		],
		term: '',
		filter: 'all', // all, active, done
	}

	createTodoItem(label){
		return {
			label,
			important: false,
			done: false,
			id: v4(),
		}
	}

	deleteItem = id => {
		this.setState(({todoData}) => {
			let newTodoList = todoData.filter(el => el.id !== id)

			return {
				todoData: newTodoList
			}
		})
	}

	addItem = label => {

		// Create new Item
		const newItem = this.createTodoItem(label)

		// Add new Item 
		this.setState(({ todoData }) => {
			let newTodoList = [...todoData, newItem]
			return {
				todoData: newTodoList
			}
		})
	}

	toggleProp = (arr, id, prop) => {

		const idx = arr.findIndex( el => el.id === id );
			
		// 1. Update object
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [prop]: !oldItem[prop] };

		// 2. Constract new array
		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)
		];

	}
	

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProp(todoData, id, 'done')
			}
		});
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProp(todoData, id, 'important')
			}
		})
	}

	search = (items, term) => {
		if (term === 0) {
			return items;
		}
		
		 return items.filter(item => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		})
	}

	filter = (items, filter) => {
		switch (filter) {
			case 'all':
				return items;
				break;
			case 'done':
				return items.filter(item => item.done);
				break;
			case 'active':
				return items.filter(item => !item.done);
				break;
			default:
				return items;
		}

	}

	onSearchChange = term => {
		this.setState({ term });
	}

	onFilterChange = filter => {
		this.setState({ filter });
	}
	
	render(){

		const { todoData, filter, term } = this.state

		const visibleItems = this.filter(this.search(todoData, term), filter)
		

		const doneCount = todoData.filter(el => el.done).length
		const todoCount = todoData.length - doneCount
		
		
		return (
			<div className="todo-app">
				<AppHeader toDo={ todoCount } done={ doneCount } />

				<div className="top-panel d-flex">
					<AddTodo addItem={ this.addItem }/>
				</div>
				 
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={ this.onSearchChange }/>
					<ItemStatusFilter 
						filter={ filter }
						onFilterChange={ this.onFilterChange }
					/>
				</div>


				
				<TodoList 
					todos={ visibleItems } 
					onDeleted={ this.deleteItem }
					onToggleDone={ this.onToggleDone }
					onToggleImportant={ this.onToggleImportant }
				/>
			</div>
		);
	};
}
