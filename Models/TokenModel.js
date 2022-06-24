import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tokenModel = mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 1200,
	},
});

const Token = mongoose.model('Token', tokenModel);

export default Token;
