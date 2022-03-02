// Get the mongoose object

import mongoose from 'mongoose';

// Prepare to the database Exercises_db in the MongoDB server running locally on port 27017
mongoose.connect('mongodb://localhost:27017/exercise_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once('open', () => {
	console.log('Successfully connected to MongoDB using Mongoose!');
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	reps: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	// unit type string and only allow "kgs" or "lbs"
	unit: {
		type: String,
		enum: ['kgs', 'lbs'],
		required: true,
	},
	//date format MM-DD-YYYY
	date: {
		type: Date,
		required: true,
	},
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

//POST method The request body will be a JSON object with all the 5 properties listed in the data model.
const createExercise = async (name, reps, weight, unit, date) => {
	const exercise = new Exercise({
		name: name,
		reps: reps,
		weight: weight,
		unit: unit,
		date: date,
	});
	return await exercise.save();
};

//get all the exercises, No request body and no path parameters. return all the documents in json format, code 200
const findExercise = async () => {
	const exercises = await Exercise.find();
	return exercises;
};

//PUT method The request body will be a JSON object with all the 5 properties listed in the data model, return with json object with the updated document, code 200
const replaceExercise = async (id, name, reps, weight, unit, date) => {
	const query = await Exercise.findByIdAndUpdate(id, {
		name: name,
		reps: reps,
		weight: weight,
		unit: unit,
		date: date,
	});
	return query;
};

//delete with the id,return code 204 and a message

const deleteExercise = async (id) => {
	const result = await Exercise.findByIdAndDelete(id);
	return result;
};

export { createExercise, findExercise, replaceExercise, deleteExercise };
