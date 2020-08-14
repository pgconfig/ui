<template>
  <section class="section" v-if="formattedConfigs.length > 0">
    <div v-for="item in formattedConfigs" :key="item.name" class="container">
      <h1 class="subtitle">{{ item.name }}</h1>
      <b-table :data="item.params" :columns="columns"></b-table>
    </div>

    <!-- <pre>{{ data }}</pre> -->
  </section>
</template>

<script>
import { formatConfigs } from "../services/formatters";

export default {
  name: "ParamsTable",
  props: {},
  data() {
    return {
      fullResponse: undefined,
      columns: [
        {
          field: "name"
        },
        {
          field: "default",
          label: "Default Value"
        },
        {
          field: "web",
          label: "WEP"
        },
        {
          field: "oltp",
          label: "OLTP"
        },
        {
          field: "dw",
          label: "DW"
        },
        {
          field: "mixed",
          label: "Mixed"
        },
        {
          field: "desktop",
          label: "Desktop"
        }
        // {
        //     field: 'id',
        //     label: 'ID',
        //     width: '40',
        //     numeric: true
        // },
        // {
        //     field: 'first_name',
        //     label: 'First Name',
        // },
        // {
        //     field: 'last_name',
        //     label: 'Last Name',
        // },
        // {
        //     field: 'date',
        //     label: 'Date',
        //     centered: true
        // },
        // {
        //     field: 'gender',
        //     label: 'Gender',
        // }
      ]
    };
  },

  async created() {
    console.log(this.$http);
    try {
      const response = await this.$http.get(
        "/get-config-all-environments?arch=x86-64&cpus=1&drive_type=SSD&environment_name=WEB&format=json&max_connections=100&os_type=Linux&pg_version=12&total_ram=2GB"
      );
      console.log("asdsdadasds", response);
      this.fullResponse = response.data.data;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    formattedConfigs() {
      if (!this.fullResponse) return [];
      return formatConfigs(this.fullResponse);
    }
  }
};
</script>
