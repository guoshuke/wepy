import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
    data = {
        mixin: 'This is mixin data.',
        baseUrl: 'http://glass.unimker.com',
        defaultChildId:wx.getStorageSync('defaultChild').id||null,
        defaultChildName:wx.getStorageSync('defaultChild').nickname||'',
        storeId:wx.getStorageSync('storeId')||null,
        childrenList:wx.getStorageSync('childrenList')||[],
        userInfo:wx.getStorageSync('userInfo')||{},
        baseData:wx.getStorageSync('baseData')||{}
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

    onLoad(option) {
        console.log('mixin onLoad')
    }
}
