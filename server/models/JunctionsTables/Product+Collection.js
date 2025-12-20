import database from "../database/db.js";

export async function createProductCollectionsTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS product_collections(
            product_id UUID NOT NULL,
            collection_id UUID NOT NULL,
            PRIMARY KEY(product_id, collection_id),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
        );`;
        await database.query(query);
    } catch (error) {
        console.error("Error creating product_collections table:", error);
        process.exit(1);
    }
}
