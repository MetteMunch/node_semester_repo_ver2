import { MongoClient } from 'mongodb';

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

await client.connect();

const dbName = "games_library";

const gamesLibrary = client.db(dbName);

export default {
    games: gamesLibrary.collection("games"),
    games_characters: gamesLibrary.collection("games_characters")
}