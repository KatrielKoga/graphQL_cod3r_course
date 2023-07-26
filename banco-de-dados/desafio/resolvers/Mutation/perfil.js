const db = require('../../config/db');
const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
	async novoPerfil(_, { dados }) {
		// minha solucao
		// const perfil = await db('perfis').where({ nome: filtro.nome }).first();
		// if (perfil) return new Error('perfil ja cadastrado');
		// const [id] = await db('perfis').insert({ ...dados });
		// return { ...dados, id };
		try {
			const [id] = await db('perfis').insert({ ...dados });
			return db('perfis').where({ id }).first();
		} catch (e) {
			throw new Error(e.sqlMessage);
		}
	},
	async excluirPerfil(_, { filtro }) {
		// minha solucao
		// let perfil = null;
		// if (filtro.id) {
		// 	perfil = await db('perfis').where({ id: filtro.id }).first();
		// } else if (filtro.nome) {
		// 	perfil = await db('perfis').where({ nome: filtro.nome }).first();
		// }
		// if (perfil) {
		// 	await db('perfis').where({ id: perfil.id }).delete();
		// }
		// return perfil;
		try {
			const perfil = await obterPerfil(_, { filtro });
			if (perfil) {
				const { id } = perfil;
				await db('usuarios_perfis').where({ perfil_id: id }).delete();
				await db('perfis').where({ id }).delete();
			}
			return perfil;
		} catch (e) {
			throw new Error(e.sqlMessage);
		}
	},
	async alterarPerfil(_, { filtro, dados }) {
		// minha solucao
		// let perfil = null;
		// if (filtro.id) {
		// 	perfil = await db('perfis').where({ id: filtro.id }).first();
		// } else if (filtro.nome) {
		// 	perfil = await db('perfis').where({ nome: filtro.nome }).first();
		// }
		// await db('perfis')
		// 	.where({ id: filtro.id })
		// 	.update({ ...dados });
		// return { ...perfil, ...dados };
		try {
			const perfil = await obterPerfil(_, { filtro });
			if (perfil) {
				const { id } = perfil;
				await db('usuarios_perfis').where({ perfil_id: id }).update(dados);
			}
			return { ...perfil, ...dados };
		} catch (e) {
			throw new Error(e.sqlMessage);
		}
	},
};
