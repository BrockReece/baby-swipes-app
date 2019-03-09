<template>
  <v-layout column align-center>
    <v-progress-circular
      v-if="loading"
      :width="5"
      :size="70"
      color="teal"
      indeterminate
    ></v-progress-circular>
    <v-flex xs6>
      <vue-swing
        @throwoutleft="swipeLeft(name);"
        @throwoutright="swipeRight(name);"
        v-for="name in names"
        :key="name.id"
      >
        <v-card class="headline card" :class="{ [name.gender]: true }">
          <div>{{ name.name }}</div>
          <small>{{ baby.surname }}</small>
        </v-card>
      </vue-swing>
    </v-flex>
  </v-layout>
</template>

<script>
import { getNames, getBaby, sendResult } from "../firebase";

export default {
  name: "Names",

  methods: {
    swipeLeft(name) {
      this.names.splice(this.names.length - 1, 1);
      sendResult(name, false);
    },
    swipeRight(name) {
      this.names.splice(this.names.length - 1, 1);
      sendResult(name, true);
    }
  },
  data() {
    return {
      loading: true,
      baby: {},
      names: [],
      view: "baby"
    };
  },
  mounted: async function() {
    this.baby = await getBaby();
    getNames(this.baby).then(names => {
      this.names = names.reverse();
      this.loading = false;
    });
  },

  watch: {
    names(val) {
      if (val.length < 10) {
        getNames(this.baby).then(names => {
          this.names = [...names.reverse(), ...this.names];
          console.log(this.names);
        });
      }
    }
  }
};
</script>
