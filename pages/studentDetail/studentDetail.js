import {
  userDetail
} from '../../config/api'

Page({
  data: {
    userId: null,
    sportStatus: wx.getStorageSync('sportStatus'),
    imgPre: wx.getStorageSync('setting').img_pre,
    detail: {},
    cardCur: 0,
    swiperList: [],
    video: []
  },

  onLoad(options) {
    this.setData({
      userId: options.id
    })
    this.getData(options.id)
  },

  getData(id) {
    let obj = {
      id: id
    }
    userDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        swiperList: res.data.user_img,
        video: res.data.user_video
      })
    })
  },

  // 轮播参数
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },

  // 轮播参数
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  // 去体测报告
  toTestData() {
    wx.navigateTo({
      url: '/pages/testData/testData?id=' + this.userId,
    })
  },

  // 分享
  onShareAppMessage: function () {}
})