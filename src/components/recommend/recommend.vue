<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
    <div>
    <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item of recommends"> 
            <a :href="item.linkUrl">
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li @click="selectItem(item)" v-for="item of discList" class="item">
            <div class="icon">
              <img v-lazy="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </scroll>
  <router-view></router-view>
  </div>
</template>
  
  <script>
    import Loading from 'base/loading/loading';
    import Scroll from 'base/scroll/scroll';
    import Slider from 'base/slider/slider';
    import {getRecommend,getDiscList} from 'api/recommend';
    import {ERR_OK} from 'api/config';
    import {playlistMixin} from 'common/js/mixin';
    import {mapMutations} from 'vuex'

    export default{
      mixins: [playlistMixin],
      data(){
        return {
          recommends:[],
          discList:[]
        }
      },
      created(){
        // 渲染的高度
        // setTimeout(()=>{ 
        //   this._getRecommend();
        // },1000)
        this._getRecommend();
        this._getDiscList();
      },
      methods:{
        handlePlaylist(playlist) {
          const bottom = playlist.length > 0 ? '60px' : ''
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
        },
        selectItem(item) {
          this.$router.push({
            path: `/recommend/${item.dissid}`
          })
          this.setDisc(item)
        },
        // 利用jsonp获取数据 调用getRecommend方法--调用jsonp.js
        _getRecommend(){
          getRecommend().then(res=>{
            if(res.code === ERR_OK){
              this.recommends=res.data.slider;
            }
          })
        },
        _getDiscList(){
          getDiscList().then(res=>{
            if (res.code === ERR_OK){
              this.discList = res.data.list;
            }
          })
        },
        // 加载图片 保证图片能完整加载出来 使其它元素能够完整的加载出来  高度足够 不同的高度实时刷新 
        loadImage(){ 
          if (!this.checkloaded) {
            this.$refs.scroll.refresh();
            this.checkloaded = true;
          } 
        },
        ...mapMutations({
          setDisc: 'SET_DISC'
        })
      },
      components:{
        Slider,
        Scroll,
        Loading
      }
    }
  </script>
  
  <style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable";
    .recommend
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
      .recommend-content
        height: 100%
        overflow: hidden
        .slider-wrapper
          position: relative
          width: 100%
          overflow: hidden
        .recommend-list
          .list-title
            height: 65px
            line-height: 65px
            text-align: center
            font-size: $font-size-medium
            color: $color-theme
          .item
            display: flex
            box-sizing: border-box
            align-items: center
            padding: 0 20px 20px 20px
            .icon
              flex: 0 0 60px
              width: 60px
              padding-right: 20px
            .text
              display: flex
              flex-direction: column
              justify-content: center
              flex: 1
              line-height: 20px
              overflow: hidden
              font-size: $font-size-medium
              .name
                margin-bottom: 10px
                color: $color-text
              .desc
                color: $color-text-d
        .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)  

  </style>