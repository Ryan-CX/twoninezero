import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
	//instead of manually type the value for editing, use the existing value.

	const [name, setName] = useState(exerciseToEdit && exerciseToEdit.name);
	const [reps, setRep] = useState(exerciseToEdit && exerciseToEdit.reps);
	const [weight, setWeight] = useState(exerciseToEdit && exerciseToEdit.weight);
	const [unit, setUnit] = useState(exerciseToEdit && exerciseToEdit.unit);
	const [date, setDate] = useState(exerciseToEdit && exerciseToEdit.date);
	//call the backend post method on/exercises to create a new exercise and the use the useHistory hook to redirect to the home page
	const history = useHistory();
	const editExercise = async () => {
		const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				reps: reps,
				weight: weight,
				unit: unit,
				date: date,
			}),
		});
		if (response.status === 200) {
			alert('Exercise edited successfully');
			history.push('/');
		} else {
			alert(`Failed to edit exercise, status code: ${response.status}`);
			console.log(response);
		}
	};

	return (
		<div className='inputField'>
			<h1 className='addPage'>Edit Exercise</h1>

			<input
				className='inputSlot'
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='number'
				value={reps}
				onChange={(e) => setRep(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='number'
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='text'
				value={unit}
				onChange={(e) => setUnit(e.target.value)}
			/>
			<input
				className='inputSlot'
				type='date'
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button className='inputSlot' onClick={editExercise}>
				Save
			</button>
			<button className='inputSlot' onClick={() => history.push('/')}>
				cancel
			</button>
		</div>
	);
};

export default EditExercisePage;
