import database from "../database/db.js";

export async function createProductsTable(){
    try {
    const query = `CREATE TABLLE IF NOT EXIST products(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        description TEXT NOT NULL,
        price decimal(7,2) NOT NULL CHECK (price >= 0),
        category VARCHAR(50) NOT NULL,
        ratings DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (ratings BETWEEN 0 AND 5),
        images JSONB DEFAULT '[]' ::JSONB
        stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
        created_by UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFRERENCES users(id) ON DELETE CASCADE;
    )`
    await database.query(query)
    } catch (error) {
        console.error("Error in creating products table:", error);
        process.exit(1);
    }
}