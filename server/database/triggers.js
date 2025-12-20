import database from "../database/db.js";

export async function Junction_product_collection__count() {
    try {
        const query = `
   CREATE OR REPLACE FUNCTION Junction_product_collection__count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE collections
        SET products_count = products_count + 1
        WHERE id = NEW.collection_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE collections
        SET products_count = products_count - 1
        WHERE id = OLD.collection_id;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Decrement old collection
        UPDATE collections
        SET products_count = products_count - 1
        WHERE id = OLD.collection_id;

        -- Increment new collection
        UPDATE collections
        SET products_count = products_count + 1
        WHERE id = NEW.collection_id;

        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_count_trigger ON product_collections;

CREATE TRIGGER products_count_trigger
AFTER INSERT OR DELETE OR UPDATE
ON product_collections
FOR EACH ROW
EXECUTE FUNCTION Junction_product_collection__count();

        `;
        await database.query(query);
        console.log("Product count trigger created successfully");
    } catch (error) {
        console.error("Error creating product count trigger:", error);
        process.exit(1);
    }
}
