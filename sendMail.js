import nodemailer from 'nodemailer';
import { google } from 'googleapis';

async function sendMail(emailId, url) {
	const CLIENT_ID = process.env.CLIENT_ID;
	const CLIENT_SECRET = process.env.CLIENT_SECRET;
	const REDIRECT_URI = process.env.REDIRECT_URI;
	const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

	const oAuth2Client = new google.auth.OAuth2(
		CLIENT_ID,
		CLIENT_SECRET,
		REDIRECT_URI
	);
	oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

	async function mail() {
		const accesstoken = await oAuth2Client.getAccessToken();
		let transporter = nodemailer.createTransport({
			pool: true,
			service: process.env.SERVICE,
			host: process.env.HOST,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
				type: process.env.TYPE,
				clientSecret: CLIENT_SECRET,
				clientId: CLIENT_ID,
				refreshToken: REFRESH_TOKEN,
				accessToken: accesstoken,
			},
		});
		const mailoptions = {
			from: '"FatFox" <thefatfoxtest@gmail.com>',
			to: emailId,
			subject: 'Verification Email',
			text: 'User Verification',
			priority: 'high',
			html: url,
		};
		let info = await transporter.sendMail(
			mailoptions,
			async function (error, info) {
				if (error) {
					console.log(error);
					conn.rollback(function () {
						conn.release();
					});
					res.json({ yo: 'error' });
					return error;
				} else {
					console.log('Message sent: ' + info.response);
					return info;
				}
			}
		);
	}
	mail().catch(console.error);
}
export default sendMail;
