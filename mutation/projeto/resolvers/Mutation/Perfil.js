const { perfis, proximoIdPerfil } = require('../../data/db');

module.exports = {
	novoPerfil(_, { nome }) {
		const nomeExistente = perfis.some(p => p.nome === nome);
		if (nomeExistente) throw new Error('Perfil já cadastrado');

		const novoPerfil = {
			id: proximoIdPerfil(),
			nome,
		};
		perfis.push(novoPerfil);
		return novoPerfil;
	},
	alterarPerfil(_, { nome, id }) {
		const nomeExistente = perfis.some(p => p.nome === nome);
		if (nomeExistente) throw new Error('Perfil já cadastrado');

		const i = perfis.findIndex(p => p.id === id);
		perfis[i].nome = nome;
		return perfis[i];
	},
	excluirPerfil(_, { id }) {
		const i = perfis.findIndex(p => p.id === id);
		const excluido = perfis.splice(i, 1);
		return excluido[0];
	},
};
