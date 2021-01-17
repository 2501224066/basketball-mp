import {
  teaList
} from '../../config/api'

Page({
  data: {
    imgPre: wx.getStorageSync('setting').img_pre,
    list: []
  },

  onLoad() {
    this.getData()
  },

  getData() {
    teaList().then(res => {
      this.setData({
        list: res.data.list
      })
    })
  },

  // 分享
  onShareAppMessage: function () {}
})