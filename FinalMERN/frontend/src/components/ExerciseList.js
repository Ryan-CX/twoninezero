import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercise }) {
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
				{exercise.map((e, i) => (
					<Exercise exercise={e} key={i} />
				))}
			</tbody>
		</table>
	);
}

export default ExerciseList;
