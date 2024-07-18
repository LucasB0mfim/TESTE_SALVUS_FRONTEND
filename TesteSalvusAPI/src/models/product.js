const pool = require('../config');

const getProducts = async () => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.release_date,
            p.discount,
            p.old,
            p.current,
            p.category,
            p.\`system\`,
            p.developer,
            p.publisher,
            p.thumbnail,
            p.cover,
            GROUP_CONCAT(DISTINCT l.language) AS languages,
            GROUP_CONCAT(DISTINCT CONCAT(g.type, ',', g.url) SEPARATOR ';') AS gallery
        FROM
            products p
        LEFT JOIN
            languages l ON p.id = l.product_id
        LEFT JOIN
            gallery g ON p.id = g.product_id
        GROUP BY
            p.id;
    `);

    const products = rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            release_date: row.release_date || null,
            prices: {
                discount: row.discount,
                old: parseFloat(row.old),
                current: parseFloat(row.current)
            },
            details: {
                category: row.category,
                system: row.system,
                developer: row.developer,
                publisher: row.publisher,
                languages: row.languages ? row.languages.split(',') : []
            },
            media: {
                thumbnail: row.thumbnail,
                cover: row.cover,
                gallery: row.gallery ? row.gallery.split(';').map(item => {
                    const [type, url] = item.split(',');
                    return { type, url };
                }) : []
            }
        };
    });

    return products;
};

const getProductsByCategory = async (category) => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.release_date,
            p.discount,
            p.old,
            p.current,
            p.category,
            p.system,
            p.developer,
            p.publisher,
            p.thumbnail,
            p.cover,
            GROUP_CONCAT(DISTINCT l.language) AS languages,
            GROUP_CONCAT(DISTINCT CONCAT(g.type, ',', g.url) SEPARATOR ';') AS gallery
        FROM
            products p
        LEFT JOIN
            languages l ON p.id = l.product_id
        LEFT JOIN
            gallery g ON p.id = g.product_id
        WHERE
            p.category = ?
        GROUP BY
            p.id;
    `, [category]);

    const products = rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            release_date: row.release_date || null,
            prices: {
                discount: row.discount,
                old: parseFloat(row.old),
                current: parseFloat(row.current)
            },
            details: {
                category: row.category,
                system: row.system,
                developer: row.developer,
                publisher: row.publisher,
                languages: row.languages ? row.languages.split(',') : []
            },
            media: {
                thumbnail: row.thumbnail,
                cover: row.cover,
                gallery: row.gallery ? row.gallery.split(';').map(item => {
                    const [type, url] = item.split(',');
                    return { type, url };
                }) : []
            }
        };
    });

    return products;
};

const getProductById = async (id) => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.release_date,
            p.discount,
            p.old,
            p.current,
            p.category,
            p.\`system\`,
            p.developer,
            p.publisher,
            p.thumbnail,
            p.cover,
            GROUP_CONCAT(DISTINCT l.language) AS languages,
            GROUP_CONCAT(DISTINCT CONCAT(g.type, ',', g.url) SEPARATOR ';') AS gallery
        FROM
            products p
        LEFT JOIN
            languages l ON p.id = l.product_id
        LEFT JOIN
            gallery g ON p.id = g.product_id
        WHERE
            p.id = ?
        GROUP BY
            p.id;
    `, [id]);

    const row = rows[0];
    if (row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            release_date: row.release_date || null,
            prices: {
                discount: row.discount,
                old: parseFloat(row.old),
                current: parseFloat(row.current)
            },
            details: {
                category: row.category,
                system: row.system,
                developer: row.developer,
                publisher: row.publisher,
                languages: row.languages ? row.languages.split(',') : []
            },
            media: {
                thumbnail: row.thumbnail,
                cover: row.cover,
                gallery: row.gallery ? row.gallery.split(';').map(item => {
                    const [type, url] = item.split(',');
                    return { type, url };
                }) : []
            }
        };
    }

    return null;
};


