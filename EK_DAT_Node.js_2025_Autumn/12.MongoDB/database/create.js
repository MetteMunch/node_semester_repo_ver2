import db from './connection.js'

const newGame = db.games.insert({title: NewMovie, year: 2025})

console.log(newGame);