const db = require('../../config/db');

module.exports = {
	async novoUsuario(_, { dados }) {
		const { nome, email, senha, perfis } = dados;
		const perfil = [];
		const usuario = await db('usuarios').where({ email: dados.email }).first();
		if (usuario) return new Error('email ja cadastrado');
		const [id] = await db('usuarios').insert({ nome, email, senha });
		if (perfis.length) {
			for (const p of perfis) {
				const perfilExist = await db('perfis')
					.where({ id: p.id })
					.orWhere({ nome: p.nome || null })
					.first();
				if (perfilExist) {
					perfil.push(perfilExist);
					await db('usuarios_perfis').insert({
						usuario_id: id,
						perfil_id: perfilExist.id,
					});
				}
			}
		}
		return { ...dados, id, perfis: perfil };
	},
	async excluirUsuario(_, { filtro }) {
		let usuario = null;
		if (filtro.id) {
			usuario = await db('usuarios').where({ id: filtro.id }).first();
		} else if (filtro.email) {
			usuario = await db('usuarios').where({ email: filtro.email }).first();
		}
		if (usuario) {
			await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
			await db('usuarios').where({ id: usuario.id }).delete();
		}
		return usuario;
	},
	async alterarUsuario(_, { filtro, dados }) {
		const { nome, email, perfis, senha } = dados;
		let usuario = null;
		const perfil = [];
		if (filtro.id) {
			usuario = await db('usuarios').where({ id: filtro.id }).first();
		} else if (filtro.email) {
			usuario = await db('usuarios').where({ email: filtro.email }).first();
		}
		if (usuario) {
			if (perfis?.length) {
				await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
				for (const p of perfis) {
					const perfilExist = await db('perfis')
						.where({ id: p.id })
						.orWhere({ nome: p.nome || null })
						.first();
					if (perfilExist) {
						perfil.push(perfilExist);
						await db('usuarios_perfis').insert({
							usuario_id: id,
							perfil_id: perfilExist.id,
						});
					}
				}
			}
			const data = {};
			if (nome) data.nome = nome;
			if (email) data.email = email;
			if (senha) data.senha = senha;
			await db('usuarios')
				.where({ id: usuario.id })
				.update({ ...data });
		}
		return usuario ? { ...usuario, nome, email, senha, perfis: perfil } : null;
	},
};
