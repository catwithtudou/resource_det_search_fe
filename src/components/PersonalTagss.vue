<template>
  <div class="personalTags">
    <h1 class="personalTags-header">标签</h1>
    <el-divider />
    <el-row
      :gutter="5"
      class="personalTags-tags-row"
      justify="start"
      v-loading="tagLoading"
    >
      <el-col class="personalTags-tags-col" v-for="(tag, i) in tags" :key="i" :span="4">
        <el-button type="primary" @click="tagCheck(tag)" :loading="isLoading" plain>
          #{{ tag.name }}
        </el-button>
      </el-col>
    </el-row>
    <div class="personalTags-resources" v-if="isChecked">
      <h2 class="personalTags-resources-header">{{ checkTags.name }}</h2>
      <el-divider />
      <el-row
        :gutter="20"
        class="personalTags-resources-row"
        justify="start"
        v-loading="tagResourceLoading"
      >
        <el-col
          class="personalTags-resources-col"
          v-for="(rs, i) in resources"
          :key="i"
          :span="12"
        >
          <el-card
            class="personalTags-resources-col-card"
            shadow="hover"
            @click="clickCard()"
          >
            <div class="personalTags-resources-col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="personalTags-resources-col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="personalTags-resources-col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="personalTags-resources-col-nums">
              <p>
                <span>下载：</span>{{ rs.downloadNum }} <span>浏览：</span
                >{{ rs.scanNums }} <span>点赞：</span>{{ rs.likeNum }}
              </p>
            </div>
            <div class="personalTags-resources-col-uploadTime">
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

let tags = ref([]);
let tagLoading = ref(false);

onMounted(() => {
  tagLoading.value = true;
  api.dimension
    .getUserDimension({})
    .then((res) => {
      tagLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      tags.value = res.data.data.tag;
    })
    .catch((err) => {
      tagLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});

let checkTags = ref({});
let isLoading = ref(false);
let isChecked = ref(false);
let resources = ref([]);
let tagResourceLoading = ref(false);

function tagCheck(tag) {
  if (!isChecked.value) {
    isChecked.value = true;
  }

  checkTags.value = {
    id: tag.id,
    name: tag.name,
  };

  isLoading.value = true;
  tagResourceLoading.value = true;
  api.document
    .getUserDmResource({
      did: tag.id,
    })
    .then((res) => {
      isLoading.value = false;
      tagResourceLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      resources.value = [];
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
      tagResourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}

function clickCard() {
  console.log("clickCard");
}
</script>

<style lang="less" scoped>
.personalTags {
  .personalTags-header {
    color: #337ecc;
  }

  .personalTags-tags-row {
    .personalTags-tags-col {
      height: 100%;
      width: 100%;
      margin-top: 10px;
    }
  }

  .personalTags-resources {
    .personalTags-resources-header {
      color: #337ecc;
    }

    .personalTags-resources-row {
      .personalTags-resources-col {
        .personalTags-resources-col-card {
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
