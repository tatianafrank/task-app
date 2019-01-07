<!-- Template for listing and filtering user's tasks -->
<template>
  <section>
  <!-- Filters -->
    <select v-model="selected" v-on:change="filterTasks()">
      <option disabled value="">Filter by</option>
      <option>Completed</option>
      <option>Overdue</option>
      <option>Due Today/Tomorrow</option>
      <option>All</option>
    </select>
  <!-- Table of tasks  -->
    <table :state="tasks">
      <tr>
        <th>
          Name
        </th>
        <th>
          Description
        </th>
        <th>
          Due Date
        </th>
        <th>
          Completed
        </th>
        <th>
          Delete
        </th>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>
          {{task.value.name}}
        </td>
        <td>
          {{task.value.description}}
        </td>
        <td>
          {{task.value.due_date}}
          <!-- Indicator for overdue tasks -->
          <b>{{task.value.due_date | overdue}}{{task.value.due_date | todtom}}</b>
        </td>
        <td>
          <!-- Checkbox to toggle completion of task and update database record -->
          <input type="checkbox" v-bind:id="task.value.completed" v-model="task.value.completed" :checked="task.value.completed" v-on:change="update(task.id, $event.target.checked)">
        </td>
        <td>
          <!-- Checkbox to delete task from database and remove from table -->
          <input type="checkbox" v-bind:id="task.id" v-on:change="deleteTask(task.id, $event.target.checked)">
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
// Map state of tasks in table to Vuex state to make task data in table reactive
import { mapState } from 'vuex'
const HOST = process.env.API_HOST || 'localhost';
export default {
  name: 'Task',
  data() {
    return {
      selected: ''
    }
  },
  computed: mapState({
    tasks: state => state.filtered 
  }),
  methods: {
    update(taskId, checked) {
      // Update task as complete or incomplete in the DB
      var postUrl = "http://localhost:3000/api/v1/tasks/" + taskId + "/update";
      var formData = {"completed": checked};
      this.axios.put(postUrl, formData).then(function (response) {
        console.log("response:",response);
      })
      .catch(function (error) {
        console.log("tasks error",error);
      });
    },
    filterTasks() {
      // When a filter is selected, the corresponding getter is passed to updateFiltered function in store.js
      if(this.selected == 'Completed') {
        this.$store.commit('updateFiltered', this.$store.getters.completedItems)
      } else if(this.selected == 'Overdue'){
        this.$store.commit('updateFiltered', this.$store.getters.overdueItems)
      } else if(this.selected == 'All') {
        this.$store.commit('updateFiltered', this.$store.getters.allItems)
      } else if(this.selected == 'Due Today/Tomorrow') {
        this.$store.commit('updateFiltered', this.$store.getters.todtomItems)
      }
    },
    deleteTask(taskId, checked) {
      // Delete task from database and call store to update tasks in template
      if(checked) {
        var deleteUrl = `http://${HOST}:3000/api/v1/tasks/${taskId}/delete`;
        var that = this;
        that.axios.delete(deleteUrl).then(function (response) {
          console.log("response:",response);
          that.$store.dispatch('fetchTasks')
        })
        .catch(function (error) {
          console.log("tasks error",error);
        });
      }
    }
  },
  created() {
    // Initialize store with tasks from database
    this.$store.dispatch('fetchTasks')
  },
  filters: {
    overdue: function (value) {
      // Compare task due date to today's date to mark task as 'overdue' in template
      if (!value) return ''
      var today = new Date()
      var due_date = new Date(value);
      if(due_date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
        value = '(overdue)'
      } else {
        value = ''
      }
      return value
    },
    todtom: function(value) {
      // Compare task due date to today and tomorrow to mark task as 'due soon' in template
      var today = new Date()
      var tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      var due_date = new Date(value);
      if(due_date.setHours(0,0,0,0) == today.setHours(0,0,0,0) ||
         due_date.setHours(0,0,0,0) == tomorrow.setHours(0,0,0,0)) 
      {
        return '(due soon)'
      }
      
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  width: 100%;
}
th, td {
  margin: 10px 15px;
  white-space: wrap;
}
</style>
