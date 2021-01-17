import {
  articleList
} from '../../config/api'

Page({
  data: {
    imgPre: wx.getStorageSync('setting').img_pre,
    list: [],
    page: 1,
    pageSize: 15
  },

  onLoad() {
    this.getData()
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