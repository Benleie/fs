<template>
  <div class=''>
    <header class="main-header">
      <h1>Htodo</h1>
    </header>
    <section class="todo-app">
      <el-input
        v-model="inputValue"
        placeholder="做爱做的事"
        @change="addTodo"
      />
      <Item
          :todo="todo"
          v-for="todo in filteredTodos"
          :key="todo.id"
          @del="deleteTodo"
      />

      <Tabs 
          :filter="filter" 
          :todos="todos"
          @toggleTabs="toggleFilter"
          @clearAll="clearAllCompleted"
      />

    </section>
  </div>
</template>

<script>
  //import x from ''
  import Item from "./item.vue"
  import Tabs from "./tabs.vue"

  let id = 0
  export default {
    components: {
      Item, 
      Tabs
    },
    data() {
      return {
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('todolist')) || [],
        filter: "all"
      };
    },
    computed: {
      filteredTodos() {
        if (this.filter === 'all')  return this.todos
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo() {
            // console.log(e.target.value);
            const lastTodo = this.todos[this.todos.length - 1]
            this.todos.unshift({
                id: lastTodo ? lastTodo.id++ : 0,
                content: this.inputValue.trim(),
                completed: false
            })
            this.inputValue = '';
            localStorage.setItem('todolist', JSON.stringify(this.todos))
            console.log(this.todos)
            console.log(id)
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id) ,1)
        },
        toggleFilter(state) {
            this.filter = state
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
  }
</script>

<style lang='scss' scoped>
//@import url()
.main-header {
  text-align: center;
  h1 {
    font-size: 100px;
    color: rgba(175,47,47,0.4);
    font-weight: 100;
    margin: 20px;
  }
}
.todo-app {
  width: 600px;
  margin: 0 auto;
}

</style>