import React from 'react';

function Exercise({ exercise }) {
	return (
		<tr>
			<td>{exercise.title}</td>
			<td>{exercise.year}</td>
			<td>{exercise.language}</td>
			<td>Edit</td>
			<td>Delete</td>
		</tr>
	);
}

export default Exercise;
