var app = getApp()
Page({
  data: {
    userInfo: {},
    openid: null,
  },
  formSubmit: function(e) {
    var that = this
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data )
    reQuest(data.name, data.studentId, data.phoneNumber, data.openid, that.data.userInfo.nickName, that.data.userInfo.avatarUrl)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
   onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      })

      wx.getStorage({
        key: 'user',
        success: function(res) {
            var openid = res.data.openid
             that.setData({
                openid:openid
              })
        }
      })
   }
})
function reQuest(name, studentId, phoneNumber, openid, nickname, headImageUrl){
  if (name != '' && studentId != '' && phoneNumber != '' && openid != '' && nickname != '' && headImageUrl != ''){
    wx.request({
      url: 'https://www.goooooo.top/api/index/studentInput',
      data: {
        name: name,
        studentId: studentId,
        phonenumber: phoneNumber,
        openid: openid,
        nickname: nickname,
        headImageUrl: headImageUrl
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        if(res.data=='1'){
          wx.showModal({
              title: '提示',
              content: '信息录入成功！',
              showCancel: false,
              success: function(res) {
                  if (res.confirm) {
                      console.log('用户点击确定')
                      wx.switchTab({
                          url: '../index/index'
                      })
                  }
              }
          })
        }
      }
    })
  }
}