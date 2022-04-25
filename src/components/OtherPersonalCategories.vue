<template>
  <div class="personalCategories">
    <h1 class="personalCategories-header">分类</h1>
    <el-divider />
    <el-row
      :gutter="5"
      class="personalCategories-tags-row"
      justify="start"
      v-loading="categoryLoading"
    >
      <el-col
        class="personalCategories-tags-col"
        v-for="(category, i) in categories"
        :key="i"
        :span="4"
      >
        <el-button
          type="primary"
          @click="categoryCheck(category)"
          :loading="isLoading"
          plain
        >
          {{ category.name }}
        </el-button>
      </el-col>
    </el-row>
    <div class="personalCategories-resources" v-if="isChecked">
      <h2 class="personalCategories-resources-header">{{ checkCategories.name }}</h2>
      <el-divider />
      <el-row
        :gutter="20"
        class="personalCategories-resources-row"
        justify="start"
        v-loading="categoryResourceLoading"
      >
        <el-col
          class="personalCategories-resources-col"
          v-for="(rs, i) in resources"
          :key="i"
          :span="12"
        >
          <el-card
            class="personalCategories-resources-col-card"
            shadow="hover"
            @click="clickCard(rs)"
          >
            <div class="personalCategories-resources-col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="personalCategories-resources-col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="personalCategories-resources-col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="personalCategories-resources-col-nums">
              <p>
                <span>下载：</span>{{ rs.downloadNum }} <span>浏览：</span
                >{{ rs.scanNums }} <span>点赞：</span>{{ rs.likeNum }}
              </p>
            </div>
            <div class="personalCategories-resources-col-uploadTime">
              <p><span>上传时间：</span>{{ rs.uploadTime }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="main-pagination" v-if="isShowLoadMore">
        <el-button
          type="primary"
          @click="loadMore(checkCategories.id)"
          :loading="loadMoreLoading"
          v-if="isLoadMore"
        >
          加载更多</el-button
        >
        <p v-if="!isLoadMore">===已浏览完所有资源到底啦===</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import api from "@api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let categories = ref([]);
let categoryLoading = ref(false);
let otherPersonalUid = ref(route.query.uid);

onMounted(() => {
  categoryLoading.value = true;
  api.dimension
    .getUserDimension({
      uid: Number(otherPersonalUid.value),
    })
    .then((res) => {
      categoryLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (
        !res.data.data ||
        !res.data.data.category ||
        res.data.data.category.length == 0
      ) {
        ElMessage.info("暂无分类~");
        return;
      }

      categories.value = res.data.data.category;
    })
    .catch((err) => {
      console.log(err);
      categoryLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});

let checkCategories = ref({});
let isLoading = ref(false);
let isChecked = ref(false);
let resources = ref([]);
let categoryResourceLoading = ref(false);
let isLoadMore = ref(false);
let offset = ref(0);
let size = ref(10);
let loadMoreLoading = ref(false);
let isShowLoadMore = ref(false);

function categoryCheck(category) {
  if (!isChecked.value) {
    isChecked.value = true;
  }

  checkCategories.value = {
    id: category.id,
    name: category.name,
  };

  resources.value = [];
  offset.value = 0;
  isLoadMore.value = false;
  isShowLoadMore.value = false;

  isLoading.value = true;
  categoryResourceLoading.value = true;
  api.document
    .getUserDmResource({
      did: category.id,
      offset: Number(offset.value),
      size: Number(size.value),
      uid: Number(otherPersonalUid.value),
    })
    .then((res) => {
      isLoading.value = false;
      categoryResourceLoading.value = false;

      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (!res.data.data || !res.data.data.docs || res.data.data.docs.length === 0) {
        ElMessage.info("暂无资源~");
        return;
      }
      for (let i = 0; i < res.data.data.docs.length; i++) {
        resources.value[i] = {
          title: res.data.data.docs[i].title,
          fileType: res.data.data.docs[i].type,
          intro: res.data.data.docs[i].intro,
          downloadNum: res.data.data.docs[i].download_num,
          scanNums: res.data.data.docs[i].scan_num,
          likeNum: res.data.data.docs[i].like_num,
          uploadTime: res.data.data.docs[i].upload_time,
          docId: res.data.data.docs[i].doc_id,
        };
      }
      isShowLoadMore.value = true;
      if (res.data.data.docs.length < size.value) {
        isLoadMore.value = false;
      } else {
        isLoadMore.value = true;
      }
      offset.value = resources.value.length;
    })
    .catch((err) => {
      isLoading.value = false;
      categoryResourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}

function clickCard(rs) {
  router.push({
    name: "resourceInfo",
    params: {
      id: rs.docId,
    },
  });
}

function loadMore(categoryId) {
  loadMoreLoading.value = true;
  api.document
    .getUserDmResource({
      did: categoryId,
      offset: Number(offset.value),
      size: Number(size.value),
      uid: Number(otherPersonalUid.value),
    })
    .then((res) => {
      loadMoreLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (!res.data.data || !res.data.data.docs || res.data.data.docs.length === 0) {
        isLoadMore.value = false;
        ElMessage.info("暂无资源~");
        return;
      }
      for (let i = 0, j = resources.value.length; i < res.data.data.docs.length; i++) {
        resources.value[i + j] = {
          title: res.data.data.docs[i].title,
          fileType: res.data.data.docs[i].type,
          intro: res.data.data.docs[i].intro,
          downloadNum: res.data.data.docs[i].download_num,
          scanNums: res.data.data.docs[i].scan_num,
          likeNum: res.data.data.docs[i].like_num,
          uploadTime: res.data.data.docs[i].upload_time,
          docId: res.data.data.docs[i].doc_id,
        };
      }
      if (res.data.data.docs.length < size.value) {
        isLoadMore.value = false;
      } else {
        isLoadMore.value = true;
      }
      offset.value = resources.value.length;
    })
    .catch((err) => {
      isLoading.value = false;
      tagResourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}
</script>

<style lang="less" scoped>
.personalCategories {
  .personalCategories-header {
    color: #337ecc;
  }

  .personalCategories-tags-row {
    .personalCategories-tags-col {
      height: 100%;
      width: 100%;
      margin-top: 10px;
    }
  }

  .personalCategories-resources {
    .personalCategories-resources-header {
      color: #337ecc;
    }

    .personalCategories-resources-row {
      .personalCategories-resources-col {
        .personalCategories-resources-col-card {
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
}
</style>
