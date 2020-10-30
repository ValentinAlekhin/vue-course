<template>
  <v-dialog width="500" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Edit</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Edit ad
      </v-card-title>

      <v-card-text>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="editedTitle"
              :error-messages="titleErrors"
              label="Title"
              required
              @blur="$v.editedTitle.$touch()"
            />
            <v-textarea
              v-model="editedDescription"
              type="text"
              :error-messages="descriptionErrors"
              label="Description"
              required
              :counter="200"
              multi-line
              @blur="$v.editedDescription.$touch()"
            />
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="onCancel">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="onSave" :disabled="$v.$invalid">
          Accept
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description,
    }
  },

  methods: {
    onCancel() {
      this.editedTitle = this.ad.title
      this.editedDescription = this.ad.description
      this.modal = false
    },
    onSave() {
      this.$store.dispatch('updateAd', {
        title: this.editedTitle,
        description: this.editedDescription,
        id: this.ad.id,
      })
      this.modal = false
    },
  },

  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.editedTitle.$dirty) return errors
      !this.$v.editedTitle.minLen && errors.push('Min lenght is 4')
      !this.$v.editedTitle.required && errors.push('Title is required')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.editedDescription.$dirty) return errors
      !this.$v.editedDescription.minLen && errors.push('Min lenght is 10')
      !this.$v.editedDescription.maxLen && errors.push('Max lenght is 200')
      !this.$v.editedDescription.required && errors.push('Title is required')
      return errors
    },
  },

  validations: {
    editedTitle: {
      required,
      minLen: minLength(4),
    },
    editedDescription: {
      required,
      minLen: minLength(20),
      maxLen: maxLength(200),
    },
  },
}
</script>

<style lang="scss" scoped></style>
