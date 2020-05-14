import React from 'react'
import TodoListItem from '../TodoListItem';

import './TodoList.css';

const TodoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {

	const todoItems = todos.map( (item, index) => {

		const {id, ...itemProps} = item

		return(
			<li key={id} className="list-group-item">
				<TodoListItem 
					{ ... itemProps }
					onDeleted={() => onDeleted(id)}
					onToggleDone={ () => onToggleDone(id) }
					onToggleImportant={ () => onToggleImportant(id) }
				/>
			</li>
		);
	})
	
	return (
		<ul className="list-group todo-list">
			{ todoItems }
		</ul>
	)
}

export default TodoList