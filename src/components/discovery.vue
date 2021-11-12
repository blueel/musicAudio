
<template>
  <div class="content">
        <div class="lun">
            <!-- 轮播图 -->
            <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in urls" :key="item">
                <!-- <h3 class="medium">{{ item }}</h3> -->
                <img class='lbt' :src= 'item.imageUrl' alt="" @click="bannerToPlay(item.targetId)"/>
            </el-carousel-item>
            </el-carousel>
        </div>
        <div class="list">
            <div class="title">推荐歌单</div>
            <div class="list_buttom">
                <div class="pictures" v-for="(item,index) in playlist" :key="index">
                    <img :src="item.picUrl" alt="" class="img" @click="toPlaylist(item.id)">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      urls: [],
      playlist: []
    }
  },
  created () {
    // 轮播图
    // eslint-disable-next-line no-unused-expressions
    axios({
      url: 'https://autumnfish.cn/banner',
      method: 'get',
      params: {
      }
    }).then(res => {
      console.log(res)
      this.urls = res.data.banners
    // eslint-disable-next-line no-sequences
    }),
    //   推荐歌单
    axios({
      url: 'https://autumnfish.cn/personalized',
      method: 'get',
      params: {
      }
    }).then(res => {
    //   console.log(res)
      //   this.urls = res.data.banners
      this.playlist = res.data.result
    })
  },
  methods: {
    toPlaylist (id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    bannerToPlay (id) {
      console.log('banner' + id)
      this.$router.push(`/playlist?id=${id}`)
    }
  }
}
</script>

<style lang='less' scoped>
.list {
    width: 79%;
    height: 410px;
    overflow: scroll;
    .list_buttom {
        width: 100%;
        height: 355px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .pictures {
            margin-top: 5px;
            margin-right: 20px;
            width: 190px;
            height: 180px;
            span {
                color: gray;
                font-size: 13px;
            }
            img {
                width: 100%;
                height: 85%;
            }
        }
    }
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.lbt {
    width: 100%;
}
.lun {
    margin-top: 15px;
    width: 78%;
    height: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
