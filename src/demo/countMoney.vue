<template>
  <div class='counter'>
    <h1>counter</h1>
      
    <div id="ppp" title1="name">Property && Attribute</div>
    <main class="todo-main">
      <section class="card">
        <header>
          <span>总收入：</span>
          <span>{{ total }}</span>
        </header>
        <div>
          <h3>timeLog</h3>
        </div>
        
      </section>

      <section class="card">
        <el-row>
          <!-- <el-button type="primary" icon="el-icon-plus" circle @click="addPeople"></el-button> -->
          <el-input 
            v-model="inputName"
            placeholder="添加新成员"
            class="add-member"
            @change="addPeople"
          />
        </el-row>
        <counter
          v-for="person in people"
          :key="person.name"
          :name="person.name"
          :scoreSmall.sync='person.size'
        />
      </section>
    </main>
    

    
    
    
    
    
  </div>
  
</template>

<script>
  import Counter from './counter.vue'
  export default {
    components: {Counter},
    data() {
      return {
        one: 20,
        two: 20,
        three: 20,
        four: 20,
        people: [
          { name: 'Lebron', size: 50 },
          { name: 'JR', size: 20 },
        ],
        inputName: ''
      };
    },
    
    beforeMount(){
      // console.log(document)
      // console.log(document.getElementById('ppp'))
    },
    mounted(){
      let divP = document.getElementById('ppp')
      console.log(divP)
    },
    computed: {
      total() {
        // let count = 0;
        // this.people.forEach(value => {
        //   count += value.size
        // })
        return this.people.reduce(((sum, curr) => sum + curr.size), 0)
      }
    },
    methods: {
      addPeople() {
        this.people.push({
          name: this.inputName || 'sss',
          // 10-50
          size: Math.floor(Math.random()*5) * 10 + 10
        })
        this.inputName = ''
      }
    },
  }
</script>

<style lang='scss' scoped>
//@import url()
.counter {
  font-size: 20px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-member {
  // margin-left: 10em;
  width: 20em;
}

.todo-main {
  display: flex;
  justify-content: space-between;
  padding-top: 3em;
}
.todo-main > :last-child {
  margin-left: 1em;
}
.card {
  // margin-top: 3em;
  padding: 1em;
  // width: 50%;
  border:1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  // box-shadow: 0 2px 0 rgb(225 225 225 / 20%);
}
</style>