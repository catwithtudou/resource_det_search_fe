<template>
  <div class="register">
    <transition name="fade-out">
      <div class="register-form">
        <el-form
          ref="ruleFormRef"
          :model="form"
          label-width="auto"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="Email" prop="email">
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
          <el-form-item label="Confirm" prop="confirm">
            <el-input
              v-model="form.confirm"
              placeholder="重复密码"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="School" prop="school">
            <el-input v-model="form.school" placeholder="学校" />
          </el-form-item>
          <el-form-item label="Sid" prop="sid">
            <el-input v-model="form.sid" placeholder="学号/教职工号" />
          </el-form-item>
          <el-form-item label="Role" prop="role">
            <el-select v-model="form.role" placeholder="角色">
              <el-option label="Student" value="学生" />
              <el-option label="Teacher" value="教师" />
            </el-select>
          </el-form-item>
          <el-form-item label="Sex" prop="sex">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="Man" value="男" />
              <el-option label="Woman" value="女" />
            </el-select>
          </el-form-item>
          <el-button
            size="default"
            class="register-form-btn"
            :loading="isRegisterLoading"
            @click="userRegister(ruleFormRef)"
          >
            Submit
          </el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@api/index.js";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

let router = useRouter();
let route = useRoute();

let isRegisterLoading = ref(false);
let form = ref({
  email: "",
  pswd: "",
  name: "",
  school: "",
  sid: "",
  role: "",
  sex: "",
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
  confirm: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
    { max: 20, message: "密码长度不能大于20位", trigger: "blur" },
  ],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  school: [{ required: true, message: "请输入学校", trigger: "blur" }],
  sid: [{ required: true, message: "请输入学号/教职工号", trigger: "blur" }],
  role: [{ required: true, message: "请输入角色", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
});

async function userRegister(ruleFormRef) {
  await ruleFormRef.validate((valid, fields) => {
    if (!valid) {
      ElMessage.error("请正确填写信息");
      return;
    }
    if (form.pswd !== form.confirm) {
      ElMessage.error("两次密码不一致");
      return;
    }

    isRegisterLoading.value = true;
    api.user
      .userRegister(form.value)
      .then((res) => {
        isRegisterLoading.value = false;
        if (res.data.code != 0) {
          if (res.data.code === 11004) {
            ElMessage.error("邮箱已注册");
            return;
          }
          if (res.data.code === 11005) {
            ElMessage.error("学号/教职工号已注册");
            return;
          }

          ElMessage.error("注册失败，请检查信息");
          return;
        }

        ElMessage.success("注册成功，请登录~");
        router.push("/");
      })
      .catch((err) => {
        isRegisterLoading.value = false;
        ElMessage.error("网络错误，请检查网络连接");
      });
  });
}
</script>

<style lang="less" scoped>
.register {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;

  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: url("../assets/img/home_bg.jpg");

  .register-form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 55vh;
    height: 50vh;

    background-color: @color-white;
    border-radius: 25px;

    .register-form-btn {
      width: 100%;
    }
  }
}

.fade-out-enter-active {
  transition: opacity 1s linear;
}

.fade-out-enter-from {
  opacity: 0;
}
</style>
