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
        <input
          type="password"
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
        <span v-if="errors.has('password')" class="error">{{
          errors.first("password")
        }}</span>
        <span v-else-if="!form.password && !errors.has('password')" class="info"
          >Введите пароль</span
        >
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
