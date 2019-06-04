// pages/class/class-index/class-index.js

var app = getApp()

import {
  request
} from '../../../utils/Request'
import {
  eduTodayScheduleApi,
  eduMainCoursesApi,
  eduScheduleAndCourseApi,
  expGetPatientInfo,
  expGetPersonalToday,
  expPersonalLearn
} from '../../../utils/config'

const SYSTEM_CLASS = 1, PERSONAL_CLASS = 2, NONE_CLASS = 3

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //系统化教育data
    tabbarData: {
      navbarWidth: 50,
      tabs: []
    },
    displayClassState: 0, // 1 默认的系统化教育 SYSTEM_CLASS，2 个性化教育 PERSONAL_CLASS 3 对照组 未开放
    subscribeList: [],
    subResult: [],
    studyList: [],
    courseState: ['未开放', '待学习', '已学习'],
    sectionShow: [
      [
        [true]
      ]
    ],
    chapterShow: [
      [true]
    ],
    //个性化教育data
    personalStudyList: []
  },
  /**
   * 获取用户类型信息
   */
  getPatientInfo: function (patientId) {
    let url = expGetPatientInfo + patientId
    return new Promise((resolve, reject) => {
      request({
        url
      }).then(res => {
        let userType = parseInt(res.data.result.role.id)
        resolve(userType)
      })
    })
  },
  /**
   * 系统化教育记录
   * 
   * 获取订阅情况，subscribeList
   * 计算获取tabbar 数据
   */
  subscribeInfor: function (patientId) {
    var that = this
    let url = eduMainCoursesApi + patientId
    let tab = this.selectComponent('#mytab')
    return new Promise((resolve, reject) => {
      request({
        url
      }).then(res => {
        var coidList = [],
          nameList = []
        res.data.result.map(function (item) {
          if (item.sub) {
            //已订阅
            coidList.push(item.coid)
            nameList.push(item.name)
          }
        })
        that.setData({
          subResult: res.data.result
        })
        if (nameList.length > 0) {
          //计算 tabbarData
          let width = Math.floor(100 / nameList.length)
          that.setData({
            tabbarData: {
              navbarWidth: width,
              tabs: nameList
            },
            subscribeList: coidList
          })
          tab.setData({
            activeIndex: 0
          })
          resolve('class')
        } else {
          that.setData({
            tabbarData: {
              navbarWidth: 100,
              tabs: '您还没有订阅课程，请点击订阅按钮'
            },
            subscribeList: coidList
          })
          tab.setData({
            activeIndex: 0
          })
          // reject('noclass')
        }
      })
    })
  },

  /**
   * 订阅 跳转订阅页面
   */
  gotoSubscribe: function () {
    let sub = this.data.subResult
    wx.navigateTo({
      url: '../class-sub/class-sub?sub=' + JSON.stringify(sub)
    })
  },
  /**
   * 根据subscribeList获取classSchedule , 对应相应coid
   */
  classScheduleList: function (patientId) {
    var that = this
    var url = eduScheduleAndCourseApi + patientId + '&mainCourseId='
    this.data.subscribeList.map(function (item) {
      var fullurl = url + item
      request({
        url: fullurl
      }).then(res => {
        let result = res.data.result
        let section = new Array(),
          chapter = new Array()
        for (let i = 0; i < result.length; i++) {
          section[i] = new Array()
          chapter[i] = true
          for (let j = 0; j < result[i].sectionList.length; j++) {
            section[i][j] = true
          }
        }
        that.setData({
          ['classSchedule.' + item]: res.data.result,
          ['sectionShow[' + (item - 1) + ']']: section,
          ['chapterShow[' + (item - 1) + ']']: chapter
        })
      })
    })
  },
  /**
   * 查询 今日的学习计划GET patientId
   */
  todayStudyList: function (patientId) {
    var that = this
    var url = eduTodayScheduleApi + patientId
    request({
      url
    }).then(res => {
      that.setData({
        studyList: res.data.result
      })
      app.globalData.classtask = res.data.result.length
    })
  },
  /**
   * gotoStudy 前往学习页面 携带参数：toLearnList
   */
  gotoStudy: function (event) {
    var isLearn = parseInt(event.currentTarget.dataset.islearn)
    var kid = event.currentTarget.dataset.kid
    var cid = parseInt(event.currentTarget.dataset.cid)
    if (cid) {
      kid = [{
        kid: kid,
        cid: cid
      }]
    }
    if (kid.length < 1) {
      wx.showToast({
        title: '今日课程已完成',
        icon: 'none'
      })
    } else if (!isLearn && kid.length == 1) {
      wx.showToast({
        title: '该课程尚未开放',
        icon: 'none'
      })
    } else {
      // console.log(kid);
      kid = JSON.stringify(kid)
      wx.navigateTo({
        url: '../class-learn/class-learn?kid=' + kid
      })
    }
    // console.log(event.currentTarget.dataset)
  },
  changeShowStatus: function (e) {
    // console.log(e.currentTarget.dataset.stateid)
    let id = e.currentTarget.dataset.stateid
    let key, value
    if (id.length > 2) {
      key = 'sectionShow[' + id[0] + '][' + id[1] + '][' + id[2] + ']'
      value = !this.data.sectionShow[id[0]][id[1]][id[2]]
    } else {
      key = 'chapterShow[' + id[0] + '][' + id[1] + ']'
      value = !this.data.chapterShow[id[0]][id[1]]
    }
    this.setData({
      [key]: value
    })
  },
  /**
   * 个性化教育
   * 
   * 获取患者今日的个性化知识列表 GET patientId
   */
  todayPersonalStudyList: function (patientId) {
    var that = this
    var url = expGetPersonalToday + patientId
    request({
      url
    }).then(res => {
      // 将personalStudyList排序
      that.setData({
        personalStudyList: res.data.result
      })
      app.globalData.classtask = res.data.result.length
    })
  },
  finishPersonalLearning:function(e){
    var that = this
    let index = parseInt(e.currentTarget.dataset.index)
    let planid = e.detail
    let patientId = this.data.patientId
    var url = expPersonalLearn + planid
    request({
      url
    }).then(res => {
      if(res.data.result.success==false){
        //failed
        return
      }
      let key = 'personalStudyList[' +index +'].status'
      that.setData({
        [key]:1
      })
      setTimeout(()=>{
        that.todayPersonalStudyList(patientId)
      },200)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var patientId = wx.getStorageSync('patientid_token')
    this.setData({
      patientId: patientId
    })
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    let patientId = this.data.patientId

    that.getPatientInfo(patientId).then((res) => {
      let userType = parseInt(res)
      switch(userType) {
      case 3: // 对照组
        that.setData({ displayClassState: NONE_CLASS })
        break
      case 2: // 个性化教育组
        that.todayPersonalStudyList(patientId)
        that.setData({ displayClassState: PERSONAL_CLASS })
        break
      case 1: // 系统化教育组
      default:
        that.subscribeInfor(patientId).then(() => {
          that.classScheduleList(patientId)
          that.todayStudyList(patientId)
        })
        that.setData({ displayClassState: SYSTEM_CLASS })
        break
      }
    })
  }
})