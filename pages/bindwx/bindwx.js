const app = getApp()
import { expPatientWxBindAccount  } from '../../utils/config'
import { loginForCode } from '../../utils/common'
// pages/setting/setting.js
Page({
  data: {
    userName: '',
    userPassword: '',
    patientid_token: '',//方便存在本地的locakStorage
    managementid_token: '',
    response: '',//存取返回数据
    iv: '',
    encryptedData: '',
    showPsw:false
  },
  onLoad: function () {
    const userName = wx.getStorageSync('patientid_token')
    const userPassword =  wx.getStorageSync('password_token')
    const iv = wx.getStorageSync('iv')
    const encryptedData = wx.getStorageSync('encryptedData')
    this.setData({ userName, userPassword, iv, encryptedData })
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
  wxLogin: function (e) {
    wx.showToast({ title: '微信登录中' })
    const { iv, encryptedData } = e.detail
    wx.setStorageSync('iv', iv)
    wx.setStorageSync('encryptedData', encryptedData) 
    this.setData({ iv, encryptedData })
    this.bindAndLogin()
  }, 
  bindAndLogin: function () {
    const that = this
    const { userName, userPassword, iv, encryptedData } = this.data 
    const code = app.globalData.code
    wx.request({
      url: expPatientWxBindAccount,
      data: {
        code,
        patientId: userName,
        password: userPassword,
        iv,
        encryptedData
      },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        if (res.data.success) {
          const { bind, user } = res.data.result
          if (bind) {
            wx.showToast({ icon: 'none', title: '绑定成功！'})
            // wx.setStorageSync('userAvatarUrl', user.userPhoto)
            const patientId = wx.getStorageSync('patientid_token')
            if (patientId) {
              wx.switchTab({ url: '/pages/homepage/homepage'})
            } else {
              that.logIn(user.patientIdentifier, user.password)
            }
          } else {
            wx.showToast({ icon: 'none', title: '绑定失败'})
          }
        } else {
          wx.showToast({ icon: 'none', title: '登录失败'}) 
        }
        loginForCode(app)
      }
    })
  },
  logIn: function (patientId, psw) {
    var account = patientId || this.data.userName
    var password = psw || this.data.userPassword
    if (account.length <= 0) {
      wx.showToast({
        title: '请输入信息',
        image: '../../image/fail.png',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zjubiomedit.com/HypertensionService.svc/WapLogin',
        data: {
          account: account,
          password: password,
        },
        method: 'POST',
        success: function (res) {
          // 判断服务器返回状态，辅助debug
          const { statusCode } = res
          if ( statusCode > 400 && statusCode < 500 ) {
            wx.showToast({
              title: '端口请求错啦',
              image: '../../image/fail.png',
              duration: 1500 
            })
            return
          } else if ( statusCode > 500 ) {
            wx.showToast({
              title: '服务器请求失败',
              image: '../../image/fail.png',
              duration: 1500
            })
            return
          }
          // 请求成功，检验登录信息
          if(res.data.flag==0){
            app.globalData.loginUserInfo = res.data.loginUserInfo
            app.globalData.managementPlan = res.data.managementPlan
            app.globalData.todayRecords = res.data.todayRecords
            wx.setStorageSync('patientid_token', patientId)
            wx.setStorageSync('password_token', password)
            wx.setStorageSync('managementid_token', res.data.managementPlan.managementID)
            wx.setStorageSync('nickname', res.data.loginUserInfo.nickname || res.data.loginUserInfo.patientName)
          
            wx.switchTab({
              url: '../homepage/homepage'
            })
          }
          else{
            wx.showToast({
              title: '账号或密码错误',
              image: '../../image/fail.png',
              duration: 1500
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
            image: '../../image/fail.png',
            duration: 1000
          })
        }
      })
    }
  }
})