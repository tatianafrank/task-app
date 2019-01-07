import Vue from "vue";
import Vuex from "vuex";
const HOST = process.env.API_HOST || 'localhost';

Vue.use(Vuex);
// Manage state for updated and filtered tasks 
const store = new Vuex.Store({
  state: {
    tasks: [],
    filtered: []
  },  
  mutations: {
    updateTasks(state, tasks) {
        state.tasks = tasks
        state.filtered = tasks  
    },
    updateFiltered(state, tasks) {
      state.filtered = tasks
    }
  },
  actions: {
    // Get all tasks from database and update store/state using mutation
    fetchTasks()  {
      Vue.axios.get(`http://${HOST}:3000/api/v1/tasks`)
        .then((response) => {
            this.commit("updateTasks", response.data);
        })
        .catch((error => {
            console.log("store error", error.statusText)
        }))
    }
  },
  getters: {
    // Getters used for returning filtered tasks by selected filter in template dropdown
    allItems: state => {
      return state.tasks
    },
    completedItems: state => {
      return state.tasks.filter(item => item.value.completed)
    },
    overdueItems: state => {
      // Use javascript Date object to get today's date/ normalize datetimes to compare dates and not timestamps
      var today = new Date()
      return state.tasks.filter(item => {
         var due_date = new Date(item.value.due_date);
         return due_date.setHours(0,0,0,0) < today.setHours(0,0,0,0)
      })
    },
    todtomItems: state => {
      var today = new Date()
      var tomorrow = new Date(today.setDate(today.getDate() + 1))
      return state.tasks.filter(item => {
         var due_date = new Date(item.value.due_date);
         return due_date.setHours(0,0,0,0) == today.setHours(0,0,0,0) ||
                due_date.setHours(0,0,0,0) == tomorrow.setHours(0,0,0,0)
      })
    }
  }
});

export default store;
