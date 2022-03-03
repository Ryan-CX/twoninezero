import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AddExercisePage = () => {
	const [name, setName] = useState('');
	const [rep, setRep] = useState('');
	const [weight, setWeight] = useState(0);
	const [unit, setUnit] = useState('');
	const [date, setDate] = useState('');
	//call the backend post method on/exercises to create a new exercise and the use the useHistory hook to redirect to the home page
	const history = useHistory();
	const postExercise = async (e) => {
		const response = await fetch('/exercises', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				reps: rep,

				weight: weight,
				unit: unit,
				date: date,
			}),
		});
		if (response.status === 201) {
			alert('Exercise added successfully');
			history.push('/');
		} else {
			alert(`Failed to add exercise, status code: ${response.status}`);
			console.log(response);
		}
	};

	return (
		<div>
			<h1>Add Exercise</h1>
			<input
				type='text'
				placeholder='Enter name here'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Enter reps here'
				value={rep}
				onChange={(e) => setRep(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Enter weight here'
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Enter unit here'
				value={unit}
				onChange={(e) => setUnit(e.target.value)}
			/>
			<input
				type='date'
				placeholder='Enter date here'
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button onClick={postExercise}>Submit</button>
		</div>
	);
};

export default AddExercisePage;
