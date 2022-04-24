<template>
  <div class="personalResource">
    <h1 class="personalResource-header">已上传资源</h1>
    <el-divider />
    <el-row
      :gutter="20"
      class="personalResource-row"
      justify="start"
      v-loading="resourceLoading"
    >
      <el-col
        class="personalResource-col"
        v-for="(rs, i) in resources"
        :key="i"
        :span="12"
      >
        <el-card class="personalResource-col-card" shadow="hover" @click="clickCard(rs)">
          <div class="personalResource-col-title">
            <p><span>标题：</span>{{ rs.title }}</p>
          </div>
          <div class="personalResource-col-fileType">
            <p><span>文件类型：</span>{{ rs.fileType }}</p>
          </div>
          <div class="personalResource-col-intro">
            <p><span>文件简介：</span>{{ rs.intro }}</p>
          </div>
          <div class="personalResource-col-part">
            <p><span>类型：</span>{{ rs.part.name }}</p>
          </div>
          <div class="personalResource-col-categories">
            <p><span>分类：</span>{{ rs.categories }}</p>
          </div>
          <div class="personalResource-col-tags">
            <p><span>标签：</span>{{ rs.tags }}</p>
          </div>
          <div class="personalResource-col-nums">
            <p>
              <span>下载：</span>{{ rs.downloadNum }} <span>浏览：</span
              >{{ rs.scanNums }} <span>点赞：</span>{{ rs.likeNum }}
            </p>
          </div>
          <div class="personalResource-col-uploadTime">
            <p><span>上传时间：</span>{{ rs.uploadTime }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="main-pagination" v-if="isShowLoadMore">
      <el-button
        type="primary"
        @click="loadMore()"
        :loading="loadMoreLoading"
        v-if="isLoadMore"
      >
        加载更多</el-button
      >
      <p v-if="!isLoadMore">===已浏览完所有资源到底啦===</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@api/index.js";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let resourceLoading = ref(false);
let resources = ref([]);
let isLoadMore = ref(false);
let offset = ref(0);
let size = ref(10);
let loadMoreLoading = ref(false);
let isShowLoadMore = ref(false);

onMounted(() => {
  resources.value = [];
  resourceLoading.value = true;
  isLoadMore.value = false;
  isShowLoadMore.value = false;
  api.document
    .getUserAllResource({
      offset: Number(offset.value),
      size: Number(size.value),
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
      isShowLoadMore.value = true;
      if (res.data.data.length < size.value) {
        isLoadMore.value = false;
      } else {
        isLoadMore.value = true;
      }
      offset.value = resources.value.length;
    })
    .catch((err) => {
      resourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});

function clickCard(rs) {
  router.push({
    name: "resourceInfo",
    params: {
      id: rs.docId,
    },
  });
}

function loadMore() {
  loadMoreLoading.value = true;
  api.document
    .getUserAllResource({
      offset: Number(offset.value),
      size: Number(size.value),
    })
    .then((res) => {
      loadMoreLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (!res.data.data) {
        isLoadMore.value = false;
        ElMessage.info("暂无资源~");
        return;
      }
      for (let i = 0, j = resources.value.length; i < res.data.data.length; i++) {
        resources.value[i + j] = {
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
      if (res.data.data.length < size.value) {
        isLoadMore.value = false;
      } else {
        isLoadMore.value = true;
      }
      offset.value = resources.value.length;
    })
    .catch((err) => {
      resourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}
</script>
<style lang="less" scoped>
.personalResource {
  .personalResource-header {
    color: #337ecc;
  }

  .personalResource-row {
    .personalResource-col {
      .personalResource-col-card {
        background-color: #ecf5ff;
        border-radius: 20px;
        margin: 10px;
      }

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

  .main-pagination {
    margin-top: 20px;
    text-align: center;

    .el-button {
      width: 30vw;
      height: 5vh;
    }
  }
}
</style>
