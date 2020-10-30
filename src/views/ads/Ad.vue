<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img :src="ad.imgSrc" height="300px" :alt="ad.title" />
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <EditAdModal :ad="ad" v-if="idOwner" />
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
  components: {
    EditAdModal,
  },
  props: ['id'],
  computed: {
    ad() {
      return this.$store.getters.adById(this.id)
    },
    loading() {
      return this.$store.getters.loading
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.userId
    },
  },
}
</script>
