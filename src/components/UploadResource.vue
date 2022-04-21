<template>
  <el-container class="upload-resource">
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
    <el-container class="upload-info" v-loading="infoLoading">
      <el-header class="info-header">
        <el-steps :active="activeStep" finish-status="success" align-center>
          <el-step title="Step 1" :icon="Edit" />
          <el-step title="Step 2" :icon="Upload" />
          <el-step title="Step 3" :icon="CircleCheck" />
        </el-steps>
      </el-header>
      <el-main class="info-main" v-model="uploadInfo">
        <el-form
          label-width="auto"
          :rules="rules"
          ref="ruleFormRef"
          :model="formInfo"
          status-icon
        >
          <el-form-item label="标题" prop="title" size="large">
            <el-input
              type="text"
              v-model="formInfo.title"
              maxlength="20"
              show-word-limit
              placeholder="标题内容"
            />
          </el-form-item>
          <el-form-item label="文件简介" prop="intro" size="large">
            <el-input
              type="textarea"
              v-model="formInfo.intro"
              :autosize="{ minRows: 2, maxRows: 10 }"
              maxlength="200"
              show-word-limit
              placeholder="文件简介内容"
            />
          </el-form-item>
          <el-form-item label="类型" prop="part">
            <el-select
              v-model="formInfo.part"
              placeholder="请选择类型"
              size="large"
              @change="changePart"
            >
              <el-option
                v-for="(part, i) in parts"
                :key="i"
                :label="part.name"
                :value="part.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-checkbox-group v-model="formInfo.tags" size="large">
              <el-checkbox-button v-for="(tag, i) in tags" :key="i" :label="tag.id">
                #{{ tag.name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="分类">
            <el-checkbox-group v-model="formInfo.categories">
              <el-checkbox
                v-for="(category, i) in categories"
                :key="i"
                :label="category.id"
                size="large"
                border
                >{{ category.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :action="uploadInfo.action"
          :headers="uploadInfo.header"
          :data="uploadInfo.data"
          :name="uploadInfo.name"
          drag
          :on-change="fileChange"
          :limit="limitUpdate"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeUploadResource"
          size="large"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
        <div class="info-main-text">
          <p>目前仅支持：<span>docx/pptx/xlsx/md/txt/pdf/jpg/jpeg/png</span> 格式文件</p>
          <p><span>温馨提示：</span>智能识别文件内容过程中会过滤标点符号、html标签等</p>
        </div>
        <div class="info-main-btn">
          <el-button
            type="primary"
            @click="submitResource(ruleFormRef)"
            :icon="CircleCheck"
            :loading="submitLoading"
            v-loading.fullscreen.lock="fullscreenLoading"
          >
            上传资源
          </el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Upload,
  Avatar,
  Edit,
  Picture,
  UploadFilled,
  CircleCheck,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "@api/index.js";
import { ElMessage, ElLoading } from "element-plus";

let store = useStore();
let router = useRouter();

// header 部分

let topName = computed(() => store.state.home.name);

function topNameSkip() {
  router.push("/personal");
}

// Main 部分
let infoLoading = ref(false);

// Main-Header 部分

let activeStep = ref(0);

// Main-Form 部分

let userToken = computed(() => store.state.home.token);
let formInfo = ref({
  title: "",
  intro: "",
  part: 0,
  tags: [0],
  categories: [0],
});
let uploadInfo = ref({
  action: "http://localhost:3000/api/resource/user/upload",
  header: {
    Authorization: "Bearer " + userToken.value,
  },
  name: "doc",
  data: {
    title: "",
    intro: "",
    part: 0,
    categories: "",
    tags: "",
  },
});

let ruleFormRef = ref();
let parts = ref([]);
let tags = ref([]);
let categories = ref([]);

let rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  intro: [{ required: true, message: "请输入文件简介", trigger: "blur" }],
  part: [{ required: true, message: "请选择类型", trigger: "blur" }],
});
let uploadRef = ref();
let limitUpdate = ref(1);
let submitLoading = ref(false);
let fullscreenLoading = ref(false);

function changePart(value) {
  activeStep.value = 1;
}

function fileChange(file) {
  activeStep.value = 2;
}

async function submitResource(ruleFormRef) {
  submitLoading.value = true;
  fullscreenLoading.value = true;
  await ruleFormRef.validate((valid, fields) => {
    if (!valid) {
      submitLoading.value = false;
      fullscreenLoading.value = false;

      ElMessage.error("请正确填写信息~");
      return;
    }
    if (formInfo.value.part === 0) {
      submitLoading.value = false;
      fullscreenLoading.value = false;
      ElMessage.error("请选择类型~");
      return;
    }

    let handleDms = (dms) => {
      if (dms.length === 1) {
        return "";
      }
      dms = dms.slice(1, dms.length);
      return "[" + dms.join(",") + "]";
    };
    uploadInfo.value.data = {
      title: formInfo.value.title,
      intro: formInfo.value.intro,
      part: formInfo.value.part,
      categories: handleDms(formInfo.value.categories),
      tags: handleDms(formInfo.value.tags),
    };
    if (uploadRef.value) {
      uploadRef.value.submit();
    }
  });
}

function handleUploadSuccess(response, uploadFile) {
  submitLoading.value = false;
  fullscreenLoading.value = false;
  activeStep.value = 3;
  if (response.code !== 0) {
    ElMessage.error("上传文件失败，请稍后重试~");
    return;
  }
  ElMessage.success("上传文件成功~");
  router.push("/personal");
}

function handleUploadError(err, file, files) {
  submitLoading.value = false;
  fullscreenLoading.value = false;
  activeStep.value = 3;

  ElMessage.error("上传文件失败，请稍后重试~");
}

function beforeUploadResource(rawFile) {
  let fileType = rawFile.name.split(".").pop().toLowerCase();
  let fileTypeSupport = [
    "docx",
    "pptx",
    "xlsx",
    "md",
    "txt",
    "pdf",
    "jpg",
    "jpeg",
    "png",
  ];
  if (fileTypeSupport.indexOf(fileType) === -1) {
    ElMessage.error("文件类型暂时不支持哟~");
    return false;
  } else if (rawFile.size > 20 * 1024 * 1024) {
    ElMessage.error("文件大小暂时不能超过20MB哟~");
    return false;
  }
  return true;
}

// onMounted 部分

onMounted(() => {
  infoLoading.value = true;
  // get dimension infos
  api.dimension
    .getPartDimension({})
    .then((res) => {
      if (res.data.code != 0) {
        infoLoading.value = false;
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      parts.value = res.data.data;
      parts.value.unshift({
        id: 0,
        name: "请选择内容类型",
      });
      api.dimension
        .getUserDimension({})
        .then((userDm) => {
          infoLoading.value = false;
          if (userDm.data.code != 0) {
            ElMessage.error("服务器异常，请稍后重试~");
            return;
          }
          tags.value = userDm.data.data.tag;
          categories.value = userDm.data.data.category;
        })
        .catch((err) => {
          infoLoading.value = false;
          ElMessage.error("网络错误，请检查网络连接");
        });
    })
    .catch((err) => {
      infoLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
});
</script>

<style lang="less" scoped>
.upload-resource {
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

  .upload-info {
    .info-header {
      margin-top: 100px;
    }

    .info-main {
      margin-top: 50px;
      text-align: center;

      .el-upload-dragger {
        width: 80vw;
      }

      .info-main-text {
        span {
          color: #337ecc;
          font-weight: bold;
        }
      }
      .info-main-btn {
        .el-button {
          width: 20vw;
          height: 5vh;
        }
      }
    }
  }
}
</style>
