<template>
  <b-tabs position="is-right" class="block" @input="updateTab">
    <b-tab-item label="Profile Comparison" icon="select-compare">
      <div v-if="formattedConfigs.length > 0">
        <div v-for="item in formattedConfigs" :key="item.name" class="container content">
          <h3 class="subtitle">{{ item.name }}</h3>
          <b-table
            :data="item.params"
            detailed
            detail-key="name"
            :columns="columns"
            :hoverable="true"
          >
            <template slot="detail" slot-scope="props">
              <div class="columns is-mobile">
                <div class="column content">
                  <blockquote class="subtitle">
                    <i>{{ props.row.documentation.abstract }}</i>
                  </blockquote>
                  <p>Suggested readgings:</p>
                  <ul>
                    <li v-for="(url,desc) in props.row.documentation.recomendations" :key="desc">
                      <a :href="url">{{ desc }}</a>
                    </li>
                  </ul>
                </div>
                <div class="column">
                  <div class="box">
                    <article class="media">
                      <div class="media-content">
                        <div class="content">
                          <strong>{{ props.row.name }}</strong>
                          <small>&nbsp;({{ props.row.documentation.type }})</small>
                          <p v-for="row in props.row.documentation.details" :key="row">{{ row }}</p>
                          <div class="buttons">
                            <a :href="props.row.conf_url" target="_blank" class="button is-primary">
                              <b-icon icon="creation" size="is-small"></b-icon>
                              <span>
                                Learn more on Postgresql<strong>co.nf</strong>
                              </span>
                            </a>
                            <a
                              :href="props.row.documentation.url"
                              target="_blank"
                              class="button is-light"
                            >
                              <b-icon icon="file-document" size="is-small"></b-icon>
                              <span>Check the docs</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </b-tab-item>
    <b-tab-item label="Export" icon="code-tags">
      <b-field grouped>
        <b-field label="Export Format" label-position="inside">
          <b-select v-model="exportForm.format" expanded>
            <option value="alter_system">ALTER SYSTEM commands</option>
            <option value="conf">UNIX-like config file</option>
            <option value="json">JSON output</option>
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
      <pre v-highlightjs="exportedResponse"><code v-bind:style="{highlightLang}"></code></pre>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { formatConfigs } from "../services/formatters";

export default {
  name: "ParamsTable",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  watch: {
    exportArgs: {
      immediate: true,
      async handler(opts) {
        const url = "/get-config";
        await this.callAPI(url, opts, this.urlArgs);
      },
    },
    urlArgs: {
      immediate: true,
      async handler(args) {
        var url = "/get-config-all-environments";
        var opts = "show_doc=true&format=json";

        // if (this.currentTab === 1) {
        //   url = "/get-config";
        //   opts = `format=${this.format}`;
        //   console.log(`opts: ${opts}`);
        // }

        await this.callAPI(url, opts, args);
      },
    },
  },
  data() {
    return {
      exportForm: {
        format: "alter_system",
        include_pgbadger: true,
        log_format: "csvlog"
      },
      currentTab: 0,
      fullResponse: undefined,
      exportedResponse: undefined,
      columns: [
        {
          field: "name",
        },
        {
          field: "documentation.default_value",
          label: "Default Value",
          width: "500",
        },
        {
          field: "web",
          label: "WEB",
          width: "500",
        },
        {
          field: "oltp",
          label: "OLTP",
          width: "500",
        },
        {
          field: "dw",
          label: "DW",
          width: "500",
        },
        {
          field: "mixed",
          label: "Mixed",
          width: "500",
        },
        {
          field: "desktop",
          label: "Desktop",
          width: "500",
        },
      ],
    };
  },
  computed: {
    showLogFormat() {
      return !this.exportForm.include_pgbadger;
    },
    highlightLang() {

      console.log(`format: ${this.exportForm.format}`);

      if (this.exportForm.format === "alter_table") {
        return "sql";
      }

      if (this.exportForm.format === "json") {
        return "javascript";
      }

      return this.format;
    },
    exportArgs() {
      const args = Object.entries(this.exportForm).map(function ([k, v]) {
        if (v !== false) {
          return `${k}=${v}`;
        }
      });

      return args.join("&");
    },
    urlArgs() {
      const args = Object.entries(this.form).map(function ([k, v]) {
        if (k === "total_ram") {
          return `${k}=${v}GB`;
        }

        return `${k}=${v}`;
      });

      return args.join("&");
    },
    formattedConfigs() {
      if (!this.fullResponse) return [];
      return formatConfigs(this.fullResponse);
    },
  },
  methods: {
    updateTab: function (index) {
      this.currentTab = index;
    },
    async callAPI(url, opts, args) {
      this.$emit("isLoading", true);

      try {

        console.log(`calling ${url}?${opts}&${args} from ${this.currentTab}`);

        const response = await this.$http.get(`${url}?${opts}&${args}`);

        if (this.currentTab == 1) {
          this.exportedResponse = response.data;
          this.$emit("isLoading", false);
          return;
        }

        this.fullResponse = response.data.data;
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

      this.$emit("isLoading", false);
    },
  },
};
</script>
