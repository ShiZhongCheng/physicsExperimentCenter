Page({
  data: {
    phy_name: null,
    phy_id: null,
    ex_id: null,
    arry: {},
    dataarr: {},
    add: 1,
    // request获取到的数据
    redata: {},
    display: "none",
    bianhao: null,
    stopSetInt: null,
    // 通告栏信息
    warmingInt: null,
    warmingData: {}
  },
  setbianhao: function(e) {
    var bianhao = e.target.dataset.bianhao;
    this.setData({
      bianhao: bianhao,
      display: "block"
    })
  },
  closeFullScreen: function(e){
    this.setData({
      display: "none"
    })
  },
  // 个人实验结束
  endPeople: function(e){
    var that = this
    wx.showModal({
      title: '提示',
      showCancel: true,
      content: "确定此学生已经完成实验？",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var openid = e.target.dataset.openid;
          var phy_id = that.data.phy_id;
          var ex_id = that.data.ex_id;
          console.log(openid+"/" + phy_id+"/" + ex_id)
          wx.request({
            url: 'https://www.goooooo.top/api/teacher/endPeople',
            data: {
              openid: openid,
              phy_id: phy_id,
              ex_id: ex_id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              if (res.data == 0) {
                var entTime = '为学生结束实验失败';
              } else {
                var entTime = "结束时间为:" + res.data;
              }
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: entTime,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 返回上一页
  navigateBack: function(e) {
    var int = this.data.stopSetInt
    var warmInt = this.data.warmingInt
    // 停止5秒刷新
    clearInterval(int)
    // 停止通告刷新
    clearInterval(warmInt)
    wx.redirectTo({
      url: '../teacher/teacher'
    })
  },
  onUnload: function(e){
    var int = this.data.stopSetInt
    var warmInt = this.data.warmingInt
    // 停止5秒刷新
    clearInterval(int)
    // 停止通告刷新
    clearInterval(warmInt)
    wx.redirectTo({
      url: '../teacher/teacher'
    })
  },
  onLoad: function (res) {
    // 启动加载
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this
    // 获取页面传递过来的参数
    that.setData({
      phy_name: res.phy_name,
      phy_id: res.phy_id,
      ex_id: res.ex_id
    })

    // 通知信息的获取
    var warmingInt = setInterval(function () {
      console.log("0.5分钟刷新一次")
      wx.request({
        url: 'https://www.goooooo.top/api/teacher/getAskHelp', 
        data: {
          phy_id: res.phy_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (re) {
          console.log(re.data)
          that.setData({
            warmingData: re.data
          })
        }
      })
    }, 30000)
    that.setData({
      warmingInt: warmingInt
    })

    // 获取后台数据
    var stopSetInt = setInterval(function(){
      console.log("5秒刷新一次")
      wx.request({
        url: 'https://www.goooooo.top/api/teacher/shishi', 
        data: {
          phy_id: res.phy_id,
          ex_id: res.ex_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 0){
            console.log("获取数据失败")
          }else{
            // 关闭加载
            wx.hideLoading()

            that.setData({
              redata: res.data
            })
            // 获取到数据后
            var ar = {}
            var dataar = {}
            var index = 0

            // 将redata赋值给其他数组
            // var mysqlData = res.data
            // // console.log(mysqlData)
            // // redata数组的长度
            // var lon1 = mysqlData.length
            // var lon2 = mysqlData.length
            // console.log(lon1)
            // var mtdata = {}
            // for (; lon1 >= 1; lon1--) {
            //   var hao1 = parseInt(mysqlData[lon1 - 1].bianhao);
            //   mtdata[hao1] = {}
            // }

            // var mtlon = mtdata.length
            // for(; mtlon>=1; mtlon--){
            //   for (; lon2 >= 1; lon2--) {
            //     var lingshi = new Array()
            //     if (hao == parseInt(mysqlData[lon2 - 1].bianhao))
            //       lingshi.splice(-1, 0, mysqlData[lon2 - 1])
            //   }
            // }
            // console.log(mtdata)

            // 将redata赋值给其他数组
            var mysqlData = res.data
            console.log(mysqlData)
            // redata数组的长度
            var lon = mysqlData.length
            var biaji = new Array(lon);
            // 初始化
            for(var i= 50; i>=1; i--){
              biaji[i]=0;
            }
            // 遍历redata
            for (; lon >= 1; lon--) {
              var bianhao = parseInt( mysqlData[lon - 1].bianhao );
              biaji[bianhao]++;
            }
            console.log(biaji)

            for (; index < 50; index++) {
              ar[index] = index + 1;
              var dar = {
                // 'data': {},
                'bgcolor': null,
                'textcolor': null
              }
              if ( biaji[index + 1] > 0) {
                // dar["data"] = "1";
                dar["bgcolor"] = "red";
                dar["textcolor"] = "#fff";
              } else {
                // dar["data"] = "";
                dar["bgcolor"] = "#fff";
                dar["textcolor"] = "#000";
              }
              dataar[index] = dar
            }
            console.log(dataar)
            that.setData({
              arry: ar,
              dataarr: dataar
            })
            // 获取到数据的操作
          }
        }
      })
    }, 5000)
    that.setData({
      stopSetInt: stopSetInt
    })
  }
})