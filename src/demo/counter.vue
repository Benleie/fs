<template>
  <div class=''>
    <div class="line">
      <div class="line person-info">
        <div>{{ name }}: </div>
        <div> {{ scoreSmall }} </div>
      </div>
      <el-button class="my-btn" type="success" icon="el-icon-plus" @click="add" circle></el-button>
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
      scoreSmall: {
        type: Number
      }
    },
    data() {
      return {
        mutatedScore: this.scoreSmall
      };
    },
    methods: {
      add() {
        this.$emit('update:scoreSmall', this.mutatedScore += 10)
      },
      minus() {
        this.$emit('update:scoreSmall', this.mutatedScore -= 10)
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
.person-info {
  width: 5em;
}
.my-btn {
  width:50px;
  height:50px;
}
</style>