<template>
  <div id="app">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">PGConfig.org</h1>
          <h2 class="subtitle">PostgreSQL config builder</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Tuning Advisor</h1>
        <Form />
        <ParamsTable v-on:isLoading="tableIsLoading" />
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>PGConfig.org</strong> code available on
          <a href="https://github.com/pgconfig">GitHub</a>.
        </p>
      </div>
    </footer>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import ParamsTable from "./components/ParamsTable.vue";

export default {
  name: "App",
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Form,
    ParamsTable,
  },
  methods: {
    tableIsLoading(val) {
      this.isLoading = val;
    }
  }
};
</script>

<style>
</style>
