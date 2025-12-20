import database from "../database/db.js";

export async function createProductsTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS products(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
            category VARCHAR(50) NOT NULL DEFAULT 'All',
            ratings NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (ratings BETWEEN 0 AND 5),
            images JSONB DEFAULT '[]'::JSONB,
            stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
            created_by UUID NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
        );`;
        await database.query(query);
    } catch (error) {
        console.error("Error creating products table:", error);
        process.exit(1);
    }
}
