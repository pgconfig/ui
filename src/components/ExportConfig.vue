<template>
  <div>
    <b-field grouped>
      <b-field label="Export Format" label-position="inside">
        <b-select v-model="exportForm.format" expanded>
          <option value="alter_system">ALTER SYSTEM commands</option>
          <option value="conf">UNIX-like config file</option>
          <!-- <option value="json">JSON output</option> -->
        </b-select>
      </b-field>
      <b-field label="Log Format" label-position="inside">
        <b-select v-model="exportForm.log_format" :disabled="showLogFormat" expanded>
          <option value="stderr">Standard Error output</option>
          <option value="csvlog">Comma-separated values</option>
          <option value="syslog">Syslog daemon</option>
        </b-select>
      </b-field>
      <b-switch v-model="exportForm.include_pgbadger">Include PGBadger log configuration</b-switch>
    </b-field>
    <pre v-highlightjs="exportedResponse.output"><code :class="highlightLang"></code></pre>
  </div>
</template>

<script>
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
        this.$emit('changingForm', newForm);
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

<style>
</style>
