import {
  editUserInfo
} from '../../config/api'

Page({
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        // 存储用户信息
        wx.setStorageSync('userInfo', {
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          phone: wx.getStorageSync('userInfo').phone
        })

        let obj = {
          user_nickname: res.userInfo.nickName,
          user_img: res.userInfo.avatarUrl
        }
        editUserInfo(obj).then(res => {
          wx.setStorageSync('authStatus', true)
          wx.showToast({
            icon: "success",
            title: '授权成功',
            success() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        })
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
