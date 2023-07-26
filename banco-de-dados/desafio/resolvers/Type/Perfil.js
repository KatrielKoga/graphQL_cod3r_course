const db = require('../../config/db');

module.exports = {
	usuarios(perfil) {
		return db('usuarios')
			.join('usuarios_perfis', 'usuarios_perfis.usuario_id', '=', 'usuarios.id')
			.where('usuarios_perfis.perfil_id', '=', perfil.id);
	},
};
