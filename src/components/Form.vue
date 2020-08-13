<template>
  <div class="columns box">
    <div class="column is-three-quarters">
      <p class="bd-notification">Server</p>
      <div class="columns is-mobile">
        <div class="column">
          <b-field label="Operating system">
            <b-select placeholder="Select one" v-model="osType" expanded>
              <option value="linux">GNU/Linux Based</option>
              <option value="windows">Windows Based</option>
              <option value="unix">Unix Based</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Architecture">
            <b-select placeholder="Select one" v-model="arch" expanded>
              <option value="x86-64">64 Bits (x86-64)</option>
              <option value="i686">32 Bits (i686)</option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Storage type">
            <b-select placeholder="Select one" v-model="storageType" expanded>
              <option value="hdd">HDD Storage</option>
              <option value="ssd">SSD Storage</option>
              <option value="san">Network Storage - NAS/SAN</option>
              </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <b-field label="Number of CPUs">
            <b-numberinput min="1" controls-position="compact" v-model="totalCPU"></b-numberinput>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Total Memory (GB)">
            <b-numberinput min="1" controls-position="compact" v-model="totalRAM"></b-numberinput>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Excepted connections">
            <b-numberinput min="1" controls-position="compact" v-model="maxConnections"></b-numberinput>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column">
      <p class="bd-notification">Database</p>
      <div class="columns is-mobile">
        <div class="column">
          <b-field label="Application profile">
            <b-select placeholder="Select one" v-model="envName" expanded>
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
          <b-field label="PostgreSQL Version">
            <b-select placeholder="Select a version" v-model="pgVersion" expanded>
              <option value="12">12 (Latest)</option>
              <option value="11">11</option>
              <option value="10">10</option>
              <option value="9.6">9.6</option>
              <option value="9.5">9.5</option>
              <option value="9.4">9.4 (EOL)</option>
              <option value="9.3">9.3 (EOL)</option>
              <option value="9.2">9.2 (EOL)</option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {},
  data() {
    return {
      maxConnections: 100,
      pgVersion: 12,
      envName: "WEB",
      totalRAM: 4,
      totalCPU: 2,
      storageType: "ssd",
      arch: "x86-64",
      osType: "linux",
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
