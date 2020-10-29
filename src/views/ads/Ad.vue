<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
            height="300px"
            alt=""
          />
          <v-card-text>
            <h1 class="text--primary">Lorem</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              dolores laudantium vitae asperiores earum distinctio iusto natus,
              blanditiis corrupti laboriosam.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn>Edit</v-btn>
            <v-btn class="success">Bye</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
}
</script>
