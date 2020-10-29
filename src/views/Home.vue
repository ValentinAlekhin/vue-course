<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imgSrc"
            >
              <div class="car-link">
                <v-btn :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="ad in ads" :key="ad.id">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.imgSrc"
            >
              <v-card-title>{{ ad.title }}</v-card-title>
            </v-img>

            <v-card-text class="text--primary">
              <p>{{ ad.description }}</p>
            </v-card-text>

            <v-card-actions>
              <v-btn text :to="'/ad/' + ad.id">
                Open
              </v-btn>

              <v-btn text>
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    ads() {
      return this.$store.getters.ads
    },
    promoAds() {
      return this.$store.getters.promoAds
    },
  },
}
</script>

<style scoped>
.car-link {
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  border-radius: 5px;
}
</style>
