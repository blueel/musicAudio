/* eslint-disable no-dupe-keys */
<template>
  <div>
    <!-- 顶部部分 -->
    <div class="top">
      <div class="top_title">blueel的音乐播放器</div>
      <div class="input">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="inputValue" @keyup.native.enter="toSearch">
        </el-input>
      </div>
    </div>
    <!-- <top class="top_nav"/> -->
    <div class="buttom">
      <!-- 左侧部分 -->
      <div class="left">
            <ul>
                <li class="active" @click="dis">
                    <!-- <span class="iconfont">&#xe6c0;</span>
                    发现音乐 -->
                    <router-link to="/discovery"><span class="iconfont">&#xe6c0;</span>发现音乐</router-link>
                </li>
                <li @click="list">
                    <router-link to="/list"><span class="iconfont">&#xe636;</span>推荐歌单</router-link>
                </li>
                <li @click="songs">
                    <router-link to="/songs"><span class="iconfont">&#xe680;</span>最新音乐</router-link>
                </li>
                <li @click="mvs">
                    <router-link to="/mvs"><span class="iconfont">&#xe6a3;</span>最新MV&nbsp;</router-link>
                </li>
            </ul>
      </div>
      <!-- 右侧部分 -->
        <div class="right">
            <router-view @getUrl='getUrl($event)'/>
            <!-- <discovery/> -->
        </div>
    </div>
    <!-- 播放器 -->
     <audio controls class="play" :src="url" autoplay></audio>
  </div>
</template>
<script>
import discovery from './discovery.vue'
// import top from './top.vue'
export default {
  data: function () {
    return {
      inputValue: '',
      url: ''
    }
  },
  methods: {
    dis () {
      this.$router.push('/discovery')
    },
    list () {
      this.$router.push('/list')
    },
    songs () {
      this.$router.push('/songs')
    },
    mvs () {
      this.$router.push('/mvs')
    },
    toSearch () {
      // eslint-disable-next-line eqeqeq
      if (this.inputValue == '') {
        // alert('输入内容不能为空')
        this.$message({
          message: '请输入搜索内容',
          type: 'warning'
        })
      } else {
        this.$router.push(`/result?search=${this.inputValue}`)
      }
    },
    getUrl (url) {
      this.url = url
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    discovery
  }
}
</script>

<style lang='less' scoped>
// .top_nav {
//     // position: fixed;
// }
.top {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #5292FE;
  .top_title {
      float: left;
      margin-right: 900px;
      color: white;
  }
}
.input {
  margin-right: 150px;
  width: 200px;
}
.buttom {
    display: flex;
    .right {
        flex: 1;
        // background-color: #eeb35c;
    }
}
.left ul {
  @font-face {
    font-family: "iconfont";
    src: url("../assets/iconfont.ttf?t=1629975622966") format("truetype");
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  width: 150px;
  height: 650px;
  background-color: rgb(228, 227, 227);
  li {
    margin-top: 40px;
    // margin-left: 20px;
    a {
        text-decoration: none;
        color: black;
        span {
            margin-right:10px ;
        }
    }
  }
}
.router-link-active {
  color: rgb(0, 174, 255) !important;
}
.play {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
