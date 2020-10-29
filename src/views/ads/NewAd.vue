<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <h1 class="text--secondary mb-3">Create new add</h1>

        <form>
          <v-card-text>
            <v-text-field
              v-model="title"
              type="text"
              :error-messages="titleErrors"
              label="Title"
              required
              @blur="$v.title.$touch()"
            />

            <v-textarea
              v-model="description"
              type="text"
              :error-messages="descriptionErrors"
              label="Description"
              required
              :counter="200"
              multi-line
              @blur="$v.description.$touch()"
            />
          </v-card-text>
          <v-layout row>
            <v-flex xs12>
              <v-btn
                color="blue-grey"
                class="ma-2 white--text mb-3"
                @click="triggerUpload"
              >
                Upload
                <v-icon right dark>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="onFileChange"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-img :src="imageSrc" alt="" height="150" v-if="imageSrc" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-switch v-model="promo" label="Add to promo"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-btn
                class="succsess"
                @click="createAdd"
                :disabled="$v.$invalid || !image || loading"
                :loading="loading"
              >
                Create add
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    description: '',
    promo: false,
    image: null,
    imageSrc: '',
  }),

  validations: {
    title: { required, minLen: minLength(4) },
    description: {
      required,
      minLen: minLength(20),
      maxLen: maxLength(200),
    },
  },

  methods: {
    createAdd() {
      const ad = {
        title: this.title,
        description: this.description,
        promo: this.promo,
        image: this.image,
      }

      this.$store
        .dispatch('createAd', ad)
        .then(() => this.$router.push('/list'))
        .catch(() => {})
    },
    triggerUpload() {
      this.$refs.fileInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => (this.imageSrc = reader.result)
      reader.readAsDataURL(file)
      this.image = file
    },
  },

  computed: {
    loading() {
      return this.$store.getters.loading
    },
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLen && errors.push('Min lenght is 4')
      !this.$v.title.required && errors.push('Title is required')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.minLen && errors.push('Min lenght is 10')
      !this.$v.description.maxLen && errors.push('Max lenght is 200')
      !this.$v.description.required && errors.push('Title is required')
      return errors
    },
  },
}
</script>
