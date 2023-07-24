const db = require('../../config/db');

module.exports = {
	async perfis() {
		return await db('perfis');
	},
	async perfil(_, { filtro }) {
		if (filtro.id) {
			return await db('perfis').where({ id: filtro.id }).first();
		} else if (filtro.nome) {
			return await db('perfis').where({ nome: filtro.nome }).first();
		}
		return null;
	},
};
