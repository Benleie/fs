<template>
  <div class=''>
    <div class="line">
      <div>{{ name }}: </div>
      <div> {{ score }} </div>
      <el-button type="success" icon="el-icon-plus" @click="add" circle></el-button>
      <el-button type="warning" icon="el-icon-minus" @click="minus" circle></el-button>
    </div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    components: {},
    props: {
      name: {
        type: String
      },
      score: {
        type: Number
      }
    },
    data() {
      return {
        mutatedScore: this.score
      };
    },
    methods: {
      add() {
        this.$emit('update:score', ++this.mutatedScore)
      },
      minus() {
        this.$emit('update:score', --this.mutatedScore)
        // this.$emit('update:score', --this.score)
      }
    },
  }
</script>

<style lang='scss' scoped>
//@import url()
.line {
  display: flex;
}
</style>