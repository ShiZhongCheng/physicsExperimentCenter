Page({
  data: {
    openid: null,
    myUseHistory: [
      // "1","2","3","4"
    ]
  },
  onLoad: function (res) {
    // 启动加载
    wx.showLoading({
      title: '正在加载数据',
      mask: true
    })
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (rs) {
        // console.log(rs.data)
        that.setData({
          openid: rs.data.openid
        })

        wx.request({
          url: 'https://www.goooooo.top/api/index/showMyEx', //仅为示例，并非真实的接口地址
          data: {
            openid: rs.data.openid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // 关闭加载
            wx.hideLoading()
            console.log(res.data)
            that.setData({
              myUseHistory: res.data
            })
          }
        })
      }
    })
  }
})