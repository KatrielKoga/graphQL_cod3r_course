const db = require('../../config/db');

module.exports = {
	async novoPerfil(_, { dados }) {
		const [id] = await db('perfis').insert({ ...dados });
		return { ...dados, id };
	},
	async excluirPerfil(_, { filtro }) {
		let perfil = null;
		if (filtro.id) {
			perfil = await db('perfis').where({ id: filtro.id }).first();
		} else if (filtro.nome) {
			perfil = await db('perfis').where({ nome: filtro.nome }).first();
		}
		await db('perfis').where({ id: filtro.id }).delete();
		return perfil;
	},
	async alterarPerfil(_, { filtro, dados }) {
		let perfil = null;
		if (filtro.id) {
			perfil = await db('perfis').where({ id: filtro.id }).first();
		} else if (filtro.nome) {
			perfil = await db('perfis').where({ nome: filtro.nome }).first();
		}
		await db('perfis')
			.where({ id: filtro.id })
			.update({ ...dados });
		return { ...perfil, ...dados };
	},
};
