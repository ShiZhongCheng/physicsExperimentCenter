// chome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgimg: null,
    myMesg: null,
    user: null,
    course_data: null,
    finishedVideo: '',
  },

  bindblur: function (e){
    var that = this
    var class_number = e.detail.value
    // 进行修改
    wx.request({
      url: 'https://www.goooooo.top/api/index/addMyClassNumber', 
      data: {
        class_number: class_number,
        openid: that.data.user.openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 更新本地myMesg数据
        wx.setStorage({
          key: "myMesg",
          data: res.data[0]
        })
        // 更改页面myMesg
        var myMesg = that.data.myMesg
        myMesg.class_number = class_number
        that.setData({
          myMesg: myMesg
        })
        // 显示提示
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  // 跳转到课程内容
  gotoCourse: function (e) {
    wx.navigateTo({
      url: '../course_content/course_content?phy_id=' + e.currentTarget.dataset.phy_id + '&video_url=' + e.currentTarget.dataset.video_url + '&explain_people=' + e.currentTarget.dataset.explain_people + '&img_url=' + e.currentTarget.dataset.img_url + '&phy_movie_leng=' + e.currentTarget.dataset.phy_movie_leng, 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'myMesg',
      success: function (res) {
        console.log(res.data)
        that.setData({
          myMesg: res.data
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data)
        that.setData({
          user: res.data
        })
        // 获取已经观看视频数据
        wx.request({
          url: 'https://www.goooooo.top/api/index/getFinishedVideo',
          data: {
            openid: res.data.openid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              finishedVideo: res.data
            })
          }
        })
      }
    })

    // 获取背景图
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getImgData',
      data: {
        TYPE: "chomebg"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          bgimg: res.data,
        })
      }
    })

    // 获取课程数据
    wx.request({
      url: 'https://www.goooooo.top/api/index/getAllEx',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          course_data: res.data
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