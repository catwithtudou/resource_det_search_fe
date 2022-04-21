<template>
  <div class="resource-info">
    <el-container v-model="doc">
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
      <el-container>
        <el-aside class="resource-info-aside" v-model="user" v-loading="asideLoading">
          <el-row justify="center" align="middle">
            <el-col class="aside-avatar" :span="12">
              <el-image :src="user.avatar" fit="fill" lazy />
              <p>{{ user.username }}</p>
              <el-button
                type="text"
                @click="otherPersonal()"
                size="large"
                :icon="DArrowRight"
                >点击进入主页</el-button
              >
            </el-col>
            <el-divider />
            <el-col>
              <div class="aside-dimension">
                <div class="dimension-category">
                  <p><span>分类</span></p>
                  <p>{{ user.dmNum.category }}</p>
                </div>
                <div class="dimension-tag">
                  <p><span>标签</span></p>
                  <p>{{ user.dmNum.tag }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="resource-info-main" v-loading="mainLoading">
          <el-row justify="start">
            <el-col>
              <p><span>标题：</span>{{ doc.title }}</p>
            </el-col>
            <el-col>
              <p><span>上传者：</span>{{ doc.username }}</p>
            </el-col>
            <el-col>
              <p><span>文件类型：</span>{{ doc.type }}</p>
            </el-col>
            <el-col>
              <p><span>类型：</span>{{ doc.part }}</p>
            </el-col>
            <el-col>
              <p><span>分类：</span>{{ doc.categories }}</p>
            </el-col>
            <el-col>
              <p><span>标签：</span>{{ doc.tags }}</p>
            </el-col>
            <el-col>
              <p><span>文件简介：</span>{{ doc.intro }}</p>
            </el-col>
            <el-col>
              <p><span>文件内容：</span>{{ doc.content }}</p>
            </el-col>
            <el-divider />
            <el-col>
              <div class="main-btn">
                <div class="main-download">
                  <a :href="doc.downloadLink">
                    <el-button type="primary" size="large" :icon="Download">
                      Download
                    </el-button>
                  </a>
                </div>
                <div class="main-like">
                  <el-button
                    type="primary"
                    size="large"
                    :icon="StarFilled"
                    @click="likeDoc()"
                    :loading="likeLoading"
                    :disabled="likeDisabled"
                  >
                    Like</el-button
                  >
                </div>
              </div>
            </el-col>
            <el-col>
              <div class="main-num">
                <div>
                  <p><span>下载：</span>{{ doc.downloadNum }}</p>
                </div>
                <div>
                  <p><span>浏览：</span>{{ doc.scanNum }}</p>
                </div>
                <div>
                  <p><span>点赞：</span>{{ doc.likeNum }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Upload,
  Avatar,
  DArrowRight,
  Download,
  StarFilled,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import api from "@api/index.js";
import { ElMessage } from "element-plus";
import { useIntervalFn } from "@vueuse/core";

const store = useStore();
const router = useRouter();
const route = useRoute();

// header 部分

let topName = computed(() => store.state.home.name);

function topNameSkip() {
  router.push("/personal");
}

function uploadResource() {
  //TODO:跳转至上传页面
}

// aside 部分
let asideLoading = ref(false);
let user = ref({
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  username: "用户名",
  dmNum: {
    category: 0,
    tag: 0,
  },
});

function otherPersonal() {
  // TODO:跳转他人主页(目前暂时跳转到个人主页)
}

function backHome() {
  //TODO:跳转至主页搜索页面
  console.log("Back home");
}

// main 部分
let mainLoading = ref(false);
let likeLoading = ref(false);
let likeDisabled = ref(false);
let doc = ref({
  downloadNum: "",
  scanNum: "",
  likeNum: "",
  title: "",
  username: "",
  type: "",
  part: "",
  categories: "",
  tags: "",
  intro: "",
  content: "",
  downloadLink: "",
});

function likeDoc() {
  likeLoading.value = true;
  api.document
    .addLike({
      doc_id: Number(route.params.id),
    })
    .then((res) => {
      likeLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      likeDisabled.value = true;
      ElMessage.success("点赞成功👍~");
      doc.value.likeNum = Number(doc.value.likeNum) + 1;
    })
    .catch((err) => {
      likeLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
      return;
    });
}

// onMounted 部分
onMounted(() => {
  mainLoading.value = true;
  asideLoading.value = true;
  api.document
    .getUserDmDetailResource({
      doc_id: route.params.id,
    })
    .then((res) => {
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      let handleDm = (dms) => {
        if (dms.length == 0) {
          return "暂无";
        }
        let dm = [];
        for (let i = 0; i < dms.length; i++) {
          dm[i] = dms[i].name;
        }
        return "[" + dm.join("，") + "]";
      };
      doc.value = {
        downloadNum: res.data.data.download_num,
        scanNum: res.data.data.scan_num,
        likeNum: res.data.data.like_num,
        title: res.data.data.title,
        type: res.data.data.type,
        part: res.data.data.part.name,
        categories: handleDm(res.data.data.categories),
        tags: handleDm(res.data.data.tags),
        intro: res.data.data.intro,
        content: res.data.data.content,
        downloadLink: res.data.data.dir,
      };

      api.user
        .userInfo({
          uid: res.data.data.uid,
        })
        .then((userRes) => {
          mainLoading.value = false;
          if (userRes.data.code != 0) {
            ElMessage.error("服务器异常，请稍后重试~");
            return;
          }
          doc.value.username = userRes.data.data.name;
          user.value.avatar = userRes.data.data.avatar;
          user.value.username = userRes.data.data.name;
          api.dimension
            .getUserDimension({ uid: res.data.data.uid })
            .then((dmResp) => {
              asideLoading.value = false;
              if (dmResp.data.code != 0) {
                ElMessage.error("服务器异常，请稍后重试~");
                return;
              }
              user.value.dmNum = {
                category: dmResp.data.data.category.length,
                tag: dmResp.data.data.tag.length,
              };
            })
            .catch((dmErr) => {
              mainLoading.value = false;
              asideLoading.value = false;
              ElMessage.error("网络错误，请检查网络连接啊");
              return;
            });
        })
        .catch((userErr) => {
          mainLoading.value = false;
          asideLoading.value = false;
          ElMessage.error("网络错误，请检查网络连接啊");
          return;
        });
      return;
    })
    .catch((err) => {
      mainLoading.value = false;
      asideLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
      return;
    });
});
</script>

<style lang="less" scoped>
.resource-info {
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

  .resource-info-aside {
    height: 100%;
    width: 25vw;

    .aside-avatar {
      margin-top: 50px;
      text-align: center;
      height: 100%;

      p {
        margin-top: 20px;
        color: #337ecc;
      }

      .el-image {
        width: 10vw;
        border-radius: 100%;
      }

      .el-button {
        width: 100%;
        margin-top: 20px;
        font-size: 15px;
      }
    }

    .aside-dimension {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      text-align: center;

      span {
        color: #337ecc;
        font-weight: bold;
      }
    }
  }

  .resource-info-main {
    height: 100%;
    border-left: 5px solid #337ecc;

    span {
      color: #337ecc;
      font-weight: bold;
    }

    .main-btn {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .el-button {
        width: 20vw;
      }

      a {
        text-decoration: none;
      }
    }

    .main-num {
      margin-top: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>
