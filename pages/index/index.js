import {
  setting,
  home
} from '../../config/api'

Page({
  data: {
    cardCur: 0,
    swiperList: [],
    imgPre: '',
    home: null,
    imgPre: wx.getStorageSync('setting').img_pre
  },

  onShow() {
    this.getSetting()
    this.getData()
  },

  getData() {
    home().then(res => {
      this.setData({
        home: res.data
      })
    })
  },

  // 去文章详情
  toArticle(e) {
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + e.currentTarget.dataset.id
    })
  },

  // 去学员详情
  toStudentDetail(e) {
    wx.navigateTo({
      url: '/pages/studentDetail/studentDetail?id=' + e.currentTarget.dataset.id
    })
  },

  // 获取设置
  getSetting() {
    setting().then(res => {
      wx.setStorageSync('setting', res.data)
      this.setData({
        swiperList: JSON.parse(res.data.carousel_map),
        imgPre: res.data.img_pre
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

  // 去球队
  toTeam() {
    wx.navigateTo({
      url: '/pages/teamList/teamList',
    })
  },

  // 去机构介绍
  toCompanyDetail() {
    wx.navigateTo({
      url: '/pages/companyDetail/companyDetail',
    })
  },

  // 去文章
  toArticleList() {
    wx.navigateTo({
      url: '/pages/articleList/articleList',
    })
  },

  // 去教员
  toTeacher() {
    wx.navigateTo({
      url: '/pages/teacherList/teacherList',
    })
  },

  // 去球员
  toStudent() {
    wx.navigateTo({
      url: '/pages/studentList/studentList',
    })
  },

  // 去视频
  toVideoList() {
    wx.navigateTo({
      url: '/pages/videoList/videoList',
    })
  },

  // 分享
  onShareAppMessage: function () {}
})