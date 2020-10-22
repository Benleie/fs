<template>
  <div class='wrapper'>
    <div class="main relative-box">
        <div class="fixed-box">
          <div>测试账号： 15071290003</div>
          <div>密码： &nbsp;&nbsp;&nbsp;&nbsp;123456</div>
        </div>
        <div class="index-title">登录</div>
        <div class="index-title2">用新视角看新世界</div>

        <el-form>
          <el-form-item>
            <el-input 
              placeholder="请输入账号"
              v-model="loginUser"
              class="login-input">
              <i slot="prefix" class="el-input__icon el-icon-user icon-style"></i>
              </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              show-password
              autocomplete="new-password"
              v-model="loginPwd"
              class="login-input">
              <i slot="prefix" class="el-input__icon el-icon-lock icon-style"></i>
            </el-input>
          </el-form-item>
          <div class="forgotPwd">忘记密码?</div>
          <el-form-item>
            <el-button class="login-btn" @click="Login">登录</el-button>
          </el-form-item>
        </el-form>

        <div class="login-other">
          <div class="wx-login" @click="wxLogin">
            <div><img src="../assets/wx-icon.png" alt="" style="height:20px"></div>
            <div class="wx-text">微信登录</div>
          </div>
          
          <div @click="showSignUp" class="login-btn-right">注册</div>
        </div>
        <div class="close-x" @click="closeLogin">X</div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  import Qs from "qs"
  export default {
    components: {},
    data() {
      return {
        loginUser: '',
        loginPwd: '',
      };
    },
    created(){
      // console.log(CityList)
      //使用微信open平台返回的code和state登录
      let queryStr = window.location.search
      if(queryStr.indexOf("code=") !== -1 && queryStr.includes("state=")){
        console.log("wx login")
        this.loginWithWxData(queryStr)
      }
    },
    methods: {
      async Login(){
        let url = "/oauth/token"
        let myParams = {
          client_id: "client",
          client_secret: 123456,
          scope: "read write",
          grant_type: "password",
          username: this.loginUser,
          // username: "tj01",
          password: this.loginPwd
        }
        
        let loginData = await this.$http.post(url, {}, {
          params: myParams,
          paramsSerializer: function(params) {
            return Qs.stringify(params)
          },
        })
        let Data = loginData.data
        if(Data.code === "200") {
          // let 
          localStorage.setItem("loginToken", "bearer " + Data.data.access_token)
          this.$router.push({ path: "/home" })
        }
        // let loginData = await this.$http.post(url, Qs.stringify(myParams)) //Formdata
        console.log(loginData)
      },
      async wxLogin(){
        let wxData = await this.$http.get("http://122.51.133.191:8989/wx/qr")
        console.log(wxData)
        if(wxData.data.code !== "200") console.log("something wrong, can't get wx data")
        else {
          window.location.href = wxData.data.data
        }
      },
      async loginWithWxData(queryStr){
        // ?code=xxxx&&state=xxxx
        let wxCode = queryStr.match(/code=(\S*?)&state=/)[1]
          , wxState = queryStr.substring(queryStr.lastIndexOf('state=') + 'state='.length)
        let loginData = await this.$http.get("/oauth/login",
          { 
            params: {
              code: wxCode,
              state: wxState
            },
            paramsSerializer: function(params) {
              return Qs.stringify(params)
            }, 
          }
        )
        if(loginData.data.code === "200"){
          localStorage.setItem("loginToken", "bearer " + loginData.data.data.access_token)
          this.$router.push({ path: "/home" })
        }
      },
      closeLogin(){
        this.$router.push({ path: "/welcome" })
      },
      showSignUp(){
        this.$router.push({ path: "/signup" })
      },
      
    },
  }
</script>

<style scoped>
.wrapper {
  /* width: 1920px; */
  width: 100%;
  height: 1080px;
  background-color: whitesmoke;
  background: url("../assets/london.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  /* overflow: Scroll; */
  /* overflow-y: hidden; */
}
.fixed-box {
  position: absolute;
  top: -100px;
  font-size: 20px;
  color: black;
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
.relative-box {
  position: relative;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
.close-x {
    /* background-color: orange; */
    background: rgba(29, 58, 89, 0.6);
    color: #ffffff;
    cursor: pointer;
    border-radius: 24px;
    line-height: 40px;
    text-align: center;
    height: 42px;
    width: 42px;
    font-size: 20px;
    padding: 1px;
    top: -21px;
    right: -21px;
    position: absolute;
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
.login-other {
  width: 350px;
  height: 28px;
  display: flex;
  /* 46 - 13 */
  /* margin-top: 33px; */
  margin-top: 20px;
  /* border: 1px solid red; */
  justify-content: space-between;
  align-items: center;
}
.login-btn {
  margin-top: 32px;
  width: 350px;
  height: 58px;
  background: linear-gradient(180deg, #67C2FF 0%, #3BB0FE 100%);
  border-radius: 46px;
  color: #ffffff;
  font-size: 24px;
}
.login-btn-right {
  /* margin-left: 200px; */
  cursor: pointer;
  color: #3BB0FE;
  height: 28px;
  line-height: 28px;
  font-size: 20px;
}
.wx-login {
  display: flex;
  cursor: pointer;
  margin-left: 25px;
}
.wx-text {
  margin-left: 8px;
  font-size: 16px;
  line-height: 22px;
  height: 22px;
}
.icon-style {
  font-size: 30px;
  line-height: 55px;
  /* padding-left: 20px; */
  /* vertical-align: middle; */
}

.forgotPwd {
  height: 22px;
  text-align: right;
  padding-right: 10px;
  color: #3BB0FE;
  font-size: 16px;
}

.main-signup {
  width: 880px;
  height: 738px;
}
.signup-btn {
  /* 105 - 32 */
  margin-top: 73px;
  width: 350px;
  height: 58px;
  background: linear-gradient(180deg, #67C2FF 0%, #3BB0FE 100%);
  border-radius: 46px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  margin-bottom: 30px;
}
.signup-title {
  /* width: 150px; */
  height: 90px;
  font-size: 64px;
  line-height: 90px;
  font-weight: 600;
  letter-spacing: 20px;
  margin-top: 46px;
  margin-bottom: 35px;
}
.signup-content {
  /* border: 1px solid red; */
  margin-left: -100px;
  width: 450px;
}

</style>


<style>
.login-input input {
  width: 350px;
  height: 58px;
  background: rgba(29, 58, 89, 0.6);
  border-radius: 46px;
  border: 1px solid #FFFFFF;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #ffffff;  
  /* line-height: 50px; */
}
/* CSS优先级问题 */
.login-input .el-input__inner{
  padding-left: 60px;
}
.login-input input::placeholder {
  color:#ffffff;
  padding-left: 20px;
}
.login-input .el-input__prefix {
  /* padding-left: 100px; */
  left: 20px;
}

/* input:-webkit-autofill{
	-webkit-box-shadow:0 0 0 1000px rgba(29, 58, 89, 0.6) inset !important;
} */

/* .login-input:-webkit-autofill, 
.login-input:-webkit-autofill:hover, 
.login-input:-webkit-autofill:focus {
  -webkit-box-shadow:0 0 0 1000px rgba(29, 58, 89, 0.6) inset !important;
   background: rgba(29, 58, 89, 0.6) !important;
} */


</style>