<template>
  <div>
    <div class="columns is-desktop is-vcentered">
      <div class="column">
        <b-field label="Export Format" label-position="inside">
          <b-select v-model="exportForm.format" expanded>
            <option value="alter_system">ALTER SYSTEM commands</option>
            <option value="conf">UNIX-like config file</option>
            <!-- <option value="json">JSON output</option> -->
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Log Format" label-position="inside">
          <b-select v-model="exportForm.log_format" :disabled="showLogFormat" expanded>
            <option value="stderr">Standard Error output</option>
            <option value="csvlog">Comma-separated values</option>
            <option value="syslog">Syslog daemon</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-switch v-model="exportForm.include_pgbadger">Include PGBadger log configuration</b-switch>
      </div>
      <div class="column is-2">
        <b-button
          type="is-primary is-light"
          v-clipboard:copy="exportedResponse.output"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          rounded
          expanded
        >
          <b-icon icon="content-copy" size="is-small"></b-icon>&nbsp;Copy to clipboard
        </b-button>
      </div>
    </div>
    <div class="columns is-desktop">
      <div class="column">
        <pre v-highlightjs="exportedResponse.output"><code :class="highlightLang"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
// https://github.com/Inndy/vue-clipboard2
export default {
  name: "ExportConfig",
  props: {
    exportedResponse: {
      type: Object,
      required: true,
    },
  },

  watch: {
    exportForm: {
      immediate: true,
      handler(newForm) {
        this.$emit("changingForm", newForm);
      },
    },
  },
  data() {
    return {
      exportForm: {
        format: "conf",
        include_pgbadger: true,
        log_format: "csvlog",
      },
    };
  },
  methods: {
    onCopy: function () {
      this.$buefy.snackbar.open({
        message: `Copied to clipboard`,
        actionText: null,
        type: "is-info",
      });
    },
    onError: function (e) {
      alert(`Failed to copy texts: ${e}`);
    },
  },
  computed: {
    showLogFormat() {
      return !this.exportForm.include_pgbadger;
    },
    highlightLang() {
      if (this.exportForm.format === "alter_system") {
        return "sql";
      }

      if (this.exportForm.format === "json") {
        return "json";
      }

      return "config";
    },
  },
};
</script>

<style scoped>
.hljs {
  padding: 0em;
  background: none;
}
</style>
