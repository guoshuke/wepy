'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _upngJs = require('./../npm/upng-js/UPNG.js');

var _upngJs2 = _interopRequireDefault(_upngJs);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _service = require('./../mixins/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addChildren = function (_wepy$page) {
    _inherits(addChildren, _wepy$page);

    function addChildren() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, addChildren);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = addChildren.__proto__ || Object.getPrototypeOf(addChildren)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '添加孩子'
        }, _this.data = {
            defaultChildId: _wepy2.default.getStorageSync('defaultChildId'),
            childrenId: null,
            date: '2012-09-01',
            nickName: '',
            array: ['女', '男'],
            index: 1, //默认男
            avatarUrl: 'data:image/jpeg;base64,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',
            height: null,
            weight: null

        }, _this.mixins = [_test2.default], _this.methods = {
            bindDateChange: function bindDateChange(e) {
                console.log('picker发送选择改变，携带值为', e.detail.value);
                this.date = e.detail.value;
            },
            bindPickerChange: function bindPickerChange(e) {
                console.log('index为', e.detail.value);

                this.index = e.detail.value;
            },

            changeWeight: function changeWeight(e) {
                console.log('值为', e.detail.value);
                this.weight = e.detail.value;
            },
            changeHeight: function changeHeight(e) {
                this.height = e.detail.value;
            },
            changeNickName: function changeNickName(e) {
                this.nickName = e.detail.value;
            },

            addChildren: function addChildren() {
                var sendData = {
                    avatar: this.data.avatarUrl,
                    nickname: this.data.nickName,
                    sex: this.data.index,
                    birthday: this.data.date,
                    height: this.data.height,
                    weight: this.data.weight
                };
                if (this.data.childrenId) {
                    sendData.id = this.data.childrenId;
                }
                var self = this;
                (0, _service2.default)('addChildren', sendData).then(function (res) {
                    console.log(res);
                    if (res.code == 1) {
                        _wepy2.default.showToast({ title: res.message });
                        debugger;
                        if (!self.data.childrenId) {
                            _wepy2.default.setStorage({ key: 'defaultChildId', data: { id: res.data.id } });
                        }

                        setTimeout(function () {
                            _wepy2.default.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    } else {
                        _wepy2.default.showToast({ title: res.message, icon: 'none' });
                    }
                }).catch(function (err) {
                    console.log(err);
                    _wepy2.default.showToast({ title: err.message, icon: 'none' });
                });
            },
            deleteChildren: function deleteChildren() {
                var self = this;
                var defaultChildId = _wepy2.default.getStorageSync('defaultChildId');
                //                if(defaultChildId.id==this.data.childrenId){
                //                    wx.showToast({title:'不能删除默认的孩子',icon:'none'})
                //                    return
                //                }
                wx.showModal({
                    title: '删除提示', content: '确认删除孩子', success: function success(res) {
                        if (res.confirm) {
                            (0, _service2.default)('delChild', { id: self.data.childrenId }).then(function (res) {
                                console.log(res);
                                if (res.code == 1) {
                                    _wepy2.default.showToast({ title: res.message });
                                    setTimeout(function () {
                                        _wepy2.default.navigateBack({
                                            delta: 2
                                        });
                                    }, 1500);
                                } else {
                                    _wepy2.default.showToast({ title: res.message, icon: 'none' });
                                }
                            }).catch(function (err) {
                                wx.showToast({ title: err.error, icon: 'none' });
                            });
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },


            uploadImg: function uploadImg() {
                var self = this;

                wx.chooseImage({
                    success: function success(res) {
                        //生成的图片临时路径画成canvas
                        var ctx = wx.createCanvasContext('myCanvas');
                        var platform = wx.getSystemInfoSync().platform;
                        var imgWidth = 60,
                            imgHeight = 60;
                        ctx.drawImage(res.tempFilePaths[0], 0, 0, imgWidth, imgHeight);
                        ctx.draw(false, function () {
                            wx.canvasGetImageData({
                                canvasId: 'myCanvas',
                                x: 0,
                                y: 0,
                                width: imgWidth,
                                height: imgHeight,
                                success: function success(res) {

                                    if (platform === 'ios') {
                                        // 兼容处理：ios获取的图片上下颠倒
                                        wx.showToast({ title: '我执行了2' });

                                        res = self.reverseImgData(res);
                                    }

                                    // 3. png编码
                                    var pngData = _upngJs2.default.encode([res.data.buffer], res.width, res.height);
                                    // 4. base64编码

                                    var base64 = wx.arrayBufferToBase64(pngData);

                                    console.log('data:image/jpeg;base64,' + base64);
                                    var newBase64 = 'data:image/jpeg;base64,' + base64;
                                    //                                    self.setData({
                                    //                                        avatarUrl: 'data:image/jpeg;base64,' + base64
                                    //                                    });
                                    self.avatarUrl = 'data:image/jpeg;base64,' + base64;
                                    self.$apply();
                                },
                                fail: function fail(res) {
                                    wx.showToast({ title: '我执行了3' });

                                    console.log(res);
                                }
                            });
                        });
                    }
                });
            }
            //ios图片处理


            //          const self = this
            //          wx.chooseImage({
            //            count:1,
            //            success:function (temp) {
            //              if(temp.tempFilePaths.length){
            //                var tempFilePaths = temp.tempFilePaths
            //                debugger
            //                wx.getImageInfo({
            //                  src:tempFilePaths[0],
            //                  success:function (res) {
            //                    console.log(res.width)
            //                    console.log(res.height)
            //                  }
            //                })
            //                wx.request({
            //                  url: tempFilePaths[0],
            //                  method: 'GET',
            //                  responseType: 'arraybuffer',
            //                  success: function (res) {
            //                    debugger
            //                    var base64 = wx.arrayBufferToBase64(res.data);
            //                    debugger
            //                    self.setData({
            //                      avatarUrl: 'data:image/jpg;base64,' + base64
            //                    })
            //                  }
            //                });
            //
            //                debugger
            //
            //
            //
            //
            //
            ////                self.$apply()
            //
            //                //self.setData({avatarUrl: 'data:image/jpg;base64,' + base64})
            //
            //
            //              }
            //              console.log(temp);
            //            },
            //            fail:function (err) {
            //              console.log(err);
            //            }
            //          })
            //        }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(addChildren, [{
        key: 'reverseImgData',
        value: function reverseImgData(res) {
            var w = res.width;
            var h = res.height;
            var con = 0;
            for (var i = 0; i < h / 2; i++) {
                for (var j = 0; j < w * 4; j++) {
                    con = res.data[i * w * 4 + j];
                    res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j];
                    res.data[(h - i - 1) * w * 4 + j] = con;
                }
            }
            return res;
        }
    }, {
        key: 'getChildInfo',
        value: function getChildInfo(data) {

            this.weight = data.weight;
            this.height = data.height;
            this.date = data.birthday; // res.data
            this.nickName = data.nickname;
            this.index = data.sex;
            this.avatarUrl = this.baseUrl + data.avatarurl;
            this.$apply();
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            console.log(option);
            var self = this;
            this.childrenId = option.id || null;
            if (option.id) {
                (0, _service2.default)('getChildInfo', { id: option.id }).then(function (res) {
                    console.log(res.data);
                    //                    self.data.date=res.data.birthday// res.data
                    //                    self.nickName= res.data.nickname
                    //                    self.index=res.data.sex//默认男
                    //                    self.avatar=res.data.avatarurl
                    self.getChildInfo(res.data);
                }).catch(function (err) {});
            } else {
                this.avatarUrl = '';
                this.height = '';
                this.weight = '';
                this.nickName = '';
                this.date = '1999-01-01';
            }
            //            header: {
            //              'Content-Type': 'application/x-www-form-urlencoded'
            //            },

        }
    }]);

    return addChildren;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(addChildren , 'pages/addChildren'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImNoaWxkcmVuSWQiLCJkYXRlIiwibmlja05hbWUiLCJhcnJheSIsImluZGV4IiwiYXZhdGFyVXJsIiwiaGVpZ2h0Iiwid2VpZ2h0IiwibWl4aW5zIiwidGVzdE1peGluIiwibWV0aG9kcyIsImJpbmREYXRlQ2hhbmdlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmRQaWNrZXJDaGFuZ2UiLCJjaGFuZ2VXZWlnaHQiLCJjaGFuZ2VIZWlnaHQiLCJjaGFuZ2VOaWNrTmFtZSIsInNlbmREYXRhIiwiYXZhdGFyIiwibmlja25hbWUiLCJzZXgiLCJiaXJ0aGRheSIsImlkIiwic2VsZiIsInRoZW4iLCJyZXMiLCJjb2RlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtZXNzYWdlIiwic2V0U3RvcmFnZSIsImtleSIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImljb24iLCJjYXRjaCIsImVyciIsImRlbGV0ZUNoaWxkcmVuIiwid3giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsImNvbmZpcm0iLCJlcnJvciIsImNhbmNlbCIsInVwbG9hZEltZyIsImNob29zZUltYWdlIiwiY3R4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInBsYXRmb3JtIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJpbWdXaWR0aCIsImltZ0hlaWdodCIsImRyYXdJbWFnZSIsInRlbXBGaWxlUGF0aHMiLCJkcmF3IiwiY2FudmFzR2V0SW1hZ2VEYXRhIiwiY2FudmFzSWQiLCJ4IiwieSIsIndpZHRoIiwicmV2ZXJzZUltZ0RhdGEiLCJwbmdEYXRhIiwidXBuZyIsImVuY29kZSIsImJ1ZmZlciIsImJhc2U2NCIsImFycmF5QnVmZmVyVG9CYXNlNjQiLCJuZXdCYXNlNjQiLCIkYXBwbHkiLCJmYWlsIiwidyIsImgiLCJjb24iLCJpIiwiaiIsImJhc2VVcmwiLCJhdmF0YXJ1cmwiLCJvcHRpb24iLCJnZXRDaGlsZEluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsNEJBQWdCQyxlQUFLQyxjQUFMLENBQW9CLGdCQUFwQixDQURiO0FBRUhDLHdCQUFZLElBRlQ7QUFHSEMsa0JBQU0sWUFISDtBQUlIQyxzQkFBVSxFQUpQO0FBS0hDLG1CQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FMSjtBQU1IQyxtQkFBTyxDQU5KLEVBTU07QUFDVEMsdUJBQVcseTRVQVBSO0FBUUhDLG9CQUFRLElBUkw7QUFTSEMsb0JBQVE7O0FBVEwsUyxRQWFQQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBQ1RDLE8sR0FBVTtBQUNOQyw0QkFBZ0Isd0JBQVVDLENBQVYsRUFBYTtBQUN6QkMsd0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ0YsRUFBRUcsTUFBRixDQUFTQyxLQUExQztBQUNBLHFCQUFLZixJQUFMLEdBQVlXLEVBQUVHLE1BQUYsQ0FBU0MsS0FBckI7QUFDSCxhQUpLO0FBS05DLDhCQUFrQiwwQkFBVUwsQ0FBVixFQUFhO0FBQzNCQyx3QkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBL0I7O0FBRUEscUJBQUtaLEtBQUwsR0FBYVEsRUFBRUcsTUFBRixDQUFTQyxLQUF0QjtBQUNILGFBVEs7O0FBV05FLDBCQUFjLHNCQUFVTixDQUFWLEVBQWE7QUFDdkJDLHdCQUFRQyxHQUFSLENBQVksSUFBWixFQUFrQkYsRUFBRUcsTUFBRixDQUFTQyxLQUEzQjtBQUNBLHFCQUFLVCxNQUFMLEdB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LENBQVlxRSxNQUFaO0FBQ0EsZ0JBQUl4RCxPQUFPLElBQVg7QUFDQSxpQkFBSzNCLFVBQUwsR0FBa0JtRixPQUFPekQsRUFBUCxJQUFhLElBQS9CO0FBQ0EsZ0JBQUl5RCxPQUFPekQsRUFBWCxFQUFlO0FBQ1gsdUNBQVEsY0FBUixFQUF3QixFQUFDQSxJQUFJeUQsT0FBT3pELEVBQVosRUFBeEIsRUFBeUNFLElBQXpDLENBQThDLGVBQU87QUFDakRmLDRCQUFRQyxHQUFSLENBQVllLElBQUlqQyxJQUFoQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNvQitCLHlCQUFLeUQsWUFBTCxDQUFrQnZELElBQUlqQyxJQUF0QjtBQUNILGlCQVBELEVBT0c0QyxLQVBILENBT1MsZUFBTyxDQUVmLENBVEQ7QUFVSCxhQVhELE1BV087QUFDSCxxQkFBS25DLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxxQkFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxxQkFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxxQkFBS0wsUUFBTCxHQUFnQixFQUFoQjtBQUNBLHFCQUFLRCxJQUFMLEdBQVksWUFBWjtBQUVIO0FBQ2I7QUFDQTtBQUNBOztBQUdTOzs7O0VBL1FvQ0gsZUFBS3VGLEk7O2tCQUF6QjVGLFciLCJmaWxlIjoiYWRkQ2hpbGRyZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCB1cG5nIGZyb20gJ3VwbmctanMnXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGFkZENoaWxkcmVuIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+a3u+WKoOWtqeWtkCdcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgZGVmYXVsdENoaWxkSWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZElkJyksXG4gICAgICAgICAgICBjaGlsZHJlbklkOiBudWxsLFxuICAgICAgICAgICAgZGF0ZTogJzIwMTItMDktMDEnLFxuICAgICAgICAgICAgbmlja05hbWU6ICcnLFxuICAgICAgICAgICAgYXJyYXk6IFsn5aWzJywgJ+eUtyddLFxuICAgICAgICAgICAgaW5kZXg6IDEsLy/pu5jorqTnlLdcbiAgICAgICAgICAgIGF2YXRhclVybDogJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUR3QUFBQThDQUlBQUFDMW5rNGxBQUFBQVhOU1IwSUIyY2tzZndBQUhzeEpSRUZVZUp4ZGV1bVBaTmQxMzkzZWZXdnQxZFhyelBTc0hKSWlhUzZpS05rV3RWQ3lKZHVBalRoQllrdFdGRGdJYk9pRElTcklnZ1JKZ1B3ZCtSQWtuNXc0a21VNGNpaVJGRVdMRUVWU0ZJZmlERG5rckwxM3JXOS9kODI1MWVSSVNXR21wNmE2NnRXNTU1N3pXODU5K0t2UFBvamN3eVlNdDMxdkxxdWlhU2cxeW1EMEt3L0dFY2RZdmxjZnpzbXBWZnJ1dTRNeXlIVXdKc2p6ZUlBelRGQjhOOTFmSGRwT3U1MmxOTlBUUng4OVJ3aDgxR0JNRVNMV1dvejFhb3M4Zit1WnFpcHJXWGJyVzcvenFmTHVWQ21yTUxIR05sYkRtNDJ4RE9NQ293Z2hoVFFuakNnaFF0KzNDRFBETlpYNHE4OCtjQkpXdDFaZVAvR1FQV3d5WkNWOG5HRUMxNUphSTRROWFnd21VbXBrRFVLMDF0YkRTR3VpdERtM3V2SEtDeE9oNm5oRDlIcFVTanM5akk0enpVMS91RjUydWlqa25GQlluSWV3U0ZqdjdmU0xWVjBxSlREVHoyejgvVjU1eEdnZlk5S0luQkNMM05vd3JCQlpHdm5kVXFiV0drSW9yTWRpQzNFU3lNSzlvT0d4bVpGYWg2WlYwUUZQRjduRmhqTGpQdThlN2duRWpUVmJsR0k2UlpXc1YzdCtHRUUyOVdacjhOcWI0MFZlY1c0SDdjQWJHSS82V1VuVFNia28vVjRQRVV5VE1PNTBUUzl1L1h6NkpRZzZERU5iRnA5NzRLZDNqeFlXdzlVRjdLVXdOU0h3SDhpR0lkalh5bjAxckFLK25URjJFaVFzQ1MvTDR5UXNwQnZTYllKUW8rUEpZdjNoUkJGVm9XcTVaYkQwWmRRdURWUnFKV3BJRGZhNTBvb2EySmRHcm5mWEtTZFd5UC94M0sxK1I4ZmRRTlF0WTByWUNveUNJQWlON2F5TjVQbFI1L1hGTTVUcVJxSkdONThadkZ4SlNBMmJWRk5LT2JKRTJ4TFoybGdLbVRiR2ZUVjJGZU9lRU9KcXpEMy82amNmUXRoOEZEZXMwcUNDck5VaXhFeGNEQSt6ZVR0bThKcGJrdGJMME4wbDREbFpGdXlIKzJCc08rcGI0YjM2OHN4YlM5YzNQZGpNTkVkN2R6dU5YSFJiSHZVaWhicW51dlVrK3BKV0hHRW9Ndk9adGU5UFN3SExRcFlibE43YmNHdmR4WTB0b0pXZ0ZKSDFqSGI1VnNwOGxHa0kyajExL3hkQ0dFME9EckxCU3ZJUXBzcEQ5U2hvUkJad0NobUdnbFpLd1Z1MWNTdldDbEhJbU5hWW1ENFBpbm53eGh1NXBacTJzdUdHcjRTWlRvZlNzRWFSZHNJakxrWng5KzZFTElKem1ERWo2dCs3L09iQjNHTGVRa1FwdlVqVG9wMG9SdG5kdmJMZENTbEYrWHlHYldBcG1jOGJyZGo2R2hrZkI5cXJJKzUvRkxSTHRWYTZETERuQnhWaC9zL2ZLVDgvU3FhcUZXNFNCVHNwSmJXdTBDcDRwaHJZUjhnM1kzNG5jR1h5NHg4ZzVpK1FMK1lUMCtEUzgzc2s2Qm5oR1VUakxnU0F6dlRDYStPZTlaS0dlTkJpLytEQkg5L09TVVMzM0Q1WmRUeDdKMGxvSy9DUGpndEZkRUM0c05BR2RuKzNYT3RHUXBkaHk2c0syVjlOOW0vcnczSDB5NkRycGpLeUZxYnA5VHVpcWZJNXV6dHIrclg4OUlWUkJwdlZKcFloei9LZlBtKzZneU9LYUpIVlZ1QUZpcUFSUmRSMCsxQ0hwQzZDUmRiVlJoTFNqZ0lPK09CeHRkMk9YeGtQS1FvYVhjWkIvWThlWDFUR0JwNCtudWtnOE9ybVlEcFhOMjdrWWV3SnlKdTBFZllBMjlJU2I1OE9TZEJ3SEk0UE00bFZuY1oxRTFaUXVSK2hoME5sS2VYQldIaGUzZSsxQ0QzZXZkMDZPRDQ5OU84OHNlNHoyaWdhWEwzbUZRYUhmbE5EcFhpMXJrU3lTZ0ZIWndmeGNMMUpLNytxV2twRnZtZDlqcTFQaHdFMmdsNnRWa3NyLyt6alUwSE56c0plR0pyZCtUR0FtM0hkNGRwYkcyZ0JXd3QxZEN5QUgxWmEvbkExT0Q0V1JaYXRuK252MzIyQ3VKcnZBeVdvK2RGcVpRSUkrdkt5a1dyc0lKMWkyRDZEci8zaWRtWTNsTzIyVFNDcitlVUhKOTBPclNYYnUrYW5tV0MrTkg0SkcxaWIwRG93d3VrQ2QxdEJJeUZWN2NSVGZwdXR4cmFZMTN0Mk0wZEpqK2RQbmpuVTJGY3NKTWoxLzFhLzJobnZVWUJjcURQclFBQ294YnJmV1lDOHhVU2tDd01BSXpncGFnYUw2L2FSeGFTYSsyRW9wdU1oL3NxekY1Y1ZMVEdpRGdxd0lTaXk3amx5cUlieHUxZnZuQW40K1pXMTE5NDNaV05tVlJwMHJHSnhVM2NoVloyV0R6c0UxQVUwQkdzbVZHNjAranNIUjZiOTRGVFJmL2JrL2tJdWp1WlRqd0VLb0kzUlZ0TUFWYW1zV2xSS1FHZERrcEFEWmdBVGlCMit6a0RERUovTmpyVG44MXUzQzIzUTV1bldhdGZLR3QyOW5ZMm5hOHFHK0krL2VjNFJEZjRRRVFIUHNjTUdzcXdYQnpRRUtnelRmSzdNdEgxN21yYjd2ckVLR0E0UVdpb09PK09BVU9aUGZXeVVaZVhiTysxNXZCYWl3U2Z1dStQYjJUQnA5aWE3aGptdUFVNWJKc1hobEZhTzgyQ05aQW0xQmlCUWczQkFkL2VxdFZXQXk2YWFzNnJXYWQyT0I5Tmh4S0RjNFNQem1hN3ovandqK0N2ZjNMNEhrSkJzaVB0RHJFVG1JOVIwT1FEYVo2VHRucnJYRGZxUWFpd1FkSnVHcjkyaGQvSnRIdkFZb3k4LzlBWWxLKy91VkhsNXlIYkdEVktmK053RHUva3hoRW1wSXlrSDcvQURtNC9vbWlpb2FZT2todDk1dDI1bVRSNHZTaDBHRzBpd3VITjEyUE1zWk1hRXBoWnB4bWQxKy84TjJvVk1sNWM4aWN2OU9IbGwrUURKRklJY01hWnA4VGJRMzdWcnhZNDlvK21HUWlCNjJGY2ZmZjhvUDVqV1pSTGhSU3JLaFJFYW5kb01QSTlRRUNwV1JZd0RLYlZDRDJocVhDNDhBR3pqcXZvZVNjSHJQZ1VjdG5HUDMzeTd1SDQ5bnFGMHVJSzFWZ0FxZEpuV3ZPVC9mOUJMb2ovWk1hb2tvZ3hnZE1tdmNISGdXSUhXMnBHMk9GdDBQamhxVC8wdGk5U1FOVis4ZENEMDhmdVRGQ1NFcFhiWUpiVkE0MmxmN1dhZisreVp0L2Z1RXRxNGZFQ21sM0RoWVFxdDQ0Z0pPUldBWGRWQVZicFhwRUZuVmtiUC9kVk5GbytLQnMwMVFBZUg5d0tuQ2VWVDZsR2J1SnBHVnQrVEg0NFhHN014OElvS2ttZEJpblZpdWp1cnk5eU1odEVnR3I3NXVxbUd2OGFIR3dyQUdLSFA5WDV3cDlTSVJCL2NmRzh3REVQZkFFTjZLQmhQYUZWREsweCs3OUxnQ3F1OG8vWE8yVEpUQzN5U0dvT2hKSlpwY3V2NFVHQkkrRUtiUkIxcm9oZStmOUNKd2xTWnhxb3oyeWtqUkdjNGJjU2czemtZMDQvUXcwQkJ1ZENiMmtxQVNpTzNSbEdoOUt3MFZQS3FFVXlZdlVrWWt5QTk4eVY0Y3h6SDhDRnFzbC92UG45Y1lJRzhXN3U3N1c1Z1VaM2xuaXg5a0pOYWhFOXZpQmpwdWFESjVjNys0dkJFOUxpK0ozaFpnTWdvZkFMVjhKTWlQT2oxZi9FZTJydFdBSGFIRVp1QUxMWjAxQWZpNDBFOExrdUdUUXVhRnNyanZxVkswbmpaVytsY2JhNlJJcmR6NFpLZ2hJYnJIeHlFSGdINE9CV3BxcnJ2RHdQdW5Yek5GNGV2Rm5LMm4wUHJaNkpHVno5STI4R3FrZmI4SXkyZnladXZuZnY4Mlo4WEVzK2JablJ4V0ZnNVMyZXUzb2gxWWd1MkVjUi94bTllSFQzNVZNWWlQQzN6WHRSNTRkdUhBc1dTZ0Z4eW9CWUVhblVBUkVWelFUaVd1V0RXTHNubEk4VU1pZFlBTjBlSEZlakdGc2RlUW1WQmRxZStrQ1JtekVQbkEzdDdldUYzZXUzWXFVU2hUaDE4YitNU2FNOWduSSsxMDM3UUVRTGlNZnVyaytPS3JNalRNYjJiYTRiUko5YzhVR01xam5aUURwaTk3QnNvS3RDMS90VlhWeUkySjA2THlxd281ak5rZ3FCZ2hCTlpHd2JxZjlqbnhvRFFjNG9OdklkVHhTZU1lQkkzQnJOaUFTOEwyTWJqTVQvWWdYOXJhOWRsRFc4WGdOZjl5QVRidjZIYm81UDNoN01yN2IxWFNUY01UMk1wQkNVK2JDdTBwc00xdk9ScEZ4MlFuZmRvWXpMRCtQb2dKY3Jua1pJTjlKWnl6WVZmK2I3c3RpUWdJRnd6TDFGWm1NSXF5UUVIVDRBQnFJWlRTREpvS01zOEFyYkx2NmVuOWNrN0NBQWMxQVg4Z2ZiR2dCUHdJdVN5Y1dSbEhlS3MrdVIxOWZ1d3NiRE5kVjZzMzNoeGE0VkVsdzNXWkRjLzhvSGlwWFI0OEtFK2Q5MG1CWHJNNS9QQ3hCNVRaWWtNZWVsbW9FelpJcXcwYllBb0dtUVJJaUNMb1hiM3BBS09GUWFVTkRRQUZDRkVBZ0JQVndiQWNtZytnVXBaNEQ5NTltSGtTTnNzM1FsVXNBK0dETmxmdXRvbGg5UUk4eVhQaTY3WG05bFAzWUVsV1pMbXhhWDgzVTIrTHpiTm9xd05nczBFNVEzNGppMnByQkVub0FSL3BXSVBNRituRlE4OGkvM3YveHcyRUhXcEdEdXp3UnRiQVk0REM4eEtMU21ENW9NTXdyOFgrdlZjRG53dXN4eEZZU3NLRitQWldpRktDUHF4WmNRRS9mS0JsNFFuWUFFV2xVWVkzK3NMOERQWUZTUGdQTWUwM1Q3elZ2WXdiR3FhMW8vcDExYk16SnpGV1ZHRlVaUm11VUtRTENpVkVuU1lCVld6SkQ2M1Z3dDdCdlNpWmkrOWl5ZE5CdGhQR2RDT3d4THMvdURHMEx3T2x2SGdnSXVWWHRmaEZzZ2lFTVVHVkc0TFJBdUZLdmphdHg2L0Z5ejAwb21KT3ZFOEdER0xoRGExRk9Sc0QyaFBIRTVuamFtanVOY0xvM2ZrWjhIZHpmUHlpZXFsZ1lkTmxYNlFCWFZKUHZWYjhieVlUZk5hZ3daMHV3ZFhxSlpVY0pKMFlsVjg4OFpZTjZFemVVWkJMaHkvWU9RYTlPU0J3RDA0YzNkdzdIdCszSWpVRDd5bXdGdW53bnhtd1htNG9KZHNad2xkaWhqQWFBTDZGaFFYdytBeWtWaVdoL1lwYTBBY1lBcGZDNndNTzdpVitHOFV6elJlK0xIcGN5MVpFdE84dVF0UjRvK2Z6dXV0TUJkNUlkaEpEQXFzS0hKOTVMb056SS9yVk1nOFhSSTQ2Tk1BWWRlVG5JN3FaZzZjeDJpd2RJMjVvd0xhc2poa0N2L2t5dTE1Wm4xTWgrZ20vcWZmZWhyc0g4Z0pvS2o1WkJhMlJCSVNKWEZlcWpMcnJHMGtvRFdVTHB4a3haeEJuaHp4WXNDN1VkSzZycDdJcFovcnpxWDBsVTIwZjJXUEk4N1B0MlhiTDBzdjlzN1VCek1WZ3BqQUtHMGc2U0JlSVIvRmN2ZnBpVnFDQnlVUjFLRnJHS1IvdFpGZ256L011c1liU1VZa2VmN3ZQcUNzWlhTSXYvWVh6elJpMTZCRlpWRWNleDUyK3dKdnJ4bzBtMEJpUUlPclZydlQ3bnJHTnE3OG9MSkIvTUI3cUJmQTV2Q0x6OTlaQWJXS21nYStueXE5cWZjZTZPMkFxendVZk8yU0Q1MDVid29sSTdRRXdRK0Z6VktTTGRWN1E5eEFvNzJrZDNJaTZCME1ZRWMrZ1B5TUp6S2ZYMmgzdnZ2dDJ5SDNyY2Rkei8zMlZ6YnZ1OWhhbEZXVkNjUm9XVmV0QkxMRFBBOVZsWUMyYXlTdDVsS2pGbERIMm9idml0Smd6NHRkd2hBVllySGVHcTNUL0w5Y3UxQlVJSzdOSTYzc1VuUmdUWFA5b0hQL1UzM2sxNGVaY05JQUtFQzdBWldoQlFBc3dXMmZWdVBibVJHOXc3djFVMThZVkdybTVoM2c0QVBhb05oRnJQTStpOTk4blV6MmpxRDZrODVnYVcwSS91d2ZyYTJ1TElISUZaK1RwZEIzQWNPQnp3cVFBMEFEV1owdmFDbjl5U0krY3dwM3dzV3d4UTduc2xTdzMzR3JWMkVibVVxdnJVVFBYVG1WbWZhVHZmUWMyU2RLdmJrbkhoemg0S0VOQW9pbjhGR1dXUlJpWFBRN0hoUWNRNUdvL0orODhBSFNMVVE0UU0xd3RMajQwQllJREMzWStsYW9kZk5YLyswcVpEenc0bVZ4WWg1MFhId1E5T2YvWUsyN1JvT1FBUk11M1JvQytRc3dMbXBOckFjWnNsb2Q3UEo1N1JOVmZPRTMvZU5VZUFRQkpXdWtzd1VyeXNpajQ1WFJnNXFOMTF2eDk5N3VDN3Q2c1NQUGlhdnY3TEdQbnpWZ1R6NDRRaGVmOHEwT3BDNXZYZDJkN1VKaEFSZmJ4UUpZT2tTbTdRWXhBRXJ1UmRtSU5zWGFvd0dVNlNLYnd1S3hGemgvcENYeEV3K0JGeUg0OS8vRmVyc0ROS2FoTDR3bW9CQ2daVGtIancxWmRncE01TG9xY1pyanVPTnRESlVmdzNWSXhJSFhDT3c2TmZoNEFrQ3FGbW5VVy9GT0Qxcy91bkZxSVRvaFlBeEJUeWR2ZTZxNE9lWDlscmw3Rkc4L3RVdXd1ZjVEMlQ4UENRd09ydVJHQTV6M2tac0VMZUk0Z1FhWGdzSU9SaXhCaHMvU08xWmh4V0REVFdtTWlKaENDNDBFL3NUdnJ2Y2pHU1JCbHR0T3h3RHdWWVd5bWp2WHdRQlRVRkcxTGRYVHFZMmpZRFhPQ0RPblRvTVBOMkJWbENTNmFaQUJwbFNIUjBPbHhlVUhleHQrOWUwYlQ2QUtiS0Q1L0hDM3JTZnZIdnViSy95ZE85bmxMWDV6SjkvOEJBNTkyVFJLcWM3N2I5UVpnQ0hJTEVCUkhkb0c5dGdOc0Rxc0R6MC9tZXhBQ2xGY2VwU0NzRzRVR0VWYWc0czk5NW5IaklaWG9KbnZiSTNpc21HRERoLzE0NDNlVXRGYmp5Skh1VURNQ3hYOThJZlhORm01c0pranFqendFQ1JRVFRWYXBlOWQ3MFZobnBmdCsrNUx1cjU4K2NyV0JNYytzSVhPSCs2eHJqeU9pSGp6VG5wNU83bnlYblh4WXRVcjhqeFdiMTFwTWQvNjY3YlQ2L2lCRHdRRWdERkxwK3ZybzZZcHFqczNiMlZJMTdhYmNEQWNBdHJlb0hsdEMybnd2L3JQVHdBTVVGVkphMkh4VU5lYyswV1ZjODZrY1NwS0tZZWFJS1BjSEl4QTVYaWNzdmZ2NW1sVlJERnBGa2JTbG1ucXNteFhLbnpzRVlkczFOQnVxTC96K25sUVpZajdIblNSUEJ5aThSYy85L1RMcjcxNEtteUlMbG1qYm1RbFRiWVB4eE1RaHVjdW9FNUwrejZmNWMzeG5wN042aURwZXhqZjJEc0lmQzZrVGpqTkdrQkpuSlVHZitQZlBLQ01vejJCRk1EdUtCcFdBcFMvT1pnYzhTQ1pIRFZhMFlOWitNVERnTS9tQkhFNGRiT080YUQvWC8vWEZSYWN0VTZuTVZjdUNELytXSWQ2TmV3M1FDWEE3MFpNL3VmN2o0QXB0YktoV0FYWkQ3NzIyMmZlT2d5TXlVV2hHTXB2dk9QYmx0cmVrc08rYytQQWNQTmNMOGNmYUhLczY5b2YxMkFlOVBiUUY0MXFOSnBWb2JFeC92cS8zR2FHYVF6VjRpaDFKVnFCNXB2SVNUcHVabE0xeTN6aWVVVmp6NjdvamRGZzN0U1VWZ0VsVUhZcmZvdHdrQWIrZi8vT3drcFEyNmdUZWxzOVQva3A5YkR2eDNXVG5ldWYrc25CNWtGS1QvUjN2emY0azRkK2V1MTRtS3QzQUNneFNjQTFJM1I3MUVGSEUzQzVHQkZQQ1ZIbXVxNXNsVU1ldXBOc2lsd1NhZVJGak9HcUJrZEM4WjgrNjl3NFNBMjBkRUhEbkwxL3ZiandHNmNPaWpHVHdMMis0Z1UyZENWY2VldEhsV2hCSGdTUGRMOEROZUpZbGhLNzJSKzFRL2FYLzNzWHhBUkl6UHY3Sy91bTVlU01zWnlqTmxOdlp1ZmQrQW5lVE9rWHp2NmszZi9zM2VPL1JrNVhNcEE5R0pRVkVmQ0dYR3J3UjRzVW10d1V1Y21xSks4VE4zaHlZejVBeDVCYmQ0V3lFZmpyejU1eGN5bnNya3BCMnlKNmNEWHBlY0ZlTnE4cmRIR3J1YjdUOTdpMmdxSW9WUUdJUjgxREVmdXMwL1pQcHRwVlUyK3Y5MTc2Y2VGRzN3Z25YdEFQeVpIbXl1c3hESm5VVzBuNDRzRW9pbHZ3NjdoNDdaODg4NmhzYmw0OUhCdWNMcWY4Skp2VWRRbUtEWEprZ0hzQnQ1cUs4UzdvSmdQTW0wK0NzckI1UVlzQ2MwLzEyaGIvODIrZHNjd0pVbGpFaVYxMWxKT3lhOVBVcU9aeHUvbjJvWkNETXJTQmlXWnJvNFF0aGUrdlNsbUFtRUVyL09Fcm9JbjB2Vjk1bUd3bGlmTG9udkM2QVMzS3pRbGZCY0hVWkR2dDR2bFBQblh4em1RL0NRUEszSlJlS2JsNzNidjRvR21CZHREbzhMaTVPU2sydXlBelE2N3dZZ29HSnl3YVhXVm90R3A5VUR4LytxL1A0SThlbEpEbHVZRzlON2pCYmtxeVhBeDBxM1FIT3FBdTcwVUdEM2VhWnZDb0ZYenZ4Y0lQdlY5eEV1aENyeStvM3BleFp5dWlna1A2c0JkRjkzZGZEcnc5U3h4Z3poZTFxRmtNYlNDeEtvdDJoemNTMTBLVnRjMm5KazRBZWtCNDJtblZrUTJJbWpyMGFIOEFWb0RnUC90MzUrK3B4SHNPQU53WjZBRlBnZkNpUHFnd04yTWs3bmpFS0NtcjVibmdzdFFhc3pvY0JBaStrLy8xU3djaFZKMzk1WklpajYwbjhRM05vVHh1N2l3bThTT3RwSDIvOXpja0VvQ0JTZWhWQUJZMXFBU0JTSmluaG5EamMzY3FBbFZTVlhwOFZIZEdVYWNOM1VIVEtkOC9Ec0JwVU5KRU1jVi8vdS9QRTNCQXdnMUw3MFhzc201Y293Z1FMOWlOVitDaldpcVArVUkzMnAwc0FzMkREWlNKbC96c3VRTVVySWtvL2FqQWx1T3Y1WHp0ZEgrd1kzeG01TmxPNzRXakFmZWlOZjEvMWsvYklyWGRFUFg3dEtvVktPYlp3aFFneTBydEFTRXBsSlVxREx4cG84NXUrN3F5aTlyaWlzNFdVVlc3a3pzZ0IveU4vM0FSRXF6MUVvTUJ5elFWcHZZWlFJOXVCNk5hVHQyRXdtaXBkVC9wcWhKVk5vVnVsMjdHQVpCRDIzNzQ0dC91Q1VDNHRxc052SndtT29laTBmWktiMytQeWxHTElybmQ1ajhhcjdyR01YVzdmbXRyV3c1aTRTZGhKV1JaNm1JaWE4TW5zeUtyU01CWVNIalZsQmEzV2w0V3hOUW9Ca2hiQ3dsSkU2WkhRTzc4K2IrOWlLQU1mREJscGhKa3F4M2RPS3I3ZmRMQ25Wd3VmREFGa0RzTmlrV0dLTG55OTlHcHA0N2cwd1RoZ0htaDUvMzBwUnR6bFlTdEVEc0Q2UFlFbGdMRjJJdkQwT3Z0SGhSbzJNT3FPTjFydlRKZWdmM3hoRWo0T0orK2RYcXRKWEFaY1I3aTVzS0YrSENzZXhIZVBTeXlQSkdxdVhsWUlobFpMRDNQVjQzeGxpY1VRcXdBUTRYdzhoOThlWEQyL28zS0ExbElFK2IvNkxuaTZjOHpETEVTWHRSVkkyM29rMEtKRU5IcmJ4QlRkZkRHQVZRQjVYYXQzWHI3MVluRkErV1gxRnRPNkZ4cDJmWGVhSGNuWjZEa01SYWNrQmhrbG5malVKWCs2ZTN1Q3crZkQrWUNEQ0NvSDN5OFg2KzBlSmpnVnNkYjFLQXAzYVI2LzhDTUQ5M1JmRm4zQzhCWnlDaXFvTElCRzZFRlFVUlFJTjdmZk9KeW1CeEdJV2pOYmxyVTZZTDJSeDBRWUE5dnRJbzB6VUNXaExybEsxa0cxOGNFWkM0L3RYdmk0dGE2L3ZXZjBpa3E0aGJZck9XQXlPSlJwNzhZQS9BeDhCT3E2ek5LQmdITForVk84dEFEZzVjN3ZkcTNPQWgwVm9DWUFmMm9vUjE5ajVZT2xHaVIxb3NwWFV3QVE2Z0EweTk5alZrUXlHNjNDWDIybktNNUNlUlM4K21uTG9GTTJ0cHNHdVBQWi9ESkpnYTdGWkN0WHJzc1UzQ01BT0toeitITjc0eVJoN3oxTStQVk5nZFordUlMVXg1RnBnMWJoeHRnS1lUN25lNTRpbHJVcTBMb1dBYmxzdDZsMHJKcjVTWVV6UlByTi8zMlhZWk5wWkNzVEw1b3BDUlJDS29lMUx4UWJoVG9qa0ViNjFrWlpvdEtWc05HdUZQOEpOWkJKT0lJdXpPWjVSZ2JQL0hNT1psWExBN2Q1QlRBcHBhR0trQ0xqNDlXbUxKVlkyQVRvT3NBUHEvbkVocE5GazJuMjRaaVNDZnp4cSs5VG1CcUJyN2ZBaWRiT3hQK2FrUkpPMXFLRGJQZURvN205YXo5Q0d4RXdxK0MrdzhpK040S0pHa1Eyc25jN0IvV3loMEo0VmFQdEVKYVFHT0NlRzlRVTNwWmlwSDBzam9rcEFZWHp6M2pSOVIzNW9MaVgvL2RjN0E1R2pRYTg1aUhxWWZLb213cWUzOGJvSXJQckJwNVlkM1lyTFk3QUo3Z1YyTHdFbTdCZFc0dEUwdE9pcUVlYWduY3BHc0p0QkYyK3Y3SnVBZWhacVBidldGL3plYzAzNzBwODcvNzhxZjdvQkxURkJ0SUNaZ1JpZVo3RFZUOEp4NFBad2UxQmJYb2hzREp3WjRHeU01RklHVEltQUI0Qmk3aG9lLzVOZ29JL3NmZitLU2JwVGpwVEp4aGR1Zjk0TEh6OFdHWkJEeGNFRFR5Mkp3ZUhrT3ROcndGYXB1RUlTTUE5TWlkbm8ybmZxL240QUtDSGsrdzBzQlFyTnYzM2QwZHk0RkJOL0VsNlJ5b1ZVcjRhZnVkM2paZHpFVUlKR1ZaVVlBTEJJY09DaDhETDIyZjd4dGFhNEdiWE9EYWpxZHlCa3phckMyREZpRHhLR2QraURsSW52LzRuNTZlMVdoL0lRQ3RHVGc0Y3pLWGNJZU5VRitBeUhBVnBZSDdUQnlBR0xjZ3lTUE0vS1FCME0zM3ljOXVMTHdZRHp0UU9aNmh6aktrRlVzWHVOT05sOHJBSGRkZEduWmVMODRCRW00MUw2cmdHQzU5Ymp0SUc1cU9hODlIdDNacmtQeVBYK3p3Z0IxT0duZVdEbVY1RFBYa2JqNDVQdWhxMlFSZURiR0M2bUFCZHVyeTYzOTRPdXFKWlBOaVZUZmpuS01QNXlsQSs1bWhBWEdIQlpWVWhSUzE3L1hYdXZHMUQvSm10d1pGemtnSGdzb1dVN25hOVVPeE50SmxUVlhoQWRjREFveTZxZ0xCQjJZTkNFQ01SeHRQM2lsYnBzNksyNjgrL1Z1UVRnL3ExdTJ0UVB1N2hRZFc0a3l3Y3pCdnRick1NMGUzNnNGcEVvUnhkanpQNXZFOFQ1cGE5MFpxcVlVZGVlRS8vb2YzTTA0eG1ENUJocWU4aWFJU2VCanBZU3h2dm1XcUdoSXM0d2hlaVQvWXUrVW9oU2JPUE5kZ1FVSFMycVlpcGk4N3EzSzBFczNHYnEzdW5oVWxwMU0vRFB5aUJJUG1nOWw2K3RLRjV3OWpZL2pwOEx0dVNxVWMvQUtTMTRXZXpzcU5pLzNpMkUzZW9LaWt0SGtOYnMyNHVhSEZpd1dVRDJlNndsR1BjOUJteXdPYlAvcUx5ejU0cnl3aUFENDJuQjdQWmsyOUhFdUZJSEFKYmJwUnJreENzTjQ1U0J2bGtjaldyR0RCeHpTcEVlSVFvS2pTYm5oNDlteTNjTDZHdWVVRUVsUVdnRk14SXdmVDAxQURUNS9mK3U1ZWw3TkkzdjNiMDZmcWJDNmg3RHBlSytnWTZpa0ZKR0xRT0pVQXc0VFpZWXU3RXdXQzUzTnhPRnMzT0FKenpTbmxuZ1VDQUN3NHVSMElWYVVVZWJPaHQ5T3NtWlozM2Mwc3RnVXN2NVJQcVJ2dDZERmZCOVN4UWNDTG9remk0TzROTzUzRkJzaUI0RUgzYnBMWUlnY0VDYXN5c2FqMmVCMUdBRnVrYkhvZ0VvRFB1UCt4SGJERjFXeVR2blV3T1c0RmJIV0xCNUZudFNoU0RFMVpWOEJwMktjNmpnT3lIQTNYVFhOVTFtc3JVYTlGOGhUU3dZdk0wMGovOHRZSlFOWnNUdzF3ZUhBNGxVU0QwUm9NeU9WSEx0K2Uzb0RHbU04bEFlK1MrT0RoZW9NZ0srVE9EUURKZXJyb2lMcmQ2VXpUeWF3RktCa0FqeWExdWhYeURlMThEY1JoT2kzZUgvQlRtUDB3ZlFoMDFtUDhkZE16bkp2clA4KzhvR3dRQXFXUTV5cWR1M09WYkNGN1EyZWNJUmw1YmZzZHRMNFd5VlFaV0lnaDA3bDBKNlcvZXIrSE81OHk2c0p3cFpSNFZoM1Z0bDZsYXhtWkM2V0xVdWJUK3RSV2ZIRGNBRzhoRUlZeXlyTGVQSVg2Qjlnb2F1VkhYcWwxbmJUUTZ2cnlicmFPT3dRam1OdWw5RHM2d3UvVm53TEZkeW00NXZ2SFNSZTdHejJNVlRYTm9mWTk3dnVhKys3bUtJRGQyKzlXOENHSXhoS3h1ZUtsRlNrTDU1THlxdklKdzEvNTVnUFl6VldkVmRGZ1F5QjRSUWQrTkpGemQ5RGNlUDFvbUJXSG9Ha094c1dWSy9QdHRTaXZlQ2xCVFBVZzJqTXRxVklEdk1uWDVtZE9oeUREazdpcGF5cWQ4L0tjNUNPK0d3MjZqTmpUM1lmKzhncVBmUDdsQzIvdlp2UGx2Ukx1akFaVThsTE9FSU1xYU9ON3g4Y2d6bmR2K0hrbVppVy9jQ1pmbEVLRGNZRWdUNEkrU2ZaR3NqckxzOHBrUUMvR1RUbTBNdmpDMUUrMVdraGIwS0M5M2hGSzVpVlUreFFJOWZCV1dCV0ZSSkozNjM0MzZJLzZLeVlMSkgveEhYSHF5WnhZam5GRU1BZ0VRSEYzR0xMWjduLzd2VWRWazYvYk94YzJ3ZnU2dzVZUDk5Z0pkSGVlb1UzTzZVQ2pFbGxRRThJc05RbHNycWhORkhPUE9RYkJIOTIydVl5NlJJTkJjbGhPS1c2Vzkzb3M3NHdEVVNGRnRHc1ltRDF0ZGc2cjlYWC9GNzhJc2NjQk5DdmErTjBTUE1zQXMzRFlBaVd3anV4TGI4NHZQTnJDRVRRVG8zQ1JrL3Nza0VDV2Uvajh6OFlYSUl6MTJhc1BQNktPQ3VsdTZnRWxocDNnc2FiQU5xWXNNUWIyWE1FQ2xsbkg5NDRIbHB2RC9pODgrbTZMMkJhVGtBQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdlaWdodDogbnVsbCxcblxuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV45Li6JywgZS5kZXRhaWwudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNoYW5nZVdlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUhlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGUuZGV0YWlsLnZhbHVlXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VOaWNrTmFtZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgYWRkQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbmREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6IHRoaXMuZGF0YS5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLmRhdGEubmlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIHNleDogdGhpcy5kYXRhLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICBiaXJ0aGRheTogdGhpcy5kYXRhLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5kYXRhLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiB0aGlzLmRhdGEud2VpZ2h0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2hpbGRyZW5JZCkge1xuICAgICAgICAgICAgICAgICAgICBzZW5kRGF0YS5pZCA9IHRoaXMuZGF0YS5jaGlsZHJlbklkXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdhZGRDaGlsZHJlbicsIHNlbmREYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5kYXRhLmNoaWxkcmVuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2RlZmF1bHRDaGlsZElkJywgZGF0YToge2lkOiByZXMuZGF0YS5pZH19KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IGVyci5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGVsZXRlQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGRJZCcpXG4vLyAgICAgICAgICAgICAgICBpZihkZWZhdWx0Q2hpbGRJZC5pZD09dGhpcy5kYXRhLmNoaWxkcmVuSWQpe1xuLy8gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6J+S4jeiDveWIoOmZpOm7mOiupOeahOWtqeWtkCcsaWNvbjonbm9uZSd9KVxuLy8gICAgICAgICAgICAgICAgICAgIHJldHVyblxuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5o+Q56S6JywgY29udGVudDogJ+ehruiupOWIoOmZpOWtqeWtkCcsIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoJ2RlbENoaWxkJywge2lkOiBzZWxmLmRhdGEuY2hpbGRyZW5JZH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6IGVyci5lcnJvciwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGxvYWRJbWc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuXG4gICAgICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/nlJ/miJDnmoTlm77niYfkuLTml7bot6/lvoTnlLvmiJBjYW52YXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nV2lkdGggPSA2MCwgaW1nSGVpZ2h0ID0gNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJlcy50ZW1wRmlsZVBhdGhzWzBdLCAwLCAwLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXcoZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5jYW52YXNHZXRJbWFnZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGltZ1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGltZ0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtID09PSAnaW9zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWFvOWuueWkhOeQhu+8mmlvc+iOt+WPlueahOWbvueJh+S4iuS4i+mioOWAklxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfmiJHmiafooYzkuoYyJ30pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBzZWxmLnJldmVyc2VJbWdEYXRhKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gcG5n57yW56CBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG5nRGF0YSA9IHVwbmcuZW5jb2RlKFtyZXMuZGF0YS5idWZmZXJdLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBiYXNlNjTnvJbnoIFcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocG5nRGF0YSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdCYXNlNjQgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhclVybCA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+aIkeaJp+ihjOS6hjMnfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL2lvc+WbvueJh+WkhOeQhlxuXG5cbi8vICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4vLyAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4vLyAgICAgICAgICAgIGNvdW50OjEsXG4vLyAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHRlbXApIHtcbi8vICAgICAgICAgICAgICBpZih0ZW1wLnRlbXBGaWxlUGF0aHMubGVuZ3RoKXtcbi8vICAgICAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gdGVtcC50ZW1wRmlsZVBhdGhzXG4vLyAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbi8vICAgICAgICAgICAgICAgICAgc3JjOnRlbXBGaWxlUGF0aHNbMF0sXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHJlcykge1xuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aWR0aClcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuaGVpZ2h0KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4vLyAgICAgICAgICAgICAgICAgIHVybDogdGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInLFxuLy8gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChyZXMuZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLy8vICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vXG4vLyAgICAgICAgICAgICAgICAvL3NlbGYuc2V0RGF0YSh7YXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjR9KVxuLy9cbi8vXG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXApO1xuLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgICB9KVxuLy8gICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VJbWdEYXRhKHJlcykge1xuICAgICAgICAgICAgdmFyIHcgPSByZXMud2lkdGhcbiAgICAgICAgICAgIHZhciBoID0gcmVzLmhlaWdodFxuICAgICAgICAgICAgbGV0IGNvbiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaCAvIDI7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdyAqIDQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb24gPSByZXMuZGF0YVtpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpICogdyAqIDQgKyBqXSA9IHJlcy5kYXRhWyhoIC0gaSAtIDEpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVsoaCAtIGkgLSAxKSAqIHcgKiA0ICsgal0gPSBjb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cblxuICAgICAgICBnZXRDaGlsZEluZm8oZGF0YSkge1xuXG4gICAgICAgICAgICB0aGlzLndlaWdodCA9IGRhdGEud2VpZ2h0XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBkYXRhLmJpcnRoZGF5Ly8gcmVzLmRhdGFcbiAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSBkYXRhLm5pY2tuYW1lXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gZGF0YS5zZXhcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5iYXNlVXJsICsgZGF0YS5hdmF0YXJ1cmxcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5JZCA9IG9wdGlvbi5pZCB8fCBudWxsXG4gICAgICAgICAgICBpZiAob3B0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCgnZ2V0Q2hpbGRJbmZvJywge2lkOiBvcHRpb24uaWR9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuZGF0ZT1yZXMuZGF0YS5iaXJ0aGRheS8vIHJlcy5kYXRhXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5uaWNrTmFtZT0gcmVzLmRhdGEubmlja25hbWVcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmluZGV4PXJlcy5kYXRhLnNleC8v6buY6K6k55S3XG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdmF0YXI9cmVzLmRhdGEuYXZhdGFydXJsXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0Q2hpbGRJbmZvKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSAnMTk5OS0wMS0wMSdcblxuICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICBoZWFkZXI6IHtcbi8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vICAgICAgICAgICAgfSxcblxuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=