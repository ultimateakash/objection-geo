const Knex = require('knex');
const { Model } = require('objection');
const config = require('../config/database');

const knex = new Knex({
    client: 'mysql',
    connection: {
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    },
    useNullAsDefault: true
});

Model.knex(knex);

module.exports = { knex };