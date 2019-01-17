<template>
    <div>
        <el-container>
            <el-header style="background-color:#f56c6c">Header</el-header>
            <el-main>
                <ul class="imgbox">
                    <li v-for="(item,index) in imgs" :key="index"><img :src="item.src"></li>
                </ul>
            </el-main>
        </el-container>
    </div>

</template>
<script>
import axios from "axios";
export default {
    name: "meizi",
    data() {
        return {
            imgs: []
        };
    },
    mounted() {
        this.getimg();
    },
    methods: {
        getimg() {
            axios.get("/api/meizi").then(res => {
                
                if (res.data.length > 0) {
                    console.log(res.data)
                    this.imgs=res.data;
                    console.log(this.imgs.length)
                } else {
                    this.$message({
                        message: "暂无数据！",
                        type: "warning"
                    });
                }
            });
        }
    }
};
</script>
<style scoped>
ul,
li {
    padding: 0;
    margin: 0;
    list-style: none;
}
img {
    width: 350px;
    height: 350px;
    object-fit: cover;
    float: left;
    margin-left: 10px;
    border: 1px solid #333;
}
.imgbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
}
li {
    margin-top: 10px;
}
</style>
