import express from 'express';
//import Movie model and createMovie function
import * as exerciseModel from './exercise_model.mjs';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new movie with the title, year and language provided in the body
 */
app.post('/exercises', (req, res) => {
	const { name, reps, weight, unit, date } = req.body;
	exerciseModel
		.createExercise(name, reps, weight, unit, date)
		.then((exercise) => res.status(201).json(exercise))
		.catch((err) => res.status(500).json(err));
});

/**
 * Retrieve exercises.
 
 */
app.get('/exercises', (req, res) => {
	exerciseModel
		.findExercise()
		.then((exercises) => res.status(200).json(exercises));
});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
	const { _id } = req.params;
	const { name, reps, weight, unit, date } = req.body;
	exerciseModel
		.replaceExercise(_id, name, reps, weight, unit, date)
		.then((exercise) => res.status(200).json(exercise))
		.catch((err) => res.status(500).json(err));
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
	const { _id } = req.params;
	exerciseModel
		.deleteExercise(_id)
		.then((exercise) => res.status(204).json(exercise))
		.catch((err) => res.status(500).json(err));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
