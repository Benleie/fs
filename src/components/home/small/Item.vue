<template>
  <div class="item-box">
    <div class="item-left">
      <div class="toggle" @click="toggle">
        <div class="toggle-content" v-if="isToggle"></div>
      </div>
      <div class="item-image"><img :src="itemList.url" alt=""></div>
      <div class="item-info">
        <div>{{ itemList.name }} </div>
        <div>{{ itemList.createTime }} </div>
      </div>
    </div>

    <div class="item-right">
      <div class="item-btn">重新上传</div>
      <div class="item-btn">重命名</div>
      <div class="item-btn">删除</div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    props:{
        itemList: { 
            type: Object,
            required: true   
        }
    },
    data() {
      return {
        isToggle: false,
      };
    },
    methods: {
      toggle(){ this.isToggle = !this.isToggle; },
    },
  }
</script>

<style scoped>
.toggle {
  width: 20px;
  height: 20px;
  margin-left: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #979797;
}
.toggle-content {
  width: 10px;
  height: 10px;
  background-color: #3BB0FE;
}
.item-box {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid #F4F4F4; */
  border-bottom: 1px solid #EDEDED; 
}
.item-left,
.item-right {
  display: flex;
  align-items: center;
}
.item-image {
  margin-left: 27px;
}
.item-image img {
  height: 48px;
}
.item-btn {
  font-size: 16px;
  font-weight: 600;
  /* font-family: PingFangSC-Semibold, PingFang SC; */
  color: #3BB0FE;
  line-height: 22px;
  margin-right: 48px;
  cursor: pointer;
}
</style>