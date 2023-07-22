const { usuarios, perfis } = require('../data/db');

module.exports = {
	ola() {
		return 'mundo';
	},
	horaAtual() {
		return new Date();
	},
	usuarioLogado() {
		return {
			id: 1,
			nome: 'Ana da Web',
			email: 'anadaweb@email.com',
			idade: 23,
			salario_real: 1234.56,
			vip: true,
		};
	},
	produtoEmDestaque() {
		return {
			nome: 'lapis',
			preco: 5.98,
			desconto: 0.15,
		};
	},
	numerosMegaSena() {
		// return [4, 8, 13, 28, 33, 54];
		const crescente = (a, b) => a - b;
		const test = [];
		return Array(6)
			.fill(0)
			.map(n => {
				let value = parseInt(Math.random() * 60 + 1);
				while (test.indexOf(value) !== -1) {
					value = parseInt(Math.random() * 60 + 1);
				}
				test.push(value);
				return value;
			})
			.sort(crescente);
	},
	usuarios() {
		return usuarios;
	},
	usuario(_, { id }) {
		// const sels = usuarios.filter(u => u.id === id);
		// return sels[0]; // sels ? sels[0] : null;
		return usuarios.find(u => u.id === id);
	},
	perfis() {
		return perfis;
	},
	perfil(_, { id }) {
		return perfis.find(p => p.id === id);
	},
};
