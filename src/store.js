import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isDropDownVisible: false,
    userlist: [],
  },

  mutations: {
    setFormData(state, data) {
      state.userlist = data;
    },
  },

  actions: {
    async fetchDataFromServer({ commit }) {
      // Замените 'your-app-id' и 'your-rest-api-key' на реальные значения вашего back4app проекта
      const headers = {
        headers: {
          "X-Parse-Application-Id": "ndsOadIQgsFoirb5cAvvz0VgLGkTKn1y7yQlzDBU",
          "X-Parse-REST-API-Key": "CYYbRWsdEWftbz5Tqxhet5a1njrrYd0xlMOiRdES",
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
