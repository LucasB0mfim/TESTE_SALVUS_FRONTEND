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

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    getDiscountedProducts,
    getUpcomingProducts
};
