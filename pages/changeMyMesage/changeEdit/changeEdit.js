// pages/changeMyMesage/changeEdit/changeEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctype: null,
    text: null,
    shutype: null,
    focus: true,
    openid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    switch (options.ctype){
      case "nickname": 
        var text = "昵称";
        var shutype = "text";
        break;
      case "name":
        var text = "名字";
        var shutype = "text";
        break;
      case "studentID":
        var text = "学号";
        var shutype = "number";
        break;
      case "phonenumber":
        var text = "电话号码";
        var shutype = "number";
        break;
      case "class_number":
        var text = "班级";
        var shutype = "number";
        break;
    }
    that.setData({
      ctype: options.ctype,
      text: text,
      shutype: shutype,
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
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  formSubmit: function (e) {
    var value = e.detail.value.value;
    if (value == ""){
      return 0;
    }
    var ctype = this.data.ctype;
    var openid = this.data.openid;
    // 保存到数据库
    HttpRequest(value, ctype, openid);
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

function HttpRequest(value, ctype, openid){
  wx.request({
    url: 'https://www.goooooo.top/api/index/studentMesgChange', 
    data: {
      value: value,
      ctype: ctype,
      openid: openid,
    },
    header: {
      'content-type': 'application/json' 
    },
    success: function (res) {
      wx.navigateBack({
        delta: 1
      })
    }
  })
}