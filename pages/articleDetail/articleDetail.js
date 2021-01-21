import {
  articleDetail
} from '../../config/api'

Page({
  data: {
    imgPre: null,
    detail: {},
    content: ''
  },

  onLoad(option) {
    this.getData(option.id)
  },

  onShow() {
    this.setData({
      imgPre: wx.getStorageSync('setting').img_pre
    })
  },

  getData(id) {
    let obj = {
      id: id
    }
    articleDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        content: res.data.post_content.replace('<img', '<img style="width:100%;border-radius: 8px;" ')
      })
    })
  },

  // 分享
  onShareAppMessage: function () {}
})