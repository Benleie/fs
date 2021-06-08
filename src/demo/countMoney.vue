<template>
  <div class='counter'>
    <h1>counter</h1>
    <div>
      <span>总收入：</span>
      <span>{{ total }}</span>
    </div>
    <counter name="小李" :score.sync="one" />
    <counter name="小王" :score.sync="two" />
    <counter name="小胡" :score.sync="three" />
    <counter name="小S" :score.sync="four" />
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
        four: 20
      };
    },
    computed: {
      total() {
        return this.one + this.two + this.three + this.four
      }
    },
    methods: {},
  }
</script>

<style lang='scss' scoped>
//@import url()
.counter {
  font-size: 20px;
}
</style>