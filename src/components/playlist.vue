<template>
  <div class="content">
      <div class="top">
          <div class="top_left">
              <img :src="playlist.coverImgUrl" alt="">
          </div>
          <div class="top_right">
              <div class="top_right_title">{{playlist.name}}</div>
              <div class="message">
                  <span><img :src="playlist.creator.avatarUrl" alt=""></span>
                  <span>{{playlist.creator.nickname}}</span>
                  <span>{{playlist.createTime | dateFormat('yyyy-mm-dd')}}</span>
                  <span>创建</span>
              </div>
              <div class="allPaly"><button>播放全部</button></div>
              <div class="tag">标签：<span v-for="(item,index) in playlist.tags" :key="index">{{item}}</span></div>
              <div class="introduce">简介:<span>{{playlist.description}}</span></div>
          </div>
      </div>
      <div class="buttom">
          <!-- 歌曲列表 -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="歌曲列表" name="first">
                <ul class="title color">
                    <li class="one">&nbsp;</li>
                    <li class="two">音乐标题</li>
                    <li class="three">歌手</li>
                    <li class="foure">专辑</li>
                    <li class="five">时长</li>
                </ul>
                <div class="border">
                    <ul
                        class="title"
                        v-for="(item, index) in playlist.tracks"
                        :key="index"
                        @click="playMusic(item.id)"
                    >
                        <li class="one">{{ index + 1 }}</li>
                        <li class="two">{{ item.name }}</li>
                        <li class="three">未知</li>
                        <li class="foure">未知</li>
                        <li class="five">{{ item.duration | timeFilter }}</li>
                    </ul>
                </div>
            </el-tab-pane>
            <!-- 热门评论 -->
            <el-tab-pane :label="label" name="second">
                <div class="comment_father">
                    <div class="comment clearfix" v-for="(item,index) in hotcomments" :key="index">
                        <div class="comment_left">
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="comment_right">
                            <div><span class="author">{{item.user.nickname + ":"}}</span><span>{{item.content}}</span></div>
                            <div v-if="item.beReplied.length != 0"><span class="author">{{item.beReplied[0].user.nickname + ":"}}</span><span>{{item.beReplied[0].content}}</span></div>
                            <div class="time">{{item.time | dateFormat}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
         </el-tabs>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      activeName: 'first',
      label: '热门评论(0)',
      playlist: [],
      hotcomments: []
    }
  },
  methods: {
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
    }
  },
  mounted () {
    //   获取歌单详情
    // eslint-disable-next-line no-unused-expressions
    axios({
      url: 'https://autumnfish.cn/playlist/detail',
      method: 'get',
      params: {
        limit: 7,
        id: this.$route.query.id
      }
    }).then(res => {
      console.log(res)
      this.playlist = res.data.playlist
    // eslint-disable-next-line no-sequences
    }),
    //   获取热门评论
    axios({
      url: 'https://autumnfish.cn/comment/hot',
      method: 'get',
      params: {
        id: this.$route.query.id,
        type: 2
      }
    }).then(res => {
      console.log(res)
      //   this.playlist = res.data.playlist
      this.hotcomments = res.data.hotComments
      console.log(this.hotcomments)
      this.label = `热门评论(${res.data.total})`
    })
  },

  filters: {
    dateFormat: function (dateStr, pattern = '') {
      var dt = new Date(dateStr)
      var yy = dt.getFullYear()

      // 方法一
      // var mm = dt.getMonth() + 1 < 10 ? '0' + dt.getMonth() : dt.getMonth()
      // var dd = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
      // var h = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()
      // var m = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()
      // var s = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds()

      // 方法二
      // ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
      var mm = (dt.getMonth() + 1).toString().padStart(2, '0')
      var dd = dt.getDate().toString().padStart(2, '0')
      var h = dt.getHours().toString().padStart(2, '0')
      var m = dt.getMinutes().toString().padStart(2, '0')
      var s = dt.getSeconds().toString().padStart(2, '0')

      if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return yy + '-' + mm + '-' + dd
      } else {
        return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s
      }
    }
  }
}
// eslint-disable-next-line vue/no-parsing-error
</script>
<style lang='less' scoped>

.comment_father {
    height: 330px;
    overflow: scroll;
}
.comment {
    width: 100%;
    font-size: 13px;
    .comment_left {
        float: left;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .comment_right {
        float: left;
        margin-left: 10px;
        width: 80%;
        div {
            margin-bottom: 10px;
        }
        .author {
            color: rgb(15, 173, 247);
        }
        .time {
            color: gray;
        }
    }
}
.clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    .top {
        width: 80%;
        margin-top: 20px;
        flex: 2;
        .top_left {
            float: left;
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .top_right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            float: left;
            width: 800px;
            height: 200px;
            margin-left: 20px;
            font-size: 14px;
            .message {
                display: flex;
                flex-direction: row;
                // justify-content: space-between;
                align-items: center;
                // width: 200px;
                span {
                    margin-right: 10px;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
            }
            .introduce {
                span {
                    margin-left: 1s0px;
                }
            }
        }
    }
    .buttom {
        margin-top: 20px;
        width: 80%;
        flex: 4;
    }
}
.border {
  height: 280px;
  overflow: hidden;

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
