import database from "../database/db.js";

export async function createCollectionTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS collections(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(40) NOT NULL DEFAULT 'All' UNIQUE,
            products_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        await database.query(query);
    } catch (error) {
        console.error("Error creating collections table:", error);
        process.exit(1);
    }
}
