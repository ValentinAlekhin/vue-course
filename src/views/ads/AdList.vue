<template>
  <v-container>
    <v-layout row v-if="!loading && myAds.length">
      <v-flex xs12 sm6 offset-sm-3>
        <h1 class="text--secondary">My ads</h1>
        <v-card class="elevation-10 mb-3" v-for="ad in myAds" :key="ad.id">
          <v-layout row>
            <v-flex xs4>
              <v-img :src="ad.imgSrc" height="160px" />
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row v-else-if="!loading && !myAds.length">
      <v-flex xs12>
        <h1 class="text--primary text-center">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12>
        <h1 class="text--primary">Loading</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds
    },
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>
