import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connection from './config/connectDB.js';

//routes
import userRoute from './routes/userRoute.js';

dotenv.config();

connection();

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/user', userRoute);

app.listen(process.env.PORT, () => {
	console.log(
		`Server running on ${process.env.ENVIRONMENT} on PORT ${process.env.PORT}`
	);
});
