var app = getApp()
import { request } from '../../utils/Request' 
import {
  expGetPatientInfo,
  expScheduleToday,
  expScheduleComplete,
  expScheduleIgnore,
  expSchedulePending } from '../../utils/config'
Page({
  data: {
    /**
     * selected :ignoreList show or not
     */
    roleType: null,
    selected: false,
    scheduleList: {},
    completeList: {},
    ignoreList: {},
    statusArr:['scheduleList','completeList','ignoreList']
  },
  changeIgnoreShowStatus:function(){
    this.setData({
      selected:!this.data.selected
    })
  },
  ignoreSchedule:function(e){
    let ignoreid = e.currentTarget.dataset.ignoreid
    var that = this
    let url = expScheduleIgnore + ignoreid
    let patientId = wx.getStorageSync('patientid_token')
    request({url}).then(res=> {
      if(res.data.result.success==false){
        //failed
        return
      }
      that.todayScheduleList(patientId,0)
      that.todayScheduleList(patientId,2)
    })
  },
  finishSchedule:function(e){
    const completeid = parseInt(e.currentTarget.dataset.completeid)
    var that = this
    let url = expScheduleComplete + completeid
    let patientId = wx.getStorageSync('patientid_token')
    request({url}).then(res=> {
      if(res.data.result.success==false){
        //failed
        return
      }
      that.todayScheduleList(patientId,0)
      that.todayScheduleList(patientId,1)
    })
  },
  pendingSchedule:function(e){
    let pendingid = e.currentTarget.dataset.pendingid
    var that = this
    let url = expSchedulePending + pendingid
    let patientId = wx.getStorageSync('patientid_token')
    request({url}).then(res=> {
      if(res.data.result.success==false){
        //failed
        return
      }
      that.todayScheduleList(patientId,0)
      that.todayScheduleList(patientId,1)
      that.todayScheduleList(patientId,2)
    })
  },
  /**
   * 获取患者今日的生活计划
   */
  todayScheduleList:function(patientId, status){
    var that = this
    var url = expScheduleToday + '?patientId=' + patientId + '&status=' + status
    request({ url }).then(res => {
      let value = res.data.result?res.data.result:{}
      let key = that.data.statusArr[status]
      that.setData({
        [key]: value
      })
      if (status==0){
        let task = res.data.result? (Object.keys(res.data.result).length):0
        app.globalData.scheduletask = task
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const that = this
    var patientId = wx.getStorageSync('patientid_token')
    request({ url: expGetPatientInfo + patientId }).then(res => {
      const { data: {result: {role: {id: roleType}}, success} } = res
      if (success) {
        that.setData({
          roleType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    let patientId = wx.getStorageSync('patientid_token')
    that.todayScheduleList(patientId,0)
    that.todayScheduleList(patientId,1)
    that.todayScheduleList(patientId,2)
  },
})