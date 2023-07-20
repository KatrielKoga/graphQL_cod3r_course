const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	scalar Date

	type Usuario {
		id: ID
		nome: String!
		email: String!
		idade: Int
		salario: Float
		vip: Boolean
	}

	type Produto {
		nome: String!
		preco: Float!
		desconto: Float
		precoComDesconto: Float
	}

	# Pontos de entrada da sua API
	type Query {
		ola: String!
		horaAtual: Date!
		usuarioLogado: Usuario
		produtoEmDestaque: Produto
	}
`;

const resolvers = {
	Usuario: {
		salario(usuario) {
			return usuario.salario_real;
		},
	},
	Produto: {
		precoComDesconto(produto) {
			if (produto.desconto) {
				return produto.preco * (1 - produto.desconto);
			}
			return produto.preco;
		},
	},
	Query: {
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
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`running in ${url}`);
});
