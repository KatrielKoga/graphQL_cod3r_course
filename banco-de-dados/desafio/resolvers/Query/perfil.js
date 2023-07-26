const db = require('../../config/db');

module.exports = {
	perfis() {
		// pode retornar promise
		return db('perfis');
	},
	perfil(_, { filtro }) {
		if (filtro.id) {
			return db('perfis').where({ id: filtro.id }).first();
		} else if (filtro.nome) {
			return db('perfis').where({ nome: filtro.nome }).first();
		}
		return null;
	},
};
