<template>
  <section class="section">
    <div v-for="item in data" :key="item.name" class="container">
      <h1 class="subtitle">{{ item.name }}</h1>
      <b-table :data="item.params" :columns="columns"></b-table>
    </div>

    <pre>{{data}}</pre>
  </section>
</template>

<script>
// import axios from "axios";

export default {
  name: "ParamsTable",
  props: {},
  data() {
    return {
      data: 
        [
          { 
            name: 'Memory stuff',
            params: [
              { 'name': 'shared_bufffers', 'default': '128MB', 'web': '2GB', 'oltp': '2GB', 'dw':'2GB', 'mixed':'1GB', 'desktop': '512MB'},
              { 'name': 'param 2', 'default': '128MB', 'web': '2GB', 'oltp': '2GB', 'dw':'2GB', 'mixed':'1GB', 'desktop': '512MB'},
            ]
           },
          { 
            name: 'Category 2',
            params: [
              { 'name': 'shared_bufffers', 'default': '128MB', 'web': '2GB', 'oltp': '2GB', 'dw':'2GB', 'mixed':'1GB', 'desktop': '512MB'},
              { 'name': 'param 2', 'default': '128MB', 'web': '2GB', 'oltp': '2GB', 'dw':'2GB', 'mixed':'1GB', 'desktop': '512MB'},
            ]
           },
        ],
      fullResponse: {},
      columns: [
        {
          field: "name",
        },
        {
          field: "default",
          label: "Default Value",
        },
        {
          field: "web",
          label: "WEP",
        },
        {
          field: "oltp",
          label: "OLTP",
        },
        {
          field: "dw",
          label: "DW",
        },
        {
          field: "mixed",
          label: "Mixed",
        },
        {
          field: "desktop",
          label: "Desktop",
        },
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
      ],
    };
  },

  // mounted() {
  //   axios
  //     .get(
  //       "https://api.pgconfig.org/v1/tuning/get-config-all-environments?arch=x86-64&cpus=1&drive_type=SSD&environment_name=WEB&format=json&max_connections=100&os_type=Linux&pg_version=12&total_ram=2GB"
  //     )
  //     .then(response => {


  //       // let env
  //       // for (let i = 0; i < response.data.length; i++) {
  //       //   const element = response.data[i];
          
  //       // }
  //       // this.fullResponse = response.data;
  //       // this.data = response.data.data[0].configuration; 
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
