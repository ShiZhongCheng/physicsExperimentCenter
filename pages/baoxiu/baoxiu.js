var app = getApp()
Page({
  data: {
    userInfo: {},
    openid: null,
    yqid: null,
    myMesg:{},
    message: null,
    display1: 'block',
    display2: 'none'
  },
  formSubmit: function(e) {
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data )
    reQuest(data.name,data.phoneNumber,data.message,data.yqid,data.openid)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  bindfocus: function(e){
     console.log(e.detail.value)
     this.setData({
      display1: 'none',
      display2: 'block'
    })
  },
  bindconfirm: function(e){
    this.setData({
      display2: 'none',
      display1: 'block',
      message: e.detail.value
    })
  },
  bindblur: function(e){
    this.setData({
      display2: 'none',
      display1: 'block',
      message: e.detail.value
    })
  },
  onLoad: function (res) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        yqid: res.yqid
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
       wx.getStorage({
        key: 'myMesg',
        success: function(res) {
             that.setData({
                myMesg:res.data
              })
        }
      })
   }
})
function reQuest(name,phoneNumber,message,yqid,openid){
  wx.request({
    //url: 'https://goooo.imwork.net/api/index/baoXiu', 
    url: 'https://www.goooooo.top/api/index/baoXiu',
    data: {
      name: name,
      message: message,
      phonenumber: phoneNumber,
      yqid: yqid,
      openid: openid
    },
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      if(res.data=='1'){
         wx.showModal({
            title: '提示',
            content: '报修成功！',
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