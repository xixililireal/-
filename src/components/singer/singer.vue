<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  
  import {getSingerList} from 'api/singer';
  import {ERR_OK} from 'api/config';
  import Singer from 'common/js/singer';
  import ListView from 'base/listview/listview';
  import { mapMutations } from 'vuex';
  import {playlistMixin} from 'common/js/mixin';
 

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      // 接收子组件传来参数
      selectSinger(singer) {
        this.$router.push({
          path:`/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        // 获取歌手名字和图片id 进行保存
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          // 获取歌手的 首字母
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title === HOT_NAME){
            hot.push(val)
          }
        }
        // 排序 a-z
        ret.sort((a,b) => {
          return a.title.charCodeAt(0)-b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      // 对象映射 ...->扩展运算符
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
