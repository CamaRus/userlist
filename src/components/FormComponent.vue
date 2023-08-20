<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          v-validate="'required|email'"
          :class="[
            'form-control',
            {
              'is-invalid':
                errors.has('email') || (!form.email && !errors.has('email')),
            },
          ]"
        />
        <span v-if="errors.has('email')" class="error">{{
          errors.first("email")
        }}</span>
        <span v-else-if="!form.email && !errors.has('email')" class="info"
          >Введите email</span
        >
      </div>

      <div class="form-group">
        <label for="name">Имя:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          :class="[
            'form-control',
            {
              'is-invalid':
                errors.has('name') ||
                (!form.name && !errors.has('name')) ||
                (form.name &&
                  !errors.has('name') &&
                  (form.name.length < minNameLength ||
                    form.name.length > maxNameLength)),
            },
          ]"
        />
        <span v-if="errors.has('name')" class="error">{{
          errors.first("name")
        }}</span>
        <span v-else-if="!form.name && !errors.has('name')" class="info"
          >Введите имя</span
        >
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <div class="input-group">
          <span class="input-group-text"
            ><svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
              @click="togglePasswordVisibility"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>

            <svg
              v-else-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-fill"
              viewBox="0 0 16 16"
              @click="togglePasswordVisibility"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path
                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              />
            </svg>
          </span>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            v-validate="'required|min:6|max:20'"
            :class="[
              'form-control',
              {
                'is-invalid':
                  errors.has('password') ||
                  !form.password ||
                  (form.password &&
                    !errors.has('password') &&
                    (form.password.length < minPasswordLength ||
                      form.password.length > 20)),
              },
            ]"
          />
        </div>
        <div class="input-group-append">
          <span v-if="errors.has('password')" class="error"
            >{{ errors.first("password") }}
          </span>
          <span
            v-else-if="!form.password && !errors.has('password')"
            class="info"
            >Введите пароль</span
          >
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isFormInvalid">
        ДОБАВИТЬ
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
      minNameLength: 2,
      maxNameLength: 20,
      minPasswordLength: 6,
      showPassword: false,
    };
  },

  computed: {
    isFormInvalid() {
      return (
        !this.form.email ||
        !this.form.name ||
        !this.form.password ||
        this.errors.any()
      );
    },
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async submitForm() {
      const result = await this.$validator.validateAll();

      if (result) {
        const data = {
          email: this.form.email,
          name: this.form.name,
          password: this.form.password,
        };

        try {
          const response = await axios.post(
            "https://parseapi.back4app.com/classes/userlist",
            data,
            {
              headers: {
                "X-Parse-Application-Id":
                  "tseW1dDWxz2GjgXkFRdl1i9FvJhoaiZFJqIpolU0",
                "X-Parse-REST-API-Key":
                  "ZWwpgF9OcATXolhPLBVF78ofq7vRrbEqrko7NU7x",
              },
            }
          );

          console.log("Form data saved with back4app:", response.data);
          // Сохраните полученные данные в состоянии Vuex
          this.$store.commit("setFormData", response.data);

          this.form.email = "";
          this.form.name = "";
          this.form.password = "";
        } catch (error) {
          console.error("Error saving form data with back4app:", error);
        }
      }
    },
  },
};
</script>

<style>
.is-invalid {
  border-color: red;
}

.error {
  color: red;
}

.info {
  color: #777;
  font-size: 0.8em;
}
</style>
