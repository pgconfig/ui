<template>
  <div id="app">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title"><b-icon icon="database-marker" size="is-small"></b-icon>&nbsp;PGConfig</h1>
          <h2 class="subtitle">PostgreSQL configuration builder</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Tuning Advisor</h1>
        <config-form v-on:isLoading="tableIsLoading"></config-form>
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
import ConfigForm from "./components/Form.vue";

export default {
  name: "App",
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    ConfigForm,
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
