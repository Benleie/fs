<template>
  <div class=''>
    <h1>回收站</h1>
    <h2>{{ time }}</h2>
    <!-- <div>detailList</div> -->
    <simple-div></simple-div>
  </div>
</template>

<script>
  //import x from ''
  let SimpleDiv = {
    render: (h) => {
      return h('div', 'hhh')
    }
  }
  export default {
    components: { SimpleDiv },
    data() {
      return {
        time: new Date().toLocaleTimeString(),
        detailList: {
          render: (h) => {
            return h('div', 'hhh')
          }
        }
      };
    },
    created(){
      this.$nextTick(function(){
        console.log(this.$el.textContent)
      })
    },
    mounted(){
      this.aaa = 'aaa'
      this.bbb = 'bbb'
      let _this = this
      let count = -1
      this.timer = setInterval(()=> {
        if(++count % 5 === 0) console.log("time changed!")
        _this.time = new Date().toLocaleTimeString()
      }, 1000)
      // console.log(this.$el.children)
      // console.log(this.$el.textContent)
      // console.log(this.$el.textContent)

      // console.log(this.detailList)
    },
    
    destroyed(){
      console.log("destroyed")
      if(this.timer) clearInterval(this.timer)
    },
    /* computed: {
      time(){
        return  new Date().toLocaleTimeString()
      }
    }, */
    methods: {
      
    },
  }
</script>

<style scoped>

</style>