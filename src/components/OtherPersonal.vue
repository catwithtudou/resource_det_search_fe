<template>
  <div>
    <el-container>
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
              <el-button
                type="primary"
                class="el-icon--right"
                @click="topNameSkip()"
                round
              >
                {{ topName }}
                <el-icon>
                  <Avatar />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="personal-base" v-model="userInfo" v-loading="userInfoLoading">
        <el-aside class="personal-base-avater">
          <el-row justify="center" align="middle">
            <el-col>
              <el-image :src="userInfo.avatarUrl" fit="fill" lazy />
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="personal-base-info">
          <el-row justify="start">
            <el-col>
              <p><span>姓名：</span>{{ userInfo.name }}</p>
            </el-col>
            <el-col>
              <p><span>角色：</span>{{ userInfo.role }}</p>
            </el-col>
            <el-col>
              <p><span>学校：</span>{{ userInfo.school }}</p>
            </el-col>
            <el-col>
              <p><span>学号/教职工号：</span>{{ userInfo.sid }}</p>
            </el-col>
            <el-col>
              <p><span>性别：</span>{{ userInfo.sex }}</p>
            </el-col>
            <el-col>
              <p><span>简介：</span>{{ userInfo.intro }}</p>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container class="personal-resource">
        <el-aside class="personal-resource-type">
          <el-menu
            class="personal-resource-type-menu"
            :default-active="activeMenu"
            @select="handleSelectMenu"
            unique-opened
          >
            <el-menu-item index="resource">
              <el-icon>
                <document />
              </el-icon>
              <span>已上传资源</span>
            </el-menu-item>
            <el-menu-item index="tags">
              <el-icon>
                <collection-tag />
              </el-icon>
              <span>标签</span>
            </el-menu-item>
            <el-menu-item index="categories">
              <el-icon>
                <folder />
              </el-icon>
              <span>分类</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="personal-resource-info">
          <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  Document,
  CollectionTag,
  Folder,
  Edit,
  Upload,
  Avatar,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@api/index.js";

let store = useStore();
let router = useRouter();
let route = useRoute();

let userToken = computed(() => store.state.home.token);
let userInfo = ref({
  avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  name: "",
  role: "",
  school: "",
  sid: "",
  sex: "",
  intro: "",
});
let userInfoLoading = ref(false);
let otherPersonalUid = ref(route.query.uid);

let topName = computed(() => store.state.home.name);

let activeMenu = ref("");

// 顶栏部分

function topNameSkip() {
  router.push("/personal");
}

function backHome() {
  router.push({
    name: "resourceHome",
  });
}

function uploadResource() {
  router.push({
    name: "uploadResource",
  });
}

function handleSelectMenu(index, indexPath, item) {
  activeMenu.value = index;
  if (index === "tags") {
    router.push({
      name: "tags",
      query: {
        uid: otherPersonalUid.value,
      },
    });
  } else if (index === "resource") {
    router.push({
      name: "resource",
      query: {
        uid: otherPersonalUid.value,
      },
    });
  } else if (index === "categories") {
    router.push({
      name: "categories",
      query: {
        uid: otherPersonalUid.value,
      },
    });
  }
}

// 子路由部分
watch(
  () => route.path,
  (path) => {
    updateActiveMenu(path);
  }
);

function updateActiveMenu(path) {
  activeMenu.value = "";
  if (path === "/other/personal/tags") {
    activeMenu.value = "tags";
  } else if (path === "/other/personal/resource") {
    activeMenu.value = "resource";
  } else if (path === "/other/personal/categories") {
    activeMenu.value = "categories";
  }
}

// 获取个人信息部分

onMounted(() => {
  updateActiveMenu(route.path);
  userInfoLoading.value = true;
  api.user
    .userInfo({
      uid: Number(otherPersonalUid.value),
    })
    .then((res) => {
      userInfoLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      let resData = res.data.data;
      if (!resData.intro) {
        resData.intro = "这个人很懒，什么都没有留下~";
      }
      if (!resData.avatar) {
        resData.avatar =
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      }
      userInfo.value = {
        avatarUrl: resData.avatar,
        name: resData.name,
        role: resData.role,
        school: resData.school,
        sid: resData.sid,
        sex: resData.sex,
        intro: resData.intro,
      };
    })
    .catch((err) => {
      userInfoLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});
</script>

<style lang="less" scoped>
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
.personal-base {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf5ff;
  height: 40vh;

  .personal-base-avater {
    text-align: center;
    width: 20vw;

    .el-image {
      border-radius: 100%;
      width: 10vw;
    }
  }

  .personal-base-info {
    border-left: 5px solid #337ecc;

    span {
      font-weight: bold;
      color: #337ecc;
    }
  }
}

.personal-resource {
  .personal-resource-type {
    width: 20vw;
    height: 100vh;

    .personal-resource-type-menu {
      height: 100%;
      width: 100%;
    }
  }
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
