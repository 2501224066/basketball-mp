import {
  wxLogin
} from '../../config/api'

Page({
  data: {
    agree: false,
    code: null
  },

  onShow() {
    if (wx.getStorageSync('loginStatus')) {
      wx.navigateBack()
    } else {
      this.login()
    }
  },

  // 去协议
  toTreaty(){
    wx.navigateTo({
      url: '/pages/treaty/treaty',
    })
  },

   // 同意协议
   agree() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 提示同意协议
  noAgree() {
    wx.showToast({
      title: '请先同意协议',
      icon: "none"
    })
  },

  // 登陆
  login() {
    var that = this
    // 获取code
    wx.login({
      success(res) {
        that.setData({
          code: res.code
        })
      }
    })
  },

  // 获取手机号
  getPhoneNumber(e) {
    // 拒绝授权
    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      return false
    }

    var that = this
    wx.checkSession({
      success() {
        var obj = {
          code: that.data.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }
        wxLogin(obj).then(res => {
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userInfo', {
            nickName: res.data.user_nickname,
            avatarUrl: res.data.user_headimgurl,
            phone: res.data.user_phone
          })
          wx.setStorageSync('sportStatus', res.data.sport_atatus)
          wx.setStorageSync('loginStatus', true)
          wx.showToast({
            icon: "success",
            title: '登陆成功',
            success() {
              if (!wx.getStorageSync('authStatus')) {
                wx.navigateTo({
                  url: '/pages/authorize/authorize',
                })
              } else {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          })
        })
      },
      fail() {
        that.login()
      }
    })
  },

  // 去首页
  toIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 分享
  onShareAppMessage: function () {}
})