import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import Token from '../Models/TokenModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../generateToken.js';
import cryptoRandomString from 'crypto-random-string';
import sendMail from '../sendMail.js';

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//let token;
	try {
		const user = await User.findOne({ email: email, password: password });
		if (user.isVerified) {
			if (user && (await bcrypt.compare(user.password, password))) {
				res.json({
					name: user.name,
					email: user.email,
					token: generateToken(user._id),
				});
			} else {
				res.send('user not found');
			}
		}
		res.send('User is not Verified ! Please Check your email ')
	} catch (error) {
		res.status(400).json(error);
	}
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
		password,
	});

	//crypto key
	const urlKey = cryptoRandomString({ length: 20, type: 'base64' });
	const verifyUrl = `http://localhost:5000/${user._id}/verify/${urlKey}`;
	console.log(verifyUrl);

	await sendMail(email, verifyUrl);

	const tokenCreated = await Token.create({
		userId: user._id,
		token: urlKey,
	});
	console.log(tokenCreated);

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	}
});

export { login, register };
