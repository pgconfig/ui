<template>
  <div>
    <div class="columns box">
      <div class="column is-three-quarters">
        <h2 class="bd-notification form-header">
          <span class="icon is-medium">
            <i class="fas fa-server"></i>
          </span>
          Server
        </h2>
        <div class="columns is-desktop">
          <div class="column">
            <b-field label="Operating system" label-position="inside">
              <b-select
                placeholder="Select one"
                v-model="form.os_type"
                expanded
              >
                <option value="linux">GNU/Linux Based</option>
                <option value="windows">Windows Based</option>
                <option value="unix">Unix Based</option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Architecture" label-position="inside">
              <b-select placeholder="Select one" v-model="form.arch" expanded>
                <option value="x86-64">64 Bits (x86-64)</option>
                <option value="i686">32 Bits (i686)</option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Storage type" label-position="inside">
              <b-select
                placeholder="Select one"
                v-model="form.drive_type"
                expanded
              >
                <option value="HDD">HDD Storage</option>
                <option value="SSD">SSD Storage</option>
                <option value="SAN">Network Storage - NAS/SAN</option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns is-desktop">
          <div class="column">
            <b-field label="Number of CPUs" label-position="inside">
              <b-numberinput
                min="1"
                controls-position="compact"
                v-model="form.cpus"
              ></b-numberinput>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Total Memory (GB)" label-position="inside">
              <b-numberinput
                min="1"
                controls-position="compact"
                v-model="form.total_ram"
              ></b-numberinput>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Max connections" label-position="inside">
              <b-numberinput
                min="1"
                controls-position="compact"
                v-model="form.max_connections"
              ></b-numberinput>
            </b-field>
          </div>
        </div>
      </div>
      <div class="column">
        <h2 class="bd-notification form-header">
          <span class="icon is-medium">
            <i class="fas fa-database"></i>
          </span>
          Database
        </h2>
        <div class="columns is-mobile">
          <div class="column">
            <b-field label="Application profile" label-position="inside">
              <b-select
                placeholder="Select one"
                v-model="form.environment_name"
                expanded
              >
                <option value="WEB">General web applications</option>
                <option value="OLTP">
                  ERP or long transaction applications
                </option>
                <option value="DW">DataWare house and BI Applications</option>
                <option value="Mixed">DB and APP on the same server</option>
                <option value="Desktop">Developer local machine</option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">
            <b-field label="PostgreSQL Version" label-position="inside">
              <b-select
                placeholder="Select a version"
                v-model="form.pg_version"
                expanded
              >
                <option value="14">14 (Latest)</option>
                <option value="13">13</option>
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="9.6">9.6</option>
                <option value="9.5">9.5</option>
                <option value="9.4">9.4 (EOL)</option>
                <option value="9.3">9.3 (EOL)</option>
                <option value="9.2">9.2 (EOL)</option>
                <option value="9.1">9.1 (EOL)</option>
              </b-select>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "Form",
  data() {
    return {
      form: {
        max_connections: 100,
        pg_version: 14,
        environment_name: "WEB",
        total_ram: 4,
        cpus: 2,
        drive_type: "SSD",
        arch: "x86-64",
        os_type: "linux",
      },
    };
  },
  computed: {
    valuesFromURL() {
      return this.parseQuery(this.$route.query);
    },
  },
  watch: {
    $route() {
      if (this.valuesFromURL) {
        this.form.max_connections = this.valuesFromURL.max_connections;
        this.form.pg_version = this.valuesFromURL.pg_version;
        this.form.environment_name = this.valuesFromURL.environment_name;
        this.form.total_ram = this.valuesFromURL.total_ram;
        this.form.cpus = this.valuesFromURL.cpus;
        this.form.drive_type = this.valuesFromURL.drive_type;
        this.form.arch = this.valuesFromURL.arch;
        this.form.os_type = this.valuesFromURL.os_type;
      }
    },
    form: {
      deep: true,
      immediate: true,
      handler(newForm) {
        const formWithoutGetters = { ...this.form };

        if (!lodash.isEqual(formWithoutGetters, this.valuesFromURL)) {
          this.$router
            .push({
              query: formWithoutGetters,
            })
            .catch((failure) => {
              console.log(failure);
            });
        }
        this.$emit("changingForm", newForm);
      },
    },
  },
  methods: {
    parserBy(key) {
      const parsers = {
        max_connections: parseInt,
        pg_version: parseFloat,
        total_ram: parseInt,
        cpus: parseInt,
      };
      const defaultParser = (value) => value;
      return parsers[key] || defaultParser;
    },
    parseQuery(query) {
      const parsedValues = Object.entries(query).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: this.parserBy(key)(value) }),
        {}
      );
      return parsedValues;
    },
  },
};
</script>

<style scoped>
.form-header {
  margin-bottom: 0.5em;
  font-size: 1.2em;
  /* color: #7957d5; */
  font-weight: bold;
}
</style>
