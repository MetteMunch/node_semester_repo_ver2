import db from './connection.js'

const games = await db.games.find().toArray();

console.log(games);