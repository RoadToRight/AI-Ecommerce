import database from "../database/db.js";

export async function createCollectionTable() {
  try {
    // 1️⃣ Create table
    const query = `
      CREATE TABLE IF NOT EXISTS collections (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(40) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;
    await database.query(query);
    console.log("Collections table created.");

    // 2️⃣ Ensure default "All" collection exists
    await database.query(`
      INSERT INTO collections (name)
      VALUES ('All')
      ON CONFLICT (name) DO NOTHING;
    `);
    console.log('Default "All" collection ensured.');

  } catch (error) {
    console.error("Error creating collections table:", error);
    process.exit(1);
  }
}
