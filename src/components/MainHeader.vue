<template>
  <el-header class="main-header">
    <el-row justify="center" align="middle" class="main-header-rows">
      <el-col :span="14">
        <div class="main-header-title">
          <h2>高校课程资源智能识别与搜索系统</h2>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="main-header-upload">
          <el-button type="primary" size="large"
            >Upload Resource
            <el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="main-header-user">
          <el-button type="primary" class="el-icon--right" @click="topNameSkip()" round>
            {{ topName }}
            <el-icon>
              <Avatar />
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
import { ref, computed } from "vue";
import { Upload, Avatar } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let store = useStore();
let router = useRouter();

let topName = computed(() => store.state.home.name);

// 顶栏部分

function topNameSkip() {
  router.push("/personal");
}
</script>

<style lang="less" scoped>
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
</style>
