<template>
  <div class='wrapper'>
    <div class="main main-signup relative-box">
      <div class="signup-title">密码重置</div>
      <el-form
        v-if="true" 
        :model="setPwd"
        ref="modifyPwd"
        :rules="setPwdRules"
        :hide-required-asterisk="true"
        label-width="100px"
        label-position="left"
        class="signup-content">
        <el-form-item style="display:none;"></el-form-item>
        <el-form-item style="display:none;"></el-form-item>
        
        <el-form-item label="手机号" class="signup-item" prop="phone">
          <el-input 
            v-model="setPwd.phone"
            auto-complete="new-password" 
            class="signup-input"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="signup-item" prop="verify">
          <el-input 
            v-model="setPwd.verify"
            auto-complete="new-password" 
            class="signup-input  signup-verify-input">
          </el-input>
          <el-button 
            type="primary"
            @click="getSms"
            :disabled="notGetSms"
            class="signup-verify-btn">{{ smsButton }}
          </el-button>
        </el-form-item>
        <el-form-item label="密码" class="signup-item" prop="pwd">
          <el-input 
            v-model="setPwd.pwd"
            autocomplete="new-password"
            type="password"
            class="signup-input">
          </el-input>
        </el-form-item>
        <el-form-item label="密码确认" class="signup-item" prop="pwd2">
          <el-input 
          v-model="setPwd.pwd2"
          autocomplete="new-password" 
          class="signup-input"
          type="password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="signup-btn" @click="modifyPwd">确认修改</el-button>
        </el-form-item>
      </el-form>
      <div class="close-x" @click="closeSignUp">X</div>
    </div>
  </div>
</template>

<script>
  
  export default {
    components: { },
    data() {
      let checkPwd = (source, options, callback) => {
        if(options === ''){
          callback(new Error('请再次输入密码'))
        } else if(options !== this.setPwd.pwd) {
          callback(new Error("两次输入的密码不一致！"))
        } else {
          callback()
        }
      }
      // let id = 0
      return {
        smsButton: "获取验证码",
        notGetSms: false,
        setPwd: {
          phone: '',
          verify: '',
          pwd: '',
          pwd2: ''
        },
        setPwdRules: {
          phone: [
            { required: true, message: "请输入手机号", trigger: 'blur' },
            { 
              pattern: /^(((13|18)[0-9]{9})|(14[05679][0-9]{8})|(15[012356789][0-9]{8})|(16[2567][0-9]{8})|(17[01235678][0-9]{8})|(19[189][0-9]{8}))$/,
              message: "请输入正确的手机号",
              trigger: "blur"
            }
          ],
          verify: [{ required: true, message: "请输入验证码", trigger: 'blur' }],
          pwd: [
            { required: true, message: "请输入密码", trigger: 'blur' },
            { min: 6, message: "请输入六位及六位以上的密码", trigger: 'blur' }
          ],
          pwd2: [{ validator: checkPwd, trigger: 'blur' }],
        }
      };
    },
    methods: {
      modifyPwd(){
        this.$refs["modifyPwd"].validate(async (valid)=> {
          if(!valid){
            return false;
          } else {
            let signupRes = await this.$http.get(
              "/oauth/resetPwd",
              { 
                params: {
                  phone: this.setPwd.phone,
                  password: this.setPwd.pwd,
                  // captcha: this.setPwd.verify
                }
              },  
            )
            if(signupRes.data.code === "200"){
              // this.toLogin()
              this.$router.push({ path: "login" })
            } else {
              console.log(signupRes.data)
            }
          }
        });
      },
      async getSms(){
        let Data = await this.$http.get(
          // "/oauth/sms",
          "http://localhost:8989/oauth",
          {
            params: {
              phoneNumber: 15071297655
            }
          }
        )
        let sec = 5
        console.log(Data.data)
        if(Data.status == "200") {
          /* while(sec > 1){
            sec--
            setTimeout(() => {
              this.smsButton = sec + "s后获取"
            }, 1000)
          } */
          this.notGetSms = true
          let sms60 = setInterval(() => {
            this.smsButton = --sec + "s后获取"
            if(sec < 1) {
              clearInterval(sms60)
              this.smsButton = "获取验证码"
              this.notGetSms = false
            }
          }, 1000);
          
          /* setInterval(() => {
            this.smsButton = --sec + "s后获取"
          }, 1000) */
          // this.smsButton = "fff"
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
  /* text-align: center; */
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
.verify-btn {
  width: 130px;
  height: 58px;
  background: linear-gradient(180deg, #67C2FF 0%, #3BB0FE 100%);
  border-radius: 46px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  /* line-height: 22px; */
  vertical-align: top;
  margin-left: 32px;
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
.verify-input input{
  width: 180px;
}
.verify-input{
  width: 180px;
}

</style>