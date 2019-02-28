<!-- 轮播图 -->
<!-- 注释的代码部分是旧版本的写法 -->
<template>
  <!-- ref="slider" 语义 -->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) of dots"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {addClass} from 'common/js/dom'
  export default{
    name: 'slider',
    data(){
      return {
        dots:[],
        currentPageIndex: 0 // 当前第几页，是哪张图片
      }
    },
    //控制轮播的间隔，时间，如何轮播
    props:{// 从外部控制组件属性类型
      loop:{ // 循环轮播
        type: Boolean,
        default: true
      },
      autoPlay:{ // 自动轮播
        type: Boolean,
        default: true
      },
      interval:{//自动轮播的间隔，多少毫秒滚动一次
        type:Number,
        default:4000
      }
    },
    mounted(){
      setTimeout(()=>{
        this._setSliderWidth(); // 轮播图的宽度
        this._initDots(); // 图片指示符
        this._initSlider();// 初始化轮播图

        /// 如果autoplay为true 就自动播放
        if(this.autoPlay){
          this._play();
        }

      },20);

      // 监听窗口改变事件
      window.addEventListener('resize',()=>{
        if(!this.slider){
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods:{
      _setSliderWidth(isResize){
        this.children = this.$refs.sliderGroup.children;
        // console.log(this.children.length)

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i =0; i < this.children.length; i++) {
          let child = this.children[i];
          // console.log(child)
          addClass(child, 'slider-item');

          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
          // console.log(width)
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots(){
        this.dots=new Array(this.children.length);
        // console.log(this.dots)
      },
      _initSlider(){/// 初始化轮播图
        this.slider=new BScroll(this.$refs.slider,{
          scrollX:true, // 允许横向滚动
          scrollY:false,// 不允许纵向滚动
          momentum:false, //  是否开启动画
          snap:{
            loop:true,
            threshold:0.3,
            speed:400
          }
          //snap:true,
          // snapLoop:this.loop,  // 循环播放
          // snapThreshold:0.3, // 间隔时间
          // snapSpeed:400,
          //  // 播放速度
          // click:true //允许点击
        })

        // 调用better-scroll 会触发一个事件
        // 监听滚动结束事件，获取pageX
 
        this.slider.on('scrollEnd', () => {
          // console.log(12)
          let pageIndex = this.slider.getCurrentPage().pageX; // 获取当前的索引
 
          // 
          this.currentPageIndex = pageIndex;
          
          // setTimeout 执行一次就不执行了
          // 在滚动结束时，清除setTimeout，在再调用一次循环
          if(this.autoPlay){
          clearTimeout(this.timer);
           this._play();
          }
        })

        this.slider.on('beforeScrollStart',()=>{
          if(this.autoPlay){
            clearTimeout(this.timer);
           }
        })
      },
      _play(){ // 播放图片
        // let pageIndex = this.currentPageIndex + 1;
        // if (this.loop) {
        //   pageIndex += 1
        // }
        this.timer=setTimeout(()=>{
          this.slider.next();
          // this.slider.goToPage(pageIndex, 0, 400);
                      // 横向为pageIndex，纵向为0，间隔400毫秒
        },this.interval)
      },
    },
    destroyed() {
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizng: border-box
        overflow:hidden
        text-align: center
        a
          display:block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display:block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll

</style>