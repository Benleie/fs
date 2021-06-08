<template>
  <div class=''>
    <h1>回收站</h1>
    <h2>{{ time }}</h2>
    <!-- <div>detailList</div> -->
    <simple-div></simple-div>
    <span class="player" @click="clickPlayer">
      <i class="el-icon-video-play" v-if="playPause === 'Play'"></i>
      <i class="el-icon-video-pause" v-if="playPause === 'Pause'"></i>
    </span>
    <audio id="testAudio" style="border:1px solid red;">
      <source src="http://zhikun-fs.oss-cn-hangzhou.aliyuncs.com/resource/Bebe Rexha - Ferrari.mp3" type="audio/mpeg">
    </audio>
    <el-button @click="clickBind">wxbind</el-button>
    <el-dialog
      :visible.sync="dialogWx"
      :lock-scroll="true"
      :close-on-click-modal="true"
      width="350px">
      <div id="wx"></div>
    </el-dialog>
  </div>
</template>

<script>
  //import x from ''
  import { WxLogin } from '@/config/wx.js'
  let SimpleDiv = {
    render: (h) => {
      return h('div', 'hhh')
    }
  }
  export default {
    components: { SimpleDiv },
    data() {
      return {
        time: new Date().toLocaleTimeString(),
        detailList: {
          render: (h) => {
            return h('div', 'hhh')
          }
        },
        dialogWx: false,
        playPause: 'Play'
      };
    },
    created(){
      this.$nextTick(function(){
        console.log(this.$el.textContent)
      })
    },
    mounted(){
      this.aaa = 'aaa'
      this.bbb = 'bbb'
      let _this = this
      let count = -1
      this.timer = setInterval(()=> {
        if(++count % 5 === 0) console.log("time changed!")
        _this.time = new Date().toLocaleTimeString()
      }, 1000)
      // console.log(this.$el.children)
      // console.log(this.$el.textContent)
      // console.log(this.$el.textContent)

      // console.log(this.detailList)
    },
    methods: {
      clickBind(){
        this.dialogWx = true
        // WxLogin,需要在#wx元素挂载到DOM之后调用
        this.$nextTick(function(){
          this.WxBind()
        })
      },
      WxBind() {
        const config = {
            id: 'wx', // 需要显示的容器id
            appid: 'wxdc8e663da8692a31', // 公众号appid wx*******
            scope: 'snsapi_login', // 网页默认即可
            redirect_uri: encodeURIComponent('http://fs.zhikuntech.com/setting'), // 授权成功后回调的url
            state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
            style: 'black', // 提供"black"、"white"可选。二维码的样式
            href: '' // 外部css文件url，需要https
          }
        new WxLogin(config)
      },
      clickPlayer(){
        let audio = document.getElementById('testAudio')
        if(audio.paused || audio.ended){
          audio.play()
          this.playPause = "Pause"
        }
        else {
          audio.pause()
          this.playPause = 'Play'
        }
      }
    },
    
    
    destroyed(){
      console.log("destroyed")
      if(this.timer) clearInterval(this.timer)
    },
    /* computed: {
      time(){
        return  new Date().toLocaleTimeString()
      }
    }, */
    
  }
</script>

<style scoped>
.player i{
  font-size: 30px;
  /* color: red; */
}
</style>