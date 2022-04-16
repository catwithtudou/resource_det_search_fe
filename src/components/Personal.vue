<template>
  <div class="personal">
    <el-container>
      <el-header class="personal-header">
        <el-row justify="center" align="middle" class="personal-header-rows">
          <el-col :span="14">
            <div class="personal-header-title">
              <h2>高校课程资源智能识别与搜索系统</h2>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="personal-header-upload">
              <el-button type="primary" size="large"
                >Upload Resource
                <el-icon class="el-icon--right">
                  <Upload />
                </el-icon>
              </el-button>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="personal-header-user">
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
          <el-image :src="userInfo.avatarUrl" fit="fill" lazy />
          <el-divider />
          <el-button type="text" :icon="Edit" @click="editIntro()"
            >编辑个人信息</el-button
          >
          <el-button type="text" :icon="Upload" @click="editAvatar()">上传头像</el-button>
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
import { Upload, Avatar } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { Document, CollectionTag, Folder, Edit } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@api/index.js";

let store = useStore();
let router = useRouter();

let topName = computed(() => store.state.home.name);
let userInfo = ref({
  avatarUrl: "",
  name: "",
  role: "",
  school: "",
  sid: "",
  sex: "",
  intro: "",
});
let userInfoLoading = ref(false);

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

function handleOpen(key, keyPath) {
  console.log("open:" + key);
}
function handleClose(key, keyPath) {
  console.log("close:" + key);
}

function handleSelect(index, indexPath, item, routeItem) {
  console.log("select:" + index);
  console.log("select:" + indexPath);
  console.log("select:" + item);
  console.log("select:" + routeItem);
}

function topNameSkip() {
  router.push("/personal");
}

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

function editAvatar() {}
</script>

<style lang="less" scoped>
.personal {
  .personal-header {
    padding: 0;
    height: 8vh;
    width: 100%;
    background-color: #d9ecff;

    .personal-header-rows {
      .personal-header-title {
        padding-left: 20px;
        color: #337ecc;
      }

      .personal-header-upload {
        text-align: center;

        .el-button {
          width: 70%;
        }
      }

      .personal-header-user {
        text-align: center;
      }
    }
  }

  .personal-base {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ecf5ff;
    height: 30vh;

    .personal-base-avater {
      text-align: center;
      width: 20vw;
      height: 25vh;
      border-right: 5px solid #337ecc;

      .el-image {
        border-radius: 100%;
        width: 10vw;
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
}
</style>
