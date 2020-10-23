<template>
  <div class=''>
    <div class="first-box">
      <div class="first-left">
        <el-input
          v-model="searchInput"
          @input="searchData"  
          placeholder="请输入关键字" 
          class="first-search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button 
          class="first-upload"
          @click="dialogUpload = true">上传{{ typeCHName }}</el-button>
      </div>
      <div class="first-right">
        <el-button
          :disabled="!hasSelect ? true : false "
          @click="dialogMove = true"
          class="first-move"
          :class="hasSelect ? 'has-select' : ''"
          >移动到
        </el-button>
        <el-button 
          class="first-build" 
          @click="dialogVisible = true">新建文件夹</el-button>
      </div>
    </div>
    <div class="select-box">
      <div class="select-left">
        <div class="toggle" @click="toggleSelectAll">
            <div class="toggle-content" v-if="isToggleAll"></div>
        </div>
        <div class="select-all-text">全选</div>
        <div v-if="parentId !== 0" class="click-back" @click="handleClickBack">
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
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-box">
      <div v-if="resourceList.length !== 0">
        <Item
          :itemList="itemData"
          :selectAll="isToggleAll"
          v-for="itemData in resourceList"
          :key="itemData.id"
          @selectStateChange="changeSelectObj(itemData)"
          @uploadAgain="uploadAgain(itemData)"
          @refresh="refreshPage">
        </Item>
      </div>
      <div v-else class="no-folder">该文件夹为空</div>
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
      title="移动到"
      :visible.sync="dialogMove"
      width="30%">
      <div class="remove-box">
        <div 
          v-for="item in folderList"
          :key="item.id"
          class="folder-item"
          :class="item.isSelect ? 'is-selected' : ''"
          @click="clickFolder(item)">
          <div class="image">
            <img height="20px" src="@/assets/folder.png">
          </div>
          <div class="title">{{ item.name }}</div>
        </div>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMove = false">取 消</el-button>
        <el-button type="primary" @click="removeTo">确 定</el-button>
      </span>
    </el-dialog>
    
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
          <el-form-item label="size:">
            <div>{{ sizeInfo }}</div>
          </el-form-item>
          
        </el-form>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="uploadFile">确 定</el-button>
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
          this.typeIndex = ["image", "music", "video"].indexOf(newValue)
          this.typeCHName = ["图片", "音乐", "视频"][this.typeIndex]
          this.typeId = this.typeIndex + 1
          this.getList()
        }
      }
    },
    data() {
      return {
        typeIndex: null,
        typeId: 1,
        orderColumn: "createTime",
        typeCHName: "图片",
        isToggleAll: false,
        filterList: ["最近一周", "最近一月", "最近一周"],
        filterDefault: "全部",
        sortList: ["创建时间", "更新时间", "名称A-Z"],
        sortDefault: "最近修改",
        itemLists: [
          {
            id: 1,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            isSelect: false,
            createTime: "2020-10-16"
          },
          {
            id: 2,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            isSelect: false,
            createTime: "2020-10-16"
          },
          {
            id: 3,
            url: "../../../favicon.ico",
            name: "姚明在世界杯",
            isSelect: false,
            createTime: "2020-10-16"
          },
        ],
        resourceList: [],
        folderList: [],
        folderId: 0,
        selectObj: {},
        hasSelect: false,
        dialogVisible: false,
        dialogUpload: false,
        dialogMove: false,
        dialogInput: "",
        searchInput: "",
        parentId: 0,
        itemId: null,
        headers: {
          Authorization: localStorage.getItem('loginToken')
        },
        isUploadAgain: false,
        uploadRule: {
          name: [{ required: true, message: "请输入名称", trigger: 'blur' }]
        },
        uploadInfo: {
          name: "",
          fileSize: 0,
          unit: [1, 2, 3, 4],
          url: ""
        }
      };
    },
    computed: {
      sizeInfo(){
        return this.uploadInfo.fileSize + ["KB", "MB"][0]
      }
    },
    created(){
      this.getList()
    },
    updated(){
      // console.log(this.resourceList)
      // console.log(this.folderList)
      console.log("updated!")
    },
    methods: {
      async searchData(){
        console.log("search")
        let listData = await this.$http.get(
          "/api/getResourceByname",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              name: this.searchInput,
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
              isSelect: false,
              titleHover: false,
              // fileType: item.type,
              name: item.name,
              url: item.url,
              createTime: item.createTime,
            }
            lists.push(obj)
          })
          this.resourceList = lists
          this.setFolderList()
        }
      },  
      async changeSort(id){
        this.orderColumn = ["createTime", "updateTime", "name"][id]
        this.getList()
        this.sortDefault = this.sortList[id]
      },
      handleClickBack(){
        this.parentId = 0;
        this.getList()
      },
      changeFilter(id){ this.filterDefault = this.filterList[id] },
      toggleSelectAll() {
        this.isToggleAll = !this.isToggleAll
        if(this.isToggleAll){
          this.hasSelect = true
          this.resourceList.forEach(item => {
            item.isSelect = true
          })
        } else {
          this.hasSelect = false
          this.resourceList.forEach(item => {
            item.isSelect = false
          })
        }
      },
      setFolderList() {
        let returnArr = []
        let tempArr = this.resourceList.filter(item => {
          return item.isFolder
        })
        tempArr.forEach(item => {
          let obj = {
            id: item.id,
            name: item.name,
            isSelect: false
          }
          returnArr.push(obj)
        })
        this.folderList = returnArr
      },
      async getList(){
        let listData = await this.$http.get(
          "/api/getResourceList",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              orderColumn: this.orderColumn,
              pid: this.parentId,
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
              isSelect: false,
              titleHover: false,
              // fileType: item.type,
              size: item.size,
              unit: item.unit,
              name: item.name,
              url: item.url,
              createTime: item.createTime,
            }
            lists.push(obj)
          })
          this.resourceList = lists
          this.setFolderList()
          // console.log(this.resourceList)
        }
      },
      refreshPage(getId){
        let id = getId || this.parentId
        console.log(getId)
        this.parentId = id
        this.getList()
      },
      clickFolder(item){
        // 点击只能选中一项，所以需要清除
        this.folderId = 0
        this.folderList.forEach(value => {
          value.isSelect = false
        })
        // console.log(this.folderList)
        item.isSelect = true
        this.folderId = item.id
        console.log(item)
      },
      async removeTo(){
        let ids = []
        this.resourceList.forEach(item => {
          if(item.isSelect){
            ids.push(Number(item.id))
          }
        })
        if(ids.includes(Number(this.folderId))) {
          console.log("请选择正确的目标文件夹")
        } else {
          // let jsonIds = ()...[ids]
          let Data = await this.$http.put(
            "/api/moveTo",
            {},
            {
              params: {
                // 
                ids: ids.join(","),
                targetId: this.folderId
              },
              paramsSerializer: function(params) {
                return Qs.stringify(params)
              },
              headers: {
                Authorization: localStorage.getItem("loginToken") 
              }
            }
          )
          if(Data.data.code === "200"){
            console.log("move done")
            this.dialogMove = false
            this.getList()
          }
        }
        // console.log(ids)
        // console.log(this.folderId)
      },
      changeSelectObj(item){
        item.isSelect = !item.isSelect

        this.hasSelect = this.resourceList.some(value => {
          return value.isSelect
        })
        console.log(this.hasSelect)


        /* isSelect 
          ? this.selectObj[getId] = isSelect
          : delete this.selectObj[getId]
        this.hasSelect = Object.keys(this.selectObj).length
          ? true
          : false */
        // console.log(Object.keys(this.selectObj))
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
          this.getList()
        }
      },
      handleSuccess(res, file){
        this.uploadInfo.url = res.data
        this.uploadInfo.fileSize = Math.floor(file.size / 1024)
        console.log(Math.floor(file.size / 1024))
        // console.log(fileList)
      },
      uploadAgain(item){
        this.itemId = item.id
        this.dialogUpload = true
        this.isUploadAgain = true
      },
      async uploadFile() {
        this.$refs["uploadForm"].validate(async (valid) => {
          if(!valid) console.log("请正确输入")
          else {
            let uploadUrl = this.isUploadAgain
              ? "/api/updateResource"
              : "/api/addResource"
            let requestData = {
              id: this.itemId,
              name: this.uploadInfo.name,
              size: this.uploadInfo.fileSize,
              unit: this.uploadInfo.unit[0],
              url: this.uploadInfo.url,
              parentId: this.parentId,
              isFolder: 0,
              type: this.typeId,
            }
            let uploadData = await this.$http.request(
              { 
                url: uploadUrl,
                method:  this.isUploadAgain ? 'put' : 'post',
                data: requestData,
                headers: {
                  Authorization: localStorage.getItem("loginToken") 
                }
              }
            )
            console.log(uploadData)
            if(uploadData.data.code === "200"){
              console.log(uploadData.data.msg)
              this.dialogUpload = false
              this.isUploadAgain = false
              this.getList()
            }
          }
        })
        
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

.select-left .click-back {
  cursor: pointer;
  margin-left: 15px;
  font-size: 18px;
}
.main-box {
  width: 1060px;
  height: 760px;  
  border: 1px solid #F4F4F4;
  overflow: auto;
}
.no-folder {
  margin-top: 10px;
  text-align: center;
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
.remove-box {
  height: 400px;  
  border: 1px solid lightgray;
  overflow: auto;
}
.remove-box .folder-item {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
}
.folder-item:hover {
  background-color: #f3f3f3;
}
.is-selected {
  /* avoid being changed by hover */
  background-color: #EAF9FD !important;
}
.folder-item .image {
  margin-left: 10px;
  margin-right: 10px;
}

</style>
<style>
.first-upload {
  background: #3BB0FE;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 18px;
}
.first-move {
  background: #ffffff;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #4A4A4A;
  line-height: 18px;
}
.has-select {
  background-color: #3BB0FE;
  color: #ffffff;
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