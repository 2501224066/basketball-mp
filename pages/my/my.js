import {
  switchSport,
  studentInfo,
  getLevel
} from '../../config/api'

Page({
  data: {
    loginStatus: null,
    userInfo: null,
    level: null,
    studentInfo: {},
    imgPre: null,
    kefuPhone: null,
    kefuWeixin: null,
    kefuEmail: null
  },

  onShow() {
    this.checkLogin()
  },

  // 检查登陆
  checkLogin() {
    if (!wx.getStorageSync('loginStatus')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.getLevel()
      this.setData({
        loginStatus: wx.getStorageSync('loginStatus'),
        userInfo: wx.getStorageSync('userInfo'),
        imgPre: wx.getStorageSync('setting').img_pre,
        kefuPhone: wx.getStorageSync('setting').kefu_phone,
        kefuWeixin: wx.getStorageSync('setting').kefu_weixin,
        kefuEmail: wx.getStorageSync('setting').kefu_email
      })
    }
  },

  // 用户身份
  getLevel() {
    getLevel().then(res => {
      this.setData({
        level: res.data.level
      })
      if (res.data.level == 1) {
        this.studentInfo()
      }
    })
  },

  // 学员信息
  studentInfo() {
    studentInfo().then(res => {
      this.setData({
        studentInfo: res.data
      })
    })
  },

  // 去请假
  toLeave() {
    wx.navigateTo({
      url: '/pages/leave/leave',
    })
  },

  // 去休课
  toRecess() {
    wx.navigateTo({
      url: '/pages/recess/recess',
    })
  },

  // 去球队
  toTeamDetail() {
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?id=' + this.data.studentInfo.team_id,
    })
  },

  // 退出登陆
  unLogin() {
    wx.removeStorageSync('loginStatus')
    wx.removeStorageSync('sportStatus')
    wx.removeStorageSync('userInfo')
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 去体测
  toTestData() {
    if(this.data.studentInfo.sport_num <= 0){
      wx.showToast({
        title: '暂无体测数据',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/testData/testData?id=' + this.data.studentInfo.user_id,
    })
  },

  // 去绑定
  toBind() {
    wx.navigateTo({
      url: '/pages/bind/bind',
    })
  },

  // 打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone
    })
  },

  // 复制微信
  copyWeixin() {
    wx.setClipboardData({
      data: this.data.kefuWeixin,
      success: function (res) {
        wx.showToast({
          title: '复制微信成功'
        })
      }
    })
  },

  // 复制邮箱
  copyEmail() {
    wx.setClipboardData({
      data: this.data.kefuEmail,
      success: function (res) {
        wx.showToast({
          title: '复制邮箱成功'
        })
      }
    })
  },

  // 分享
  onShareAppMessage: function () {}
})