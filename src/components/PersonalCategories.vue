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
        :span="8"
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
            @click="clickCard()"
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import api from "@api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";

let categories = ref([]);
let categoryLoading = ref(false);

onMounted(() => {
  categoryLoading.value = true;
  api.dimension
    .getUserDimension({})
    .then((res) => {
      categoryLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      categories.value = res.data.data.category;
    })
    .catch((err) => {
      categoryLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});

let checkCategories = ref({});
let isLoading = ref(false);
let isChecked = ref(false);
let resources = ref([]);
let categoryResourceLoading = ref(false);

function categoryCheck(category) {
  if (!isChecked.value) {
    isChecked.value = true;
  }

  checkCategories.value = {
    id: category.id,
    name: category.name,
  };
  isLoading.value = true;
  categoryResourceLoading.value = true;
  api.document
    .getUserDmResource({
      did: category.id,
    })
    .then((res) => {
      isLoading.value = false;
      categoryResourceLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      resources.value = []
      for (let i = 0; i < res.data.data.docs.length; i++) {
        resources.value[i] = {
          title: res.data.data.docs[i].title,
          fileType: res.data.data.docs[i].type,
          intro: res.data.data.docs[i].intro,
          downloadNum: res.data.data.docs[i].download_num,
          scanNums: res.data.data.docs[i].scan_num,
          likeNum: res.data.data.docs[i].like_num,
          uploadTime: res.data.data.docs[i].upload_time,
        };
      }
    })
    .catch((err) => {
      isLoading.value = false;
      categoryResourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}

function clickCard() {
  console.log("clickCard");
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
  }
}
</style>
