<template>
  <div class='wrapper'>
    <div class="header">
      <div class="header-text1">全景时光机</div>
      <div class="header-text2">个人主页</div>
      <div class="header-btn">
        <el-button class="upload-btn" @click="dialogUpload = true">上传全景</el-button>
      </div>
      <div class="header-info">
        <el-dropdown trigger="click">
          <div class="info-title">
            <img src="@/assets/weixin2.png" alt="" class="info-icon">
            <div>临建项目部<i class="el-icon-arrow-down el-icon--right"></i></div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
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
    <el-dialog
      title="上传"
      :visible.sync="dialogUpload"
      width="65%"
      >
      <div class="upload-wrapper">
        <el-upload
          class="upload-box"
          action="/api/upload/simpleUpload?module=resource"
          :headers="headers"
          :on-success="handleSuccess"
          :limit="3"
          >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-form
          :model="uploadInfo"
          ref="uploadForm"
          :rules="uploadRule"
          :hide-required-asterisk="true"
          label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="uploadInfo.name"
              class="name-input"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="summary">
            <el-input
              v-model="uploadInfo.summary"
              class="name-input"></el-input>
          </el-form-item>
          
          
        </el-form>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="clickEnsure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //import x from ''
  import Qs from 'qs'
  export default {
    components: {},
    data() {
      return {
        iconUrl: "@/assets/logo.png",
        dialogUpload: false,
        headers: {
          Authorization: localStorage.getItem('loginToken')
        },
        uploadRule: {
          name: [{ required: true, message: "请输入名称", trigger: 'blur' }],
          summary: [{ required: true, message: "请输入简介", trigger: 'blur' }]
        },
        uploadInfo: {
          name: "",
          summary: "",
          fileSize: null,
          unit: [1, 2, 3, 4],
          url: ""
        }
      };
    },
    created(){
      //fix 701
      // this.fix701()
    },
    methods: {
      async fix701(){
        let listData = await this.$http.get(
          "/api/getResourceList",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              orderColumn: "",
              pid: 0,
              type: 1
            },
            paramsSerializer: function(params) {
              return Qs.stringify(params)
            }
          }
        )
        if(listData.data.code === "701"){
          localStorage.removeItem("loginToken")
          this.$router.push({ path: "/login" })
        }
      },
      async logOut(){
        let logoutData = await this.$http.post(
          "/api/logout",
          {},
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            }
          }
        )
        if(logoutData.data.code === "200"){
          localStorage.removeItem("loginToken")
          this.$router.push({ path: "/welcome" })
        }
        
      },
      handleSuccess(res, file){
        this.uploadInfo.url = res.data
        this.uploadInfo.fileSize = Math.floor(file.size / 1024)
        console.log(Math.floor(file.size / 1024))
        // console.log(fileList)
      },
      clickEnsure(){
        this.$refs["uploadForm"].validate(valid => {
          valid && this.uploadFile()
        })
      },
      async uploadFile() {
        let requestData = {
          name: this.uploadInfo.name,
          summary: this.uploadInfo.summary,
          size: this.uploadInfo.fileSize,
          unit: this.uploadInfo.unit[0],
          shotTime: "2020-10-15 00:00:00",
          panosUrl: "",
          picUrl: this.uploadInfo.url,
        }
        let uploadData = await this.$http.post(
          "/api/panos/info",
          requestData,
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            }
          }
        )
        if(uploadData.data.code === "200"){
          console.log(uploadData.data.msg)
          this.dialogUpload = false
          // this.getList(this.parentId)
        }
      }
    },
  }
</script>

<style scoped>

.wrapper {
  /* width: 1920px; */
  width: 100%;
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
  padding-bottom: 21px;
}
/* bug: 5px */
.sider-box .image {
  /* font-size: 0; */
  /* line-height: 0; */
}
.sider-box  .image img{
  /* display: block; */
  vertical-align: bottom;
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
.upload-wrapper {
  display: flex;
  /* border: 1px solid lime; */
}
.upload-box {
  width: 300px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-upload__tip {
  text-align: center;
}
.name-input {
  width: 350px;
}
</style>

<style>
.sider-menu .el-menu-item {
  border-top: 1px solid #F8F8F8;
}
</style>
