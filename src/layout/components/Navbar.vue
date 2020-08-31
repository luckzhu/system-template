<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div v-if="device === 'desktop'" class="welcome">欢迎您，{{ name }}</div>
      <!-- <el-link class="change-password" type="warning" @click="openChangePasswordDialog">修改密码</el-link> -->
      <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
        <div class="logout" @click="openChangePasswordDialog">
          <svg-icon icon-class="passwordKey" />
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
        <div class="logout" @click="logout">
          <svg-icon icon-class="logout" />
        </div>
      </el-tooltip>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="400px"
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="100px">
          <el-form-item prop="oldPwd" label="旧密码">
            <el-input
              :key="passwordType"
              v-model="passwordForm.oldPwd"
              :type="passwordType"
              placeholder="密码"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item prop="pwd" label="新密码">
            <el-input
              :key="passwordType"
              v-model="passwordForm.pwd"
              :type="passwordType"
              placeholder="密码"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { validPassword } from '@/utils/validate'
import { updatePwd } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // avatar: require('@/assets/images/ocean.png')
      dialogVisible: false,
      passwordForm: {
        oldPwd: '',
        pwd: ''
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'device', 'unitName'])
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    openChangePasswordDialog() {
      this.dialogVisible = true
      this.passwordForm = { oldPwd: '', pwd: '' }
    },
    changePassword() {
      const { passwordForm } = this
      this.$refs.passwordForm.validate(async(valid) => {
        if (valid) {
          const res = await updatePwd(passwordForm)
          this.$message(res.data.info)
          if (res.code === 200) {
            this.dialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 40px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 4px;
    }
    .welcome {
      margin-right: 20px;
    }
    .item {
      cursor: pointer;
      color: $primaryColor;
      &:not(:last-child) {
        margin-right: 20px;
      }
      .svg-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.change-password {
  margin-right: 20px;
  font-size: 15px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
