<!-- Template for adding new tasks to DB -->
<template>
  <section class="form">
    <h2>
      Add Task
    </h2>
    <form v-on:submit.prevent="submitForm(form)"> 
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="form.name" class="input" type="text" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" v-model="form.description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Due Date</label>
        <div class="control">
          <input v-model="form.due_date" type="date" name="due_date" required>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
    </div>
  </form>
  <div class="error" v-if='submitError'>
    {{submitError}}
  </div>
  </section>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      form : {
        name: '',
        description: '',
        due_date: ''
      },
      submitError: null
    };
  },
  methods: {
    submitForm(form) {
      // Send post request to API container  with form data to create new task record
      var postUrl = "http://localhost:3000/api/v1/tasks";
      var that = this;
      this.axios.post(postUrl, form).then(function (response) {
        that.$store.dispatch('fetchTasks');
        form.name = "";
        form.description = "";
        form.due_date = "";
      })
      .catch(function (error) {
        console.log(error);
        that.submitError = error;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  margin: 50px auto;
  border: 1px solid black;
  width: 20%;
}
form {
  margin-bottom: 25px;
}
</style>
