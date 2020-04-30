//detail.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dialog: false
  },
  onLoad: function () {

  },
  showDialog: function(event) {
    this.setData({dialog: true})
  },
  hideDialog: function(event) {
    this.setData({dialog: false})
  }
})
