// newdisplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgalist: "https://www.goooooo.top/static/images/need/upload.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var title = e.detail.value.title;
    var src = this.data.imgalist;
    console.log( src );
    var content = e.detail.value.content;
    var announcer = e.detail.value.announcer;
    if (title == "" || content == "" || announcer == ""){
      wx.showModal({
        title: '提示',
        content: '内容未填写完！',
        showCancel: false
      })
    }

    wx.request({
      url: 'https://www.goooooo.top/api/index/publishDynamic',
      data: {
        title: title,
        content: content,
        announcer: announcer,
        img: src,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '发布成功！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '../administrator/administrator'
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
  formReset: function () {
    console.log('form发生了reset事件')
  },

  previewImage: function (e) {
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
          url: 'https://www.goooooo.top/static/kindeditor/php/myupload_json.php', 
          filePath: img,
          name: 'imgFile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res);
            console.log( res.data );
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var url = "https://www.goooooo.top" + res.data
            // 数据绑定 显示出来
            that.setData({
              imgalist: url
            })
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast();  //隐藏Toast
          }
        })
      }
    })
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})