import {
  BASE_URL
} from './constant.js'

const go = function (obj) {
  wx.showLoading({
    title: '加载中',
    duration: 2000,
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + obj.url,
      method: obj.method,
      data: obj.data,
      header: {
        'Authorization': wx.getStorageSync('token') || '',
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code === 200) {
          resolve(res.data)
          wx.hideLoading() //隐藏loading
        } else if (res.data.code === 202) {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2000,
          })
          // 退出登陆
          wx.removeStorageSync('loginStatus')
          wx.removeStorageSync('sportStatus')
          wx.removeStorageSync('level')
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 2000,
          })
        }
      },
      fail: function () {
        reject()
        wx.showToast({
          icon: 'none',
          title: '网络请求超时，请退出重试',
          duration: 4000,
        })
      }
    })
  })
}

module.exports = {
  go
}