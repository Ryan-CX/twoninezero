import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete }) {
	return (
		<table id='Exercises'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Reps</th>
					<th>Weight</th>
					<th>Unit</th>
					<th>Date</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{exercises.map((e, i) => (
					<Exercise exercise={e} key={i} onDelete={onDelete} />
				))}
			</tbody>
		</table>
	);
}

export default ExerciseList;
