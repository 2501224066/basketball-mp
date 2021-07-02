import {
  articleList
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
      page: 1
    })
    this.getData()
    this.setData({
      page: 1,
      imgPre: wx.getStorageSync('setting').img_pre,
    })
  },

  getData(addStatus = false) {
    let obj = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    articleList(obj).then(res => {
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

  // 去文章详情
  toArticleDetail(e) {
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  // 分享
  onShareAppMessage: function () {}
})