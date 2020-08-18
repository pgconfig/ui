<template>
  <div class="columns">
    <div class="column">
      <b-tabs position="is-right" class="block">
        <b-tab-item label="Profile Comparison" icon="select-compare">
          <comparison-table :fullResponse="fullResponse" :pgVersion="pgVersion"></comparison-table>
        </b-tab-item>
        <b-tab-item label="Export" icon="code-tags">
          <export-config  v-on:changingForm="formChange" :exportedResponse="exportedResponse" ></export-config>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import ComparisonTable from "./ComparisonTable.vue";
import ExportConfig from "./ExportConfig.vue";

export default {
  name: "Tabs",
  props: {
    fullResponse: {
      type: Array,
      required: true,
    },
    exportedResponse: {
      type: Object,
      required: true,
    },
    pgVersion: {
      type: String,
      required: true,
    },
  },
  components: {
    ComparisonTable,
    ExportConfig,
  },
  methods: {
    formChange(newForm) {
      this.$emit('changingForm', newForm);
    }
  }
};
</script>

<style>
</style>
