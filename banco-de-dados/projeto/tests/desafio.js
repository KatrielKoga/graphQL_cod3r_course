const db = require('../config/db');

async function salvarUsuario(nome, email, senha) {
	const dados = { nome, email, senha };
	const usuario = await db('usuarios').select('id').where({ email }).first();
	if (usuario) {
		await db('usuarios').update(dados).where({ id: usuario.id });
		return { ...dados, id: usuario.id };
	}

	const [id] = await db('usuarios').insert(dados);
	return { ...dados, id };
}

async function salvarPerfil(nome, rotulo) {
	const dados = { nome, rotulo };
	const perfil = await db('perfis').select('id').where({ nome }).first();
	if (perfil) {
		await db('perfis').update(dados).where({ id: perfil.id });
		return { ...dados, id: perfil.id };
	}

	const [id] = await db('perfis').insert({ nome, rotulo });
	return { ...dados, id };
}

async function adicionarPerfis(usuario, ...perfis) {
	await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
	for (const perfil of perfis) {
		await db('usuarios_perfis').insert({
			usuario_id: usuario.id,
			perfil_id: perfil.id,
		});
	}
}

async function executar() {
	const usuario = await salvarUsuario('Ana', 'ana3@empresa.com.br', '123456');
	const perfilA = await salvarPerfil('rh1', 'Pessoal');
	const perfilB = await salvarPerfil('fin1', 'Financeiro');

	console.log(usuario);
	console.log(perfilA);
	console.log(perfilB);

	await adicionarPerfis(usuario, perfilA, perfilB);
}

executar()
	.catch(err => console.log(err))
	.finally(() => db.destroy());
