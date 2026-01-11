import database from "../database/db.js";

/**
 * Create a product and attach collections
 */
export async function createProductWithCollections({
    name,
    description,
    price,
    stock,
    images,
    created_by,
    collections = [],

}) {
    const client = await database.connect();
    console.log(collections);

    try {
        await client.query("BEGIN");

        // 1️⃣ Insert product
        const result = await client.query(
            `INSERT INTO products
       (name, description, price, stock, images, created_by)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id`,
            [name, description, price, stock, images, created_by]
        );
        const productId = result.rows[0].id;

        if (collections.length > 0) {

            await client.query("INSERT INTO product_collections (product_id,collection_id) SELECT $1 , id FROM collections WHERE id = ANY($2) ON CONFLICT DO NOTHING", [productId, collections])
        }

        await client.query("COMMIT");
        return productId;

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release(); 
    }
}

/**
 * Update product's collections
 */
export async function updateProductCollections(productId, collections = []) {
    const client = await database.connect();

    try {
        await client.query("BEGIN");

        // 1️⃣ Delete old relations
        await client.query(
            `DELETE FROM product_collections WHERE product_id = $1`,
            [productId]
        );

        // 2️⃣ Insert new relations
        if (collections.length > 0) {
            await client.query(
                `INSERT INTO product_collections (product_id, collection_id)
         SELECT $1, id
         FROM collections
         WHERE name = ANY($2)
         ON CONFLICT DO NOTHING`,
                [productId, collections]
            );
        }

        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}
