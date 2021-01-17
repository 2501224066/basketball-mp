Page({
  data: {
    latitude: 0, //纬度 
    longitude: 0, //经度 
    speed: 0, //速度 
    accuracy: 16, //位置精准度 
    markers: [],
    covers: [],
  },
  onLoad() {
    this.map()
  },

  // 地图设置
  map() {
    var markers = [{
      latitude: 30.46,
      longitude: 114.32,
      name: '机构地址',
      desc: '我的位置'
    }]
    var covers = [{
      latitude: 30.46,
      longitude: 114.32,
      width: 10,
      height: 10,
      rotate: 0
    }]
    this.setData({
      latitude: 30.46,
      longitude: 114.32,
      markers: markers,
      covers: covers,
    })
  },

  // 分享
  onShareAppMessage: function () {}
})