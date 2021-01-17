import {
  setCourse
} from '../../config/api'

Page({
  data: {
    text: null,
    startDate: null,
  },

  onLoad() {
    this.getNowTime()
  },

  // 当天日期
  getNowTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };
    this.setData({
      startDate: year + '-' + month + '-' + day,
      endDate: year + '-' + month + '-' + day
    })
  },

  // 输入文本
  text(e) {
    this.setData({
      text: e.detail.value
    })
  },

  // 选择时间
  startDate(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  // 选择时间
  endDate(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  // 提交
  submit() {
    let obj = {
      start_date: this.data.startDate,
      end_date: this.data.endDate,
      Course: this.data.text
    }
    setCourse(obj).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: "success",
        success() {
          wx.navigateBack()
        }
      })
    })
  },

  // 分享
  onShareAppMessage: function () {}
})