// components/class-card/class-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    finishLearning:function(e){
      let id = this.data.card.id
      this.triggerEvent('finish',id)
    }
  }
})
