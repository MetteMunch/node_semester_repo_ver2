import db from './connection.js';

//commandline argumenter - native node - argumenter som man selv definere og skrive i kommandolinjen

//console.log(process.argv.find((argument) => argument.includes('delete')));

//db.run er med paramtre INSERT, UPDATE, DELETE
//db.all  er for SELECT

//Database metoder
//db.exec run DDL and DCL againt the database -> DDL er oprettelse af tabeller mm og DCL er oprettelse og auth af brugere
//

//sqlite server godt ift backup (fil kopi), men ligger kun lokalt


const deleteMode = process.argv.includes('delete'); //når vi kører i dette mode, så droppes tabeller
//kan ændres til: process.argv.find((argument) => argument.includes('delete')) eller proces.argv.includes('delete');

if (deleteMode) {
    db.exec(`DROP TABLE IF EXISTS exercises;`);
    db.exec(`DROP TABLE IF EXISTS users;`);
}

/*
Conventions for SQL
use lowercase
use snake case
use plural for tables
*/


//
//DDL
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         username VARCHAR(50) UNIQUE,
        role TEXT CHECK( role IN ("ADMIN", "STAFF", "USER") )
        );

    CREATE TABLE IF NOT EXISTS exercises (
                                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             name TEXT NOT NULL,
                                             created_at TEXT NOT NULL DEFAULT current_timestamp,
                                             difficulty INTEGER,
                                             user_id INTEGER,
                                             FOREIGN KEY (user_id) REFERENCES users (id)
        );
`);


//seeding af database ved opstart
//DML
if(deleteMode) {
    db.run(`INSERT INTO users (username, role)
            VALUES ('Anders', 'ADMIN');`);
    db.run(`INSERT INTO exercises (name, difficulty, user_id)
            VALUES ('squats', 7, 1);`);
    db.run(`INSERT INTO exercises (name, difficulty, user_id)
            VALUES ('burpees', 7, 1);`);
}


