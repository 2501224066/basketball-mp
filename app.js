App({
  globalData: {
    navHeight: null,
    navTop: null,
    windowHeight: null,
    iphoneFooter: null,
  },

  onLaunch() {
    this.getPhoneModel()
    this.topData()
  },

  // 获取机型
  getPhoneModel() {
    wx.getSystemInfo({
      success: (res) => {
        if (res.model === 'iPhone X' ||
          res.model === 'iPhone XR' ||
          res.model === 'iPhone XS Max' ||
          res.model === 'iPhone 11' ||
          res.model === 'iPhone 11 Pro' ||
          res.model === 'iPhone 11 Pro Max') {
          this.globalData.iphoneFooter = true;
        } else {
          this.globalData.iphoneFooter = false;
        }
      }
    })
  },

  // 计算顶部数据
  topData() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})