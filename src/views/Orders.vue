<template>
  <v-container>
    <v-layout row>
      <v-flex xs class="center fixed" v-if="loading">
        <v-progress-circular
          :size="100"
          :width="5"
          color="#BDBDBD"
          indeterminate
        />
      </v-flex>

      <v-flex xs12 md6 offset-sm-3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list flat subheader three-line>
          <v-list-item v-for="order in orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox
                @click="markDone(order)"
                :input-value="order.done"
                color="success"
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.phone }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>

      <v-flex xs class="center fixed" v-else>
        <h1 class="text-secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading
    },

    orders() {
      return this.$store.getters.orders
    },
  },

  methods: {
    markDone(order) {
      order.done = true
    },
  },

  created() {
    this.$store.dispatch('fetchOrders')
  },
}
</script>
