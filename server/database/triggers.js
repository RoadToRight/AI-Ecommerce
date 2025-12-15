import database from "./db.js";

export async function createProductCountTrigger() {
    const query = `
    CREATE OR REPLACE FUNCTION update_products_count()
    RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            UPDATE collections
            SET products_count = products_count + 1
            WHERE id = NEW.collection_id;
            RETURN NEW;
        END IF;

        IF TG_OP = 'DELETE' THEN
            UPDATE collections
            SET products_count = products_count - 1
            WHERE id = OLD.collection_id;
            RETURN OLD;
        END IF;

        IF TG_OP = 'UPDATE' THEN
            IF NEW.collection_id IS DISTINCT FROM OLD.collection_id THEN
                UPDATE collections
                SET products_count = products_count - 1
                WHERE id = OLD.collection_id;

                UPDATE collections
                SET products_count = products_count + 1
                WHERE id = NEW.collection_id;
            END IF;
            RETURN NEW;
        END IF;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS products_count_trigger ON products;

    CREATE TRIGGER products_count_trigger
    AFTER INSERT OR DELETE OR UPDATE OF collection_id
    ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_products_count();
    `;

    await database.query(query);
}
