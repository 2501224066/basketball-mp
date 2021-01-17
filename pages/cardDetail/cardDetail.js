import {
  cardDetail,
  apply
} from '../../config/api'

const App = getApp();

Page({
  data: {
    detail: {},
    imgPre: wx.getStorageSync('setting').img_pre,
    iphoneFooter: App.globalData.iphoneFooter,
    cardCur: 0,
    swiperList: [],
  },

  onLoad(option) {
    this.getData(option.id)
  },

  getData(id) {
    let obj = {
      id: id
    }
    cardDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        swiperList: [res.data.card_in_img]
      })
    })
  },

  // 报名
  buy() {
    if (wx.getStorageSync('loginStatus')) {
      apply().then(res => {
        wx.showToast({
          icon: "success",
          title: '报名成功,等待客服与您联系',
        })
        wx.navigateTo({
          url: '/pages/card/card',
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  // 分享
  onShareAppMessage: function () {}
})