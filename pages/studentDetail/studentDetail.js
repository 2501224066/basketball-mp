import {
  userDetail
} from '../../config/api'

Page({
  data: {
    userId: null,
    sportStatus: false,
    imgPre: null,
    detail: {},
    cardCur: 0,
    swiperList: [],
    video: [],
    videoShow: wx.getStorageSync('setting').video_switch,
  },

  onLoad(options) {
    this.setData({
      userId: options.id,
      sportStatus: wx.getStorageSync('sportStatus'),
      imgPre: wx.getStorageSync('setting').img_pre,
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
    if (this.data.detail.sport_num <= 0) {
      wx.showToast({
        title: '暂无体测数据',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/testData/testData?id=' + this.data.userId,
    })
  },

  // 分享
  onShareAppMessage: function () {}
})