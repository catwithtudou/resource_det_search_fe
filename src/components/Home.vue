<template>
  <div class="home">
    <div class="home-title" v-if="!isAppearForm">
      <h1>高校课程资源智能识别与搜索系统</h1>
    </div>
    <div class="home-btn" v-if="!isAppearForm">
      <el-button size="large" color="@color-black" @click="appearForm()" round
        >立即进入</el-button
      >
    </div>
    <transition name="fade-out">
      <div class="home-login" v-if="isAppearLoginForm">
        <div class="home-login-form">
          <el-form
            ref="ruleFormRef"
            :model="form"
            label-width="auto"
            label-position="left"
            :rules="rules"
          >
            <el-form-item label="Username" prop="email">
              <el-input v-model="form.email" placeholder="邮箱地址" />
            </el-form-item>
            <el-form-item label="Password" prop="pswd">
              <el-input
                v-model="form.pswd"
                placeholder="密码"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-button
              size="default"
              class="home-login-form-btn"
              :loading="isLoginLoading"
              @click="userLogin(ruleFormRef)"
            >
              Log In</el-button
            >
            <el-button type="text" class="home-login-form-text" @click="forgetPswd()"
              >Forget Password?
            </el-button>
            <el-divider />
            <el-button size="default" class="home-login-form-btn" @click="signUp()"
              >Sign Up</el-button
            >
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "@api/index.js";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

let router = useRouter();
let route = useRoute();
let store = useStore();

let isAppearForm = ref(false);
let isLoginLoading = ref(false);
let isAppearLoginForm = ref(false);

let form = ref({
  email: "",
  pswd: "",
});

let ruleFormRef = ref();

let rules = ref({
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  pswd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
    { max: 20, message: "密码长度不能大于20位", trigger: "blur" },
  ],
});

function appearForm() {
  isAppearForm.value = true;
  isAppearLoginForm.value = true;
}

async function userLogin(ruleFormRef) {
  await ruleFormRef
    .validate((valid, fields) => {
      if (!valid) {
        ElMessage.error("请正确填写信息");
        return;
      }
      isLoginLoading.value = true;
      api.user.userLogin(form.value).then((res) => {
        isLoginLoading.value = false;
        if (res.data.code != 0) {
          ElMessage.error("登录失败，请检查账号密码");
          return;
        }
        store
          .dispatch("home/userLogin", {
            token: res.data.data.token,
            name: res.data.data.name,
          })
          .then((res) => {
            ElMessage.success("登录成功，欢迎进入~");
            router.push("/personal");
          })
          .catch((err) => {
            ElMessage.error("网络错误，请检查网络连接");
            isLoginLoading.value = false;
          });
      });
    })
    .catch((err) => {
      isLoginLoading.value = false;
      ElMessage.error("网络错误，请检查网络连接");
    });
}

function forgetPswd() {}

function signUp() {
  router.push("/register");
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;

  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: url("../assets/img/home_bg.jpg");

  .home-title {
    h1 {
      color: @color-white;
    }
  }

  .home-login {
    .home-login-form {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      width: 40vh;
      height: 35vh;

      background-color: @color-white;
      border-radius: 25px;

      .home-login-form-btn {
        width: 100%;
      }

      .home-login-form-text {
        margin-bottom: -20px;
        width: 100%;
      }
    }
  }
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 1s linear;
}

.fade-out-enter-from,
.fade-out-leave-to {
  opacity: 0;
}
</style>
