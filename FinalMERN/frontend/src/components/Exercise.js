import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
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
				<MdEdit
					onClick={() => {
						onEdit(exercise);
					}}
				/>
			</td>
			<td>
				<MdDeleteForever onClick={() => onDelete(exercise._id)} />
			</td>
		</tr>
	);
}

export default Exercise;
