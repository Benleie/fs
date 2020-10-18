<template>
  <div class='tabs-wrapper'>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-content">
      <el-tab-pane label="图片素材" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="视频素材" name="second">
        <div class="first-box">
          <div class="first-left">
            <el-input placeholder="请输入关键字" class="first-search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="first-upload">上传图片</el-button>
          </div>
          <div class="first-right">
            <el-button class="first-move">移动到</el-button>
            <el-button class="first-build">新建文件夹</el-button>
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
          <Item
            :itemList="itemData"
            v-for="itemData in itemLists"
            :key="itemData.id"
            @click.native="show"
          />
        </div>
        
      </el-tab-pane>
      <el-tab-pane label="音乐素材" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  //import x from ''
  import Item from './small/Item.vue'
  export default {
    components: { Item },
    data() {
      return {
        activeName: 'second',
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

      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeSort(id){
        // console.log(e.currentTarget)
        this.sortDefault = this.sortList[id]
      },
      changeFilter(id){ this.filterDefault = this.filterList[id] },
      toggleSelectAll() { this.isToggleAll = !this.isToggleAll },
      show(e){ console.log(e.target) }
    },
  }
</script>

<style scoped>
.tabs-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.tabs-content {
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
</style>