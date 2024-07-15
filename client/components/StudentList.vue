<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="students"
          class="elevation-1"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Lista de Alunos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template #activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    Adicionar Aluno
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Adicionar Novo Aluno</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form">
                      <v-text-field
                        v-model="newStudent.name"
                        label="Nome"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newStudent.date_of_birth"
                        label="Data de Nascimento"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newStudent.phone"
                        label="Telefone"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newStudent.email"
                        label="Email"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="newStudent.address"
                        label="Endereço"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="addStudent">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Data de Nascimento', value: 'date_of_birth' },
        { text: 'Telefone', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Endereço', value: 'address' },
      ],
      students: [
        // Lista inicial de estudantes (pode ser vazia ou carregada de uma API)
      ],
      newStudent: {
        name: '',
        date_of_birth: '',
        phone: '',
        email: '',
        address: '',
      },
    };
  },
  methods: {
    async addStudent() {
      try {
        const response = await this.$axios.post('/students/create', {
          name: this.newStudent.name,
          date_of_birth: this.newStudent.date_of_birth,
          phone: this.newStudent.phone,
          email: this.newStudent.email,
          address: this.newStudent.address,
        });

        // Adiciona o novo estudante à lista local
        this.students.push(response.data);

        // Limpa o formulário
        this.newStudent = {
          name: '',
          date_of_birth: '',
          phone: '',
          email: '',
          address: '',
        };
        this.dialog = false;
      } catch (error) {
        console.error('Erro ao adicionar estudante:', error);
      }
    },
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
