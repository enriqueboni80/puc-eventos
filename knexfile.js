require('dotenv').config()

module.exports = {

    development: {
        client: 'mysql',
        version: '5.7',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        },
        useNullAsDefault: true
    },

    test: {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_DATABASE_URL_TEST,
            port: process.env.POSTGRES_DATABASE_PORT_TEST,
            database: process.env.POSTGRES_DATABASE_DATABASE_TEST,
            user: process.env.POSTGRES_DATABASE_USER_TEST,
            password: process.env.POSTGRES_DATABASE_PASSWORD_TEST
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    staging: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        useNullAsDefault: true,
        migrations: {
            tableName: "knex_migrations",
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        ssl: {
            rejectUnauthorized: false
        }
    },

    /*     staging: {
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            },
            pool: {
                min: 2,
                max: 10
            },
            migrations: {
                tableName: 'knex_migrations'
            }
        }, */

    production: {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_DATABASE_URL,
            port: process.env.POSTGRES_DATABASE_PORT,
            database: process.env.POSTGRES_DATABASE_DATABASE,
            user: process.env.POSTGRES_DATABASE_USER,
            password: process.env.POSTGRES_DATABASE_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};