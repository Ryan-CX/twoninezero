import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
	const [exercise, setExercise] = useState([]);

	return (
		<>
			<h2>List of exercise</h2>
			<ExerciseList exercise={exercise}></ExerciseList>
			<Link to='/add-movie'>Add a movie</Link>
		</>
	);
}

export default HomePage;
