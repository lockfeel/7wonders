/**
 *****************************************
 *作者：张文晓@<837045534@qq.com>
 -----------------------------------------
 *描述：小程序主页控制器
 -----------------------------------------
 *时间：2018-10-15 Add By Mr.z
 *****************************************
 */
const app = getApp();
const any = wx.getSystemInfoSync();
const MAIN_HOST = 'https://7wonders.shopshops.top/';
Page({
    /**页面需要数据*/
    data : {
        playStatus           : false,
        completeStatus       : false,
        shareStatus          : false,
        coverStatus          : true,
        shopStatus           : false,
        showStatus           : false,
        maxPage              : 12,
        totalNum             : 0,
        lastX                : 0,
        dataUrl              :'recommend/videos',
        lastY                : 0,
        currentGesture       : 0,
        completeVideo        : {},
        paddingTop           : any.model.indexOf('iPhone X') != -1 ? 100 : 75,
        pageNum              : 0,
        coverImages          : '',
        videos               : [],
        item                 : {},
        currentItem          : {},
        index                : 0,
        VT                   : "cover",
        IT                   : '',
        SW                   : any.windowWidth,
        SH                   : any.windowHeight
    },

/** @****************************************************************************************************************@*/
/** @ 需求总是多变的，导致产生非常多无用代码
/** @ 别搞下划线开头的方法名(_click)，大驼峰(GetUser)，小驼峰(setUser)，都可以
/** @****************************************************************************************************************@*/

    /**页面开始加载*/
    onLoad: function (options) {
      let composer = wx.createVideoContext('max-video1');
      composer.play();
    },

    /**当页面显示的*/
    onShow : function(e) {
      let composer = wx.createVideoContext('max-video1');
      composer.play();
    },

    /**切换视频时触发*/
    nextVideo : function(e){
        this.data.index = e.detail.current;
        this.setData({coverImages:this.data.videos[this.data.index].cover_pic});
        let that = this;
        /**设置520毫秒的定时器*/
        setTimeout(function(that){
            that.setVideo(that,that.data.videos[that.data.index], that.data.index);
        },360,this);
    },

    /**切换视频时触发*/
    toLive :function(e) {
        wx.navigateToMiniProgram({
            appId:'wx3f0d8b1fe0abeb7a',
            path:'pages/main/welcome/index',
            extraData: {},
            envVersion: 'release',
            success(res) {}
        });
    },
    /**当页面显示隐藏*/
    onReady: function (res) {
        try {
        this.requestJson(this.data.dataUrl, {}, this, 2);
            let composer = wx.createVideoContext('max-video1');
            composer.play();
        } catch (e) {
          throw e;
        }
    },

    /**滑动开始事件*/
    handleStart: function (event) {
      try {
          if (!this.data.playStatus) return false;
          this.data.lastX = event.touches[0].pageX;
          this.data.lastY = event.touches[0].pageY;
      }catch (e) {
          throw e;
      }
    },

    /**滑动结束事件*/
    handleEnd: function (event) {
      try{
          /*滚动到顶部*/
          let currentX = event.changedTouches[0].pageX;
          let currentY = event.changedTouches[0].pageY;
          let tx = currentX - this.data.lastX;
          let ty = currentY - this.data.lastY;
          if (Math.abs(tx) > Math.abs(ty)) {
              //--左右方向滑动
              if (tx < 0)
                  this.data.currentGesture = 3;
              else if (tx > 0)
                  this.data.currentGesture = 4;
          } else {
              //--上下方向滑动
              if (ty < 0)
                  this.data.currentGesture = 1;
              else if (ty > 0)
                  this.data.currentGesture = 2;
          }
          /*关闭播放*/
          if (this.data.currentGesture == 1){
              this.setData({ playStatus: false });
              this.setData({
                  index         : this.data.index + 1,
                  coverStatus   : true,
                  playStatus    : false,
                  showStatus    : false
              });
              if (this.data.index == this.data.videos.length - 2) {
                  this.requestJson(this.data.dataUrl,{},this,1);
              }
          } else if (this.data.currentGesture == 2){
              /**获得index*/
              if (this.data.index == 0) {
                  this.setData({ currentGesture: 0});
              } else {
                  this.setData({
                      index         : this.data.index - 1,
                      coverStatus   : true,
                      playStatus    : false,
                      showStatus    : false
                  });
              }
          }
      }catch (e) {
          throw e;
      }
    },

    /**监听页面分享方法*/
    onShareAppMessage: function (res) {
      try {
          let shareObj = {
              title     : this.data.item.title,
              path      : '/pages/index/index',
              success   : res => {},
              fail      : function (res) {}
          };
          return shareObj;
      }catch (e) {
          throw e;
      }
    },
    /**进度条已经加载完成*/
    progressP:function(e){

    },

  /**请求网络数据*/
  requestUrl: function (action, method,params, callback) {
    wx.request({
      url: MAIN_HOST + action,
      data: params,
      method: method,
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {}
    });
  },
    /**请求哪逛接口*/
    requestJson:function(url,params,that,pop,method='POST'){
      try {
        this.requestUrl(url, method, params, res => {
              if (res.retCode == 200){
                  if (pop == 1 || pop == 2 || pop == 3){
                      /**刷新整个数据列表*/
                      if (pop == 2) {
                          that.data.videos  = [];
                          that.data.index   = 0;
                          that.data.pageNum = 0;
                      }
                      for (let key in res.retData)  {
                          that.data.videos.push(res.retData[key]);
                      }
                      /**设置数据列表*/
                      that.setData({
                          videos    : that.data.videos,
                          maxPage   : that.data.maxPage,
                          totalNum  : that.data.totalNum,
                          pageNum   : that.data.pageNum
                      });
                      /**刷新整个数据列表但是不播放视频*/
                      if (pop != 3 && !that.data.showStatus) {
                          that.setData({coverImages : that.data.videos[that.data.index].cover_pic});
                          that.setVideo(that,that.data.videos[that.data.index], that.data.index);
                      }
                  }
              }
          })
      }catch (e) {
          throw e;
      }
    },
    /**设置视频因素*/
    setVideo:function (that,resource,index = this.data.index){
      try{
          that.setData({
              coverStatus     : false,
              showStatus      : false,
              playStatus      : true,
              item            : resource,
              VT              : resource.height > resource.width ? 'fill' : 'contain',
              currentGesture  : 0,
          });
      }catch (e) {
          throw e;
      }
    }
});
