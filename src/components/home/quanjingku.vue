<template>
  <div class='show-wrapper'>
    <div class="show-content">
      <div class="first-box">
        <div class="first-left">
          <el-input 
            v-model="searchInput"
            @change="searchData"
            placeholder="请输入关键字" class="first-search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="select-box">
        <!-- <el-radio v-model="isSelected" label="1">全选</el-radio> -->
        <div class="select-left">
          <div class="toggle" @click="toggleSelectAll">
              <div class="toggle-content" v-if="isToggleAll"></div>
          </div>
          <div class="select-all-text">全选</div>
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
        <div v-if="resourceList.length !== 0">
          <show-Item
            :itemList="itemData"
            v-for="itemData in resourceList"
            :key="itemData.id"
          />
        </div>
        <div v-else class="no-folder">该文件夹为空</div>
      </div>
    </div>
    

    
  </div>
</template>

<script>
  //import x from ''
  import showItem from "./small/showItem.vue"
  export default {
    components: { showItem },
    data() {
      return {
        isToggleAll: true,
        filterList: ["最近一周", "最近一月", "最近一周"],
        filterDefault: "全部",
        sortList: ["最近修改", "文件大小", "名称A-Z", "创建时间"],
        sortDefault: "最近修改",
        resourceList: [],
        searchInput: ''
      };
    },
    created(){
      this.getList()
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
      async getList(){
        let listData = await this.$http.get(
          "/api/panos/list",
          {
            headers: {
              Authorization: localStorage.getItem("loginToken") 
            },
          }
        )
        if(listData.data.code === "200") {
          let lists = []
          listData.data.data.forEach(item => {
            let obj = {
              id: item.id,
              name: item.name,
              url: item.picUrl,
              createTime: item.createTime,
              summary: item.summary
            }
            lists.push(obj)
          })
          this.resourceList = lists
          // console.log(this.resourceList)
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