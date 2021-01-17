import {
  bindStudent,
  smsBind
} from '../../config/api'


Page({
  data: {
    phone: null,
    code: null,
    time: 0
  },

  // 手机号
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 验证码
  code(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 绑定
  bind() {
    let obj = {
      user_tel: this.data.phone,
      code: this.data.code
    }
    bindStudent(obj).then(res => {
      wx.showToast({
        icon: 'success',
        title: '绑定成功',
        success() {
          wx.navigateBack()
        }
      })
      this.setData({
        time: 60
      })
      this.timeDown()
    })
  },

  // 时间减少
  timeDown() {
    var that = this
    if (that.data.time > 0) {
      setTimeout(function () {
        that.setData({
          time: that.data.time - 1
        })
        that.timeDown()
      }, 1000)
    }
  },

  // 发送验证码
  smsCode() {
    if (!this.data.phone) {
      wx.showToast({
        icon: 'none',
        title: '请先填写学员手机号',
      })
      return false
    }

    if (this.data.time > 0) {
      wx.showToast({
        icon: 'none',
        title: '发送过于频繁',
      })
      return false
    }

    let obj = {
      user_tel: this.data.phone
    }
    smsBind(obj).then(res => {
      wx.showToast({
        icon: 'success',
        title: '发送成功',
      })
    })
  },

  // 分享
  onShareAppMessage: function () {}
})