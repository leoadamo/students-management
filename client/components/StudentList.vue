<template>
  <v-container fluid>
    <!-- Busca por ID -->
    <v-row>
      <v-col cols="12" class="mt-4">
        <v-text-field
          v-model="searchId"
          label="Buscar aluno por ID"
          outlined
          clearable
          @keyup.enter="searchStudentById"
        ></v-text-field>
        <v-btn color="primary" @click="searchStudentById">Buscar</v-btn>
      </v-col>
    </v-row>

    <!-- Mensagem de Erro -->
    <v-row v-if="searchError" class="mt-2">
      <v-col cols="12">
        <v-alert type="error" outlined>{{ searchError }}</v-alert>
      </v-col>
    </v-row>

    <!-- Detalhes do Aluno Encontrado -->
    <v-row v-if="selectedStudent" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Dados do Aluno</v-card-title>
          <v-card-text>
            <div><strong>Nome:</strong> {{ selectedStudent.name }}</div>
            <div><strong>Data de Nascimento:</strong> {{ selectedStudent.date_of_birth }}</div>
            <div><strong>Telefone:</strong> {{ selectedStudent.phone }}</div>
            <div><strong>Email:</strong> {{ selectedStudent.email }}</div>
            <div><strong>Endereço:</strong> {{ selectedStudent.address }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Listagem de alunos -->
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
      students: [],
      newStudent: {
        name: '',
        date_of_birth: '',
        phone: '',
        email: '',
        address: '',
      },

      searchId: '',
      searchError: '',
      selectedStudent: null
    };
  },

  computed: {
    searchErrorMessages() {
      return this.searchError ? [this.searchError] : [];
    },
  },

  async created() {
    await this.getStudents();
  },

  methods: {
    async getStudents() {
      try {
        const { data } = await this.$axios.get('/students/all');
        this.students = data;
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        this.students = [];
      }
    },

    async addStudent() {
      try {
        const response = await this.$axios.post('/students/create', {
          name: this.newStudent.name,
          date_of_birth: this.newStudent.date_of_birth,
          phone: this.newStudent.phone,
          email: this.newStudent.email,
          address: this.newStudent.address,
        });

        this.students.push(response.data);

        this.clearForm();

      } catch (error) {
        console.error('Erro ao adicionar estudante:', error);
      }
    },

    clearForm() {
      this.newStudent = {
        name: '',
        date_of_birth: '',
        phone: '',
        email: '',
        address: '',
      };
      this.dialog = false;
    },

    async searchStudentById() {
      try {
        if (this.searchId.trim() === '') {
          this.searchError = 'Por favor, insira um ID válido.';

          return;
        }

        const id = parseInt(this.searchId.trim(), 10);
        const { data } = await this.$axios.get(`/students/${id}`);

        // Limpa o campo de busca e o erro
        this.searchId = '';
        this.searchError = '';

        // Atualiza o aluno selecionado
        this.selectedStudent = data || null;
      } catch (error) {
        console.error('Erro ao buscar aluno por ID:', error);

        this.selectedStudent = null;
        this.searchError = 'Erro ao buscar aluno. Por favor, tente novamente mais tarde.';
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
