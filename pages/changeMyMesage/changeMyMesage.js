
Page({
  data: {
    userMeg: null,
    openid: null,
  },
  changeHeaderImg: function(e){
    var that = this
    wx.chooseImage({
      success: function (res) {
        var img = res.tempFilePaths[0];
        // 上传
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
          wx.uploadFile({
            url: 'https://www.goooooo.top/api/index/subshow_upload',
            filePath: img,
            name: 'imgFile',
            formData: {
              'userID': that.data.userMeg.id,
            },
            success: function (res) {
              if (res.statusCode != 200) {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            },
            complete: function () {
              var openid = that.data.openid
              // 重新获取数据
              getMyMesg(openid);
            }
          })
      }
    })
  },

  // 文字修改时跳转
  changeJump: function (e){
    var ctype = e.currentTarget.dataset.ctype;
    // 跳转
    navigateTo(ctype);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  onPullDownRefresh: function () {
    var that = this
    // 启动加载
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://www.goooooo.top/api/index/getMyMesg',
      data: {
        openid: that.data.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: "myMesg",
          data: res.data[0]
        })
        that.setData({
          userMeg: res.data[0]
        })
        wx.hideToast();  //隐藏Toast
        wx.stopPullDownRefresh()
      }
    })
  },

  onLoad: function (res) {
    var that = this
    // 更新数据myMesg
    wx.getStorage({
      key: 'myMesg',
      success: function (rs) {
        // console.log(rs.data)
        that.setData({
          userMeg: rs.data,
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        var openid = res.data.openid
        that.setData({
          openid: openid
        })
      }
    })
  }
})
// 跳转函数
function navigateTo(ctype){
  wx.navigateTo({
    url: 'changeEdit/changeEdit?ctype='+ctype
  })
}
// 重新获取数据函数
function getMyMesg(openid ){
  wx.request({
    url: 'https://www.goooooo.top/api/index/getMyMesg',
    data: {
      openid: openid
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.setStorage({
        key: "myMesg",
        data: res.data[0]
      })
      wx.redirectTo({
        url: '../changeMyMesage/changeMyMesage'
      })
      wx.hideToast();  //隐藏Toast
    }
  })
}

