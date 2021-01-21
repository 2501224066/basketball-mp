import * as echarts from '../../ec-canvas/echarts';

import {
  userSport,
  switchSport
} from '../../config/api'

// 雷达数据
let LEIDA_DATA = []
// 饼图数据
let BIN_DATA = []
// 折线数据
let ZHEXIAN_DATA = {}

Page({
  data: {
    sportStatus: null,
    LEIDA_DATA: null,
    BIN_DATA: null,
    ZHEXIAN_DATA: null,
    list: [{
        title: "身高",
        first: "H",
        specs: "cm",
        then: "35%"
      },
      {
        title: "体重",
        first: "W",
        specs: "kg",
        then: "18%"
      },
      {
        title: "BMI",
        first: "B",
        specs: "",
        then: "25%"
      },
      {
        title: "臂展",
        first: "A",
        specs: "cm",
        then: "35%"
      },
      {
        title: "手指跨度",
        first: "H",
        specs: "cm",
        then: "30%"
      },
      {
        title: "3/4球场冲刺",
        first: "C",
        specs: "s",
        then: "33%"
      },
      {
        title: "15米节奏往返",
        first: "P",
        specs: "圈",
        then: "17%"
      },
      {
        title: "坐位体前屈",
        first: "S",
        specs: "cm",
        then: "35%"
      },
      {
        title: "30s连续跳跃",
        first: "E",
        specs: "个",
        then: "20%"
      },
      {
        title: "禁区灵敏测试",
        first: "L",
        specs: "s",
        then: "39%"
      },
      {
        title: "跪姿抛球",
        first: "K",
        specs: "m",
        then: "21%"
      }, {
        title: "垂直跳跃",
        first: "V",
        specs: "cm",
        then: "50%"
      }
    ],
    leida: {
      lazyLoad: true
    },
    bin: {
      lazyLoad: true
    },
    zhexian: {
      lazyLoad: true
    },
  },

  onLoad(options) {
    this.getData(options.id)
  },

  getData(id) {
    let obj = {
      id: id
    }
    userSport(obj).then(res => {
      console.log(res)
      LEIDA_DATA = res.data.leida
      BIN_DATA = res.data.bin
      ZHEXIAN_DATA = res.data.zhexian
      this.setData({
        LEIDA_DATA: res.data.leida,
        BIN_DATA: res.data.bin,
        ZHEXIAN_DATA: res.data.zhexian,
        sportStatus: wx.getStorageSync('sportStatus')
      })
      this.open()
    })
  },

  // 体测开关
  test(e) {
    let obj = {
      status: e.detail.value ? 1 : 0
    }
    wx.setStorageSync('sportStatus', e.detail.value)
    switchSport(obj).then(res => {
      wx.showToast({
        icon: 'none',
        title: '切换成功',
      })
    })
  },

  // 启动可视化
  open() {
    var that = this
    // 雷达图
    that.init('#mychart-dom-graph', 'leida')
    // 饼图
    BIN_DATA.forEach(function (v, k) {
      that.init('#mychart-dom-pie' + k, 'bin', k)
    });
    // 折线
    ZHEXIAN_DATA.data.forEach(function (v, k) {
      that.init('#mychart-dom-line' + k, 'zhexian', k)
    });
  },

  // 初始化图表
  init(dom, type, dataIndex) {
    this.selectComponent(dom).init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      switch (type) {
        case 'leida':
          leida(chart)
          break
        case 'bin':
          bin(chart, dataIndex);
          break
        case 'zhexian':
          zhexian(chart, dataIndex);
          break
      }
      this.chart = chart;
      return chart;
    });
  }
});

// 雷达图
function leida(chart) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#ACE1F4", "#AB8FE2", "#5A8EF9", "#F6BD16", "#FF5783"],
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      indicator: [{
          name: '下肢力量',
          max: LEIDA_DATA[0].value[0] * 2
        },
        {
          name: '上肢力量',
          max: LEIDA_DATA[0].value[1] * 2
        },
        {
          name: '移动灵活性',
          max: LEIDA_DATA[0].value[2] * 2
        },
        {
          name: '弹跳灵敏性',
          max: LEIDA_DATA[0].value[3] * 2
        },
        {
          name: '柔韧性',
          max: LEIDA_DATA[0].value[4] * 2
        },
        {
          name: '有氧能力',
          max: LEIDA_DATA[0].value[5] * 2
        },
        {
          name: '速度',
          max: LEIDA_DATA[0].value[6] * 2
        },
        {
          name: 'BMI',
          max: LEIDA_DATA[0].value[7] * 2
        }
      ]
    },
    series: [{
      areaStyle: {
        width: 1,
        opacity: 0.65
      },
      type: 'radar',
      data: LEIDA_DATA
    }]
  };
  chart.setOption(option);
}

// 饼图
function bin(chart, dataIndex) {
  var option = {
    color: ["#5AD7A6", "#5A8EF9", "#F6BD16", "#FF5783"],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['50%', '80%'],
      labelLine: {
        show: false
      },
      data: BIN_DATA[dataIndex]
    }]
  };
  chart.setOption(option);
}

// 折线图
function zhexian(chart, dataIndex) {
  var option = {
    color: ["#5A8EF9"],
    xAxis: {
      type: 'category',
      //boundaryGap: false,
      data: ZHEXIAN_DATA.time,
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data: ZHEXIAN_DATA.data[dataIndex],
      //areaStyle: {}
    }]
  };
  chart.setOption(option);
}