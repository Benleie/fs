<template>
  <div class="helper">
      <span class="left"> 
          {{ uncompletedTodoLength}} items left
      </span>
      <span class="tabs">
          <span
            v-for="state in states"
            :key="state"
            :class="[state, filter === state ? 'actived' : '']"
            @click="toggleFilter(state)"
          >    
            {{ state }} 
          </span>
      </span>
      <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
export default {
    props:{
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    computed: {
        uncompletedTodoLength(){
            return this.todos.filter(todo => !todo.completed).length
        }
    },
    data() {
        return {
            states: ['all', 'active',   'completed']
        }
    },
    methods: {
        toggleFilter(state){
            this.$emit("toggleTabs", state)
        },
        clearAllCompleted() { this.$emit('clearAll') } 
    }
}
</script>

<style lang="stylus" scoped>
    
</style>
