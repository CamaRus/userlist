<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr class="table-primary">
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Password</th>
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col"></th>
          <!-- Столбец для кнопки редактирования -->
          <th scope="col"></th>
          <!-- Столбец для кнопки удаления -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in form.results" :key="index">
          <td>{{ result.email }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.password }}</td>
          <td>{{ result.createdAt }}</td>
          <td>{{ result.updatedAt }}</td>
          <td>
            <button @click="openEditModal(index)" class="btn btn-primary">
              РЕДАКТИРОВАТЬ
            </button>
          </td>

          <td>
            <button @click="deleteFormData(index)" class="btn btn-danger">
              УДАЛИТЬ
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Модальное окно для редактирования данных -->
    <b-modal
      id="edit-modal"
      title="Edit Data"
      class="modal fade"
      ref="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- <div class="modal-header"> -->
          <!-- <h5 class="modal-title" id="editModalLabel">Edit Data</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> -->
          <!-- </div> -->
          <div class="modal-body">
            <!-- Форма для редактирования данных -->
            <form @submit.prevent="saveEditedData">
              <div class="form-group">
                <label for="editEmail">Email</label>
                <input
                  v-model="editedFormData.email"
                  type="email"
                  class="form-control"
                  id="editEmail"
                  required
                />
              </div>
              <div class="form-group">
                <label for="editName">Name</label>
                <input
                  v-model="editedFormData.name"
                  type="text"
                  class="form-control"
                  id="editName"
                  required
                />
              </div>
              <div class="form-group">
                <label for="editPassword">Password</label>
                <input
                  v-model="editedFormData.password"
                  type="password"
                  class="form-control"
                  id="editPassword"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["form"]),
  },

  data() {
    return {
      editedFormData: {
        email: "",
        name: "",
        password: "",
        // updatedAt: new Date(),
        // createdAt: new Date(),
      },
    };
  },

  mounted() {
    this.$store.dispatch("fetchDataFromServer");
  },

  updated() {
    this.$store.dispatch("fetchDataFromServer");
  },

  // beforeUpdate() {
  //   this.$store.dispatch("fetchDataFromServer");
  // },

  // created() {
  //   this.$store.dispatch("fetchDataFromServer");
  // },

  methods: {
    openEditModal(index) {
      const formData = this.form.results[index];
      this.editedFormData = { ...formData };

      // Открываем модальное окно с помощью $bvModal
      this.$bvModal.show("edit-modal");
    },

    // Сохранить отредактированные данные
    async saveEditedData() {
      try {
        const response = await axios.put(
          `https://parseapi.back4app.com/classes/userlist/${this.editedFormData.objectId}`,
          this.editedFormData,
          {
            headers: {
              "X-Parse-Application-Id":
                "tseW1dDWxz2GjgXkFRdl1i9FvJhoaiZFJqIpolU0",
              "X-Parse-REST-API-Key":
                "ZWwpgF9OcATXolhPLBVF78ofq7vRrbEqrko7NU7x",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Form data updated with back4app:", response.data);

        // Обновите состояние Vuex с обновленными данными
        this.$store.dispatch("fetchDataFromServer");

        // Сохраните полученные данные в состоянии Vuex
        this.$store.commit("setFormData", this.editedFormData);

        this.$bvModal.hide("edit-modal");
      } catch (error) {
        console.error("Error updating form data with back4app:", error);
      }
    },

    async deleteFormData(index) {
      const form = this.form.results[index];

      try {
        const response = await axios.delete(
          `https://parseapi.back4app.com/classes/userlist/${form.objectId}`,
          {
            headers: {
              "X-Parse-Application-Id":
                "tseW1dDWxz2GjgXkFRdl1i9FvJhoaiZFJqIpolU0",
              "X-Parse-REST-API-Key":
                "ZWwpgF9OcATXolhPLBVF78ofq7vRrbEqrko7NU7x",
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
