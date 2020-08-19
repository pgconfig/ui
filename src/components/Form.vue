<template>
  <div>
    <div class="columns box">
      <div class="column is-three-quarters">
        <p class="bd-notification">Server</p>
        <div class="columns is-desktop">
          <div class="column">
            <b-field label="Operating system" label-position="inside">
              <b-select placeholder="Select one" v-model="form.os_type" expanded>
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
              <b-select placeholder="Select one" v-model="form.drive_type" expanded>
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
              <b-numberinput min="1" controls-position="compact" v-model="form.cpus"></b-numberinput>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Total Memory (GB)" label-position="inside">
              <b-numberinput min="1" controls-position="compact" v-model="form.total_ram"></b-numberinput>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Max connections" label-position="inside">
              <b-numberinput min="1" controls-position="compact" v-model="form.max_connections"></b-numberinput>
            </b-field>
          </div>
        </div>
      </div>
      <div class="column">
        <p class="bd-notification">Database</p>
        <div class="columns is-mobile">
          <div class="column">
            <b-field label="Application profile" label-position="inside">
              <b-select placeholder="Select one" v-model="form.environment_name" expanded>
                <option value="WEB">General web applications</option>
                <option value="OLTP">ERP or long transaction applications</option>
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
              <b-select placeholder="Select a version" v-model="form.pg_version" expanded>
                <!-- <option value="13">13 (beta)</option> -->
                <option value="12">12 (Latest)</option>
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
export default {
  name: "Form",
  props: {},
  watch: {
    form: {
      immediate: true,
      handler(newForm) {
        this.$emit('changingForm', newForm);
      },
    },
  },
  data() {
    return {
      form: {
        max_connections: 100,
        pg_version: 12,
        environment_name: "WEB",
        total_ram: 4,
        cpus: 2,
        drive_type: "SSD",
        arch: "x86-64",
        os_type: "linux",
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
