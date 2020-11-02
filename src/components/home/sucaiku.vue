<template>
  <div class='tabs-wrapper'>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs-content">
      <el-tab-pane label="图片素材" name="image">
        <tab-content :typeName="activeName"></tab-content>
      </el-tab-pane>
      <el-tab-pane label="音乐素材" name="music">
        <tab-content :typeName="activeName"></tab-content>
      </el-tab-pane>
      <el-tab-pane label="视频素材" name="video">
        <tab-content :typeName="activeName"></tab-content>
        <!-- <div class="first-box">
          <div class="first-left">
            <el-input placeholder="请输入关键字" class="first-search">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button 
              class="first-upload"
              @click="dialogUpload = true">上传视频</el-button>
          </div>
          <div class="first-right">
            <el-button class="first-move">移动到</el-button>
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
        </div> -->
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
  import tabContent from "./small/tabContent.vue"
  export default {
    components: { 
      tabContent
    },
    data() {
      return {
        activeName: "image",
        typeArr: ["image", "video", "music"],
      };
    },
    watch: {
      activeName: {
        handler(newValue){
          console.log(newValue)
          // this.getList()
        }
      }
    },
    
    methods: {
      handleClick() {},
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
</style>