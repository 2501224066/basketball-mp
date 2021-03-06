import {
  teamDetail,
  getCause,
  getPlayers
} from '../../config/api'

Page({
  data: {
    id: null,
    detail: {},
    imgPre: null,
    cardCur: 0,
    swiperList: [],
    courseList: [],
    manList: [],
    courseMore: false
  },

  onLoad(option) {
    this.setData({
      id: option.id,
      imgPre: wx.getStorageSync('setting').img_pre,
    })
    this.getData()
  },

  getData() {
    let obj = {
      id: this.data.id
    }
    teamDetail(obj).then(res => {
      this.setData({
        detail: res.data,
        swiperList: res.data.team_img
      })
    })

    // 课时
    getCause(obj).then(res => {
      this.setData({
        courseList: res.data.list
      })
    })

    // 成员
    getPlayers(obj).then(res => {
      this.setData({
        manList: res.data.list
      })
    })
  },

  // 去球员详情
  toStudentDetail(e) {
    wx.navigateTo({
      url: '/pages/studentDetail/studentDetail?id=' + e.currentTarget.dataset.id,
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

  // 更多课程
  courseMore() {
    this.setData({
      courseMore: !this.data.courseMore
    })
  },

  // 分享
  onShareAppMessage: function () {}
})