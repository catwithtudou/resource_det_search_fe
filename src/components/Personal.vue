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
              <el-button type="primary" round="true" class="el-icon--right">
                {{ username }}
                <el-icon>
                  <Avatar />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="personal-base">
        <el-aside class="personal-base-avater">
          <el-image :src="avatarUrl" :fit="fit" lazy="true" />
        </el-aside>
        <el-main class="personal-base-info">
          <el-row justify="start">
            <el-col>
              <p><span>姓名：</span>{{ username }}</p>
            </el-col>
            <el-col>
              <p><span>角色：</span>{{ role }}</p>
            </el-col>
            <el-col>
              <p><span>学校：</span>{{ school }}</p>
            </el-col>
            <el-col>
              <p><span>学号/教职工号：</span>{{ sid }}</p>
            </el-col>
            <el-col>
              <p><span>性别：</span>{{ sex }}</p>
            </el-col>
            <el-col>
              <p><span>简介：</span>{{ intro }}</p>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container class="personal-resource">
        <el-aside class="personal-resource-type">
          <el-menu
            class="personal-resource-type-menu"
            unique-opened="true"
            router="true"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
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
import { ref } from "vue";
import { Document, CollectionTag, Folder } from "@element-plus/icons-vue";

let avatarUrl = ref("https://img.zhengyua.cn/resource_det_search/1_avater");

let username = ref("郑煜");
let role = ref("学生");
let school = ref("重庆邮电大学");
let sid = ref("2018211391");
let sex = ref("男");
let intro = ref("这个用户很懒，什么都没有写");

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
</script>

<style lang="less" scoped>
.personal {
  .personal-header {
    padding: 0;
    height: 100px;
    width: 100%;
    background-color: #ecf5ff;

    .personal-header-rows {
      background-color: #d9ecff;

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

    .personal-base-avater {
      text-align: center;
      width: 20vw;
      height: 20vh;

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
