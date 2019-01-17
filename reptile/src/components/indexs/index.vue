<template>
    <div id="box">
        <div class="header">
            <img src="../../assets/RJ7E7DFMXN.jpg" class="header_img">
            <div class="header-max">基于Node.js/Msql实现的爬虫项目</div>
            <div class="header-min">本站资源纯属练手</div>
        </div>
        <div class="main">
            <el-container>
                <el-row>
                    <div class="card">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="../../assets/meizi.png" class="image">
                            <div style="padding: 14px;">
                                <span>必应壁纸</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button" @click="See_meizi()">查看</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="card" style="float:right;">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="../../assets/meizi.png" class="image">
                            <div style="padding: 14px;">
                                <span>豆瓣影评</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button" @click="See_yp()">查看</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-row>
            </el-container>
        </div>
    </div>

</template>
<script>
export default {
    name: "indexs",
    data() {
        return {
            currentDate: "更新时间："
        };
    },
    mounted() {
        this.getdatatime();
    },
    methods: {
        See_meizi() {
            this.$router.push({ path: "/vivew/meizi" });
        },
        See_yp() {
            this.$message({
                message: "开发中！！！",
                type: "warning"
            });
        },
        getdatatime() {
            let myDate = new Date();
            myDate.getFullYear();
            myDate.getMonth();
            myDate.getDate();
            this.currentDate +=
                myDate.getFullYear() +
                "-" +
                (myDate.getMonth() + 1) +
                "-" +
                myDate.getDate();
        }
    }
};
</script>
<style scoped>
.header {
    width: 100%;
    height: 500px;
    position: relative;
}
.header-max {
    position: absolute;
    left: 30%;
    top: 30%;
    color: #fff;
    font-size: 60px;
    font-family: fantasy;
}
.header-min {
    position: absolute;
    left: 43%;
    top: 55%;
    color: #fff;
    font-size: 30px;
    font-family: fantasy;
}
.header_img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    filter: blur(3px);
}
.main {
    text-align: center;
    width: 80%;
    margin: auto;
    margin-top: 10px;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}
.card {
    width: 500px;
    float: left;
}
.el-row {
    width: -webkit-fill-available;
}
</style>
