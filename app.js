//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
        if(res.code) {  
          //  获取用户信息
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })

              // 获取oppenid
            // wx.removeStorage({
            //   key: 'user',
            //   success: function() {
            //     console.log("remove ok!")
            //   } 
            // })
             wx.getStorage({
                key: 'user',
                success: function(res) {
                    console.log(res.data.openid)
                },
                fail: function() {
                    wx.request({
                      url: 'https://www.goooooo.top/api/index/getOpenid',
                     // url: 'https://goooo.imwork.net/api/index/getOpenid',
                      // url: 'https://51945597.qcloud.la/xiao/public/api/index/getOpenid',
                      data: {
                        code: res.code
                      },
                      header: {
                          'content-type': 'application/json'
                      },
                      success: function(res) {
                        console.log(res.data.openid)
                        var openid = res.data.openid
                        wx.setStorage({
                          key:"user",
                          data:res.data
                        })
                      }
                    })
                }
             })     
       
            }else {  
                console.log('获取用户登录态失败！' + res.errMsg)  
            }            

        }
      })
    }
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData:{
    userInfo: null
  }
})