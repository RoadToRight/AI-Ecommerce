// import pkg from "pg";

// const { Client } = pkg;



// const database = new Client({
//     user: `postgres`,
//     password: "sameer",
//     host: "localhost",
//     port: 5432,
//     database: "mern_ecommerce_store"
// })


// try {
//     await database.connect();
//     console.log("Connected to the database");
// } catch (error) {
//     console.log(error);
//     process.exit(1);
// }


// export default database;

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "sameer",
  host: "localhost",
  port: 5432,
  database: "mern_ecommerce_store"
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;
