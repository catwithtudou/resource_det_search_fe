<template>
  <div class="personalTags">
    <h1 class="personalTags-header">标签</h1>
    <el-divider />
    <el-row :gutter="5" class="personalTags-tags-row" justify="start">
      <el-col class="personalTags-tags-col" v-for="(tag, i) in tags" :key="i" :span="4">
        <el-button type="primary" @click="tagCheck(tag)" :loading="isLoading" plain>
          {{ tag.name }}
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
          :span="8"
        >
          <el-card
            class="personalTags-resources-col-card"
            shadow="hover"
            @click="clickCard()"
          >
            <div class="personalTags-resources-col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="personalTags-resources-col-username">
              <p><span>标题：</span>{{ rs.username }}</p>
            </div>
            <div class="personalTags-resources-col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="personalTags-resources-col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="personalTags-resources-col-part">
              <p><span>类型：</span>{{ rs.part }}</p>
            </div>
            <div class="personalTags-resources-col-categories">
              <p><span>分类：</span>{{ rs.categories }}</p>
            </div>
            <div class="personalTags-resources-col-tags">
              <p><span>标签：</span>{{ rs.tags }}</p>
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
import { ref, watch } from "vue";

let tags = ref([
  {
    id: 1,
    name: "#math",
  },
  {
    id: 2,
    name: "#english",
  },
  {
    id: 3,
    name: "#chinese",
  },
]);

let checkTags = ref({
  id: "",
  name: "",
});

let isLoading = ref(false);
let isChecked = ref(false);
let resources = ref();
let tagResourceLoading = ref(false);

function tagCheck(tag) {
  if (!isChecked.value) {
    isChecked.value = true;
  }

  checkTags.value = {
    id: tag.id,
    name: tag.name,
  };

  tagResourceLoading.value = true;
  setTimeout(() => {
    tagResourceLoading.value = false;
    resources.value = [
      {
        title: "math",
        username: "郑煜",
        fileType: "docx",
        intro:
          "mathmathmathmathmathmathmathmathmathmathmathmatmathmathmathmathmathmathmathmathmathmathmathmathh",
        part: "课程课件",
        categories: ["math"],
        tags: ["math", "school"],
        downloadNum: 100,
        scanNums: 200,
        likeNum: 100,
        uploadTime: "2022年4月15日11:11:32",
      },
      {
        title: "math",
        username: "郑煜",
        fileType: "docx",
        intro: "math",
        part: "课程课件",
        categories: ["math"],
        tags: ["math", "school"],
        downloadNum: 100,
        scanNums: 200,
        likeNum: 100,
        uploadTime: "2022年4月15日11:11:32",
      },
      {
        title: "math",
        username: "郑煜",
        fileType: "docx",
        intro: "math",
        part: "课程课件",
        categories: ["math"],
        tags: ["math", "school"],
        downloadNum: 100,
        scanNums: 200,
        likeNum: 100,
        uploadTime: "2022年4月15日11:11:32",
      },
      {
        title: "math",
        username: "郑煜",
        fileType: "docx",
        intro: "math",
        part: "课程课件",
        categories: ["math"],
        tags: ["math", "school"],
        downloadNum: 100,
        scanNums: 200,
        likeNum: 100,
        uploadTime: "2022年4月15日11:11:32",
      },
      {
        title: "math",
        username: "郑煜",
        fileType: "docx",
        intro: "math",
        part: "课程课件",
        categories: ["math"],
        tags: ["math", "school"],
        downloadNum: 100,
        scanNums: 200,
        likeNum: 100,
        uploadTime: "2022年4月15日11:11:32",
      },
    ];
  }, 2000);
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
