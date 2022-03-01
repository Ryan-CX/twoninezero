// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect('mongodb://localhost:27017/movies_db', {
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
const movieSchema = mongoose.Schema({
	title: { type: String, required: true },
	year: { type: Number, required: true },
	language: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

const createMovie = async (title, year, language) => {
	const movie = new Movie({
		title,
		year,
		language,
	});
	return await movie.save();
};

const findMovieById = async (id) => {
	const query = Movie.findById(id);
	return await query.exec();
};

const findMovies = async (filter, projection, limit) => {
	const query = Movie.find(filter).select(projection).limit(limit);
	return await query.exec();
};

const replaceMovie = async (id, title, year, language) => {
	const result = await Movie.replaceOne(
		{ _id: id },
		{ title: title, year: year, language: language }
	);
	console.log(result.nModified);
	return result;
};

const deleteMovie = async (id) => {
	const result = await Movie.deleteOne({ _id: id });
	console.log('Deleted ' + result.deletedCount + ' documents');
	return result;
};

export { createMovie, findMovieById, findMovies, replaceMovie, deleteMovie };
