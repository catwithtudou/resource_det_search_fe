<template>
  <el-container class="resource-home">
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
      <el-row justify="center" align="middle" class="search-img">
        <el-col :span="12">
          <el-image
            src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
            fit="fill"
            lazy
          >
          </el-image>
        </el-col>
      </el-row>

      <el-row justify="center" class="search-input">
        <el-col :span="12">
          <el-input
            v-model="searchKey"
            placeholder="请输入搜索关键词"
            size="large"
            :suffix-icon="Search"
          />
        </el-col>
      </el-row>
    </el-main>
    <el-container class="main-info">
      <el-header class="info-header">
        <el-menu
          class="header-menu"
          mode="horizontal"
          :default-active="activeMenu"
          ellipsis
          unique-opened
          router
        >
          <el-menu-item index="all" route="/resource/home/part/all">所有</el-menu-item>
          <el-menu-item index="1" route="/resource/home/part/1">课程课件</el-menu-item>
          <el-menu-item index="2" route="/resource/home/part/2">文档试卷</el-menu-item>
          <el-menu-item index="3" route="/resource/home/part/3">课程练习</el-menu-item>
          <el-menu-item index="4" route="/resource/home/part/4">书籍论文</el-menu-item>
          <el-menu-item index="5" route="/resource/home/part/5">材料模板</el-menu-item>
          <el-menu-item index="6" route="/resource/home/part/6">会议文档</el-menu-item>
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

// main-info 部分

// main-info-header 部分

let activeMenu = ref("all");

function getPathLastKey(path) {
  let idx = path.split("/").pop().toLowerCase();
  if (idx === "home") {
    idx = "all";
  }
  return idx;
}

watch(
  () => route.path,
  (path) => {
    activeMenu.value = getPathLastKey(path);
  }
);

// onMounted 部分

onMounted(() => {
  activeMenu.value = getPathLastKey(route.path);
  router.push({
    path: "/resource/home/part/" + activeMenu.value,
  });
});
</script>

<style lang="less" scoped>
.resource-home {
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

  .main-search {
    margin-top: 50px;

    .search-img {
      text-align: center;
      .el-image {
        border-radius: 100%;
        width: 40%;
      }
    }

    .search-input {
      margin-top: 50px;
    }
  }
}
</style>
