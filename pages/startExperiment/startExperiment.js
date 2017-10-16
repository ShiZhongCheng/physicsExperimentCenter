var app = getApp()
Page({
    data: {
        yqid: null,
        openid: null,
        myMesg: {},
        userInfo: {},
        rs: {},
        bianhao: null,
        sum: null,
        iSure: null,
        bk: null
    },
    iSure: function(e){
        var yqid=e.target.dataset.yqid;
        var openid=e.target.dataset.openid;
        var name=e.target.dataset.name;
        var ex_id=e.target.dataset.ex_id;
        var classroomnumber=e.target.dataset.classroomnumber;
        var bianhao=e.target.dataset.bianhao;
        var sum=e.target.dataset.sum;
        var limite=e.target.dataset.limite;
        var fId = e.detail.formId;
        var useteacher = e.target.dataset.useteacher;
        var phy_name = e.target.dataset.phy_name;

        // console.log(name);
        if(sum < limite){
            wx.request({
                // url: 'https://goooo.imwork.net/api/index/recondMesg',
                url: 'https://www.goooooo.top/api/index/recondMesg',
                data: {
                yqid: yqid,
                openid: openid,
                name: name,
                ex_id: ex_id,
                classroomnumber: classroomnumber,
                bianhao: bianhao,
                sum: sum,
                fId: fId,
                useteacher: useteacher,
                phy_name: phy_name
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function(re) {
                    console.log(re.data);
                    wx.showModal({
                        title: '提示',
                        content: '仪器使用成功，你的实验开始时间为'+re.data,
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
            });
        }else{
            wx.showModal({
                title: '提示',
                content: '人数已经达到限制！',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.switchTab({
                            url: '../index/index'
                        })
                    }else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })

        }
    },
    onLoad: function(res){
        var that = this
        console.log(res.yqid)
        // 获取实验信息
        wx.request({
          url: 'https://www.goooooo.top/api/index/getUseMesg',
            //url: 'https://51945597.qcloud.la/xiao/api/index/getUseMesg',
            data: {
              yqid: res.yqid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(re) {
              console.log(re.data);
              if(re.data=='0'){
                  wx.showModal({
                    title: '提示',
                    content: '此实验还未开始！',
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
              }else{
                    that.setData({
                        rs: re.data.rs[0],
                        bianhao: re.data.bianhao,
                        sum: re.data.sum
                    })
                    if(re.data.sum < re.data.rs[0].limite){
                        that.setData({
                            iSure: '确定',
                            bk: '#80BEF7'
                        })
                    }else{
                        that.setData({
                            iSure: '不可用',
                            bk: '#aaa'
                        })
                    }
              }
            }
        });
        //更新数据yqid
        this.setData({
          yqid: res.yqid
        });
        // 更新数据openid
        wx.getStorage({
            key: 'user',
            success: function(rs) {
                // console.log(rs.data)
                that.setData({
                    openid: rs.data.openid
                })
            } 
        });
        // 更新数据myMesg
         wx.getStorage({
            key: 'myMesg',
            success: function(rs) {
                // console.log(rs.data)
                 that.setData({
                    myMesg: rs.data
                 })
            } 
        });
        //更新数据userInfo
        this.setData({
            userInfo:app.globalData.userInfo
        })
    }
})