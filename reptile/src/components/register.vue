<template>
      <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-form-item label="账号" prop="number">
            <el-input v-model.number="ruleForm2.number"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="success" style="width:-webkit-fill-available" @click="registerinfo(ruleForm2)">注册并登录</el-button>
      </el-form>
      </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    var number = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 11) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        number: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        password: [{ validator: password, trigger: "blur" }],
        checkPass: [{ validator: checkPass, trigger: "blur" }],
        number: [{ validator: number, trigger: "blur" }]
      }
    };
  },
  methods: {
    registerinfo(userinfo) {
      console.log(JSON.stringify(userinfo))
      axios.post("/api/register", userinfo).then(res => {
        console.log("res", res);
        if (res.data.status == 0) {
          this.$message({
            message: "注册成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}
</style>
