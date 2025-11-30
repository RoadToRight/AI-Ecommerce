import {pkg} from "pg";

const {Client} = pkg;

const database = new Client({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})

try {
    await database.connect();
    console.log("Connected to the database");
} catch (error) {
    console.log(error);
    process.exit(1);
}


export default database;