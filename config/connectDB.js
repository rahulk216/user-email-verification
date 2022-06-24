import mongoose from 'mongoose';

const connection = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log('Mongo DB connected');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connection;
