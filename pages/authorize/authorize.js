import {
  editUserInfo
} from '../../config/api'

Page({
  bindGetUserInfo(e) {
    // 存储用户信息
    wx.setStorageSync('userInfo', {
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl,
      phone: wx.getStorageSync('userInfo').phone
    })

    let obj = {
      user_nickname: e.detail.userInfo.nickName,
      user_img: e.detail.userInfo.avatarUrl
    }
    editUserInfo(obj).then(res => {
      wx.setStorageSync('authStatus', true)
      wx.showToast({
        icon: "success",
        title: '授权成功',
        success() {
          wx.switchTab({
            url: '/pages/my/my'
          })
        }
      })
    })
  },

  // 分享
  onShareAppMessage: function () {}
})