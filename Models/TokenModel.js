import mongoose from 'mongoose';

const tokenModel = mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
});

const Token = mongoose.model('Token', tokenModel);

export default Token;
