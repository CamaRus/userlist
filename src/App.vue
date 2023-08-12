<template>
  <div id="app">
    <h1>Список пользователей</h1>
    <FormComponent />
    <FormDataGet />
  </div>
</template>

<script>
import FormComponent from "./components/FormComponent.vue";
import FormDataGet from "./components/FormDataGet.vue";

export default {
  components: {
    FormComponent,
    FormDataGet,
  },
};
</script>

<style>
/* Стили для App.vue */
h1 {
  text-align: center;
}
</style>
