import {
  cardList,
  apply
} from '../../config/api'

Page({
  data: {
    imgPre: null,
    list: []
  },

  onLoad() {
    this.getData()
  },

  getData() {
    cardList().then(res => {
      this.setData({
        list: res.data.list,
        imgPre: wx.getStorageSync('setting').img_pre
      })
    })
  },

  // 去课时卡详情
  toCardDetail(e) {
    wx.navigateTo({
      url: '/pages/cardDetail/cardDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  // 报名
  buy(e) {
    console.log(e)
    if (wx.getStorageSync('loginStatus')) {
      let obj = {
        card_id: e.currentTarget.dataset.id
      }
      apply(obj).then(res => {
        wx.showToast({
          icon: "success",
          title: '报名成功,等待客服与您联系',
        })
        wx.switchTab({
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