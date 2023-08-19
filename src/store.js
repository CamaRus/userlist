import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDropDownVisible: false,
    form: [],
  },

  mutations: {
    setFormData(state, data) {
      state.form = data;
    },

    // removeFormData(state, index) {
    //   state.form.splice(index, 1);
    // },
  },

  actions: {
    async fetchDataFromServer({ commit }) {
      // Замените 'your-app-id' и 'your-rest-api-key' на реальные значения вашего back4app проекта
      const headers = {
        headers: {
          "X-Parse-Application-Id": "tseW1dDWxz2GjgXkFRdl1i9FvJhoaiZFJqIpolU0",
          "X-Parse-REST-API-Key": "ZWwpgF9OcATXolhPLBVF78ofq7vRrbEqrko7NU7x",
        },
      };

      try {
        const response = await axios.get(
          "https://parseapi.back4app.com/classes/userlist",
          headers
        );
        commit("setFormData", response.data);
      } catch (error) {
        console.error("Error fetching data from back4app:", error);
      }
    },
  },

  getters: {},
});

export default store;
