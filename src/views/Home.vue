<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imgSrc"
            >
              <div class="car-link center">
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

  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs class="center fixed">
          <v-progress-circular
            :size="100"
            :width="5"
            color="#BDBDBD"
            indeterminate
          />
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
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>

<style scoped>
.car-link {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 40px;
  border-radius: 5px;
}

.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fixed {
  position: fixed;
}
</style>
