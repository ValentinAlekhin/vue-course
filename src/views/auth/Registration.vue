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
              <v-text-field
                v-model="repeatPassword"
                :error-messages="repeatPasswordErrors"
                counter="20"
                prepend-icon="mdi-lock"
                label="Confirm password"
                type="password"
                required
                @blur="$v.repeatPassword.$touch()"
              />

              <v-card-actions>
                <v-layout justify-center>
                  <v-btn @click="submit" :disabled="$v.$invalid">
                    Create Account
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
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
    repeatPassword: '',
  }),

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLen: minLength(6) },
    repeatPassword: { required, sameAs: sameAs('password') },
  },

  computed: {
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
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAs && errors.push('Passwords not match')
      !this.$v.repeatPassword.required && errors.push('Password is required')
      return errors
    },
  },

  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password,
      }

      console.log(user)
    },
  },
}
</script>
