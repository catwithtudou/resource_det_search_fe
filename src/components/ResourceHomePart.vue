<template>
  <el-container class="resource-part">
    <el-main class="resource-part-main">
      <el-row :gutter="20" class="main-row" justify="start" v-loading="resourceLoading">
        <el-col class="main-col" v-for="(rs, i) in resources" :key="i" :span="8">
          <el-card class="col-card" shadow="hover" @click="clickCard(rs)">
            <div class="col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="col-part">
              <p><span>类型：</span>{{ rs.part.name }}</p>
            </div>
            <div class="col-categories">
              <p><span>分类：</span>{{ rs.categories }}</p>
            </div>
            <div class="col-tags">
              <p><span>标签：</span>{{ rs.tags }}</p>
            </div>
            <div class="col-nums">
              <p>
                <span>下载：</span>{{ rs.downloadNum }} <span>浏览：</span
                >{{ rs.scanNums }} <span>点赞：</span>{{ rs.likeNum }}
              </p>
            </div>
            <div class="col-uploadTime">
              <p><span>上传时间：</span>{{ rs.uploadTime }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-aside class="resource-part-aside">
      <el-menu class="aside-menu">
        <el-menu-item index="1">
          <el-icon><star-filled /></el-icon>
          <span>点赞最多</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><reading /></el-icon>
          <span>浏览最多</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><download /></el-icon>
          <span>下载最多</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><timer /></el-icon>
          <span>按最新时间</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { StarFilled, Reading, Download, Timer } from "@element-plus/icons-vue";
import api from "@api/index.js";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const route = useRoute();

let resourceLoading = ref(false);
let resources = ref([]);

// TODO:补充排序选项

function getData(newValue) {
  resourceLoading.value = true;
  if (!newValue) {
    resourceLoading.value = false;
    return;
  }

  if (newValue === "all") {
    api.document
      .getAllResource({})
      .then((res) => {
        resourceLoading.value = false;
        resources.value = [];
        if (res.data.code != 0) {
          ElMessage.error("服务器异常，请稍后重试~");
          return;
        }
        if (!res.data.data) {
          ElMessage.info("暂无资源~");
          return;
        }
        for (let i = 0; i < res.data.data.length; i++) {
          resources.value[i] = {
            title: res.data.data[i].title,
            fileType: res.data.data[i].type,
            intro: res.data.data[i].intro,
            part: res.data.data[i].part,
            downloadNum: res.data.data[i].download_num,
            scanNums: res.data.data[i].scan_num,
            likeNum: res.data.data[i].like_num,
            uploadTime: res.data.data[i].upload_time,
            docId: res.data.data[i].doc_id,
            uid: res.data.data[i].uid,
          };
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
          resources.value[i].categories = handleDm(res.data.data[i].categories);
          resources.value[i].tags = handleDm(res.data.data[i].tags);
        }
      })
      .catch((err) => {
        resourceLoading.value = false;
        ElMessage.error("网络错误，请检查网络连接");
      });
    return;
  }
  api.document
    .getPartResource({
      did: Number(newValue),
    })
    .then((res) => {
      resourceLoading.value = false;
      resources.value = [];
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (!res.data.data) {
        ElMessage.info("暂无资源~");
        return;
      }
      for (let i = 0; i < res.data.data.length; i++) {
        resources.value[i] = {
          title: res.data.data[i].title,
          fileType: res.data.data[i].type,
          intro: res.data.data[i].intro,
          part: res.data.data[i].part,
          downloadNum: res.data.data[i].download_num,
          scanNums: res.data.data[i].scan_num,
          likeNum: res.data.data[i].like_num,
          uploadTime: res.data.data[i].upload_time,
          docId: res.data.data[i].doc_id,
          uid: res.data.data[i].uid,
        };
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
        resources.value[i].categories = handleDm(res.data.data[i].categories);
        resources.value[i].tags = handleDm(res.data.data[i].tags);
      }
    })
    .catch((err) => {
      console.log(err);
      resourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
  return;
}

watch(
  () => route.params.partId,
  (newValue) => {
    getData(newValue);
  }
);

onMounted(() => {
  getData(route.params.partId);
});

function clickCard(rs) {
  router.push({
    name: "resourceInfo",
    params: {
      id: rs.docId,
    },
  });
}
</script>

<style lang="less" scoped>
.resource-part {
  .resource-part-main {
    .main-row {
      .main-col {
        .col-card {
          background-color: #ecf5ff;
          border-radius: 20px;
          margin: 10px;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          span {
            color: #a0cfff;
          }
        }
      }
    }
  }
}
</style>
