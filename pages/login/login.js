import {
  wxLogin
} from '../../config/api'

Page({
  data: {
    code: null
  },

  onShow() {
    if (wx.getStorageSync('loginStatus')) {
      wx.navigateBack()
    } else {
      this.login()
    }
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
          wx.setStorageSync('level', res.data.level)
          wx.showToast({
            icon: "success",
            title: '登陆成功',
            success() {
              if (!wx.getStorageSync('authStatus')) {
                wx.navigateTo({
                  url: '/pages/authorize/authorize',
                })
              }else{
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

  // 分享
  onShareAppMessage: function () {}
})