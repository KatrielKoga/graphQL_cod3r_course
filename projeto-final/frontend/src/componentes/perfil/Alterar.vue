<template>
	<v-container fluid>
		<v-layout>
			<v-flex>
				<v-layout column class="ma-3">
					<h1 class="headline">Filtrar Perfil</h1>
					<v-divider class="mb-3" />
					<div v-if="erros">
						<Erros :erros="erros" />
					</div>
					<v-text-field label="ID" v-model.number="filtro.id" />
					<v-text-field label="Nome" v-model="filtro.nome" />

					<h1 class="mt-4 headline">Alterar Perfil</h1>
					<v-divider class="mb-3" />
					<v-text-field label="Nome" v-model="perfil.nome" />
					<v-text-field label="Rótulo" v-model="perfil.rotulo" />

					<v-btn color="primary" class="ml-0 mt-3" @click="alterarPerfil">
						Alterar Perfil
					</v-btn>
				</v-layout>
			</v-flex>
			<v-flex>
				<v-layout column class="ma-3">
					<h1 class="headline">Resultado</h1>
					<v-divider />
					<template v-if="dados">
						<v-text-field label="ID" readonly v-model="dados.id" />
						<v-text-field label="Nome" readonly v-model="dados.nome" />
						<v-text-field label="Rótulo" readonly v-model="dados.rotulo" />
					</template>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import gql from 'graphql-tag';
import Erros from '../comum/Erros';

export default {
	components: { Erros },
	data() {
		return {
			filtro: {},
			perfil: {},
			dados: null,
			erros: null,
		};
	},
	methods: {
		alterarPerfil() {
			this.$api
				.mutate({
					mutation: gql`
						mutation(
							$nome: String
							$rotulo: String
							$id: Int
							$nomeFiltro: String
						) {
							alterarPerfil(
								dados: { nome: $nome, rotulo: $rotulo }
								filtro: { id: $id, nome: $nomeFiltro }
							) {
								id
								nome
								rotulo
							}
						}
					`,
					variables: {
						nomeFiltro: this.filtro.nome,
						id: +this.filtro.id,
						nome: this.perfil.nome,
						rotulo: this.perfil.rotulo,
					},
				})
				.then(res => {
					this.dados = res.data.alterarPerfil;
					this.erros = null;
					this.filtro = {};
					this.perfil = {};
				})
				.catch(e => (this.erros = e));
		},
	},
};
</script>

<style></style>
