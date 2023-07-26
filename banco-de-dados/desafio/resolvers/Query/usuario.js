const db = require('../../config/db');

module.exports = {
	usuarios() {
		return db('usuarios');
	},
	usuario(_, { filtro }) {
		if (filtro.id) {
			return db('usuarios').where({ id: filtro.id }).first();
		} else if (filtro.email) {
			return db('usuarios').where({ email: filtro.email }).first();
		}
		return null;
	},
};
