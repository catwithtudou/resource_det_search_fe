<template>
  <el-container class="resource-search">
    <el-header class="main-header">
      <el-row justify="center" align="middle" class="main-header-rows">
        <el-col :span="14">
          <div class="main-header-title" @click="backHome()">
            <h2>高校课程资源智能识别与搜索系统</h2>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="main-header-upload">
            <el-button type="primary" size="large" @click="uploadResource()"
              >Upload Resource
              <el-icon class="el-icon--right">
                <Upload />
              </el-icon>
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="main-header-user">
            <el-button type="primary" class="el-icon--right" @click="topNameSkip()" round>
              {{ topName }}
              <el-icon>
                <Avatar />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main-search">
      <el-row justify="start" class="search-input">
        <el-col :span="12">
          <el-input
            v-model="searchKey"
            placeholder="请输入搜索关键词"
            size="large"
            :prefix-icon="Search"
            @change="handleChangeSearch"
            @keyup.enter="handleSearch"
            clearable
          />
        </el-col>
      </el-row>
    </el-main>
    <el-container class="main-result">
      <el-header class="info-header">
        <el-menu
          class="header-menu"
          mode="horizontal"
          :default-active="activeMenu"
          ellipsis
          unique-opened
          router
        >
          <el-menu-item
            index="all"
            route="/resource/search/part/all"
            :disabled="menuDisable"
            >所有</el-menu-item
          >
          <el-menu-item index="1" route="/resource/search/part/1" :disabled="menuDisable"
            >课程课件</el-menu-item
          >
          <el-menu-item index="2" route="/resource/search/part/2" :disabled="menuDisable"
            >文档试卷</el-menu-item
          >
          <el-menu-item index="3" route="/resource/search/part/3" :disabled="menuDisable"
            >课程练习</el-menu-item
          >
          <el-menu-item index="4" route="/resource/search/part/4" :disabled="menuDisable"
            >书籍论文</el-menu-item
          >
          <el-menu-item index="5" route="/resource/search/part/5" :disabled="menuDisable"
            >材料模板</el-menu-item
          >
          <el-menu-item index="6" route="/resource/search/part/6" :disabled="menuDisable"
            >会议文档</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-main class="info-main">
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Upload, Avatar, Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const route = useRoute();

// main-header 部分

let topName = computed(() => store.state.home.name);
function topNameSkip() {
  router.push("/personal");
}
function uploadResource() {
  router.push({
    name: "uploadResource",
  });
}
function backHome() {
  router.push({
    name: "resourceHome",
  });
}

// main-search 部分

let searchKey = ref();

let searchPart = ref(["all", "1", "2", "3", "4", "5", "6"]);

function handleChangeSearch(value) {
  searchKey.value = value;
}

function handleSearch() {
  if (searchKey.value === "") {
    ElMessage.warning("搜索关键词不能为空哟~");
    activeMenu.value = "";
    menuDisable.value = true;
    router.push({
      path: "/resource/search",
    });
    return;
  }
  activeMenu.value = "all";
  menuDisable.value = false;
  router.push({
    name: "resourceSearchPart",
    params: {
      partId: "all",
    },
    query: {
      search: searchKey.value,
    },
  });
}

watch(
  () => route.path,
  (path) => {
    if (path === "/resource/search") {
      menuDisable.value = true;
      activeMenu.value = "";
      return;
    }
    let idx = path.split("/").pop().toLowerCase();
    if (searchPart.value.indexOf(idx) === -1) {
      ElMessage.error("访问异常哟~");
      activeMenu.value = "";
      menuDisable.value = true;
      router.push({
        path: "/resource/search",
      });
      return;
    }
    activeMenu.value = path.split("/").pop().toLowerCase();
    router.push({
      path: path,
      query: {
        search: searchKey.value,
      },
    });
  }
);

// main-result 部分

let activeMenu = ref();
let menuDisable = ref(true);

// onMounted 部分
onMounted(() => {
  if (!route.query.search) {
    activeMenu.value = "";
    menuDisable.value = true;
    router.push({
      path: "/resource/search",
    });
    return;
  }

  searchKey.value = route.query.search;
  activeMenu.value = "all";
  menuDisable.value = false;
  router.push({
    name: "resourceSearchPart",
    params: {
      partId: "all",
    },
    query: {
      search: searchKey.value,
    },
  });
});
</script>

<style lang="less" scoped>
.resource-search {
  .main-header {
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #d9ecff;
    .main-header-rows {
      .main-header-title {
        padding-left: 20px;
        color: #337ecc;
      }

      .main-header-upload {
        text-align: center;

        .el-button {
          width: 70%;
        }
      }

      .main-header-user {
        text-align: center;
      }
    }
  }
}
</style>
