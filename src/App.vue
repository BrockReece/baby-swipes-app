<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <keep-alive> <component :is="view"></component> </keep-alive>
        </v-slide-y-transition>
        <v-bottom-nav :value="true" fixed color="#f3ece2">
          <v-btn color="#ffa593" flat value="recent" @click="view = 'Baby';">
            <span>Baby</span>
            <v-icon>face</v-icon>
          </v-btn>

          <v-btn
            color="#ffa593"
            flat
            value="favorites"
            @click="view = 'Names';"
          >
            <span>Names</span>
            <v-icon>thumbs_up_down</v-icon>
          </v-btn>

          <v-btn
            color="#ffa593"
            flat
            value="nearby"
            @click="view = 'Favorites';"
          >
            <span>Favourites</span>
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Favorites from "./components/Favorites";
import Names from "./components/Names";
import Baby from "./components/Baby";

export default {
  name: "App",
  components: {
    Favorites,
    Names,
    Baby
  },

  data() {
    return {
      view: "names"
    };
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
.flex {
  display: relative;
  width: 170px;
  height: 3em;
  self-align: center;
}
.card {
  position: absolute;
  // border: 1px solid;
  // background: white;
  width: 170px;
  text-align: center;
  padding: 2em 0.5em;
  text-decoration: titlecase;
  top: 4em;
}
.card.Female {
  color: white;
  background-color: #e1bec6;
}
.card.Male {
  color: white;
  background-color: #86b1c2;
}
</style>
