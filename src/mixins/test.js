import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
    data = {
        mixin: 'This is mixin data.',
        baseUrl: 'http://glass.unimker.com/api/',
    }
    methods = {
        tap() {
            this.mixin = 'mixin data was changed'
            console.log('mixin method tap')
        },

    }


    onShow() {
        const self = this
        wepy.getStorage({
            key: 'userInfo', complete: function (data) {
                if (data.data) {
                    self.userInfo = data.data
                    self.$apply()
                }
            }
        })
    }

    onLoad() {
        console.log('mixin onLoad')
        wepy.getStorage({
            key: 'userInfo', complete: function (data) {
                if (data.data) {
                    this.globalData.userInfo = data.data
                }
            }
        })
    }
}
