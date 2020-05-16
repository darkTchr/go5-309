<template>
  <div :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll"></search>
    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item :key="index" v-for="(banner,index) in bannerList">
        <a href="/pages/goods/main">
          <img :src="banner.image_src"/>
        </a>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <div class="navs">
      <a href="" :key="index" v-for="(nav , index) in navList">
        <img :src="nav.image_src"/>
      </a>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" :key="index" v-for="(floor , index) in floorList">
        <div class="title">
          <img :src="floor.floor_title.image_src"/>
        </div>
        <div class="items">
          <a href="" :key="key" v-for="(product , key) in floor.product_list">
            <img :src="product.image_src"/>
          </a>

        </div>
      </div>
    </div>

    <!--    回到顶部-->
    <!--    window.scrollTo(0,0)-->
    <!--    <a href="#"></a>-->

    <p class="goTop" @click="goTop" v-show="scrollTop > 200"></p>
  </div>
</template>

<script>

  import search from '@/components/search'

  import request from '@/utils/request'

  export default {

    data () {
      return {
        pageHeight: 'auto',
        bannerList: [],
        navList: [],
        floorList: [],
        scrollTop: 0
      }
    },

    components: {
      search
    },

    methods: {
      goTop () {
        // 显示和隐藏

        //  调用API 可以动态设置页面滚动的高度
        mpvue.pageScrollTo({ scrollTop: 0 })
      },
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px'
      },
      async getBannerList () {

        //请求接口
        // mpvue.request({
        //   //https://www.uinav.com/api/public/v1/home/swiperdata
        //   url:"https://www.uinav.com/api/public/v1/home/swiperdata",
        //   success:(info)=>{
        //     console.log(info)
        //   }
        // })

        // {message:[....]}
        const { message } = await request({
          url: '/api/public/v1/home/swiperdata'
        })

        console.log(message)
        //数据更新
        this.bannerList = message

      },
      async getNavList () {
        const { message } = await request({
          url: '/api/public/v1/home/catitems'
        })

        this.navList = message
      },
      async getFloorList () {
        const { message } = await request({
          url: '/api/public/v1/home/floordata'
        })

        this.floorList = message
        console.log(message)
      }
    },
    async onPullDownRefresh(){
      //刷新

      await  this.getBannerList();
      await  this.getNavList();
      await  this.getFloorList();


      //结束下拉刷新动画
      mpvue.stopPullDownRefresh();

    },
    onPageScroll (ev) {
      //监听页面的滚动
      // console.log(ev)
      this.scrollTop = ev.scrollTop;
    },
    onShareAppMessage(){
      //实现监听方法就相当于开启了 ... 的分享功能


      // 自定义分享内容

      return {
        title:'这里有好货~快来看看呦~~',
        path:'/pages/index/main',
        //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589622928380&di=9b8110978fdb36e50c799b23d8c13204&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F86%2F90%2F2856ec5a0fc84c0.jpg
        imageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589622928380&di=9b8110978fdb36e50c799b23d8c13204&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F86%2F90%2F2856ec5a0fc84c0.jpg"
      }
    },

    // mpvue  created 不是用了
    // created(){
    //   console.log('首页   启动了')
    // },
    mounted () {
      //调用接口
      //axios  xhr  this.request

      // wx.request()
      // mpvue.request();

      this.getBannerList()
      this.getNavList()
      this.getFloorList()

    },
    // onLoad(){},
    // //onLanunch....
  }
</script>

<style scoped lang="less">

  .banner {
    width: 100%;
    height: 340rpx;

    img {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floors {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding-top: 20rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      a {
        width: 232rpx;
        height: 188rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      a:nth-child(2n+1) {
        margin-right: 0;
      }

      a:first-child {
        //width: unit(50,rpx)
        height: 386rpx;
        margin-right: 10rpx;
      }
    }

  }


  .goTop {
    position: fixed;
    right: 40rpx;
    bottom: 40rpx;

    width: 100rpx;
    height: 100rpx;
    background-color: pink;
    border-radius: 50%;
  }

</style>
