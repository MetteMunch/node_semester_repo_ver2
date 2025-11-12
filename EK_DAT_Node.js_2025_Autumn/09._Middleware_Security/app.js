import 'dotenv/config'; //gør det muligt at loade miljøvariable fra .env fil

import express from 'express';
const app = express();


import session from 'express-session';

app.use(session({
    secret: process.env.SESSION_SECRET, //henter secret fra .env og bruges til at signere cookie-ID'et
    resave: false, //sessionen skal ikke gemmes igen, hvis den ikke ændres
    saveUninitialized: true,
    cookie: { secure: false } //false er ok lokalt men i produktion skal overvejes true (tjek ud)
}));

import helmet from 'helmet';
app.use(helmet());


import { rateLimit } from 'express-rate-limit'

const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(generalLimiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});
//Strammere limit på ruter under /auth (hver IP har 3 kald indenfor 15 min)
app.use("/auth", authLimiter);


import sessionRouter from './routers/sessionRouter.js';
app.use(sessionRouter);

import authRouter from './routers/authRouter.js';
app.use(authRouter);

import middlewareRouter from './routers/middlewareRouter.js';
app.use(middlewareRouter);


//Nedenstående er til at fange, hvis der er en route der kaldes, men ikke findes
// New syntax in Express 5.x. Previously just "/*"
app.get("/{*splat}", (req, res) => {
    res.send(`<h1>404</h1><h3>Didn't find a matching route</h3>`);
});

app.all("/{*splat}", (req, res) => {
    res.status(404).send({ data: "Didn't match with a route" });
});



const PORT = process.env.PORT || 8080;
//const PORT = 8080 || process.env.PORT;

const server = app.listen(PORT, () => {
    console.log("Server is running on port", server.address().port);
});

// console.log("Server has started");