<template>
  <v-app dark>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Meu Projeto</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-col class="text-center">
        &copy; {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
