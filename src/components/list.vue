<template>
  <div class="father">
        <div class="content">
            <div class="top">
                <div class="bc clearfix">
                <div class="bc_left"><img :src="playlist[0].coverImgUrl" alt=""></div>
                <div class="bc_right">
                    <div class="bc_right_top">精品歌单</div>
                    <div class="bc_right_center" style="font-size:15px;">{{playlist[0].name}}</div>
                    <div class="text">{{playlist[0].description}}</div>
                </div>
                </div>
            </div>
            <div class="tag">
                <ul>
                    <li :class="{active: tag=='全部'}" @click="tag='全部'">全部</li>
                    <li :class="{active: tag=='欧美'}" @click="tag='欧美'">欧美</li>
                    <li :class="{active: tag=='华语'}" @click="tag='华语'">华语</li>
                    <li :class="{active: tag=='流行'}" @click="tag='流行'">流行</li>
                    <li :class="{active: tag=='说唱'}" @click="tag='说唱'">说唱</li>
                    <li :class="{active: tag=='摇滚'}" @click="tag='摇滚'">摇滚</li>
                    <li :class="{active: tag=='民谣'}" @click="tag='民谣'">民谣</li>
                    <li :class="{active: tag=='电子'}" @click="tag='电子'">电子</li>
                    <li :class="{active: tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</li>
                </ul>
            </div>
            <!-- 歌曲列表 -->
            <div class="list">
                <!-- //歌单列表 -->
                <div class="list">
                    <!-- <div class="title">推荐歌单</div> -->
                    <div class="list_buttom">
                        <div class="pictures" v-for="(item,index) in topPlaylist" :key="index" @click="toPlaylist(item.id)">
                            <img :src="item.coverImgUrl" alt="" class="img">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div class="fenye">
                <el-pagination
                    @current-change='handleCurrentChange'
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
export default {
  data: function () {
    return {
      playlist: [],
      topPlaylist: [],
      tag: '全部',
      page: 0,
      pageSize: 10,
      total: 1000
    }
  },
  created () {
    //   精品歌单
    // eslint-disable-next-line no-unused-expressions
    axios({
      url: 'https://autumnfish.cn/top/playlist/highquality',
      method: 'get',
      params: {
        limit: 1,
        cat: '全部'
      }
    }).then(res => {
    //   console.log(res)
      this.playlist = res.data.playlists
    // eslint-disable-next-line no-sequences
    }),
    axios({
      url: 'https://autumnfish.cn/top/playlist',
      method: 'get',
      params: {
        limit: 10,
        cat: '全部'
      }
    }).then(res => {
      console.log(res)
      this.topPlaylist = res.data.playlists
    })
  },
  methods: {
    toPlaylist (id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    handleCurrentChange (val) {
      this.page = val
      this.upDate()
    },
    upDate () {
      //   精品歌单
    // eslint-disable-next-line no-unused-expressions
      axios({
        url: 'https://autumnfish.cn/top/playlist/highquality',
        method: 'get',
        params: {
          limit: 1,
          // eslint-disable-next-line no-undef
          offset: (this.page - 1) * 1,
          cat: this.tag
        }
      }).then(res => {
        //   console.log(res)
        this.playlist = res.data.playlists
        // eslint-disable-next-line no-sequences
      }),
      axios({
        url: 'https://autumnfish.cn/top/playlist',
        method: 'get',
        params: {
          limit: 10,
          // eslint-disable-next-line no-undef
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        console.log(res)
        this.topPlaylist = res.data.playlists
        this.total = res.data.total
      })
    }
  },
  watch: {
    tag () {
      this.page = 0
      this.upDate()
    }
  }
}
</script>

<style lang='less' scoped>
.active {
    color: orange !important;
}
//歌单列表
.father {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    .top {
        width: 100%;
    }
    .fenye {
        margin-top: 20px;
    }
}
.tag {
    width: 100%;
    ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 50px;
        li {
            color: gray;
            font-size: 13px;
            float: right;
            list-style-type: none;
            margin-right: 20px;
        }
    }
}
.list {
    width: 100%;
    height: 350px;
    .list_buttom {
        width: 100%;
        height: 350px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .pictures {
            font-size: 13px;
            // float: left;
            margin-bottom: 15px;
            // margin-left: 20px;
            width: 200px;
            height: 160px;
            img {
                width: 100%;
                height: 85%;
            }
        }
    }
}
.bc {
    background-color: rgb(218, 216, 216);
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .bc_left {
        float: left;
        // margin-left: 20px;
        width: 150px;
        height: 150px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }
    .bc_right {
        float: left;
        margin-left: 20px;
        div {
            margin-bottom: 8px;
        }
        .text {
            width: 880px;
            height: 90px;
            overflow: hidden;
            font-size: 13px;
        }
    }
    width: 100%;
    height: 150px;
}
// 清除浮动
.clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
