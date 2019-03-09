<template>
  <div>
    <v-subheader>Matches</v-subheader>
    <v-list class="mb-5">
      <template v-for="match in matches">
        <v-list-tile :key="match"> {{ match }} </v-list-tile>
        <v-divider :key="`${match}-divider`"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import { getMatches } from "../firebase";

export default {
  data() {
    return {
      matches: []
    };
  },
  mounted() {
    getMatches("1", "2").then(data => {
      this.matches = data.map(name => name.name);
    });
  }
};
</script>
