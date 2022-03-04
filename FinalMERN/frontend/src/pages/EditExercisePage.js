import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const EditExercisePage = () => {
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
		<div className='inputField'>
			<h1 className='addPage'>Add Exercise</h1>

			<input
				className='inputSlot'
				type='text'
				placeholder='Enter name here'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='number'
				placeholder='Enter reps here'
				value={rep}
				onChange={(e) => setRep(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='number'
				placeholder='Enter weight here'
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='text'
				placeholder='Enter "lbs" or "kg"'
				value={unit}
				onChange={(e) => setUnit(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='date'
				placeholder='Enter date here'
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button className='inputSlot' onClick={postExercise}>
				Submit
			</button>
			<button className='inputSlot' onClick={() => history.push('/')}>
				cancel
			</button>
		</div>
	);
};

export default EditExercisePage;
