<template>
  <div id="app">
    <h1>Task Application</h1>
    <Tasks />
    <Add />
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'
import Add from './components/Add.vue'

export default {
  name: 'app',
  components: {
    Tasks,
    Add
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
