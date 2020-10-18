<template>
  <div class='wrapper'>
    <div class="header">
      <div class="header-text1">全景时光机</div>
      <div class="header-text2">个人主页</div>
      <div class="header-btn">
        <el-button class="upload-btn">上传全景</el-button>
      </div>
      <div class="header-info">
        <el-dropdown trigger="click">
          <div class="info-title">
            <img src="@/assets/weixin2.png" alt="" class="info-icon">
            <div>临建项目部<i class="el-icon-arrow-down el-icon--right"></i></div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
      </div>
    </div>
    <div class="main-wrapper">
      <div class="main">
        <div class="sider">
          <div class="sider-box">
            <div class="image">
              <img src="@/assets/weixin2.png" alt="" height="83px">
            </div>
            <div class="text1">临建项目部</div>
            <div class="text2">空间容量: 0/30GB</div>
            <div class="btn">扩容</div>
          </div>
          <div class="sider-menu">
            <el-menu :router="true" :collapse="false">
              <el-menu-item index="/home/home">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
              </el-menu-item>
              <el-menu-item index="/home/show">
                <i class="el-icon-menu"></i>
                <span slot="title">全景库</span>
              </el-menu-item>
              <el-menu-item index="/home/resource">
                <i class="el-icon-document"></i>
                <span slot="title">素材库</span>
              </el-menu-item>
              <el-menu-item index="/home/manager">
                <i class="el-icon-setting"></i>
                <span slot="title">项目管理</span>
              </el-menu-item>
              <el-menu-item index="/home/deleter">
                <i class="el-icon-setting"></i>
                <span slot="title">回收站</span>
              </el-menu-item>
            </el-menu>
            
          </div>
        </div>
        <div class="content-area">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    components: {},
    data() {
      return {
        iconUrl: "@/assets/logo.png",
      };
    },
    methods: {},
  }
</script>

<style scoped>

.wrapper {
  width: 1920px;
  height: 1080px;
  background: #F8F8F8;
  border: 1px solid #979797;
}
.header {
  display: flex;
  width: 100%;
  height: 80px;
  background: #4A4A4A;
  /* justify-content: center; */
  align-items: center;
  font-size: 36px;
  color: #ffffff;
}
.header-text1 {
  margin-left: 300px;
}
.header-text2 {
  margin-left: 446px;
  height: 33px;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
}
.header-btn {
  margin-left: 100px;
}
.header-info {
  margin-left: 100px;
}
.upload-btn {
  width: 126px;
  height: 50px;
  background: #3BB0FE;
  border-radius: 4px;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  padding: 8px 15px;
  font-weight: 600;
  line-height: 33px;
}
.info-title {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
}
.info-icon {
  width: 44px;
  border-radius: 22px;
  /* border: 1px solid green; */
  margin-right: 12px;
}
.main-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  width: 1320px;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}
.sider {
  width: 200px;
  height: 420px;
  background-color: #ffffff;
}
.content-area {
  width: 1110px;
  height: 980px;
  background-color: #ffffff;
  margin-left: 10px;
}
.sider-box{
  text-align: center;
}
/* bug: 5px */
.sider-box .image {
  /* font-size: 0; */
  /* line-height: 0; */
}
.sider-box  .image img{
  /* display: block; */
  vertical-align: top;
  width: 83px;
  border-radius: 42px;
  margin-top: 24px;
  border: 1px solid salmon;
}
.sider-box .text1 {
  margin-top: 8px;
  height: 33px;
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  line-height: 33px;
}
.sider-box .text2 {
  margin-top: 4px;
  height: 25px;
  font-size: 18px;
  font-weight: 600;
  color: #9B9B9B;
  line-height: 25px;
  /* border: 1px solid red; */
}
.sider-box .btn {
  /* margin-bottom: 21px; */
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #3BB0FE;
  line-height: 22px;
  cursor: pointer;
}

</style>

<style>
.sider-menu .el-menu-item {
  border-top: 1px solid #F8F8F8;
}
</style>
