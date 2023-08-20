<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr class="table-primary">
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Password</th>
          <th scope="col">Дата создания</th>
          <th scope="col">Дата изменения</th>
          <th scope="col"></th>
          <!-- Столбец для кнопки редактирования -->
          <th scope="col"></th>
          <!-- Столбец для кнопки удаления -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in userlist.results" :key="index">
          <td>{{ result.email }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.password }}</td>
          <!-- <td>{{ result.createdAt }}</td> -->
          <td>{{ formatDate(result.createdAt) }}</td>
          <td>{{ formatDate(result.updatedAt) }}</td>
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
      title="РЕДАКТИРОВАТЬ ПОЛЬЗОВАТЕЛЯ"
      class="modal fade"
      ref="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <!-- Форма для редактирования данных -->
            <form @submit.prevent="updateFormData">
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
                СОХРАНИТЬ ИЗМЕНЕНИЯ
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
import Parse from "parse";
import moment from "moment";

export default {
  computed: {
    ...mapState(["userlist"]),
  },

  data() {
    return {
      editedFormData: {
        email: "",
        name: "",
        password: "",
      },
    };
  },

  mounted() {
    this.$store.dispatch("fetchDataFromServer");
  },

  updated() {
    this.$store.dispatch("fetchDataFromServer");
  },

  methods: {
    openEditModal(index) {
      const formData = this.userlist.results[index];
      this.editedFormData = { ...formData };

      // Открываем модальное окно с помощью $bvModal
      this.$bvModal.show("edit-modal");
    },

    formatDate(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("DD.MM.YYYY HH:mm");
      return formattedDate;
    },

    updateFormData() {
      const formData = this.editedFormData;

      const updatedData = {
        ...formData,
        // Здесь вы можете изменить какие-либо поля
      };

      const MyParseClass = Parse.Object.extend("userlist");
      const query = new Parse.Query(MyParseClass);

      query
        .get(formData.objectId)
        .then((object) => {
          // Обновляем поля объекта с обновленными данными
          Object.keys(updatedData).forEach((key) => {
            object.set(key, updatedData[key]);
          });

          // Сохраняем изменения
          return object.save();
        })
        .then((response) => {
          console.log("Form data updated with Parse SDK:", response);
        })
        .catch((error) => {
          console.error("Error updating form data with Parse SDK:", error);
        });
    },

    async deleteFormData(index) {
      const form = this.userlist.results[index];

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
      } catch (error) {
        console.error("Error deleting form data with back4app:", error);
      }
    },
  },
};
</script>
<style>
table {
  margin-top: 25px;
}
</style>
