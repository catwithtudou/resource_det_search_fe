<template>
    <div class="home">
        <div class="home-title" v-if="!isAppearForm">
            <h1>高校课程资源智能识别与搜索系统</h1>
        </div>
        <div class="home-btn" v-if="!isAppearForm">
            <el-button size="large" :dark="isDark" color="@color-black" @click="appearForm" round>立即进入</el-button>
        </div>
        <div class="home-login" v-if="isAppearForm">
            <div class="home-login-form">
                <el-form :model="form" label-width="auto" label-position="left">
                    <el-form-item label="Username" >
                        <el-input v-model="form.email" placeholder="邮箱地址" />
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input v-model="form.pswd" placeholder="密码" />
                    </el-form-item>
                    <el-button size="default" class="home-login-form-btn" :loading="isLoginLoading" >Log In
                    </el-button>
                    <el-button type="text"   class="home-login-form-text">Forget Password?</el-button>
                    <el-divider />
                    <el-button size="default" class="home-login-form-btn">Sign Up
                    </el-button>
                </el-form>

            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue"

let isAppearForm = ref(true)
let isLoginLoading = ref(false)

let appearForm = () => {
    isAppearForm.value = true
}

let form = ref({
    "email": "",
    "pwsd": ""
})


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
</style>