import {
  levCourse
} from '../../config/api'

import {
  BASE_URL
} from '../../config/constant'

Page({
  data: {
    text: null,
    imgPre: wx.getStorageSync('setting').img_pre,
    imgList: []
  },

  // 输入文本
  text(e) {
    this.setData({
      text: e.detail.value
    })
  },

  // 提交
  submit() {
    let obj = {
      Course: this.data.text,
      CourPic: JSON.stringify(this.data.imgList)
    }
    levCourse(obj).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: "success",
        success() {
          wx.navigateBack()
        }
      })
    })
  },

  // 上传图片
  uploadImg() {
    var that = this
    wx.chooseImage({
      success: function (res) {
        res.tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: BASE_URL + "/upload",
            filePath: element,
            name: "pic",
            success(res) {
              that.setData({
                imgList: that.data.imgList.concat(res.data)
              })
            },
            fail(res) {
              wx.showToast({
                icon: 'none',
                title: '部分图片上传失败',
              })
            }
          })
        });
      },
    })

  },

  // 分享
  onShareAppMessage: function () {}
})