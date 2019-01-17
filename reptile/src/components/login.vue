<template>
  <div id="app">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-main class="center-in-center">
      <transition name="el-zoom-in-top" class="login">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" v-show="show" class="transition-box">
          <el-form-item label="账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="formLabelAlign.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" style="width:-webkit-fill-available" @click="submitForm(formLabelAlign)">登录</el-button>
          <el-button type="success" style="width:-webkit-fill-available" @click="show=false">注册</el-button>
        </el-form>
        </transition>
        
        <div v-if="showRentPrise">
          <v-register></v-register>  
        </div>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
import register from "./register";
export default {
  name: "login",
  data() {
    return {
      show: true,
      showRentPrise: false,
      msg: "Vue.js+Node.js+Mysql",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        checkPass: ""
      }
    };
  },
  components: {
    "v-register": register,
  },
  watch: {
    show(data) {
      console.log(data);
      if (!data) {
        setTimeout(() => {
          this.showRentPrise = true;
        }, 300);
      }
    }
  },
  methods: {
    submitForm(formName) {
      axios.post("/api/login", formName).then(res => {
        console.log("res", res);
        if (res.data.status == 0) {
          this.$message({
            message: "用户不存在！",
            type: "warning"
          });
        } else {
          this.$message({
            message: "登录成功！",
            type: "success"
          });
          this.$router.push({path:'/indexs/index'})
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
.center-in-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.transition-box {
  margin-bottom: 10px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
