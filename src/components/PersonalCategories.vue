<template>
  <div class="personalCategories">
    <h1 class="personalCategories-header">分类</h1>
    <el-divider />
    <el-row :gutter="5" class="personalCategories-tags-row" justify="start">
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
          :span="8"
        >
          <el-card
            class="personalCategories-resources-col-card"
            shadow="hover"
            @click="clickCard()"
          >
            <div class="personalCategories-resources-col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="personalCategories-resources-col-username">
              <p><span>标题：</span>{{ rs.username }}</p>
            </div>
            <div class="personalCategories-resources-col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="personalCategories-resources-col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="personalCategories-resources-col-part">
              <p><span>类型：</span>{{ rs.part }}</p>
            </div>
            <div class="personalCategories-resources-col-categories">
              <p><span>分类：</span>{{ rs.categories }}</p>
            </div>
            <div class="personalCategories-resources-col-tags">
              <p><span>标签：</span>{{ rs.tags }}</p>
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
import { ref, watch } from "vue";

let categories = ref([
  {
    id: 1,
    name: "math",
  },
  {
    id: 2,
    name: "english",
  },
  {
    id: 3,
    name: "chinese",
  },
]);

let checkCategories = ref({
  id: "",
  name: "",
});

let isLoading = ref(false);
let isChecked = ref(false);
let resources = ref();
let categoryResourceLoading = ref(false);

function categoryCheck(category) {
  if (!isChecked.value) {
    isChecked.value = true;
  }

  checkCategories.value = {
    id: category.id,
    name: category.name,
  };

  categoryResourceLoading.value = true;
  setTimeout(() => {
    categoryResourceLoading.value = false;
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
