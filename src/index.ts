import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Hola Mundo</h1>");
});

app.post("/portfolio/email", async (req: Request, res: Response) => {
	const { name, email, text } = req.body;
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});

		const info = await transporter.sendMail({
			from: `"Jose Ureta 👻" ${email}`,
			to: "jose1997ureta@gmail.com",
			subject: `Hola, soy ${name}`,
			text,
		});

		console.log(info.messageId);
		res.status(200).json({ message: "Se envio el correo" });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Ha ocurrido con el servidor",
		});
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
