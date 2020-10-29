<template>
  <v-container fill-height class="loginOverlay">
    <v-layout row flex align-center justify-center>
      <v-flex xs11 sm8 md6 elevation-6>
        <v-card>
          <form>
            <v-card-text>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                prepend-icon="mdi-at"
                label="E-mail"
                required
                @blur="$v.email.$touch()"
              />
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                counter="20"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                required
                @blur="$v.password.$touch()"
              />

              <v-card-actions>
                <v-layout justify-center>
                  <v-btn
                    @click="submit"
                    :disabled="$v.$invalid || loading"
                    :loading="loading"
                  >
                    Login
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card-text>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
  }),

  validations: {
    email: { required, email },
    password: { required, minLen: minLength(6) },
  },

  computed: {
    loading() {
      return this.$store.getters.loading
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLen && errors.push('Min length is 6')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  },

  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password,
      }

      this.$store
        .dispatch('loginUser', user)
        .then(() => this.$router.push('/'))
        .catch(e => console.log(e))
    },
  },
}
</script>
