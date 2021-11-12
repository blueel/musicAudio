/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template>
  <div class="content">
    <div class="father">
      <div class="top_title">
        <span class="large">{{ this.$route.query.search }}</span>
        <span class="small">找到{{ songCount }}条结果</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" id="song_list">
        <el-tab-pane label="歌曲" name="first">
          <ul class="title color">
            <li class="one">&nbsp;</li>
            <li class="two">音乐标题</li>
            <li class="three">歌手</li>
            <li class="foure">专辑</li>
            <li class="five">时长</li>
          </ul>
          <ul
            class="title"
            v-for="(item, index) in songs"
            :key="index"
            @click="playMusic(item.id)"
          >
            <li class="one">{{ index + 1 }}</li>
            <li class="two">{{ item.name }}</li>
            <li class="three">{{ item.artists[0].name }}</li>
            <li class="foure">{{ item.album.name }}</li>
            <li class="five">{{ item.duration | timeFilter }}</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <!-- //歌单列表 -->
          <div class="list">
            <!-- <div class="title">推荐歌单</div> -->
            <div class="list_buttom">
                <div class="pictures" v-for="(item,index) in playlist" :key="index" @click="toPlaylist(item.id)">
                    <img :src="item.coverImgUrl" alt="" class="img">
                    <span>{{item.name}}</span>
                </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <!-- //歌单列表 -->
          <div class="list">
            <!-- <div class="title">推荐歌单</div> -->
            <div class="list_buttom">
                <div class="pictures" v-for="(item,index) in mvs" :key="index">
                    <img :src="item.cover" alt="" class="img">
                    <span>{{item.name}}</span>
                </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <div class="class">
        <el-pagination @current-change='handleCurrentChange'
                    background
                    layout="prev, pager, next"
                    :page-size='pageSize'
                    :current-page='page'
                    :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line no-undef
// this.filter('timeFilter', function (val) {
//   // eslint-disable-next-line no-undef
//   return new Data(val)
// })
export default {
  data () {
    return {
      activeName: 'first',
      songs: [],
      songCount: 0,
      playlist: [],
      mvs: [],
      page: 0,
      pageSize: 10,
      total: 1000
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    playMusic (id) {
      axios({
        url: 'https://autumnfish.cn/song/url',
        method: 'get',
        params: {
          id
        }
      }).then(res => {
        console.log(res)
        this.$emit('getUrl', res.data.data[0].url)
      })
    },
    toPlaylist (id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    handleCurrentChange (val) {
      this.page = val
      // this.upDate()
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.search,
          offset: (this.page - 1) * 10,
          limit: 10
        }
      }).then(res => {
        this.songCount = res.data.result.songCount
        this.songs = res.data.result.songs
      })
    }
  },
  watch: {
    // 当路由参数变化时重新请求数据
    $route: function (newVal, oldVal) {
      console.log(this.$route.query.search)
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.search,
          limit: 10
        }
      }).then(res => {
        this.songCount = res.data.result.songCount
        this.songs = res.data.result.songs
      })
    },
    // 监听activeName的值
    activeName: function () {
      // console.log(this.activeName)
      // eslint-disable-next-line no-unused-vars
      let type = 1
      // eslint-disable-next-line no-undef
      switch (this.activeName) {
        // eslint-disable-next-line no-undef
        case 'first':
          type = 1
          break
        case 'second':
          type = 1000
          break
        case 'third':
          type = 1004
          break
        default:
          break
      }
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.search,
          limit: 10,
          type
        }
      }).then(res => {
        // eslint-disable-next-line eqeqeq
        // 切换到歌单
        // eslint-disable-next-line eqeqeq
        if (this.activeName == 'second') {
          console.log(res)
          this.songCount = res.data.result.playlistCount
          this.playlist = res.data.result.playlists
        // eslint-disable-next-line brace-style
        }
        // 切换到歌单
        // eslint-disable-next-line eqeqeq
        else if (this.activeName == 'third') {
          console.log('111', this.mvs)
          this.mvs = res.data.result.mvs
        }
      })
    }
  },
  created () {
    // console.log(this.$route.query.search)
    axios({
      url: 'https://autumnfish.cn/search',
      method: 'get',
      params: {
        keywords: this.$route.query.search,
        limit: 10
      }
    }).then(res => {
      // console.log(res)
      this.songCount = res.data.result.songCount
      this.songs = res.data.result.songs
    })
  },
  filters: {
    timeFilter: function (val) {
      //  eslint-disable-next-line no-undef
      // eslint-disable-next-line no-unused-vars
      var fen = parseInt(val / 1000 / 60)
      // eslint-disable-next-line no-unused-vars
      var miao = parseInt(val / 1000 % 60)
      return `${fen}:${miao}`
    }
  }
}
</script>

<style lang='less' scoped>
//歌单列表
.list {
    width: 100%;
    height: 380px;
    .list_buttom {
        width: 100%;
        height: 355px;
        .pictures {
            font-size: 13px;
            float: left;
            margin-top: 25px;
            margin-right: 20px;
            width: 190px;
            height: 180px;
            img {
                width: 100%;
                height: 85%;
            }
        }
    }
}
.content {
  display: flex;
  justify-content: center;
}
.father {
  margin-top: 20px;
  width: 80%;
  .top_title {
    .large {
      font-size: 25px;
    }
    .small {
      font-size: 13px;
      color: gray;
      margin-left: 10px;
    }
  }
  .class {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
.title {
  overflow: hidden;
  width: 100%;
  height: 40px;
  list-style: none;
  font-size: 12px;
  li {
    float: left;
    // height: 10px;
    line-height: 40px;
  }
  .one {
    width: 5%;
  }
  .two {
    width: 40%;
  }
  .three {
    width: 20%;
  }
  .foure {
    width: 25%;
  }
  .five {
    width: 19%;
  }
}
.color {
  color: gray;
}
</style>
