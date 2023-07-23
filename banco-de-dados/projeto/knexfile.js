// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { connection } = require('./.env');
module.exports = {
	client: 'mysql',
	connection,
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};
