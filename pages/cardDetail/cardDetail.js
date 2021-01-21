import {
  cardDetail,
  apply
} from '../../config/api'

const App = getApp();

Page({
  data: {
    id: null,
    detail: {},
    imgPre: null,
    iphoneFooter: App.globalData.iphoneFooter,
    cardCur: 0,
    swiperList: [],
  },

  onLoad(option) {
    this.setData({
      id: option.id,
      imgPre: wx.getStorageSync('setting').img_pre,
    })
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
      let obj = {
        card_id: this.data.id
      }
      apply(obj).then(res => {
        wx.showToast({
          icon: "success",
          title: '报名成功,等待客服与您联系',
        })
        // 刷新购买状态
        this.getData(this.data.id)
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