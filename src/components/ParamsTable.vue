<template>
  <section class="section" v-if="formattedConfigs.length > 0">
    <div v-for="item in formattedConfigs" :key="item.name" class="container content">
      <h3 class="subtitle">{{ item.name }}</h3>
      <b-table :data="item.params" detailed detail-key="name" :columns="columns" :hoverable="true">
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
  </section>
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
    urlArgs: {
      immediate: true,
      async handler(args) {
        await this.callAPI('/get-config-all-environments', 'show_doc=true&format=json', args);
      }
    }
  },
  data() {
    return {

      fullResponse: undefined,
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
          label: "WEP",
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
    urlArgs() {
      const args = Object.entries(this.form).map(function([k,v]){

        if (k === "total_ram") {
          return `${k}=${v}GB`
        }

        return `${k}=${v}`
      });

      return args.join("&")
    },
    formattedConfigs() {
      if (!this.fullResponse) return [];
      return formatConfigs(this.fullResponse);
    },
  },
  methods: {
    async callAPI(url, opts, args) {
      console.log(this.$http);
      this.$emit("isLoading", true);

      try {
        const response = await this.$http
          .get(
            `${url}?${opts}&${args}`
          );
        this.fullResponse = response.data.data;
      } catch (e) {
            
            this.$buefy.dialog.alert({
                      title: 'Error',
                      message: 'Could not get data from the API: <pre>'+ e +'</pre>',
                      type: 'is-danger',
                      hasIcon: false,
                      icon: 'times-circle',
                      iconPack: 'fa',
                      ariaRole: 'alertdialog',
                      ariaModal: true
                  });
      }
      this.$emit("isLoading", false);
    }
  }
};
</script>
