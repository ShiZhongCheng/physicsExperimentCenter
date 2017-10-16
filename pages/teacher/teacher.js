Page({
  data: {
    limist_array: ['1', '2', '3', '4','5'],
    lim_index: 0,
    nowDate: null,
    phyNameArray: {},
    ex_array: {},
    index: 0,
    openid: null,
    myMesg: {},
    clRUHis: {},
    choose: {
      'list1': 'choosed',
      'list2': 'not-choosed',
      'list3': 'not-choosed',
      'list3': 'not-choosed',
      'list4': 'not-choosed'
    },
    bao_xiu_data: {},
    // 实时数据
    ssidc: null,
    ssarry: {},
  },
  list1: function (e) {
    // 启动加载
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var list1 = this.data.choose.list1;

    if (list1 != "choosed"){ 
      var myChoose = {
        "list1" : "choosed",
        "list2" : "not-choosed",
        "list3" : "not-choosed",
        "list4" : "not-choosed"
      }
      console.log("myChoose为：" + myChoose)
      this.setData({
        choose: myChoose
      })
    }
    // 数据刷新
    var that = this
    var openid = this.data.openid
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/classRoomUseHis',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 关闭加载
        wx.hideLoading()
        console.log("新数据"+res.data)
        that.setData({
          clRUHis: res.data
        })
      }
    })
  },
  list2: function (e) {
    // 启动加载
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var list2 = this.data.choose.list2;

    if (list2 != "choosed") {
      var myChoose = {
        "list1": "not-choosed",
        "list2": "choosed",
        "list3": "not-choosed",
        "list4": "not-choosed"
      }
      console.log("myChoose为：" + myChoose)
      this.setData({
        choose: myChoose
      })
    }
    // 获取时间戳
    var date = Date.parse(new Date()).toString();
    date = date.substr(0, 10);

    var nowDate =date;
    // 更新myMesg
    var that = this
    wx.getStorage({
      key: 'myMesg',
      success: function (rs) {
        // console.log(rs.data)
        that.setData({
          myMesg: rs.data,
          nowDate: nowDate
        })
      }
    })
    // 获取实验列表
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/exList', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 关闭加载
        wx.hideLoading()

        console.log(res.data)
        that.setData({
          ex_array: res.data
        })

        var i = res.data.length
        var length = res.data.length
        var phNmaeArr = new Array()
        for (;length>=1; length--){
          // phNmaeArr[i - length] = that.data.ex_array[i - length].phy_name
          var loc = i - length
          // 数组拼接
          phNmaeArr.splice(loc ,0, that.data.ex_array[i - length].phy_name )
        }
        console.log("phNmaeArr为：" + phNmaeArr)

        that.setData({
          phyNameArray: phNmaeArr
        })
      }
    })
  },
  list3: function (e) {
    // 启动加载
    wx.showLoading({
      title: '加载数据中',
      mask: true
    })
    var that = this
    var list3 = this.data.choose.list3;

    if (list3 != "choosed") {
      var myChoose = {
        "list1": "not-choosed",
        "list2": "not-choosed",
        "list3": "choosed",
        "list4": "not-choosed"
      }
      console.log("myChoose为：" + myChoose)
      that.setData({
        choose: myChoose
      })
    }
    // 获取报修记录
    wx.request({
      url: 'https://www.goooooo.top/api/teacher/getBaoXiuHis', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 关闭加载
        wx.hideLoading()

        console.log(res.data)
        that.setData({
          bao_xiu_data: res.data
        })
      }
    })
  },
  list4: function (e) {
    var list4 = this.data.choose.list4;

    if (list4 != "choosed") {
      var myChoose = {
        "list1": "not-choosed",
        "list2": "not-choosed",
        "list3": "not-choosed",
        "list4": "choosed"
      }
      console.log("myChoose为：" + myChoose)
      this.setData({
        choose: myChoose
      })
    }
  },
  // picker发生改变
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  limistPickerChange: function (e) {
    console.log('lim_index picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lim_index: e.detail.value
    })
  },
  // 使用教室提交按钮
  formSubmitUseCRoom: function (e) {
    // 获取表单数据
    var data = e.detail.value
    console.log(data)

    var useteacher = data.useteacher
    var phy_name = data.phy_name
    var ex_id = data.ex_id
    var limite = data.limite
    var Description = data.Description
    var phy_id = data.phy_id
    var openid = data.openid

    // request请求
    if (Description == '' || useteacher == '' || phy_name == '' || ex_id == '' || limite == '' || phy_id == ''){
      wx.showModal({
        title: '警告',
        showCancel: false,
        content: '请填写完整数据',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.request({
        url: 'https://www.goooooo.top/api/teacher/classRoomUse', 
        data: {
          useteacher: useteacher,
          phy_name: phy_name,
          ex_id: ex_id,
          limite: limite,
          Description: Description,
          phy_id: phy_id,
          openid: openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data = 1){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '教室使用成功！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({
                    url: '../teacher/teacher'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
  },
  // 详细信息
  xiangxiMesg: function(e){
    var mesg = e.target.dataset.mesg;
    wx.showModal({
      title: '详细信息',
      showCancel: false,
      content: mesg,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 确认报修
  sureBaoXiu: function(e) {
    var id = e.target.dataset.id;
    wx.showModal({
      title: '信息确认',
      content: "确认报修已经得到解决？",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 确认报修信息
          wx.request({
            url: 'https://www.goooooo.top/api/teacher/sureBaoXiu',
            data: {
              id: id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              if(res.data == 1){
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '确认报修成功！',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 新建实验
  newEx: function(e) {
    // 获取表单数据
    var data = e.detail.value
    console.log(data)

    var phy_name = data.phy_name
    var classroomnumber = data.classroomnumber
    if (phy_name == '' || classroomnumber==''){
      wx.showModal({
        title: '警告',
        showCancel: false,
        content: '请填写完整数据',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.request({
        url: 'https://www.goooooo.top/api/teacher/creatNewEx', 
        data: {
          phy_name: phy_name,
          classroomnumber: classroomnumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 2){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: "创建成功",
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: "创建失败",
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
  },
  // 统计
  setClipboardData: function(e){
    var phy_id = e.target.dataset.phyid;
    var ex_id = e.target.dataset.exid;
    var phy_name = e.target.dataset.phyname;
    var data = "https://www.goooooo.top/api/teacher/statistics?phy_name=" + phy_name + "&ex_id=" + ex_id + "&phy_id=" + phy_id;
    // 设置系统剪贴板的内容
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '已经复制链接，在浏览器上打开链接，即可下载统计表单',
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
      }
    })
  },
  // 教室端结束实验
  endEx: function(e){
    var phy_id = e.target.dataset.phyid;
    var ex_id = e.target.dataset.exid;
    wx.request({
      url: "https://www.goooooo.top/api/teacher/endEx?ex_id=" + ex_id + "&phy_id=" + phy_id, 
      data: {
        phy_id: phy_id,
        ex_id: ex_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 1){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '实验已经成功结束',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  // 实时情况
  shishiqk: function(e) {
    var phy_id = e.target.dataset.phyid;
    var ex_id = e.target.dataset.exid;
    var phy_name = e.target.dataset.phyname;
    wx.navigateTo({
      url: '../shishi/shishi?phy_id=' + phy_id + '&ex_id=' + ex_id + '&phy_name=' + phy_name
    })
  },
  onLoad: function (res) {
    // 启动加载
    wx.showLoading({
      title: '加载数据中',
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
          url: 'https://www.goooooo.top/api/teacher/classRoomUseHis', 
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
              clRUHis: res.data
            })
          }
        })
      }
    })
  }
})
