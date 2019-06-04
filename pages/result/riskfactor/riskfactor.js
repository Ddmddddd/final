// pages/result/riskfactor/riskfactor.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tc:0,
    smoke:0,
    Hdlc:0,
    bp:0,
    dia:0,
    bmi:0,
    drink:0,
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.riskfactor)
    this.setData({
      tc:app.globalData.riskfactor.tc,
      smoke:app.globalData.riskfactor.smoke,
      Hdlc:app.globalData.riskfactor.Hdlc,
      bp:app.globalData.riskfactor.bp,
      dia:app.globalData.riskfactor.dia,
      bmi:app.globalData.riskfactor.bmi,
      drink:app.globalData.riskfactor.drink,
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