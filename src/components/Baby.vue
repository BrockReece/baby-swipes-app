<template>
  <v-form>
    <v-text-field v-model="baby.surname" label="Surname"></v-text-field>
    <v-select v-model="gender" :items="genders" label="Gender"></v-select>
    <v-btn @click="setBaby">Save</v-btn>
    <!-- <v-btn @click="importNames">Import</v-btn> -->
  </v-form>
</template>

<script>
import { getBaby, setBaby, importNames } from "../firebase";

export default {
  data() {
    return {
      baby: {},
      genders: ["Male", "Female", "Unknown"]
    };
  },

  computed: {
    gender: {
      get() {
        return this.baby.gender || "Unknown";
      },
      set(val) {
        this.$set(this.baby, "gender", val === "Unknown" ? null : val);
      }
    }
  },

  methods: {
    setBaby() {
      setBaby(this.baby);
    },
    importNames() {
      importNames();
    }
  },

  mounted: async function() {
    this.baby = await getBaby();
  }
};
</script>
