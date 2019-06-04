var app = getApp()
import { expPatientWxLogin } from '../../utils/config'
import { loginForCode, logIn } from '../../utils/common'

Page({
  data: {
    userName: '',
    userPassword: '',
    patientid_token: '',//方便存在本地的locakStorage
    managementid_token: '',
    response: '',//存取返回数据
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    showPsw:false
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  switchShowPassword:function(){
    this.setData({
      showPsw: !this.data.showPsw
    })
  },
  onLoad: function () {
    /* 获取系统信息*/
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        app.globalData.windowWidth = res.windowWidth
        app.globalData.windowHeight = res.windowHeight
        that.setData({
          windowWidth: res. windowWidth,
          windowHeight: res.windowHeight,
        })
      }
    })
    var patientId = wx.getStorageSync('patientid_token')
    var password = wx.getStorageSync('password_token')
    if (patientId.length>0){
      that.setData({
        userName: patientId,
        userPassword: password
      })
      logIn(patientId, password, app)
    }
  },
  doLogIn: function () {
    const { userName, userPassword } = this.data
    logIn(userName, userPassword, app)
  },
  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  wxLogin: function (e) {
    wx.showToast({ title: '微信登录中' })
    const { iv, encryptedData } = e.detail
    wx.setStorageSync('iv', iv)
    wx.setStorageSync('encryptedData', encryptedData) 
    const that = this
    wx.request({
      url: expPatientWxLogin,
      data: {
        code: app.globalData.code
      },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        if (res.data.success) {
          const { bind } = res.data.result
          if (!bind) wx.navigateTo({url: '../bindwx/bindwx'})
          else {
            const { user } = res.data.result
            that.setData({userName: user.patientIdentifier, userPassword: user.password})
            logIn(user.patientIdentifier, user.password, app)
          }
        }
        loginForCode(app)
      },
      fail: function () {
        wx.showToast({ icon: 'none', title: '加载失败' })
      }
    })
  }
})
