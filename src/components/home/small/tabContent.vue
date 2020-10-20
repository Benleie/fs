<template>
  <div class=''>
    <div class="first-box">
      <div class="first-left">
        <el-input placeholder="请输入关键字" class="first-search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button 
          class="first-upload"
          @click="dialogUpload = true">上传{{ typeCHName }}</el-button>
      </div>
      <div class="first-right">
        <el-button class="first-move">移动到</el-button>
        <el-button 
          class="first-build" 
          @click="dialogVisible = true">新建文件夹</el-button>
      </div>
    </div>
    <div class="select-box">
      <!-- <el-radio v-model="isSelected" label="1">全选</el-radio> -->
      <div class="select-left">
        <div class="toggle" @click="toggleSelectAll">
            <div class="toggle-content" v-if="isToggleAll"></div>
        </div>
        <div class="select-all-text">全选</div>
        <div v-if="parentId !== 0" class="back" @click="getList(parentId = 0)">
          <i class="el-icon-d-arrow-left"></i>
          <span>返回</span>
        </div>
      </div>
      
      <div class="dropdown-container">
        <div  class="dropdown-content">
          <el-dropdown trigger="click">
            <div class="dropdown-title">筛选： 
              <span>{{ filterDefault }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item 
                @click.native="changeFilter(0)">{{ filterList[0] }}
              </el-dropdown-item>
              <el-dropdown-item 
                @click.native="changeFilter(1)">{{ filterList[1] }}
              </el-dropdown-item>
              <el-dropdown-item 
                @click.native="changeFilter(2)">{{ filterList[2] }}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="changeFilter(3)">{{ filterList[3] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="dropdown-content">
          <el-dropdown trigger="click">
            <div  class="dropdown-title">排序： 
              <span>{{ sortDefault }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item 
                @click.native="changeSort(0)">{{ sortList[0] }}
              </el-dropdown-item>
              <el-dropdown-item 
                @click.native="changeSort(1)">{{ sortList[1] }}
              </el-dropdown-item>
              <el-dropdown-item 
                @click.native="changeSort(2)">{{ sortList[2] }}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="changeSort(3)">{{ sortList[3] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-box">
      <Item
        :itemList="itemData"
        v-for="itemData in resourceList"
        :key="itemData.id"
        @refresh="enterFolder"
      />
    </div>

    <el-dialog
      title="新建文件夹"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input v-model="dialogInput" placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="图片上传"
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
  import Item from './Item.vue'
  export default {
    components: { Item },
    props:{
        typeName: { 
            type: String,
            required: true   
        }
    },
    watch: {
      typeName: {
        handler(newValue){
          this.typeIndex = ["image", "video", "music"].indexOf(newValue)
          this.typeCHName = ["图片", "视频", "音乐"][this.typeIndex]
          this.typeId = this.typeIndex + 1
          this.getList(this.parentId)
        }
      }
    },
    data() {
      return {
        typeIndex: null,
        typeId: null,
        typeCHName: "",
        isToggleAll: true,
        filterList: ["最近一周", "最近一月", "最近一周"],
        filterDefault: "全部",
        sortList: ["最近修改", "文件大小", "名称A-Z", "创建时间"],
        sortDefault: "最近修改",
        itemLists: [
          {
            id: 1,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            createTime: "2020-10-16"
          },
          {
            id: 2,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            createTime: "2020-10-16"
          },
          {
            id: 3,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            createTime: "2020-10-16"
          },
        ],
        resourceList: [],
        dialogVisible: false,
        dialogUpload: false,
        dialogInput: "",
        parentId: 0,
        headers: {
          Authorization: localStorage.getItem('loginToken')
        },
        uploadRule: {
          name: [{ required: true, message: "请输入名称", trigger: 'blur' }]
        },
        uploadInfo: {
          name: "",
          fileSize: null,
          unit: [1, 2, 3, 4],
          url: ""
        }
      };
    },
    created(){
      
    },
    updated(){
      console.log(this.resourceList)
    },
    methods: {
      changeSort(id){
        // console.log(e.currentTarget)
        this.sortDefault = this.sortList[id]
      },
      changeFilter(id){ this.filterDefault = this.filterList[id] },
      toggleSelectAll() { this.isToggleAll = !this.isToggleAll },
      async getList(parentId){
        let listData = await this.$http.get(
          "/api/getResourceList",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              orderColumn: 0,
              pid: parentId,
              type: this.typeId
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
              url: item.url,
              fileType: item.type,
              createTime: item.createTime,
            }
            lists.push(obj)
          })
          this.resourceList = lists
          console.log(this.resourceList)
        }
      },
      enterFolder(id){
        console.log(id)
        this.parentId = id
        this.getList(this.parentId)
      },
      async newFolder(){
        let listData = await this.$http.post(
          "/api/addResource",
          {
            name: this.dialogInput,
            isFolder: 1,
            type: this.typeId,
            id: 0,
            orderColumn: 0,
            parentId: this.parentId,
            pname: "",
            size: 0,
            unit: "",
            url: ""
          },
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            }
          }
        )
        if(listData.data.code === "200"){
          console.log(listData.data.msg)
          this.dialogVisible = false
          this.getList(this.parentId)
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
          size: this.uploadInfo.fileSize,
          unit: this.uploadInfo.unit[0],
          url: this.uploadInfo.url,
          parentId: this.parentId,
          isFolder: 0,
          type: 1,
        }
        let uploadData = await this.$http.post(
          "/api/addResource",
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
          this.getList(this.parentId)
        }
      }
    },
  }
</script>


<style scoped>
.first-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid salmon; */
  margin-bottom: 15px;
}
.first-left,
.first-right {
  display: flex;
}
.first-search {
  width: 300px;
  margin-right: 14px;
}

.dropdown-content {
  margin-left: 27px;
  margin-right: 20px;
}


.select-box {
  width: 1059px;
  height: 60px;
  background-color: #EDEDED;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-left,
.dropdown-container {
  display: flex;
}
.dropdown-title {
  background-color: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #979797;
} 
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
.select-all-text {
  margin-left: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #4A4A4A;
  line-height: 25px;
}

.select-left .back {
  cursor: pointer;
  margin-left: 15px;
  font-size: 18px;
}
.main-box {
  height: 600px;  
  border-bottom: 1px solid lightgray;
  overflow: auto;
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
.first-upload,
.first-move {
  /* height: 40px; */
  background: #3BB0FE;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 18px;
}
.first-build {
  border-radius: 4px;
  border: 1px solid #3BB0FE;
  font-size: 18px;
  font-weight: 600;
  color: #3BB0FE;
  line-height: 18px;
}
.el-dialog__footer {
  text-align: center;
}
</style>