<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr class="table-primary">
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Password</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in form.results" :key="index">
          <td>{{ result.email }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.password }}</td>
          <td>
            <button @click="deleteFormData(index)" class="btn btn-danger">
              УДАЛИТЬ
              <!-- Иконка удаления (используется Bootstrap Icons) -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["form"]),
  },

  mounted() {
    this.$store.dispatch("fetchDataFromServer");
  },

  updated() {
    this.$store.dispatch("fetchDataFromServer");
  },

  methods: {
    async deleteFormData(index) {
      const form = this.form.results[index];

      try {
        const response = await axios.delete(
          `https://parseapi.back4app.com/classes/users/${form.objectId}`,
          {
            headers: {
              "X-Parse-Application-Id":
                "3v1aZzPytipLS46BOfnMNCJYaR7IEYbUknS4vFJH",
              "X-Parse-REST-API-Key":
                "6AMBeXomEScKAJD40KD3UOcaFNhjWnWAtoGxJEmG",
            },
          }
        );

        console.log("Form data deleted with back4app:", response.data);

        // Обновите состояние Vuex, удалив удаленные данные
        // this.$store.commit("removeFormData", index);
      } catch (error) {
        console.error("Error deleting form data with back4app:", error);
      }
    },
  },
};
</script>
