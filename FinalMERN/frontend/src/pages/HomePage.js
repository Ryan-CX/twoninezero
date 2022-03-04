import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
	const history = useHistory();
	const [exercise, setExercise] = useState([]);

	const loadExercises = async () => {
		const response = await fetch('/exercises');
		const data = await response.json();
		setExercise(data);
	};

	const deleteExercise = async (id) => {
		const response = await fetch(`/exercises/${id}`, {
			method: 'DELETE',
		});
		if (response.status === 204) {
			setExercise(exercise.filter((exercise) => exercise.id !== id));
			// after deleting the exercise, the page will reload
			loadExercises();
		} else {
			alert(`Failed to delete exercise, status code: ${response.status}`);
			console.log(response);
		}
	};

	const editExercise = (exercise) => {
		setExerciseToEdit(exercise);
		history.push('/edit');
	};

	useEffect(() => {
		loadExercises();
	}, []);

	return (
		<div className='home'>
			<h2 className='header'>List of exercise</h2>
			<ExerciseList
				exercises={exercise}
				onDelete={deleteExercise}
				onEdit={editExercise}
			></ExerciseList>
			<Link to='/add' className='addExercise'>
				Add new exercise
			</Link>
		</div>
	);
}

export default HomePage;
