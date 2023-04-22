import { dev } from '$app/environment';
import { log } from '$lib/logger';
import type { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';

const config = {
	user: 'sc44trmhm3rpgdtp@ethereal.email',
	pass: 'pXv3GvMWUqbQCAycwU',
	smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
	imap: { host: 'imap.ethereal.email', port: 993, secure: true },
	pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
	web: 'https://ethereal.email',
};

class MailService {
	transporter: Transporter;
	from: string;
	to: string[];
	constructor() {
		this.from = 'settan@cpfbytes.com';
		this.to = ['alankjohn314@gmail.com', 'adwaith@duck.com', 'halid480@gmail.com'];
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'dinersbyte@gmail.com',
				pass: 'rszeaurjsmfzyxvo',
			},

			// host: "smtp.ethereal.email",
			// port: 587,
			// secure: dev || MAIL_SECURE,
			// auth: {
			//     user: MAIL_USER,
			//     pass: MAIL_PASS,
			// },

			// host: "smtp.ethereal.email",
			// port: 587,
			// secure: false,
			// auth: {
			//     user: config.user,
			//     pass: config.pass,
			// },
		});
	}
	async sendMail({ to, sub, body }: { to: string[]; sub: string; body: string }): Promise<any> {
		try {
			const res = await this.transporter.sendMail({
				from: this.from,
				to: dev ? this.to : to,
				subject: sub,
				html: body,
			});
			return res;
		} catch (error) {
			log.error(error);
		}
	}
	async sendTestMail() {
		// log.info(await nodemailer.createTestAccount())
		const res = await this.transporter.sendMail({
			from: 'settan@cpdbytes.com',
			to: ['alankjohn314@gmail.com', 'adwaith@duck.com', 'muhammed.rmcab2023@saintgits.org'],
			subject: 'Email verification from CPDBytes.com',
			text: 'text',
			html: '<h1>ni chooper aada</h1>',
		});
		log.info('mail sent!', res);
		log.error(nodemailer.getTestMessageUrl(res));
	}
}

export const mailService = new MailService();

// host: "",
// port: 587,
// secure: dev || MAIL_SECURE,
// auth: {
//     user: MAIL_USER,
//     pass: MAIL_PASS,
// },
