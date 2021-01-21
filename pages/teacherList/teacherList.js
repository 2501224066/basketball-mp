import {
  teaList
} from '../../config/api'

Page({
  data: {
    imgPre: null,
    list: []
  },

  onShow() {
    this.setData({
      imgPre: wx.getStorageSync('setting').img_pre,
    })
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