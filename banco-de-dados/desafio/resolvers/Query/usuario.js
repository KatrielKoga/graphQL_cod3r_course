const db = require('../../config/db');

module.exports = {
	async usuarios() {
		return await db('usuarios');
	},
	async usuario(_, { filtro }) {
		if (filtro.id) {
			return await db('usuarios').where({ id: filtro.id }).first();
		} else if (filtro.email) {
			return await db('usuarios').where({ email: filtro.email }).first();
		}
		return null;
	},
};
