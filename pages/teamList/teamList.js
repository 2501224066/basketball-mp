import {
  teamList
} from '../../config/api'

Page({
  data: {
    imgPre: null,
    list: [],
    page: 1,
    pageSize: 15
  },

  onShow() {
    this.setData({
      page: 1,
      imgPre: wx.getStorageSync('setting').img_pre,
    })
    this.getData()
  },

  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    teamList(obj).then(res => {
      if (addStatus) {
        this.setData({
          list: this.data.list.concat(res.data.list),
          page: this.data.page + 1
        })
      } else {
        this.setData({
          list: res.data.list,
          page: this.data.page + 1
        })
      }
    })
  },

  // 加载更多
  onReachBottom() {
    this.getData(true)
  },

  // 去球队详情
  toTeamDetail(e) {
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  // 分享
  onShareAppMessage: function () {}
})