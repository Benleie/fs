<template>
  <div class='wrapper'>
    <div class="main main-signup relative-box">
      <div class="signup-title">注册</div>
      <el-form 
        :model="formSignup"
        ref="signup"
        :rules="signupRules"
        :hide-required-asterisk="true"
        label-width="100px"
        label-position="left"
        class="signup-content">
        <el-form-item style="display:none;"></el-form-item>
        <el-form-item style="display:none;"></el-form-item>
        
        <el-form-item label="手机号" class="signup-item" prop="phone">
          <el-input 
            v-model="formSignup.phone"
            autocomplete="new-password" 
            class="signup-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="signup-item" prop="pwd">
          <el-input 
            v-model="formSignup.pwd"
            autocomplete="new-password"
            type="password"
            class="signup-input">
          </el-input>
        </el-form-item>
        <el-form-item label="密码确认" class="signup-item" prop="pwd2">
          <el-input 
          v-model="formSignup.pwd2"
          autocomplete="new-password" 
          class="signup-input"
          type="password"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" class="signup-item" prop='city'>
          <el-cascader 
            v-model="formSignup.city"
            :props="getCityData" 
            class="signup-input"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="signup-btn" @click="signUp">保存并登录</el-button>
        </el-form-item>
      </el-form>
      <div class="close-x" @click="closeSignUp">X</div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  
  import CityList from "@/config/city.js"
  import Qs from "qs"
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
      let _this = this
      // let id = 0
      return {
        formSignup: {
          phone: '',
          pwd: '',
          pwd2: '',
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
        cities: CityList,
        getCityData: {
          lazy: true,
          async lazyLoad(node, resolve){
            const { level, value } = node;
            if(level == 0) {
              let url = "/api/province/getProvince"
              _this.getProviceAndCity(url, resolve)
            }
            if(level == 1){
              let url = "/api/province/getCity/" + value
              _this.getProviceAndCity(url, resolve)
            }
          }
        }
      };
    },
    methods: {
      signUp(){
        this.$refs["signup"].validate(async (valid)=> {
          if(!valid){
            return false;
          } else {
            let signupRes = await this.$http.post(
              "/oauth/regist", 
              {
                cellphone: this.formSignup.phone,
                password: this.formSignup.pwd,
                province: this.formSignup.city[1]
              },  
             /*  {
                headers: { 
                  "Authorization": "bearer " + "b8f90f11-4b03-4517-b870-9a931bef4559"
                }
              } */
            )
            if(signupRes.data.code === "200"){
              console.log(signupRes.data.code)
              // this.toLogin()
              this.andLogin()
            } else {
              console.log("signup failed!")
              console.log(signupRes.data)
            }
          }
        });
      },
      async andLogin(){
        let url = "/oauth/token"
        let myParams = {
          client_id: "client",
          client_secret: 123456,
          scope: "read write",
          grant_type: "password",
          username: this.formSignup.phone,
          password: this.formSignup.pwd
        }
        let loginData = await this.$http.post(url, {}, {
          params: myParams,
          paramsSerializer: function(params) {
            return Qs.stringify(params)
          },
        })
        // let loginData = await this.$http.post(url, Qs.stringify(myParams)) //Formdata
        // console.log(loginData)
        if(loginData.data.code === "200") {
          localStorage.setItem("loginToken", "bearer " + loginData.data.data.access_token)
          this.$router.push({ path: "/home" })
        }
      },
      async getProviceAndCity(url, resolve){
        let isFalse = url.indexOf("getCity") !== -1
        let ProvinceData = await this.$http.get(
          url,
          {
            headers: {
              "Authorization": "bearer e187f1b6-b2f2-47d7-9e01-8cd0ebf262ac"
            }
          }
        )
        if(ProvinceData.data.code === "200"){
          const nodes = Array.from({ 
            length: ProvinceData.data.data.length 
          }).map((item, index) => {
              return {
                value: ProvinceData.data.data[index].id,
                label: ProvinceData.data.data[index].name,
                leaf: isFalse
              }
          });
          resolve(nodes)
          // console.log(nodes)
        }

      },
      closeSignUp(){
        // console.log("close-signup do nothing")
        this.$router.push({ path: "/login" })
      }
    },
  }
</script>

<style scoped>
.wrapper {
  /* width: 1920px; */
  width: 100%;
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
</style>