import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function Exercise({ exercise, onDelete }) {
	//convert the ISO time to MM/DD/YYYY format
	const date = new Date(exercise.date).toLocaleDateString();
	//

	return (
		<tr>
			<td>{exercise.name}</td>
			<td>{exercise.reps}</td>
			<td>{exercise.weight}</td>
			<td>{exercise.unit}</td>
			<td>{date}</td>
			<td>
				<MdDeleteForever onClick={() => onDelete(exercise._id)} />
			</td>
			<td>Edit</td>
		</tr>
	);
}

export default Exercise;
