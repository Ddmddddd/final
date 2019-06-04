// pages/result/result.js
var util = require('../../utils/util.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frisk:0,
    wrisk:[],
    irisk:0,
    totalrisk:[],
    factortbc: [],
    factorsmoke: [],
    factorHdlc: [],
    factorsbp: [],
    factordiabetes: [],
    factorbmi: [],
    factordrink: [],
    nowtime:{
      nowtime:[],
      patientId:[],
    },
    smoke:0,
    tc:0,
    Hdlc:0,
    bp:0,
    dia:0,
    bmi:0,
    drink:0
  },

  know:function(){
    wx.navigateBack();
    wx.navigateBack();
    wx.navigateBack();
  },

  start:function(){
    wx.navigateBack();
    wx.navigateBack();
    wx.navigateBack();
    wx.navigateTo({
      url: '../result/riskfactor/riskfactor',
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      frisk:app.globalData.Frisk,
      wrisk:app.globalData.Wrisk,
      irisk:app.globalData.Irisk
    })
    if(app.globalData.Wrisk<10||this.data.frisk<5||this.data.irisk<5){
      this.setData({
        totalrisk:"低风险"
      })
    }
    else if(app.globalData.Wrisk>=30||this.data.frisk>10||this.data.irisk>10){
      this.setData({
        totalrisk: "高风险"
      })
    }
    else{
      this.setData({
        totalrisk: "中等风险"
      })
    }
    switch (app.globalData.Wrisk){
      case 40:
        this.setData({
         wrisk:">40%"
        })
        break
      case 30:
        this.setData({
          wrisk:"30~40%"
        })
        break
      case 20:
        this.setData({
          wrisk:"20~30%"
        })
        break
      case 10:
        this.setData({
          wrisk:"10~20%"
        })
        break
      case 1:
        this.setData({
          wrisk:"<10%"
        })
        break
    }
    wx.request({
      url: 'https://eval.zjubiomedit.com/eval/factor',
    })
    wx.request({
      url: 'https://eval.zjubiomedit.com/eval/showfactor',
      success: function (res) {
        console.log(res.data)
        if (res.data.fHdlc == "HDL-C异常") {
          that.setData({
            factorHdlc: "高密度脂蛋白胆固醇异常",
            Hdlc:1
          })
          app.globalData.riskfactor.Hdlc=1
        } else { app.globalData.riskfactor.Hdlc =0}
        if (res.data.fbmi == "超重") {
          that.setData({
            factorbmi: "超重",
            bmi:1
          })
          app.globalData.riskfactor.bmi=1
        } else { app.globalData.riskfactor.bmi =0}
        if (res.data.fbmi == "肥胖") {
          that.setData({
            factorbmi: "肥胖",
            bmi: 1
          })
          app.globalData.riskfactor.bmi = 1
        } else { app.globalData.riskfactor.bmi =0}
        if (res.data.ftbc == "TC高") {
          that.setData({
            factortbc: "血总胆固醇异常",
            tc:1
          })
          app.globalData.riskfactor.tc=1
        } else { app.globalData.riskfactor.tc =0}
        if (res.data.fsbp == "血压过高") {
          that.setData({
            factorsbp: "血压过高",
            bp:1
          })
          app.globalData.riskfactor.bp=1
        } else { app.globalData.riskfactor.bp =0}
        if (res.data.fsmoke == "吸烟") {
          that.setData({
            factorsmoke: "吸烟",
            smoke:1
          })
          app.globalData.riskfactor.smoke=1
        } else { app.globalData.riskfactor.smoke =0}
        if (res.data.fdiabetes == "血糖过高") {
          that.setData({
            factordiabetes: "血糖过高",
            dia:1
          })
          app.globalData.riskfactor.dia=1
        } else { app.globalData.riskfactor.dia =0}
        if (res.data.fdrink == "饮酒") {
          that.setData({
            factordrink: "饮酒（过量）",
            drink:1
          })
          app.globalData.riskfactor.drink=1
        } else { app.globalData.riskfactor.drink=0}
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