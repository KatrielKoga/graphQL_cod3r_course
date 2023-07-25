const db = require('../../config/db');

module.exports = {
	async perfis(usuario) {
		return await db('perfis')
			.join('usuarios_perfis', 'usuarios_perfis.perfil_id', '=', 'perfis.id')
			.where('usuarios_perfis.usuario_id', '=', usuario.id);
	},
};
