var app = getApp()
Page({
    data: {
        mybg: null,
        userInfo: {},
        myMesg: {}
    },
    changeMyMesage: function (e) {
      // var yqid = e.target.dataset.yqid
      wx.navigateTo({
        url: '../changeMyMesage/changeMyMesage'
      })
    },
    showMyEx: function (e) {
      // var yqid = e.target.dataset.yqid
      wx.navigateTo({
        url: '../showMyEx/showMyEx'
      })
    },
    imTeacher: function (e) {
      // var role = e.target.dataset.role;
      var role = this.data.myMesg.role;
      console.log("role为："+role)
      if ( role!= 1){
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '你不是教师不能使用此功能！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showToast({
          title: '教师验证成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success: function (){
            wx.navigateTo({
              url: '../teacher/teacher'
            })
          }
        })
      }
    },
    ImAdministrator: function (e) {
      // var role = e.target.dataset.role;
      var role = this.data.myMesg.role;
      console.log("role为：" + role)
      if (role != 1 && role != 2) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '你不是管理员不能使用此功能！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.showToast({
          title: '管理员验证成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success: function () {
            wx.navigateTo({
              url: '../admin/administrator/administrator'
            })
          }
        })
      }
    },
    onPullDownRefresh: function () {
      // Do something when pull down.
      this.onLoad();
      wx.stopPullDownRefresh()
    },
    onLoad: function (res) {
        var that = this
        //调用应用实例的方法获取全局数据
        // 更新数据myMesg
        wx.getStorage({
          key: 'myMesg',
          success: function (rs) {
            // console.log(rs.data)
            that.setData({
              myMesg: rs.data
            })
          }
        })
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo,
            })
        })
        // 获取背景图
        wx.request({
          url: 'https://www.goooooo.top/api/teacher/getImgData',
          data: {
            TYPE: "mybg"
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              mybg: res.data,
            })
          }
        })
   }
})