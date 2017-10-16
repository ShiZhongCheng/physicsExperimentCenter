// course_content.js
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  inputValue: '',
  data: {
    user: '',
    src: '',
    explain_people: null,
    img_url: null,
    phy_id: '',
    currentTime: '',
    durations: null,
    experiment_info: '',
    danmuList: '',
    setInt: '',
    ifOk: 0,
    nowNumber: 0,
    idx: 0,
    videoDisplay: "block",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var phy_id = options.phy_id
    that.setData({
      src: "https://www.goooooo.top/" + options.video_url,
      img_url: options.img_url,
      explain_people: options.explain_people,
      phy_id: phy_id,
      durations: options.phy_movie_leng,
    })

    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data)
        that.setData({
          user: res.data
        })
      }
    })

    // 获取视频长度
    // wx.request({
    //   url: 'https://www.goooooo.top/api/index/getMovieLeng',
    //   data: {
    //     phy_id: that.data.phy_id
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     var durations = res.data.phy_movie_leng
    //     that.setData({
    //       durations: durations,
    //       experiment_info: res.data,
    //     })
    //   }
    // })

    // 获取弹幕数据
    wx.request({
      url: 'https://www.goooooo.top/api/index/getDanMu',
      data: {
        phy_id: that.data.phy_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var danmu = res.data
        that.setData({
          danmuList: danmu
        })
      }
    })
  },

  // 当播放时
  bindplay: function (e){
    var that = this
    var ifOk = '';
    var nowNumber = that.data.nowNumber  
    var durations = that.data.durations
    var setInt = setInterval( function (){
      nowNumber++ 
      ifOk = parseInt( Math.floor((nowNumber / durations)*100 )/100 * 100 );
      // console.log("测试:" + ifOk)
      that.setData({
        ifOk: ifOk,
        nowNumber: nowNumber,
      })
      },1000)
    that.setData({
      setInt: setInt
    })
  },

  // 当暂停时
  bindpause: function (){
    var that = this
    var setInt = that.data.setInt
    clearInterval(setInt)
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindtimeupdate: function(e){
    var that = this
    that.setData({
      currentTime: e.detail.currentTime,
    })
    // 当ifOk = 100 时
    if( that.data.ifOk >= 100 ){
      var that = this
      var setInt = that.data.setInt
      clearInterval(setInt)
    }
    // 看视频时间达到要求时
    if ( that.data.ifOk >= 90 && that.data.idx ==0 ){
      that.setData({
        idx: 1,
        videoDisplay: "none",
      })
      this.videoContext.pause();
      // 向后台记录
      wx.request({
        url: 'https://www.goooooo.top/api/index/achieveTime', 
        data: {
          openid: that.data.user.openid,
          phy_id: that.data.phy_id,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
  },

  // 弹窗隐藏
  tanChanHiden: function(){
    var that = this
    that.setData({
      idx: 2,
      videoDisplay: "block",
    })
    this.videoContext.play();
  },

  bindSendDanmu: function () {
    var that = this
    var color = getRandomColor()
    that.videoContext.sendDanmu({
      text: this.inputValue,
      color: color
    })
    if (this.inputValue!= ""){
      // 存入数据库
      wx.request({
        url: 'https://www.goooooo.top/api/index/saveDanMu',
        data: {
          text: this.inputValue,
          color: color,
          time: that.data.currentTime,
          phy_id: that.data.phy_id,
          announcer: that.data.user.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
  },

  // 开关选择器
  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if ( e.detail.value ){
      this.videoContext.play();
    }else{
      this.videoContext.pause();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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
    var that = this
    var setInt = that.data.setInt
    clearInterval(setInt)
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