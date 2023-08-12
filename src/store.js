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
          "X-Parse-Application-Id": "3v1aZzPytipLS46BOfnMNCJYaR7IEYbUknS4vFJH",
          "X-Parse-REST-API-Key": "6AMBeXomEScKAJD40KD3UOcaFNhjWnWAtoGxJEmG",
        },
      };

      try {
        const response = await axios.get(
          "https://parseapi.back4app.com/classes/users",
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
