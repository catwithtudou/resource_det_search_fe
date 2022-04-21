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
          <el-row justify="end" align="middle">
            <el-col>
              <el-image :src="userInfo.avatarUrl" fit="fill" lazy />
            </el-col>
            <el-divider />
            <el-col>
              <div class="personal-base-avater-info">
                <el-button type="text" :icon="Edit" @click="editIntro()"
                  >编辑个人信息</el-button
                >
                <el-upload
                  :action="uploadAvatar.action"
                  :name="uploadAvatar.name"
                  :headers="uploadAvatar.header"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button type="text" :icon="Upload">上传头像</el-button>
                </el-upload>
              </div>
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
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            unique-opened
            router
          >
            <el-menu-item index="1" route="/personal/resource">
              <el-icon>
                <document />
              </el-icon>
              <span>已上传资源</span>
            </el-menu-item>
            <el-menu-item index="2" route="/personal/tags">
              <el-icon>
                <collection-tag />
              </el-icon>
              <span>标签</span>
            </el-menu-item>
            <el-menu-item index="3" route="/personal/categories">
              <el-icon>
                <folder />
              </el-icon>
              <span>分类</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="personal-resource-info">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Document,
  CollectionTag,
  Folder,
  Edit,
  Upload,
  Avatar,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@api/index.js";

let store = useStore();
let router = useRouter();

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
let uploadAvatar = ref({
  action: "http://localhost:3000/api/user/avatar",
  name: "avatar",
  header: {
    Authorization: "Bearer " + userToken.value,
  },
});

let topName = computed(() => store.state.home.name);

// 顶栏部分

function topNameSkip() {
  router.push("/personal");
}

function uploadResource() {
  router.push({
    name: "uploadResource",
  });
}

function backHome() {
  //TODO:跳转至主页搜索页面
  console.log("Back home");
}

// 获取个人信息部分

onMounted(() => {
  userInfoLoading.value = true;
  api.user
    .userInfo()
    .then((res) => {
      userInfoLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      let resData = res.data.data;
      if (resData.intro === "") {
        resData.intro = "这个人很懒，什么都没有留下~";
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

// 路由导航部分

function handleOpen(key, keyPath) {
  // console.log("open:" + key);
}
function handleClose(key, keyPath) {
  // console.log("close:" + key);
}

function handleSelect(index, indexPath, item, routeItem) {
  // console.log("select:" + index);
  // console.log("select:" + indexPath);
  // console.log("select:" + item);
  // console.log("select:" + routeItem);
}

// 编辑个人资料部分
function editIntro() {
  ElMessageBox.prompt("请输入想要修改的简介（限制100字以内）", "编辑信息", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
    .then(({ value }) => {
      if (value.length > 100) {
        ElMessage.error("简介不能超过100字");
        return;
      }
      api.user
        .userInfoUpdate({ intro: value })
        .then((res) => {
          if (res.data.code != 0) {
            ElMessage.error("服务器异常，请稍后重试~");
            return;
          }
          userInfo.value.intro = value;
          ElMessage({
            type: "success",
            message: `修改成功~`,
          });
        })
        .catch((err) => {
          ElMessage.error("网络错误，请检查网络连接");
          return;
        });
    })
    .catch(() => {});
}

// 上传头像部分
function handleAvatarSuccess(response, uploadFile, file) {
  if (response.code !== 0) {
    ElMessage.error("上传头像失败，请稍后重试~");
    return;
  }
  userInfo.value.avatarUrl = response.data.avatar;
  ElMessage.success("上传头像成功~");
}

function beforeAvatarUpload(rawFile) {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像格式异常，请重新上传~");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不能超过2MB，请重新上传~");
    return false;
  }
  return true;
}
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
    height: 40vh;
    border-right: 5px solid #337ecc;

    .el-image {
      margin-top: 30px;
      border-radius: 100%;
      width: 10vw;
    }

    .personal-base-avater-info {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  .personal-base-info {
    font-size: 10px;

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
</style>
