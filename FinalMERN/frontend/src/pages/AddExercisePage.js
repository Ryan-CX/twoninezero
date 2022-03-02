import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AddExercisePage = () => {
	const [name, setName] = useState('');
	const [rep, setRep] = useState('');
	const [weight, setWeight] = useState(0);
	const [unit, setUnit] = useState('');
	const [date, setDate] = useState('');
	const addExercise = async () => {
		const exercise = await createExercise(name, rep, weight, unit, date);
		setExercise(exercise);
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
				type='text'
				placeholder='Enter date here'
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button onClick={addExercise}>Add Exercise</button>
		</div>
	);
};

export default AddMoviePage;
