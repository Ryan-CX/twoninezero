//create a mongoose User model includes age, email and phoneNumber
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: false,
	},
});

export const User = mongoose.model('User', UserSchema);
