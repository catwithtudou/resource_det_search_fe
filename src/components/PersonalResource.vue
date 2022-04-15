<template>
  <div class="personalResource">
    <h1 class="personalResource-header">已上传资源</h1>
    <el-divider />
    <el-row :gutter="20" class="personalResource-row" justify="start">
      <el-col
        class="personalResource-col"
        v-for="(rs, i) in resources"
        :key="i"
        :span="8"
      >
        <el-card class="personalResource-col-card" shadow="hover" @click="clickCard()">
          <div class="personalResource-col-title">
            <p><span>标题：</span>{{ rs.title }}</p>
          </div>
          <div class="personalResource-col-username">
            <p><span>标题：</span>{{ rs.username }}</p>
          </div>
          <div class="personalResource-col-fileType">
            <p><span>文件类型：</span>{{ rs.fileType }}</p>
          </div>
          <div class="personalResource-col-intro">
            <p><span>文件简介：</span>{{ rs.intro }}</p>
          </div>
          <div class="personalResource-col-part">
            <p><span>类型：</span>{{ rs.part }}</p>
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
  </div>
</template>

<script setup>
import { ref } from "vue";

let resources = ref([
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
]);

function clickCard() {
  console.log("clickCard");
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
}
</style>