const getDiscountedProducts = async () => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.release_date,
            p.discount,
            p.old,
            p.current,
            p.category,
            p.system,
            p.developer,
            p.publisher,
            p.thumbnail,
            p.cover,
            GROUP_CONCAT(DISTINCT l.language) AS languages,
            GROUP_CONCAT(DISTINCT CONCAT(g.type, ',', g.url) SEPARATOR ';') AS gallery
        FROM
            products p
        LEFT JOIN
            languages l ON p.id = l.product_id
        LEFT JOIN
            gallery g ON p.id = g.product_id
        WHERE
            p.discount IS NOT NULL
        GROUP BY
            p.id;
    `);

    const products = rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            release_date: row.release_date || null,
            prices: {
                discount: row.discount,
                old: parseFloat(row.old),
                current: parseFloat(row.current)
            },
            details: {
                category: row.category,
                system: row.system,
                developer: row.developer,
                publisher: row.publisher,
                languages: row.languages ? row.languages.split(',') : []
            },
            media: {
                thumbnail: row.thumbnail,
                cover: row.cover,
                gallery: row.gallery ? row.gallery.split(';').map(item => {
                    const [type, url] = item.split(',');
                    return { type, url };
                }) : []
            }
        };
    });

    return products;
};

const getUpcomingProducts = async () => {
    const [rows] = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.description,
            p.release_date,
            p.discount,
            p.old,
            p.current,
            p.category,
            p.system,
            p.developer,
            p.publisher,
            p.thumbnail,
            p.cover,
            GROUP_CONCAT(DISTINCT l.language) AS languages,
            GROUP_CONCAT(DISTINCT CONCAT(g.type, ',', g.url) SEPARATOR ';') AS gallery
        FROM
            products p
        LEFT JOIN
            languages l ON p.id = l.product_id
        LEFT JOIN
            gallery g ON p.id = g.product_id
        WHERE
            p.release_date IS NOT NULL
        GROUP BY
            p.id;
    `);

    const products = rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            release_date: row.release_date || null,
            prices: {
                discount: row.discount,
                old: parseFloat(row.old),
                current: parseFloat(row.current)
            },
            details: {
                category: row.category,
                system: row.system,
                developer: row.developer,
                publisher: row.publisher,
                languages: row.languages ? row.languages.split(',') : []
            },
            media: {
                thumbnail: row.thumbnail,
                cover: row.cover,
                gallery: row.gallery ? row.gallery.split(';').map(item => {
                    const [type, url] = item.split(',');
                    return { type, url };
                }) : []
            }
        };
    });

    return products;
};

const createProduct = async (product) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        const { name, description, release_date, discount, old, current, category, system, developer, publisher, thumbnail, cover, details, media } = product;
        const [result] = await conn.query(`
            INSERT INTO products
            (name, description, release_date, discount, old, current, category, \`system\`, developer, publisher, thumbnail, cover)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [name, description, release_date, discount, old, current, category, system, developer, publisher, thumbnail, cover]);

        const productId = result.insertId;

        if (details.languages && details.languages.length > 0) {
            const languages = details.languages.map(language => [productId, language]);
            await conn.query(`
                INSERT INTO languages (product_id, language)
                VALUES ?
            `, [languages]);
        }

        if (media.gallery && media.gallery.length > 0) {
            const gallery = media.gallery.map(item => [productId, item.type, item.url]);
            await conn.query(`
                INSERT INTO gallery (product_id, type, url)
                VALUES ?
            `, [gallery]);
        }

        await conn.commit();
        return productId;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

const updateProduct = async (id, product) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        const existingProduct = await getProductById(id);
        if (!existingProduct) {
            throw new Error('Produto não encontrado');
        }

        const updatedProduct = {
            ...existingProduct,
            ...product,
            prices: {
                ...existingProduct.prices,
                ...product.prices
            },
            details: {
                ...existingProduct.details,
                ...product.details,
                languages: product.details && product.details.languages ? product.details.languages : existingProduct.details.languages
            },
            media: {
                ...existingProduct.media,
                ...product.media,
                gallery: product.media && product.media.gallery ? product.media.gallery : existingProduct.media.gallery
            }
        };

        const { name, description, release_date, discount, old, current, category, system, developer, publisher, thumbnail, cover, details, media } = updatedProduct;

        await conn.query(`
            UPDATE products
            SET name = ?, description = ?, release_date = ?, discount = ?, old = ?, current = ?, category = ?, \`system\` = ?, developer = ?, publisher = ?, thumbnail = ?, cover = ?
            WHERE id = ?
        `, [name, description, release_date, discount, old, current, category, system, developer, publisher, thumbnail, cover, id]);

        await conn.query(`
            DELETE FROM languages WHERE product_id = ?
        `, [id]);

        if (details.languages && details.languages.length > 0) {
            const languages = details.languages.map(language => [id, language]);
            await conn.query(`
                INSERT INTO languages (product_id, language)
                VALUES ?
            `, [languages]);
        }

        await conn.query(`
            DELETE FROM gallery WHERE product_id = ?
        `, [id]);

        if (media.gallery && media.gallery.length > 0) {
            const gallery = media.gallery.map(item => [id, item.type, item.url]);
            await conn.query(`
                INSERT INTO gallery (product_id, type, url)
                VALUES ?
            `, [gallery]);
        }

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

const deleteProduct = async (id) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        await conn.query('DELETE FROM languages WHERE product_id = ?', [id]);
        await conn.query('DELETE FROM gallery WHERE product_id = ?', [id]);
        await conn.query('DELETE FROM products WHERE id = ?', [id]);

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    getDiscountedProducts,
    getUpcomingProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
