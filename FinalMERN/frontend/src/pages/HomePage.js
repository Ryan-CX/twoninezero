import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
	const [exercise, setExercise] = useState([]);

	const loadExercises = async (exercise) => {
		const response = await fetch('/exercises');
		const data = await response.json();
		setExercise(data);
	};
	useEffect(() => {
		loadExercises();
	}, []);

	return (
		<>
			<h2>List of exercise</h2>
			<ExerciseList exercise={exercise}></ExerciseList>
			<Link to='/add-movie'>Add a movie</Link>
		</>
	);
}

export default HomePage;
