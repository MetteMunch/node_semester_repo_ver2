//middleware-eksempler, viser flow
//I express er en hver funktion med (req, res, next) => { ... } en middleware funktion
//Hvis en funktion kalder next(), betyder det: “jeg er middleware — lad requesten fortsætte”.
//Hvis den sender et svar (res.send() / res.json()), betyder det: “jeg er slutpunktet — jeg håndterer requesten”. = route handler

//middlewares = [ipLogger, greeter, handler1, handler2];
//for each middleware in stack:
//middleware(req, res, next);
//if next() was not called → stop loop

//Middleware kan bruges globalt via app.use() eller router.use()
//eller på en specifik route via app.get(), router.post() mv.

import { Router } from 'express';

const router = Router();

//2.
function ipLogger(req, res, next) { //2.
    console.log("Jeg er i ipLogger");
    console.log(req.ip);
    next(); //next() hopper videre til næste funktion/handler her i koden, som matcher samme route
}

router.use("/room", ipLogger); //1. første match til /route


router.get("/room/:furniture", (req, res) => {
    res.send({ data: "You are in room 1" });
});

//denne vil aldig kunne rammes, da "/room/sofa" først vil blive fanget af ovenstående endpoint
router.get("/room/sofa", (req, res) => {
    res.send({ data: "You are in room 2" });
});

// 4. når denne rammer next() går express videre til næste funktion, hvor den blev kaldt
function greeter(req, res, next) {
    console.log("Her er jeg i greeter")
    // res.send("<h1>Unauthorized</h1>");
    next();
}

//3. her køres først greeter (middleware)  5. næste funktion/handler er (req,res,next) => {}
router.get("/room", greeter, (req, res, next) => {
    // res.send({ data: "You are in room 1" });
    console.log("You are in room 1, Mette!");
    next(); //Når next rammes her leder express efter næste matchen route ("/room"), hvis denne findes og ellers afsluttes requesten
});
                // inline middleware
//6. der er også denne, som har to funktioner første consol logger og den sidste udskriver til browser
router.get("/room", (req, res, next) => {
    console.log("Checking your papers... Go on in.");
    next();
}, (req, res) => {
    res.send({ data: "You are in room 2" });
});

export default router; 