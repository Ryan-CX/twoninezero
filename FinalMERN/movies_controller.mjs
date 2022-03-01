import express from 'express';
//import Movie model and createMovie function
import * as movieModel from './movies_model.mjs';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new movie with the title, year and language provided in the body
 */
app.post('/movies', (req, res) => {
	movieModel
		.createMovie(req.body.title, req.body.year, req.body.language)
		.then((movie) => {
			res.status(201).json(movie);
		})
		.catch((error) => {
			console.error(error);
			// In case of an error, send back status code 400 in case of an error.
			// A better approach will be to examine the error and send an
			// error status code corresponding to the error.
			res.status(400).json({ Error: 'Request failed' });
		});
});

/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */
app.get('/movies/:_id', (req, res) => {
	movieModel
		.findMovieById(req.params._id)
		.then((movie) => {
			res.json(movie);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ Error: 'Request failed' });
		});
});

/**
 * Retrieve movies.
 * If the query parameters include a year, then only the movies for that year are returned.
 * Otherwise, all movies are returned.
 */
app.get('/movies', (req, res) => {
	let filter = {};
	if (req.query.year) {
		filter = { year: req.query.year };
	}
	movieModel
		.findMovies(filter, '', 0)
		.then((movies) => {
			res.send(movies);
		})
		.catch((error) => {
			console.error(error);
			res.send({ Error: 'Request failed' });
		});
});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/movies/:_id', (req, res) => {
	movieModel
		.replaceMovie(
			req.params._id,
			req.body.title,
			req.body.year,
			req.body.language
		)
		.then((movie) => {
			res.json(movie);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ Error: 'Request failed' });
		});
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/movies/:_id', (req, res) => {
	movieModel
		.deleteMovie(req.params._id)
		.then((movie) => {
			res.json(movie);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).json({ Error: 'Request failed' });
		});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
