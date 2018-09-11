import wepy from 'wepy'

let baseUrl='http://glass.unimker.com/api/'
let request =function (url,data,type){
    var baseData = wepy.getStorageSync('baseData')
    return new Promise(function(resolve,reject){
        //网络请求
        wx.request({
            url: baseUrl+url,
            data: Object.assign(data||{},baseData),
            method: type||'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }, // 设置请求的 header
            success: function(res){
                // success网络请求成功
                if(res.statusCode!=200){
                    reject({error:'服务器忙，请稍后重试',code:500});
                    return;
                }
                resolve(res.data);
            },
            fail: function(res) {
                // fail调用接口失败
                reject({error:'网络错误',code:0});
            },
            complete: function(res) {
                // complete
            }
        })
    })
}
export default request