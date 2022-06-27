import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import Token from '../Models/TokenModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../generateToken.js';

import randomstring from 'randomstring';

import sendMail from '../sendMail.js';

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	const user = await User.findOne({ email: email });
	//console.log(user);

	if (user && (await user.matchPassword(password))) {
		if (user.isVerified) {
			res.json({
				success: true,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		}
		res.status(401).send('User not verified');
		throw new Error('User not verified');
	}
	res.status(401).send('User Not found');
	throw new Error('User not found');
});

const register = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;
	console.log(email, password, name);
	const userExists = await User.findOne({ email: email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	console.log(salt);
	let hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		//crypto key
		const urlKey = randomstring.generate({
			length: 12,
			charset: 'alphabetic',
		});
		const verifyUrl = `http://localhost:5000/${user._id}/verify/${urlKey}`;
		console.log(verifyUrl);

		await sendMail(email, verifyUrl);

		const tokenCreated = await Token.create({
			userId: user._id,
			token: urlKey,
		});
		console.log(tokenCreated);
		console.log('created token');

		res.status(200).json({
			message:
				'Email Send to the corresponding email ID . Kindly verify and proceed to login',
		});
	}
});

export { login, register };
