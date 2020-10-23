<template>
  <div class='show-wrapper'>
    <div class="show-content">
      <div class="first-box">
        <div class="first-left">
          <el-input 
            v-model="searchInput"
            placeholder="请输入关键字" class="first-search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="select-box">
        <div class="select-left">
          <!-- <div class="toggle" @click="toggleSelectAll">
              <div class="toggle-content" v-if="isToggleAll"></div>
          </div>
          <div class="select-all-text">全选</div> -->
          <div
              v-if="parentId !== 0" 
              @click="getProjList(parentId = 0)"
              class="click-back">
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
        <div class="item-container" v-if="projectList.length !== 0">
          <div
            class="item-box"
            v-for="item in projectList"
            :key="item.id"
          >
            <div class="item-left">
              <div class="toggle" @click="toggleItem(item)">
                <div class="toggle-content" v-if="item.isSelect"></div>
              </div>
              <div class="item-image">
                <img src="@/assets/folder.png" height="20px">
              </div>
              <div class="item-info">
                <div
                  @click="getProjList(parentId = item.id)"
                  class="title">{{ item.name }}
                </div>
                <div>{{ item.createTime }} </div>
              </div>
            </div>

            <div class="item-right">
              <div class="item-btn">进入全景</div>
              <div class="item-btn">分享</div>
              <div class="item-btn">删除</div>
            </div>
          </div>
        </div>
        <div v-else class="no-folder">该文件夹为空</div>
        <div class="info-box">
          <article>
            <header class="info-title">
              <div class="style-box">
                <div></div>
              </div>
              <div>临建全景</div>
            </header>
            <section class="upload-image">
              <div><img src="@/assets/image.png" width="140px"></div>
              <div class="info-btn">
                <i class="el-icon-upload2"></i>
                上传封面
              </div>
            </section>
            <section class="info-content">
              <div class="info-text">项目名称：临建全景</div>
              <div class="info-text">项目简介：这是一段简介</div>
              <div class="info-btn edit">
                <i class="el-icon-edit"></i>
                编辑
              </div>
            </section>
          </article>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  //import x from ''
  // import showItem from "./small/showItem.vue"
  export default {
    components: { },
    data() {
      return {
        isToggleAll: false,
        parentId: 0,
        filterList: ["最近一周", "最近一月", "最近一周"],
        filterDefault: "全部",
        sortList: ["最近修改", "文件大小", "名称A-Z", "创建时间"],
        sortDefault: "最近修改",
        projectList: [],
        searchInput: ''
      };
    },
    created(){
      this.getProjList()
    },
    methods: {
      searchData(){
        console.log("searchData ing")
      },
      changeSort(id){
        // console.log(e.currentTarget)
        this.sortDefault = this.sortList[id]
      },
      changeFilter(id){ this.filterDefault = this.filterList[id] },
      toggleSelectAll() { this.isToggleAll = !this.isToggleAll },
      toggleItem(item){
        item.isSelect = !item.isSelect
      },
      enterFolder(id){
        this.parentId = id
        this.getProjList()
      },
      async getProjList(){
        let listData = await this.$http.get(
          "/api/project/list",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
            params: {
              pid: this.parentId,
            }
          }
        )
        if(listData.data.code === "200") {
          let lists = []
          listData.data.data.forEach(item => {
            let obj = {
              id: item.id,
              name: item.name,
              summary: item.summary,
              url: item.picUrl,
              createTime: item.createTime,
              isSelect: false
            }
            lists.push(obj)
          })
          this.projectList = lists
        }
      }
    },
  }
</script>

<style scoped>
.show-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 17px;
}
.show-content {
  width: 1060px;
  
}
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
  height: 800px;
  border: 1px solid #F4F4F4;
  display: flex;
}
.main-box .item-container {
  overflow: auto;
}
.info-box {
  width: 339px;
  border-left: 1px solid #ededed;
  padding-top: 8px;
}
.info-box article {
  margin-left: 30px;
}
.info-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.info-title .style-box div {
  width: 4px;
  height: 16px;
  background: #3BB0FE;
}
.info-title .style-box {
  width: 20px;
  margin-left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-btn {
  width: 100px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: #3BB0FE;
  cursor: pointer;
}
.info-btn i {
  margin-right: 8px;
}
article .upload-image {
  margin-bottom: 30px;
}

article .info-text {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: #4A4A4A;
}
article .edit {
  margin-top: 12px;
}
.no-folder {
  width: 719px;
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

.item-box {
  width: 719px;
  height: 100px;
  display: flex;
  flex-direction: row;
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