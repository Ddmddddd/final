// pages/input/inputevaluate/inputevaluate.js
var util = require('../../../utils/util.js');
var app=getApp()
Page({


  
  /**
   * 页面的初始数据
   */
  data: {
    patientId:[],
    showdrink:false,
    showsmoke:false,
    showdiabetes:false,
    showtbc:false,
    showHdlc:false,
    showBweight:false,
    showSBP:false,
    showphy:false,
    drinklab:true,
    smokelab:true,
    diabeteslab:true,
    tbclab:true,
    Hdlclab:true,
    Bweightlab:true,
    SBPlab:true,
    phylab:true,
    inputevaluate:{
      patientId:"",
      sex:"",
      age:"",
      drink:"",
      smoke:"",
      diabetes:"",
      tbc:"",
      Hdlc:"",
      Bheight:"",
      Bweight:"",
      SBP:"",
      phy:"",
      measureTime:"",
    },
    measureTime:"",
    indrink:"",
    insmoke:"",
    indiabetes:"",
    intbc:"",
    inHdlc:"",
    inBweight:"",
    inSBP:"",
    inphy:"",
    sex: [],
    age: [],
    drink: [],
    smoke: [],
    diabetes: [],
    tbc: [],
    Hdlc: [],
    Bheight: [],
    Bweight: [],
    SBP:[],
    phy:[],
    patient:{
      patientId:[],
      time:[]
    }
  },
  sphy: function () {
    this.setData({
      showphy:true
    })
  },
  stbc:function(){
    this.setData({
      showtbc:true
    })
  },
  sdrink: function () {
    this.setData({
      showdrink: true,
    })
  },
  ssmoke: function () {
    this.setData({
      showsmoke: true,
    })
  },
  sdiabetes:function(){
    this.setData({
      showdiabetes:true,
    })
  },
  sHdlc:function(){
    this.setData({
      showHdlc:true,
    })
  },
  sBweight: function () {
    this.setData({
      showBweight: true,
    })
  },
  sSBP: function () {
    this.setData({
      showSBP: true,
    })
  },
  preventTouchMove: function () {
  },
  hideModal: function () {
    this.setData({
      showdrink: false,
      showsmoke:false,
      showdiabetes:false,
      showtbc:false,
      showHdlc:false,
      showBweight:false,
      showSBP:false,
      showphy:false,
    });
  },
  onCancel: function () {
    this.hideModal();
  },

  confirmdrink:function(){
    if(this.data.indrink==""){
      wx.showToast({
        title: '请选择是否饮酒后确认',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      drinklab:false,
      drink: this.data.indrink,
    })
    this.hideModal();
    console.log(this.data.drink)
    }
  },

  confirmsmoke:function(){
    if(this.data.insmoke==""){
      wx.showToast({
        title: '请选择是否吸烟后确认',
        image:"../../image/fail.png",
        duration:1000
      })
    }
    else{
    this.setData({
      smokelab:false,
      smoke: this.data.insmoke
    })
    this.hideModal();
    console.log(this.data.smoke)
    }
  },

  confirmdiabetes:function () {
    if(this.data.indiabetes==""){
      wx.showToast({
        title: '请选择有无糖尿病后确认',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      diabeteslab: false,
      diabetes: this.data.indiabetes
    })
    this.hideModal()
    console.log(this.data.diabetes)
    }
  },

  confirmtbc: function () {
    if(this.data.intbc==""){
      wx.showToast({
        title: '请检查血总胆固醇输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      tbclab: false,
      tbc: this.data.intbc
    })
    this.hideModal();
    console.log(this.data.tbc)
    }
  },

  confirmHdlc: function () {
    if(this.data.inHdlc==""){
      wx.showToast({
        title: '请检查高密度脂蛋白胆固醇输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      Hdlclab: false,
      Hdlc: this.data.inHdlc
    })
    this.hideModal();
    console.log(this.data.Hdlc)
    }
  },

  confirmBweight: function () {
    if(this.data.inBweight==""){
      wx.showToast({
        title: '请检查体重输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      Bweightlab: false,
      Bweight: Math.round(this.data.inBweight)
    })
    this.hideModal();
    console.log(this.data.Bweight)
    }
  },

  confirmSBP: function () {
    if(this.data.inSBP==""){
      wx.showToast({
        title: '请检查收缩压输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
    this.setData({
      SBPlab: false,
      SBP: Math.round(this.data.inSBP)
    })
    this.hideModal();
    console.log(this.data.SBP)
    }
  },
  confirmphy: function () {
    if (this.data.inphy == "") {
      wx.showToast({
        title: '请正确选择后确认',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
      this.setData({
        phylab: false,
        phy: this.data.inphy
      })
      this.hideModal();
      console.log(this.data.phy)
    }
  },

  inputphy: function (e) {
    if (e.detail.value == "无") {
      this.setData({
        inphy: "无"
      })
    }
    else if (e.detail.value == "有意图"){
      this.setData({
        inphy: "有意图"
      })
    }
    else if (e.detail.value == "有准备") {
      this.setData({
        inphy: "有准备"
      })
    }
    else if (e.detail.value == "已在改变") {
      this.setData({
        inphy: "已在改变"
      })
    }
  },

  inputdrink:function(e){
    if(e.detail.value=="饮酒"){
      this.setData({
        indrink: "饮酒"
      })
    }
    else{
      this.setData({
      indrink:"不饮酒"
      })
    }
  },

  inputsmoke: function (e) {
    if (e.detail.value == "吸烟") {
      this.setData({
        insmoke: "吸烟"
      })
    }
    else {
      this.setData({
        insmoke: "不吸烟"
      })
    }
  },

  inputdiabetes: function (e) {
    if (e.detail.value == "有糖尿病") {
      this.setData({
        indiabetes: "有糖尿病"
      })
    }
    else {
      this.setData({
        indiabetes: "无糖尿病"
      })
    }
  },

  inputtbc: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        intbc: e.detail.value
      })
    }
  },

  inputHdlc: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        inHdlc: e.detail.value
      })
    }
  },

  inputBweight: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
       inBweight: e.detail.value
      })
    }
  },

  inputSBP: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        inSBP: e.detail.value
      })
    }
  },

  validate: function () {
    var  drink=this.data.drink,smoke=this.data.smoke,diabetes=this.data.diabetes, tbc = this.data.tbc, Hdlc = this.data.Hdlc,
    Bweight=this.data.Bweight,SBP=this.data.SBP,phy=this.data.phy;
    Math.round//取整，四舍六入五成双
    if (drink.length<0||smoke.length<0||diabetes.length<0|| tbc.length <= 0 || Hdlc.length <= 0 || Bweight.length<=0 || SBP.length<0||phy.length<0) return 0;
    else {
      tbc = Math.round(tbc);
      Hdlc = Math.round(Hdlc);
      Bweight = Math.round(Bweight);
      SBP = Math.round(SBP);
      if (tbc < 1 || tbc > 30) return 2;
      else if (Hdlc < 0 || Hdlc > 5) return 3;
      else if (Bweight<30 || Bweight>150)return 5;
      else if (SBP<80||SBP>200)return 6;
      else return -1;
    }
  },

  monitor:function(){
    var that = this;
    var validate = this.validate();
    console.log(validate)
    if (validate == 0) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 2) {
      wx.showToast({
        title: '请检查血总胆固醇输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 3) {
      wx.showToast({
        title: '请检查高密度脂蛋白胆固醇输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if(validate == 5){
      wx.showToast({
        title: '请检查体重输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 6) {
      wx.showToast({
        title: '请检查收缩压输入是否正确',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else{
      var inputevaluate = JSON.stringify(that.data.inputevaluate);//将对象的类型转换为字符串类型
      console.log(inputevaluate)
      wx.request({
        method: 'POST',
        url: 'https://eval.zjubiomedit.com/eval/Frisk',//调用接口
        data: inputevaluate,
        success: function (res) {
          console.log(res.data);
          app.globalData.Frisk=res.data
            wx.request({
              url: 'https://eval.zjubiomedit.com/eval/Wrisk',
              success:function(res){
               console.log(res.data)
               app.globalData.Wrisk=res.data
                wx.request({
                  url: 'https://eval.zjubiomedit.com/eval/Irisk',
                  success: function (res) {
                    console.log(res.data)
                    app.globalData.Irisk = res.data
                    wx.redirectTo({
                      url: '/pages/result/result',//关闭当前界面，跳转到应用内的某个界面
                    })
                    app.globalData.evaluatetask=1
                  },
                  fail: function (res) {
                    console.log(res);
                    console.log('is failed')
                  }
                })
            },
              fail: function (res) {
               console.log(res);
                console.log('is failed')
              }
            })
         // })
        },
        fail: function (res) {
          console.log(res);
          console.log('is failed')
        }
      })
    } 
  },

  finishevaluate: function () {
    this.setData({
      inputevaluate: {
        measureTime: this.data.measureTime.toString(),
        patientId:this.data.patientId.toString(),
        sex: this.data.sex.toString(),
        age: this.data.age.toString(),
        drink: this.data.drink.toString(),
        smoke: this.data.smoke.toString(),
        diabetes: this.data.diabetes.toString(),
        tbc: this.data.tbc.toString(),
        Hdlc: this.data.Hdlc.toString(),
        Bheight: app.globalData.loginUserInfo.newestHeight.toString(),
        Bweight: this.data.Bweight.toString(),
        SBP: this.data.SBP.toString(),
        phy:this.data.phy.toString(),
      },
    })
    if (!this.validate()) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
      this.monitor();
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE=util.formatDate(new Date());
    this.setData({
      measureTime:DATE+"00"
    })
    this.setData({
      patientId: wx.getStorageSync('patientid_token')
    })
    this.setData({
      patient: {
        patientId: this.data.patientId.toString(),
        time: "2019"
      }
    })
    var patient = JSON.stringify(this.data.patient)
    var that = this
    wx.request({
      method: "POST",
      data: patient,
      url: 'https://eval.zjubiomedit.com/eval/sexrecord',
      success: function (res) {
        that.setData({
          sex: res.data
        })
        wx.setStorageSync("sex_token",res.data)
        console.log(res.data)
      }
    })
    wx.request({
      method: "POST",
      data: patient,
      url: 'https://eval.zjubiomedit.com/eval/agerecord',
      success: function (res) {
        that.setData({
          age: res.data
        })
        wx.setStorageSync("age_token", res.data)
        console.log(res.data)
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