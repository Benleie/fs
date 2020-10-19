<template>
  <div class='wrapper'>
    <div class="main">
      <div class="index-title">全景时光机</div>
      <div class="index-title2">用新视角看新世界</div>
      <hr class="index-hr">
      <ul class="index-ul">
        <li>支持项目标段创建</li>
        <li>支持全景自定义设置</li>
      </ul>
      <el-button @click="showLogin" class="index-btn">马上开启</el-button>
    </div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    components: {},
    data() {
      return {};
    },
    methods: {
      showLogin(){
        this.$router.push({ path: "/login" })
      }
    },
  }
</script>

<style scoped>
.wrapper {
  width: 1920px;
  height: 1080px;
  background-color: whitesmoke;
  background: url("~@/assets/london.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  /* overflow: Scroll; */
  /* overflow-y: hidden; */
}

.main {
  width: 600px;
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(10, 26, 42, 0.5);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.84);
  border-radius: 1px;
  text-align: center;
  color: white;
  margin-top: 205px;
}
.index-title {
  /* width: 320px; */
  height: 90px;
  font-size: 64px;
  margin-top: 26px;
  letter-spacing: 10px;
}
.index-title2 {
  height: 50px;
  font-size: 36px;
  margin-top: 26px;
  margin-bottom: 30px;
}
.index-hr {
  width: 187px;
  height: 1px;
  border: none;
  border-top: 1px solid #79FFFC;
}
.index-ul {
  height: 100px;
  font-size: 36px;
  margin-top: 30px;
}
.index-ul li {
  text-align: left;
}
.index-btn {
  margin-top: 135px;
  width: 172px;
  height: 58px;
  background: linear-gradient(180deg, #67C2FF 0%, #3BB0FE 100%);
  border-radius: 46px;
  border: 1px solid #4EF4FF;
  color: #ffffff;
  font-size: 24px;
}
</style>