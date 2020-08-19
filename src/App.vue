<template>
  <div id="app">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <b-icon icon="database-marker" size="is-small"></b-icon>&nbsp;PGConfig
          </h1>
          <h2 class="subtitle">PostgreSQL configuration builder</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Tuning Advisor</h1>
        <div class="columns">
          <div class="column">
            <config-form v-on:changingForm="formChange"></config-form>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <tabs
              v-on:changingForm="formExportChange"
              :fullResponse="fullResponse"
              :exportedResponse="exportedResponse"
              :pgVersion="pgVersion"
              :currentEnv="currentEnv"
            ></tabs>
          </div>
        </div>
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
import Tabs from "./components/Tabs.vue";

export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      form: undefined,
      exportForm: undefined,
      fullResponse: [],
      exportedResponse: {
        output: {},
      },
    };
  },
  components: {
    ConfigForm,
    Tabs,
  },
  watch: {
    urlArgs: {
      immediate: true,
      async handler(args) {
        this.updateComparizonResponse(args);
        this.updateExportResponse(this.exportArgs);
      },
    },
    exportArgs: {
      immediate: true,
      async handler(opts) {
        this.updateExportResponse(opts);
        this.updateComparizonResponse(this.urlArgs);
      },
    },
  },
  computed: {
    pgVersion() {
      if(!this.form) return '';
      return this.form.pg_version.toString();
    },
    currentEnv() {
      if(!this.form) return '';
      return this.form.environment_name;
    },
    urlArgs() {
      if (!this.form) return '';

      const args = Object.entries(this.form).map(function ([k, v]) {
        if (k === "total_ram") {
          return `${k}=${v}GB`;
        }

        return `${k}=${v}`;
      });

      return args.join("&");
    },
    exportArgs() {
      if (!this.exportForm) return "";

      const args = Object.entries(this.exportForm).map(function ([k, v]) {
        if (v !== false) {
          return `${k}=${v}`;
        }
      });

      return args.join("&");
    },
  },
  methods: {
    tableIsLoading(val) {
      this.isLoading = val;
    },
    async formChange(form) {
      this.form = form;
    },
    async formExportChange(exportForm) {
      if (!exportForm) {
        this.exportForm = [];
        return;
      }

      this.exportForm = exportForm;
    },
    async updateComparizonResponse(args) {
      var url = "/get-config-all-environments";
      var opts = "show_doc=true&format=json";

      if (args === "") return;

      this.fullResponse = await this.callAPI(url, opts, args);
    },
    async updateExportResponse(opts) {
      var url = "/get-config";

      if (opts === "") return;

      this.exportedResponse.output = await this.callAPI(
        url,
        opts,
        this.urlArgs
      );
    },
    async callAPI(url, opts, args) {
      this.isLoading = true;

      var output = {};

      try {
        const response = await this.$http.get(`${url}?${opts}&${args}`);

        output = response.data.data;

        if (typeof response.data === "string") {
          output = response.data;
        }
        
      } catch (e) {
        this.$buefy.dialog.alert({
          title: "Error",
          message: `Could not get data from the API: <pre>${e}</pre>`,
          type: "is-danger",
          hasIcon: false,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      }

      this.isLoading = false;

      return output;
    },
  },
};
</script>

<style>
</style>
