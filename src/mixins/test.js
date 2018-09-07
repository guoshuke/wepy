import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
    data = {
        mixin: 'This is mixin data.',
        baseUrl: 'http://glass.unimker.com',
        defaultChildId:wepy.getStorageSync('defaultChildId')
    }
    methods = {
        tap() {
            this.mixin = 'mixin data was changed'
            console.log('mixin method tap')
        },

    }


    onShow() {
        console.log('mixin onShow')
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
