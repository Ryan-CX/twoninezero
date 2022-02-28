import { User } from './users_model.mjs';
import mongoose from 'mongoose';

import express from 'express';
const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//connect mongodb local host 27017
mongoose
	.connect('mongodb://localhost:27017/user', {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((e) => console.log(e));

//create 4 routes: create, retrieve, update, delete, all using GET method

//create route, the age, email and name will always present in the query, phoneNUmber is optional. The phoneNumber will only have the numeric characters 0 through 9, and will not contain any spaces, hyphens or non-numeric characters. Furthermore, it will not start with a 0.
//The response body will be JSON object for the document created in MongoDB.
app.get('/create', async (req, res) => {
	try {
		const newUser = new User({
			age: req.query.age,
			email: req.query.email,
			name: req.query.name,
			phoneNumber: req.query.phoneNumber,
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

//retrieve route.  A retrieve request can contain zero or more query parameters. The response body will be An array of JSON objects corresponding to the documents matching the query parameters. The array will be empty if no document matches the query parameters.
//using AND operation to filter the data based on the query parameters. if no query parameters are provided, all documents will be returned.
app.get('/retrieve', statistics, async (req, res) => {
	try {
		const query = {};
		if (req.query._id) {
			query._id = req.query._id;
		}
		if (req.query.age) {
			query.age = req.query.age;
		}
		if (req.query.email) {
			query.email = req.query.email;
		}
		if (req.query.name) {
			query.name = req.query.name;
		}
		if (req.query.phoneNumber) {
			query.phoneNumber = req.query.phoneNumber;
		}

		const users = await User.find(query);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Every request for /update will always contain _id as a request parameter. The _id of a document is immutable and cannot be changed.In addition to _id, a request will contain at least one other query parameter. However, a request may contain more than one query parameter. For example, a request may contain the query parameters _id, name, phoneNumber. The required behavior is that if any property is not specified in the query parameters, then the value of that property must not be updated. For example, if a request contains the query parameters _id, age, phoneNumber, the app must update the document with this specified value of _id To set the age property of the document to the value in the query parameter and the phoneNumber to the value in the query parameter, regardless of whether or not the document previously had a value for this property.But must leave the properties name and email of the document unmodified.The response body will be {"modifiedCount": number of documents modified}, If no document exists with the specified value of _id, the response body will be { "Error" : "Not found"}. if any property is not specified in the query parameters, then the value of that property must not be updated.

app.get('/update', async (req, res) => {
	let conditions = {};
	let update = {};
	if (req.query._id) {
		conditions._id = req.query._id;
	}
	if (req.query.age) {
		update.age = req.query.age;
	}
	if (req.query.email) {
		update.email = req.query.email;
	}
	if (req.query.name) {
		update.name = req.query.name;
	}
	if (req.query.phoneNumber) {
		update.phoneNumber = req.query.phoneNumber;
	}
	try {
		const user = await User.findOneAndUpdate(conditions, update, {
			new: true,
		});
		if (user) {
			res.status(200).json({ modifiedCount: 1 });
		} else {
			res.status(404).json({ Error: 'Not found' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//delete route. If the request has the name query parameter, you should delete all the documents in which the value of the name property is exactly the same as the value in the query parameter. Similarly, if the request has the query parameter email, age or phoneNumber, then all documents matching the value of email, age or phoneNumber must be removed. The response body will be {"deletedCount": number of documents deleted}.

app.get('/delete', async (req, res) => {
	try {
		//if req.query._id in User model, then delete the document, otherwise return error

		if (req.query._id) {
			const user = await User.findById(req.query._id);
			if (user) {
				await User.findByIdAndDelete(req.query._id);
				res.status(200).json({ deletedCount: 1 });
			} else {
				res.status(404).json({ deletedCount: 0 });
			}
		} else if (req.query.name) {
			const users = await User.deleteMany({ name: req.query.name });
			res.status(200).json({ deletedCount: users.deletedCount });
		} else if (req.query.email) {
			const users = await User.deleteMany({ email: req.query.email });
			res.status(200).json({ deletedCount: users.deletedCount });
		} else if (req.query.age) {
			const users = await User.deleteMany({ age: req.query.age });
			res.status(200).json({ deletedCount: users.deletedCount });
		} else if (req.query.phoneNumber) {
			const users = await User.deleteMany({
				phoneNumber: req.query.phoneNumber,
			});
			res.status(200).json({ deletedCount: users.deletedCount });
		} else {
			res.status(404).json({ deletedCount: 0 });
		}
	} catch (error) {
		res.status(500).json({ deletedCount: 0 });
	}
});

//write a middleware for /retrieve route. This middleware function must maintain a count of retrieve requests received from the time the server was started. The following statics need to be logged to  the console: Total retrieve requests, Retrieve requests with 0 query parameters, Retrieve requests with 1 or more query parameters. The maintenance and printing of the statistics must be done solely by this middleware function, and not by any of the app.get route handlers. The typical logging format is: Total retrieve requests: 20. Retrieve requests with 0 query parameters: 12. Retrieve requests with 1 or more query parameters: 8
let totalRetrieveRequests = 0;
let zeroQuery = 0;
let oneOrMoreQuery = 0;
function statistics(req, res, next) {
	if (
		req.query.name ||
		req.query.email ||
		req.query.age ||
		req.query.phoneNumber ||
		req.query._id
	) {
		oneOrMoreQuery++;
		totalRetrieveRequests++;
	} else {
		zeroQuery++;
		totalRetrieveRequests++;
	}
	console.log(`Total retrieve requests: ${totalRetrieveRequests}`);
	console.log(`Retrieve requests with 0 query parameters: ${zeroQuery}`);
	console.log(
		`Retrieve requests with 1 or more query parameters: ${oneOrMoreQuery}`
	);
	next();
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
