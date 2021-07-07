<template>
  <div class=''>
      <section>
        <el-input
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
        todos: []
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
      addTodo(e) {
            console.log(e.target.value);
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            })
            e.target.value = '';
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

</style>