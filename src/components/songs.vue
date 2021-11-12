<template>
    <div class="father">
        <div class="content">
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
                v-for="(item, index) in list"
                :key="index"
                @click="playMusic(item.id)"
            >
                <li class="one">{{ index + 1 }}</li>
                <li class="two">{{ item.name }}</li>
                <li class="three">{{item.artists[0].name}}</li>
                <li class="foure">{{item.album.name}}</li>
                <li class="five">{{ item.duration | timeFilter }}</li>
            </ul>
        </div>
  </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      list: []
    }
  },
  created () {
    axios({
      url: 'https://autumnfish.cn/top/song',
      method: 'get',
      params: {
        // type: 0
      }
    }).then(res => {
      console.log(res)
      this.list = res.data.data
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
  }
}
</script>

<style lang='less' scoped>
.father {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 640px;
    overflow: scroll;
    // justify-content: center;
}
.content {
    width: 80%;
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
