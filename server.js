import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connection from './config/connectDB.js';

//model
import Token from './Models/TokenModel.js';
import User from './Models/UserModel.js';
//routes
import userRoute from './routes/userRoute.js';

dotenv.config();

connection();

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/user', userRoute);
app.get('/:id/verify/:key', async (req, res) => {
	const { id, key } = req.params;

	const tokenUser = await Token.findOne({ token: key });
	console.log(tokenUser);
	if (tokenUser) {
		const verifyUser = await User.findOneAndUpdate(
			{ _id: id },
			{ isVerified: true },
			{ new: true }
		);
		console.log(verifyUser);
		//tokenUser.remove();
		await Token.deleteOne({ _id: tokenUser._id });
		res.json({
			id,
			key,
			user: 'USER IS VERIFIED',
		});
	} else {
		res.send('Invalid User / Link Expired');
	}
});

app.listen(process.env.PORT, () => {
	console.log(
		`Server running on ${process.env.ENVIRONMENT} on PORT ${process.env.PORT}`
	);
});
