   //index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto1: '扫码使用',
    motto2: '课前必看',
    motto3: '我的通知',
    motto4: '其他功能',
    userInfo: {},
    myMesg: {},
    openid: null,
    imgUrls: [
      'https://www.goooooo.top/static/images/swiper/01.jpg',
      'https://www.goooooo.top/static/images/swiper/02.jpg',
      'https://www.goooooo.top/static/images/swiper/03.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 卡片
    top: "-200rpx",
    tarin: "border-top: 20rpx solid red;",
    flag: 0,
    dynamic_data: null,
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  // 功能暂未展示
  noFunction: function () {
    wx.showLoading({
      title: '功能暂未开放，请耐心等待',
      duration: 2000
    })
  },
  // 跳转到课前必做
  goToCHome: function () {
    wx.navigateTo({
      url: '../course/chome/chome'
    })
  },
  // 文章展示
  display: function(e){
    var id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '../admin/display/display?id='+id
    })
  },
  //事件处理函数
  getScanCode: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    wx.scanCode({
      success: (res) => {
        // console.log(res.result)
        // this.setData({
        //   motto: res.result
        // })
        wx.navigateTo({
          url: '../use/use?yqid='+res.result
        })
      }
    })
  },
  // 卡片下拉
  kapDown: function (e){
    var flag = this.data.flag
    if (flag==0){
      this.setData({
        top: "0",
        tarin: "border-bottom: 20rpx solid red;",
        flag: 1
      })
    }else if(flag==1){
      this.setData({
        top: "-200rpx",
        tarin: "border-top: 20rpx solid red;",
        flag: 0
      })
    }
  },
  onLoad: function () {
    // console.log('onLoad')
    // 启动加载
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this

    // 获取轮播播图数据
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getImgData',
      data: {
        TYPE: "swiper"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          imgUrls: res.data,
        })
      }
    })

    // 获取动态数据
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getDynamic',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          dynamic_data: res.data,
        })
      }
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      //赋值给openid
      wx.getStorage({
        key: 'user',
        success: function(res) {
            var openid = res.data.openid
            // console.log('openid为'+openid)
            // 通过openid获取信息
            wx.request({
              url: 'https://www.goooooo.top/api/index/getMyMesg',
              data: {
                openid: openid
              },
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                // console.log(res.data[0])
                if(res.data==false){
                  wx.showModal({
                      title: '提示',
                      content: '检测到你为填写个人信息，请先填写个人信息',
                      showCancel: false,
                      success: function(res) {
                          if (res.confirm) {
                              // console.log('用户点击确定')
                              wx.redirectTo({
                                  url: '../input/input'
                              })
                          }
                      }
                   })
                  // wx.switchTab({
                  //     url: '../logs/logs'
                  // })
                }
                // 获取到myMesg关闭加载
                wx.hideLoading()

                that.setData({
                    myMesg:res.data[0]
                  })
                wx.setStorage({
                  key:"myMesg",
                  data:res.data[0]
                })
              }
            })
            // 赋值给page的openid
            that.setData({
              openid:res.data.openid
            })
        }
      })
      
    })

  },
   onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  }
})