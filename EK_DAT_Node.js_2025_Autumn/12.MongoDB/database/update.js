import db from '/connection.js'

const updatedGame = db.games.updateOne({title: "Tomb Raider"}, { $set: { views: 35}})