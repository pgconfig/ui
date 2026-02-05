<template>
  <div>
    <div class="columns is-desktop is-vcentered">
      <div class="column">
        <b-field label="Export Format" label-position="inside">
          <b-select v-model="exportForm.format" expanded>
            <option value="alter_system">ALTER SYSTEM commands</option>
            <option value="conf">UNIX-like config file</option>
            <option value="stackgres">StackGres-like YAML file</option>
            <!-- <option value="json">JSON output</option> -->
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Log Format" label-position="inside">
          <b-select
            v-model="exportForm.log_format"
            :disabled="showLogFormat"
            expanded
          >
            <option value="stderr">Standard Error output</option>
            <option value="csvlog">Comma-separated values</option>
            <option value="syslog">Syslog daemon</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-switch v-model="exportForm.include_pgbadger"
          >Include PGBadger log configuration</b-switch
        >
      </div>
    </div>
    <div class="columns">
      <div class="container code-container">
        <b-button
          type="is-primary is-light"
          v-clipboard:copy="exportedResponse.output"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          size="is-small"
          class="copy-button"
        >
          <b-icon icon="copy" size="is-small"></b-icon>
          <span>&nbsp;Copy</span>
        </b-button>
        <pre><code ref="codeBlock" :class="highlightLang"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
// https://github.com/Inndy/vue-clipboard2
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import ini from 'highlight.js/lib/languages/ini';

hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('ini', ini);

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
        this.$nextTick(() => {
          this.highlightCode();
        });
      },
    },
    exportedResponse: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.highlightCode();
        });
      },
    },
  },
  mounted() {
    this.highlightCode();
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
    highlightCode() {
      if (this.$refs.codeBlock && this.exportedResponse.output) {
        const output = this.exportedResponse.output;
        const result = hljs.highlight(output, { language: this.highlightLang });
        this.$refs.codeBlock.innerHTML = result.value;
      }
    },
  },
  computed: {
    showLogFormat() {
      return !this.exportForm.include_pgbadger;
    },
    highlightLang() {
      switch (this.exportForm.format) {
        case "alter_system":
          return "sql";
        case "stackgres":
          return "yaml";
        case "json":
          return "json";
        default:
          return "ini";
      }
    },
  },
};
</script>

<style scoped>
.hljs {
  padding: 0em;
  background: none;
}
.code-container {
  position: relative;
}
.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
</style>
