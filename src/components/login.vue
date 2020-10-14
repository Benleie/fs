<template>
  <div class='wrapper'>
    <div v-if="isIndex" class="main">
      <div class="index-title">全景时光机</div>
      <div class="index-title2">用新视角看新世界</div>
      <hr class="index-hr">
      <ul class="index-ul">
        <li>支持项目标段创建</li>
        <li>支持全景自定义设置</li>
      </ul>
      <el-button @click="showLogin" class="index-btn">马上开启</el-button>
    </div>

    <div v-if="isLogin" class="main relative-box">
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
            <el-button class="login-btn">登录</el-button>
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

    <div v-if="isSignUp" class="main main-signup relative-box">
      <div class="signup-title">注册</div>
      <el-form 
        :model="formSignup"
        ref="signup"
        :rules="signupRules"
        :hide-required-asterisk="true"
        label-width="100px"
        label-position="left"
        class="signup-content">
        <el-form-item label="手机号" class="signup-item" prop="phone">
          <el-input v-model="formSignup.phone" class="signup-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="signup-item" prop="pwd">
          <el-input 
            v-model="formSignup.pwd"
            type="password"
            class="signup-input">
          </el-input>
        </el-form-item>
        <el-form-item label="密码确认" class="signup-item" prop='pwd2'>
          <el-input v-model="formSignup.pwd2" class="signup-input" type="password"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" class="signup-item" prop='city'>
          <!-- <el-input v-model="formSignup.city" class="signup-input"></el-input> -->
          <el-cascader 
            v-model="formSignup.city" 
            :options="cities" 
            class="signup-input"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="signup-btn" @click="signUp">保存并登录</el-button>
        </el-form-item>
      </el-form>
      <div class="close-x" @click="closeSignUp">X</div>
    </div>

    
    <Modal v-model="isModalLogin" :visible.sync="isModalLogin">
      <div class="login-box">
        <h1>登录</h1>
        <p>全景看世界，欢迎您回来</p>
        <i-input :value.sync="value" placeholder="手机号/邮箱">
          <i-select :model.sync="select1" slot="prepend" style="width: 80px">
            <i-option value="http">中国大陆</i-option>
            <i-option value="https">香港</i-option>
          </i-select>
        </i-input>
        <i-input type="password"></i-input>
      </div>
    </Modal>
  </div>
</template>

<script>
  //import x from ''
  import CityList from "../config/city.js"
  export default {
    components: {},
    data() {
      let checkPwd = (source, options, callback) => {
        if(options === ''){
          callback(new Error('请再次输入密码'))
        } else if(options !== this.formSignup.pwd) {
          callback(new Error("两次输入的密码不一致！"))
        } else {
          callback()
        }
      }

      return {
        isModalLogin: false,
        value: '',
        loginUser: '',
        loginPwd: '',
        select1: "http",
        isIndex: true,
        isLogin: false,
        isSignUp: false,
        formSignup: {
          phone: '15029380404',
          pwd: '123456',
          pwd2: '123456',
          city: ''
        },
        signupRules: {
          phone: [
            { required: true, message: "请输入手机号", trigger: 'blur' },
            { 
              pattern: /^(((13|18)[0-9]{9})|(14[05679][0-9]{8})|(15[012356789][0-9]{8})|(16[2567][0-9]{8})|(17[01235678][0-9]{8})|(19[189][0-9]{8}))$/,
              message: "请输入正确的手机号",
              trigger: "blur"
            }
          ],
          pwd: [
            { required: true, message: "请输入密码", trigger: 'blur' },
            { min: 6, message: "请输入六位及六位以上的密码", trigger: 'blur' }
          ],
          pwd2: [{ validator: checkPwd, trigger: 'blur' }],
          city: [{ required: true, message: "请选择您所在的城市", trigger: 'blur' }]
        },
        cities: CityList
        /* getCity: {
          lazy: true,
          lazyLoad(node, resolve){}
        } */
      };
    },
    created(){
      // console.log(CityList)
      //使用微信open平台返回的code和state登录
      let queryStr = window.location.search
      if(queryStr.indexOf("code=") !== -1 && queryStr.includes("&&state=")){
        this.loginWithWxData(queryStr)
      }
    },
    methods: {
      async wxLogin(){
        let wxData = await this.$http.get("http://192.168.1.6:8080/wx/qr")
        // console.log(wxData)
        if(!wxData.data.code !== "200") console.log("something wrong, can't get wx data")
        else {
          window.location.href = wxData.data.data
        }
      },
      async loginWithWxData(queryStr){
        // ?code=xxxx&&state=xxxx
        let wxCode = queryStr.match(/code=(\S*?)&&/)[1]
          , wxState = queryStr.substring(queryStr.lastIndexOf('state=') + 'state='.length)
        let loginData = await this.$http.post("http://192.168.1.6:8080/oauth/login", {
          code: wxCode,
          state: wxState
        })
        console.log(loginData)
      },
      signUp(){
        this.$refs["signup"].validate(async (valid)=> {
          if(!valid){
            return false;
          } else {
            let signupRes = await this.$http.post(
              "http://192.168.1.22:8080/api/auth/registe", 
              {
                cellphone: this.formSignup.phone,
                password: this.formSignup.pwd,
                province: 22
              },
              {
                headers: { 
                  "Authorization": "bearer " + "b8f90f11-4b03-4517-b870-9a931bef4559"
                }
              }
            )
            if(signupRes.data.code === "200"){
              console.log(signupRes.data.code)
              this.toLogin()
            } else {
              console.log("signup failed!")
              console.log(signupRes.data)
            }
          }
        });
      },
      async getProvice(){
        // let provice = await this.$http()

      },
      showLogin(){ 
        this.isIndex = false
        this.isLogin = true
      },
      closeLogin(){
        this.isLogin = false
        this.isIndex = true
      },
      showSignUp(){
        this.isLogin = false
        this.isSignUp = true
      },
      closeSignUp(){
        this.isSignUp = false
        this.isIndex = true
      },
      toLogin(){
        this.isSignUp = false
        this.isLogin = true
      }
    },
  }
</script>

<style scoped>
body::-webkit-scrollbar{
    display: none;
}
.wrapper {
  width: 1920px;
  height: 1080px;
  background-color: whitesmoke;
  background: url("../assets/london.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  /* overflow: Scroll; */
  /* overflow-y: hidden; */
}
.wrapper::-webkit-scrollbar {
  display: none;
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
/* .signup-btn .ivu-input {
  display: inline;
} */
.signup-item {
  margin-bottom: 32px;
}
.signup-item label {
  height: 58px;
  color: #ffffff;
  font-size: 20px;
  line-height: 58px;
}
.signup-input input {
  width: 350px;
  height: 58px;
  background: rgba(29, 58, 89, 0.6);
  border-radius: 46px;
  border: 1px solid #FFFFFF;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #ffffff;  
}
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