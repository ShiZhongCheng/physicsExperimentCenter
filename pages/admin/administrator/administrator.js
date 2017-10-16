// admin.js
Page({
  data: {
    dynamic_data: null,
    user_data: null,
    dynamic_data: null,
  },
  newdisplay: function (e) {
    wx.navigateTo({
      url: '../newdisplay/newdisplay'
    })
  },
  // 文章展示
  display: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../display/display?id=' + id
    })
  },
  getRoleData: function(e){
    var role = e.currentTarget.dataset.role
    console.log(role)
    wx.navigateTo({
      url: '../roleShow/roleShow?role=' + role
    })
  },
  conLine: function(e){
    var id = e.target.dataset.id;
    var tp = e.target.dataset.tp;

    var that = this
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/changeDynamicStatus',
      data: {
        id: id,
        tp: tp,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if ( res.data[0].res == 1){
          that.setData({
            dynamic_data: res.data
          })
        }
      }
    })
  },
  onLoad: function (res) {
    // 启动加载
    wx.showLoading({
      title: '正在加载数据',
      mask: true
    })

    var that = this
    // 获取动态数据
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getDynamicAdmin', 
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          dynamic_data: res.data
        })
      }
    })
    // 获取人数数据
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getUserNumber',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 关闭加载
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          user_data: res.data
        })
      }
    })
  }
});