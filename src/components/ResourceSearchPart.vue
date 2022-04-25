<template>
  <el-container class="resource-part">
    <el-main class="resource-part-main">
      <el-row
        :gutter="20"
        class="main-row"
        justify="start"
        v-loading="resourceLoading"
        v-if="!nothing"
      >
        <el-col class="main-col" v-for="(rs, i) in resources" :key="i" :span="12">
          <el-card class="col-card" shadow="hover" @click="clickCard(rs)">
            <div class="col-title">
              <p><span>标题：</span>{{ rs.title }}</p>
            </div>
            <div class="col-user">
              <p><span>上传者：</span>{{ rs.username }}</p>
            </div>
            <div class="col-fileType">
              <p><span>文件类型：</span>{{ rs.fileType }}</p>
            </div>
            <div class="col-intro">
              <p><span>文件简介：</span>{{ rs.intro }}</p>
            </div>
            <div class="col-part">
              <p><span>类型：</span>{{ rs.part }}</p>
            </div>
            <div class="col-categories">
              <p><span>分类：</span>{{ rs.categories }}</p>
            </div>
            <div class="col-tags">
              <p><span>标签：</span>{{ rs.tags }}</p>
            </div>
            <div class="col-content">
              <p><span>文件内容：</span></p>
              <p>{{ rs.content }}</p>
            </div>
            <div class="col-nums">
              <p>
                <span>下载：</span>{{ rs.downloadNum }} <span>浏览：</span
                >{{ rs.scanNums }} <span>点赞：</span>{{ rs.likeNum }}
              </p>
            </div>
            <div class="col-uploadTime">
              <p><span>上传时间：</span>{{ rs.uploadTime }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="main-nothing" justify="start" v-if="nothing">
        <el-col :span="12">
          <h2>
            找不到和您查询的“<span>{{ searchKey }}</span
            >”相符合的内容或信息
          </h2>
          <h3>建议：</h3>
          <ul>
            <li>请检查输入字词有无错误。</li>
            <li>请尝试其他查询词。</li>
            <li>请改用较常见的字词。</li>
          </ul>
        </el-col>
      </el-row>
    </el-main>
    <el-aside class="resource-part-aside">
      <el-menu
        class="aside-menu"
        v-if="!nothing"
        :default-active="sortByMenu"
        @select="handleSelectMenu"
      >
        <el-menu-item index="_score">
          <el-icon><magic-stick /></el-icon>
          <span>匹配最多</span>
        </el-menu-item>
        <el-menu-item index="upload_date">
          <el-icon>
            <timer />
          </el-icon>
          <span>按最新时间</span>
        </el-menu-item>
        <el-menu-item index="like_num">
          <el-icon>
            <star-filled />
          </el-icon>
          <span>点赞最多</span>
        </el-menu-item>
        <el-menu-item index="scan_num">
          <el-icon>
            <reading />
          </el-icon>
          <span>浏览最多</span>
        </el-menu-item>
        <el-menu-item index="download_num">
          <el-icon>
            <download />
          </el-icon>
          <span>下载最多</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  StarFilled,
  Reading,
  Download,
  Timer,
  MagicStick,
} from "@element-plus/icons-vue";
import api from "@api/index.js";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const route = useRoute();

let resourceLoading = ref(false);
let resources = ref([]);
let searchKey = ref();
let nothing = ref();
let searchPart = ref(["all", "1", "2", "3", "4", "5", "6"]);
let sortByMenu = ref();

// TODO:优化：进行分页处理
// FIXME:子路由下跳转到资源详细页时query依然存在，导致撤退时先撤退query，再回到上一页面

function getData(newValue) {
  resources.value = [];
  resourceLoading.value = true;
  nothing.value = false;
  if (!newValue) {
    resourceLoading.value = false;
    return;
  }
  if (searchPart.value.indexOf(newValue) === -1) {
    resourceLoading.value = false;
    return;
  }

  if (!searchKey.value) {
    resourceLoading.value = false;
    return;
  }
  let partId = newValue;
  if (newValue === "all") {
    partId = "";
  }
  api.search
    .searchAll({
      detail: searchKey.value,
      part_id: Number(partId),
      sort_by: sortByMenu.value,
    })
    .then((res) => {
      resourceLoading.value = false;
      if (res.data.code != 0) {
        ElMessage.error("服务器异常，请稍后重试~");
        return;
      }
      if (!res.data.data) {
        nothing.value = true;
        resourceLoading.value = false;
        return;
      }
      for (let i = 0; i < res.data.data.length; i++) {
        resources.value[i] = {
          title: res.data.data[i].title,
          username: res.data.data[i].username,
          fileType: res.data.data[i].file_type,
          intro: res.data.data[i].intro,
          part: res.data.data[i].part,
          downloadNum: res.data.data[i].download_num,
          scanNums: res.data.data[i].scan_num,
          likeNum: res.data.data[i].like_num,
          uploadTime: res.data.data[i].upload_time,
          docId: res.data.data[i].doc_id,
          content: res.data.data[i].content,
        };
        let handleDm = (dms) => {
          if (dms.length == 0) {
            return "暂无";
          }
          let dm = [];
          for (let i = 0; i < dms.length; i++) {
            dm[i] = dms[i];
          }
          return "[" + dm.join("，") + "]";
        };
        resources.value[i].categories = handleDm(res.data.data[i].categories);
        resources.value[i].tags = handleDm(res.data.data[i].tags);
      }
    })
    .catch((err) => {
      resourceLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
  return;
}

function handleSelectMenu(index, indexPath, item) {
  resources.value = [];
  sortByMenu.value = index;
  getData(route.params.partId);
}

watch(
  () => route.params.partId,
  (newValue) => {
    sortByMenu.value = "_score";
    getData(newValue);
  }
);

watch(
  () => route.query.search,
  (newValue) => {
    searchKey.value = newValue;
    sortByMenu.value = "_score";
    getData(route.params.partId);
  }
);

onMounted(() => {
  sortByMenu.value = "_score";
  searchKey.value = route.query.search;
  getData(route.params.partId);
});

function clickCard(rs) {
  router.push({
    name: "resourceInfo",
    params: {
      id: rs.docId,
    },
  });
}
</script>

<style lang="less" scoped>
.resource-part {
  .resource-part-main {
    .main-row {
      .main-col {
        .col-card {
          background-color: #ecf5ff;
          border-radius: 20px;
          margin: 10px;

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

    .main-nothing {
      span {
        color: @color-red;
      }
    }
  }
}
</style>
