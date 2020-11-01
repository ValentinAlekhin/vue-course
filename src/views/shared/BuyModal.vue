<template>
  <v-dialog width="500" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Buy</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Do you want to buy
      </v-card-title>

      <v-card-text>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :disabled="localLoading"
              label="Name"
              required
              @blur="$v.name.$touch()"
            />
            <v-text-field
              v-model="phone"
              type="text"
              :error-messages="phoneErrors"
              :disabled="localLoading"
              label="Phone"
              required
              @blur="$v.phone.$touch()"
            />
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="onCancel">
          Close
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="onSave"
          :disabled="$v.$invalid"
          :loading="localLoading"
        >
          Buy it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  props: ['ad'],

  data() {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false,
    }
  },

  methods: {
    onCancel() {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave() {
      this.localLoading = true
      this.$store
        .dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId,
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.modal = false
        })
    },
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLen && errors.push('Min lenght is 4')
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.minLen && errors.push('Min lenght is 7')
      !this.$v.phone.required && errors.push('Title is required')
      return errors
    },
  },

  validations: {
    name: {
      required,
      minLen: minLength(4),
    },
    phone: {
      required,
      minLen: minLength(7),
    },
  },
}
</script>

<style lang="scss" scoped></style>
