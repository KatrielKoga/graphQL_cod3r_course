const db = require('../../config/db');
const { perfil: obterPerfil } = require('../Query/perfil');
const { usuario: obterUsuario } = require('../Query/usuario');

module.exports = {
	async novoUsuario(_, { dados }) {
		// minha solucao
		// const { nome, email, senha, perfis } = dados;
		// const perfil = [];
		// const usuario = await db('usuarios').where({ email: dados.email }).first();
		// if (usuario) return new Error('email ja cadastrado');
		// const [id] = await db('usuarios').insert({ nome, email, senha });
		// if (perfis.length) {
		// 	for (const p of perfis) {
		// 		const perfilExist = await db('perfis')
		// 			.where({ id: p.id })
		// 			.orWhere({ nome: p.nome || null })
		// 			.first();
		// 		if (perfilExist) {
		// 			perfil.push(perfilExist);
		// 			await db('usuarios_perfis').insert({
		// 				usuario_id: id,
		// 				perfil_id: perfilExist.id,
		// 			});
		// 		}
		// 	}
		// }
		// return { ...dados, id, perfis: perfil };
		try {
			const idsPerfis = [];
			if (dados.perfis) {
				for (let perfilFiltro of dados.perfis) {
					const perfil = await obterPerfil(_, {
						filtro: { ...perfilFiltro },
					});
					if (perfil) idsPerfis.push(perfil.id);
				}
			}
			delete dados.perfis;
			const [id] = await db('usuarios').insert({ ...dados });
			for (let perfil_id of idsPerfis) {
				await db('usuarios_perfis').insert({ perfil_id, usuario_id: id });
			}
			return db('usuarios').where({ id }).first();
		} catch (error) {
			throw new Error(e.sqlMessage);
		}
	},
	async excluirUsuario(_, { filtro }) {
		// minha solucao
		// let usuario = null;
		// if (filtro.id) {
		// 	usuario = await db('usuarios').where({ id: filtro.id }).first();
		// } else if (filtro.email) {
		// 	usuario = await db('usuarios').where({ email: filtro.email }).first();
		// }
		// if (usuario) {
		// 	await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
		// 	await db('usuarios').where({ id: usuario.id }).delete();
		// }
		// return usuario;
		try {
			const usuario = await obterUsuario(_, { filtro });
			if (usuario) {
				const { id } = usuario;
				await db('usuarios_perfis').where({ usuario_id: id }).delete();
				await db('usuarios').where({ id }).delete();
			}
			return usuario;
		} catch (error) {
			throw new Error(e.sqlMessage);
		}
	},
	async alterarUsuario(_, { filtro, dados }) {
		// minha solucao
		// const { nome, email, perfis, senha } = dados;
		// let usuario = null;
		// const perfil = [];
		// if (filtro.id) {
		// 	usuario = await db('usuarios').where({ id: filtro.id }).first();
		// } else if (filtro.email) {
		// 	usuario = await db('usuarios').where({ email: filtro.email }).first();
		// }
		// if (usuario) {
		// 	if (perfis?.length) {
		// 		await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
		// 		for (const p of perfis) {
		// 			const perfilExist = await db('perfis')
		// 				.where({ id: p.id })
		// 				.orWhere({ nome: p.nome || null })
		// 				.first();
		// 			if (perfilExist) {
		// 				perfil.push(perfilExist);
		// 				await db('usuarios_perfis').insert({
		// 					usuario_id: id,
		// 					perfil_id: perfilExist.id,
		// 				});
		// 			}
		// 		}
		// 	}
		// 	const data = {};
		// 	if (nome) data.nome = nome;
		// 	if (email) data.email = email;
		// 	if (senha) data.senha = senha;
		// 	await db('usuarios')
		// 		.where({ id: usuario.id })
		// 		.update({ ...data });
		// }
		// return usuario ? { ...usuario, nome, email, senha, perfis: perfil } : null;
		try {
			const usuario = await obterUsuario(_, { filtro });
			if (usuario) {
				const { id } = usuario;
				if (dados.perfis) {
					await db('usuarios_perfis').where({ usuario_id: id }).delete();
				}
				for (let perfilFiltro of dados.perfis) {
					const perfil = await obterPerfil(_, {
						filtro: perfilFiltro,
					});
					perfil &&
						(await db('usuarios_perfis').insert({
							perfil_id: perfil.id,
							usuario_id: id,
						}));
				}

				delete dados.perfis;
				await db('usuarios').where({ id }).update(dados);
			}
			return !usuario ? null : { ...usuario, ...dados };
		} catch (error) {
			throw new Error(e.sqlMessage);
		}
	},
};
