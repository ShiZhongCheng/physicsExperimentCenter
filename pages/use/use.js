var app = getApp()
Page({
    data: {
        yqid: null,
        animationData: {}
    },
    startEx: function(e){
      var yqid = this.data.yqid
        wx.redirectTo({
          url: '../startExperiment/startExperiment?yqid='+yqid
        })
    },
    baoXiu: function(e){
      var yqid = this.data.yqid
        wx.redirectTo({
          url: '../baoxiu/baoxiu?yqid='+yqid
        })
    },
    askTeacherHelp: function(e){
      var yqid = this.data.yqid
      wx.request({
        url: 'https://www.goooooo.top/api/index/askTeacherHelp', 
        data: {
          yqid: yqid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if(res.data == 0){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '此实验尚未开始',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '呼叫老师成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    },
    onShow: function () {
      var that = this
      var n = 0
      var scal = 0
      setInterval( function () {
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        })
        this.animation = animation
        animation.rotate(180 * n).step()
        that.setData({
          animationData: animation.export()
        })
        n++
      }, 700)
    },
    onLoad: function(res){
        console.log(res.yqid)
        this.setData({
          yqid: res.yqid
        })
    }
})