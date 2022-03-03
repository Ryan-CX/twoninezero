import React from 'react';

function Exercise({ exercise }) {
	//convert the ISO time to MM/DD/YYYY format
	const date = new Date(exercise.date).toLocaleDateString();

	return (
		<tr>
			<td>{exercise.name}</td>
			<td>{exercise.reps}</td>
			<td>{exercise.weight}</td>
			<td>{exercise.unit}</td>
			<td>{date}</td>

			<td>Edit</td>
			<td>Delete</td>
		</tr>
	);
}

export default Exercise;
