<template>
  <div class="login-container">
    <el-form
      class="login-content"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef"
    >
      <img class="login-logo" src="../../assets/common/login-logo.png" />
      <el-form-item prop="mobile">
        <el-input
          class="login-input"
          prefix-icon="el-icon-user-solid"
          @keyup.enter.native="login"
          v-model="loginForm.mobile"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          class="login-input"
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          @keyup.enter.native="login"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <p class="no-number">还没有账号？立即注册</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkPhome } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      isLogin: false,
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginFormRules: {
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            checkPhome(value) ? callback() : callback(callback(new Error('手机不合法')))
          }, rigger: 'blur'
        }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 16, message: '密码应在6~16位', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['user/login']),
    login() {
      if (this.isLogin) return
      this.isLogin = true
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid)
        if (valid) {
          this.isLogin = false
          // this.$store.dispatch('user/login', this.loginForm)
          await this['user/login'](this.loginForm)
          this.$message.success('登录成功')
          this.$router.push('/')
          // this.isLogin = false
        } else {
          this.$message.warning('账号或密码错误')
          this.isLogin = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scopec>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(../../assets/common/login.jpg);
  filter: blur(0.1px);
  .login-content {
    width: 450px;
    text-align: center;
    // .login-input {
    .el-input__inner {
      color: #68b0fe;
    }
    // }
    .login-logo {
      width: 100%;
      margin-bottom: 30px;
    }
    .login-btn {
      width: 100%;
      color: #fff;
      background: #407ffe;
      border: none;
    }
    .no-number {
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>
