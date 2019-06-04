// pages/erecord/erecord.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrisk: [],
    frisk: 0,
    irisk: 0,
    information: {
      drink: [],
      smoke: [],
      dia: [],
      tc: [],
      Hdlc: [],
      bmi: [],
      sbp: [],
      weight: [],
      height: [],
    },
    risk: {
      drink: [],
      smoke: [],
      dia: [],
      tc: [],
      Hdlc: [],
      bmi: [],
      bp: [],
    },
    smoke: 0,
    tc: 0,
    Hdlc: 0,
    bp: 0,
    dia: 0,
    bmi: 0,
    drink: 0
  },

  start: function () {
    wx.navigateTo({
      url: '../result/riskfactor/riskfactor',
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var patientId = wx.getStorageSync("patientid_token")
    var that = this
    wx.request({
      method: 'GET',
      data: {
        "patientId": patientId.toString(),
      },
      url: 'https://eval.zjubiomedit.com/eval/doctor/getrecord',
      success: function (res) {
        console.log(res.data)
        switch (res.data.wrisk) {
          case "40":
            that.setData({
              wrisk: ">40%"
            })
            break
          case "30":
            that.setData({
              wrisk: "30~40%"
            })
            break
          case "20":
            that.setData({
              wrisk: "20~30%"
            })
            break
          case "10":
            that.setData({
              wrisk: "10~20%"
            })
            break
          case "1":
            that.setData({
              wrisk: "<10%"
            })
            break
        }
        that.setData({
          frisk: res.data.frisk,
          irisk: res.data.irisk,
        })
      }
    })
    Math.round
    wx.request({
      method: 'GET',
      data: {
        "patientId": patientId.toString()
      },
      url: 'https://eval.zjubiomedit.com/eval/doctor/patient/information',
      success: function (res) {
        console.log(res.data)
        that.setData({
          information: {
            drink: res.data.drink,
            smoke: res.data.smoke,
            dia: res.data.dia,
            tc: res.data.tc,
            Hdlc: res.data.Hdlc,
            bmi: res.data.bmi,
            sbp: res.data.sbp,
            weight: Math.round(res.data.weight),
            height: Math.round(res.data.height),
          }
        })
      }
    })
    wx.request({
      method: 'GET',
      data: {
        "patientId": patientId.toString()
      },
      url: 'https://eval.zjubiomedit.com/eval/doctor/types',
      success: function (res) {
        that.setData({
          risk: {
            drink: res.data.drink,
            smoke: res.data.smoke,
            dia: res.data.dia,
            tc: res.data.tbc,
            Hdlc: res.data.Hdlc,
            bmi: res.data.bmi,
            sbp: res.data.sbp,
          }
        })
        if (res.data.Hdlc == "HDL-C异常") {
          that.setData({
            factorHdlc: "高密度脂蛋白胆固醇异常",
            Hdlc: 1
          })
          app.globalData.riskfactor.Hdlc = 1
        } else { app.globalData.riskfactor.Hdlc =0}
        if (res.data.bmi == "超重") {
          that.setData({
            factorbmi: "超重",
            bmi: 1
          })
          app.globalData.riskfactor.bmi = 1
        } else { app.globalData.riskfactor.bmi =0}
        if (res.data.tbc == "TC高") {
          that.setData({
            factortbc: "血总胆固醇异常",
            tc: 1
          })
          app.globalData.riskfactor.tc = 1
        } else { app.globalData.riskfactor.tc =0}
        if (res.data.sbp == "血压过高") {
          that.setData({
            factorsbp: "血压过高",
            bp: 1
          })
          app.globalData.riskfactor.bp = 1
        } else { app.globalData.riskfactor.bp =0}
        if (res.data.smoke == "吸烟") {
          that.setData({
            factorsmoke: "吸烟",
            smoke: 1
          })
          app.globalData.riskfactor.smoke = 1
        } else { app.globalData.riskfactor.smoke =0}
        if (res.data.dia == "血糖过高") {
          that.setData({
            factordiabetes: "血糖过高",
            dia: 1
          })
          app.globalData.riskfactor.dia = 1
        } else { app.globalData.riskfactor.dia =0}
        if (res.data.drink == "饮酒") {
          that.setData({
            factordrink: "饮酒（过量）",
            drink: 1
          })
          app.globalData.riskfactor.drink = 1
        } else { app.globalData.riskfactor.drink =0}
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})