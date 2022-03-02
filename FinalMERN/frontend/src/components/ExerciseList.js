import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercise }) {
	return (
		<table id='Exercises'>
			<thead>
				<tr>
					<th>Title</th>
					<th>Year</th>
					<th>Language</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{exercise.map((e, i) => (
					<Exercise Exercise={e} key={i} />
				))}
			</tbody>
		</table>
	);
}

export default ExerciseList;
