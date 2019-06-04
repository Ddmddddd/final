export const loginForCode = function (app) {
  wx.login({
    success(res) {
      console.log('hello')
      if (res.code) {
        app.globalData.code = res.code
      } else {
        console.log('微信登录失败！' + res.errMsg)
      }
    }
  })
}

export const logIn =  function (account, password, app) {
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
          wx.setStorageSync('patientid_token', res.data.loginUserInfo.patientID)
          // wx.setStorageSync('userAvatarUrl', res.data.loginUserInfo.userPhoto)
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
      fail: function () {
        wx.showToast({
          title: '网络错误',
          image: '../../image/fail.png',
          duration: 1000
        })
      }
    })
  }
}
