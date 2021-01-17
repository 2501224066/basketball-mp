const App = getApp();

Component({
  data: {
    navHeight: null,
    navTop: null
  },

  properties: {
    title: {
      type: String
    },
    back: {
      type: String
    },
    color: {
      type: String
    },
    open: {
      type: String
    },
    opacity: {
      type: String
    },
    iconColor: {
      type: String
    },
    bg: {
      type: String
    }
  },

  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop
      })
    }
  },

  methods: {
    // 返回上一页
    back() {
      wx.navigateBack()
    },

    // 去搜索页
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})