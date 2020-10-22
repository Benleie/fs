<template>
  <div class="item-box" :class="itemList.isSelect ? 'is-selected' : ''">
    <div class="item-left">
      <div class="toggle" @click="clickToggle">
        <div class="toggle-content" v-if="itemList.isSelect"></div>
      </div>
      <div class="item-image" @dblclick="enterFolder">
        <img v-if="itemList.isFolder" :src="folderIcon">
        <img v-else-if="itemList.fileType == 2" :src="musicIcon">
        <img v-else-if="itemList.fileType == 3" :src="videoIcon">
        <img v-else :src="itemList.url || imageIcon">
      </div>
      <div class="item-info">
        <div 
          class="title"
          :class="itemList.titleHover ? 'bottom-line' : ''"
          @mouseover="itemList.titleHover = true"
          @mouseleave="itemList.titleHover = false"
          @click="enterFolder">{{ itemList.name }} 
        </div>
        <div>{{ itemList.createTime || myTime  }} </div>
      </div>
    </div>

    <div class="item-right">
      <div v-if="itemList.isFolder == 0" class="item-btn">重新上传</div>
      <div class="item-btn" 
        @click="dialogChangeName = true">重命名
      </div>
      <div class="item-btn" @click="dialogDel = true">删除</div>
    </div>

    <el-dialog
      title="重命名"
      :visible.sync="dialogChangeName"
      width="30%">
      <el-input v-model="newName" placeholder="请输入新名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeName = false">取 消</el-button>
        <el-button type="primary" @click="changeName">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="dialogDel"
      width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">删 除</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
  //import x from ''
  import Qs from "qs"
  export default {
    props:{
      itemList: { 
        type: Object,
        required: true   
      },
      selectAll: {
        type: Boolean,
        required: true
      }
    },
    /* watch: {
      selectAll: {
        handler(newValue){
          this.isToggle = newValue
        }
      }
    }, */
    data() {
      return {
        // isToggle: this.selectAll,
        folderIcon: "../../../../folder.png",
        videoIcon: "../../.././video.png",
        musicIcon: "../../../../music.png",
        imageIcon:  "../../../../image.png",
        myTime: "2020-10-16",
        dialogChangeName: false,
        dialogDel: false,
        newName: ""
      };
    },
    methods: {
      clickToggle(){ 
        // console.log("toggled")
        // this.isToggle = !this.isToggle;
        this.$emit("selectStateChange")
      },
      enterFolder(){
        if(this.itemList.isFolder)
          this.$emit("refresh", this.itemList.id)
      },
      async changeName(){
        let Data = await this.$http.put(
          "/api/updateResource",
          {
            id: this.itemList.id,
            isFolder: this.itemList.isFolder ? 1 : 0,
            size: this.itemList.size,
            unit: this.itemList.unit,
            name: this.newName
          },
          { 
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            } 
          }
        )
        if(Data.data.code === "200"){
          console.log("update succeeded!")
          this.dialogChangeName = false
          this.$emit("refresh")
        }
      },
      async deleteItem(){
        /* let xhr = new XMLHttpRequest()
        xhr.open("delete", "/api/recyclebin/deleteByLogic", true)
        xhr.onload = e => {
          console.log(e)
        }
        xhr.setRequestHeader("Authorization", localStorage.getItem("loginToken"))
        xhr.setRequestHeader("Content-Type", "application/json")
        // xhr.responseType = "application/json"
        
            //   id: this.itemList.id,
            //   type: 0
        xhr.send(JSON.stringify({
          id: this.itemList.id,
          type: 0
        })) */
        let requestData = {
          id: this.itemList.id,
          type: 0
        }
        let Data = await this.$http.get(
          "/api/recyclebin/deleteByLogic",
          { 
            headers: { 
              // 'content-type': "application/json",
              Authorization: localStorage.getItem("loginToken"),
            },
            params: requestData,
            paramsSerializer: function(params) {
              return Qs.stringify(params)
            },
          }
        )
        if(Data.data.code === "200"){
          console.log("delete succeeded!")
          this.dialogDel = false
          this.$emit("refresh")
        }
      },
      
      /* async enterFolder() {
        let listData = await this.$http.get(
          "/api/getResourceList",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              orderColumn: 0,
              pid: this.itemList.id,
              type: 1
            },
            paramsSerializer: function(params) {
              return Qs.stringify(params)
            }
          }
        )
        if(listData.data.code === "200") {
          let lists = []
          listData.data.data.forEach(item => {
            let obj = {
              id: item.id,
              isFolder: item.isFolder == 1,
              name: item.name,
              fileType: item.type,
              createTime: item.createTime,
            }
            lists.push(obj)
          })
          this.resourceList = lists
          console.log(this.resourceList)
      } */
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
.item-box:hover {
  background-color: #f3f3f3;
  /* background-color: #EAF9FD; */
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
.item-info {
  margin-left: 10px;
}
/* inline style todo */
.item-info .title {
  /* border: 1px solid red; */
  line-height: 50px;
  font-size: 30px;
  cursor: pointer;
}
.bottom-line {
  font-weight: 600;
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
.is-selected {
  /* avoid being changed by hover */
  background-color: #EAF9FD !important;
}
</style>
<style>

</style>