// pages/setting/setting.js
import { expPatientIsBoundWx, getPatientAvatarUrl } from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    patientid:'',
    avatarUrl: null,
    bindWx: false
  },
  quit:function(){
    wx.clearStorage()
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var nickname = wx.getStorageSync('nickname')
    var patientid = wx.getStorageSync('patientid_token')
    this.setData({
      nickname:nickname,
      patientid:patientid
    })
    const avatarUrl = wx.getStorageSync('avatar_url')
    if (!avatarUrl ) this.getAvatarUrl()
    else this.setData({ avatarUrl })
  },
  getAvatarUrl: function () {
    const that = this
    const patientId = wx.getStorageSync('patientid_token')
    wx.request({
      url: getPatientAvatarUrl,
      data: {
        patientId
      },
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          const avatarUrl = res.data.result
          wx.setStorageSync('avatar_url', avatarUrl)
          that.setData({ avatarUrl })         
        }
      }
    })
  },
  onShow: function () {
    this.checkBindWx()
  },
  gotoBindWx: function () {
    wx.navigateTo({url: '../bindwx/bindwx'})
  },
  checkBindWx: function () {
    const that = this
    const patientId = wx.getStorageSync('patientid_token')
    wx.request({
      url: expPatientIsBoundWx,
      data: { patientId },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        if (res.data.success) {
          const bindWx = res.data.result
          that.setData({ bindWx })
        }
      }
    })
  }

})