const app = getApp()
import { logIn } from '../../utils/common'
Page({
  onLoad: function () {
    const username = wx.getStorageSync('patientid_token') || null
    const password = wx.getStorageSync('password_token') || null
    if (username) {
      setTimeout(() => { logIn(username, password, app)}, 500)
    }
    else {
      setTimeout(() => { wx.reLaunch({ url: '/pages/index/index' })}, 1000)
    }
  }
})