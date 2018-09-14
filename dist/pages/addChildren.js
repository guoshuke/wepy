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
            defaultChildId: _wepy2.default.getStorageSync('defaultChild').id,
            childrenId: null,
            date: '2012-09-01',
            nickName: '',
            array: ['女', '男'],
            index: 1, //默认男
            avatarUrl: '',
            height: null,
            weight: null,
            gender: _wepy2.default.getStorageSync('defaultChild').gender
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

            deleteChildren: function deleteChildren() {
                var self = this;
                var defaultChildId = _wepy2.default.getStorageSync('defaultChildId').id;
                if (defaultChildId.id == this.data.childrenId) {
                    wx.showToast({ title: '不能删除默认的孩子', icon: 'none' });
                    return;
                }
                wx.showModal({
                    title: '删除提示', content: '确认删除孩子', success: function success(res) {
                        if (res.confirm) {
                            (0, _service2.default)('delChild', { id: self.data.childrenId }).then(function (res) {
                                console.log(res);
                                if (res.code == 1) {
                                    _wepy2.default.showToast({ title: res.message });
                                    setTimeout(function () {
                                        _wepy2.default.navigateBack({
                                            delta: 1
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
                                    wx.showToast({ title: '图片编译错误', icon: 'none' });

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
            //                
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
            //                    
            //                    var base64 = wx.arrayBufferToBase64(res.data);
            //                    
            //                    self.setData({
            //                      avatarUrl: 'data:image/jpg;base64,' + base64
            //                    })
            //                  }
            //                });
            //
            //                
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
        key: 'addChildren',
        value: function addChildren(e) {
            var self = this;

            if (!e.detail.userInfo) {
                wx.showToast({ title: '需要您的授权', icon: 'none' });
                return;
            }
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
            if (!wx.getStorageSync('userInfo').nickName) {
                var sendUserInfoData = {
                    nickName: self.userInfo.nickName,
                    avatarUrl: self.userInfo.avatarUrl,
                    sex: self.userInfo.gender
                };
                (0, _service2.default)('authBind', sendUserInfoData).then(function (res) {
                    console.log(res);

                    if (res.code1 != 1) {
                        wx.showToast({ title: res.message, icon: 'none' });
                    }
                }).catch(function (err) {
                    console.log(err);
                });
                _wepy2.default.setStorage({ key: 'userInfo', data: e.detail.userInfo });
            }
            (0, _service2.default)('addChildren', sendData).then(function (res) {
                console.log(res);
                if (res.code == 1) {
                    _wepy2.default.showToast({ title: res.message });

                    if (!self.data.childrenId) {
                        _wepy2.default.setStorage({ key: 'defaultChildId', data: { id: res.data.id, nickname: res.data.nickname } });
                    }
                    var oldChildrenList = wx.getStorageSync('childrenList');
                    if (!sendData.id) {
                        //add
                        _wepy2.default.setStorage({ key: 'childrenList', data: oldChildrenList.concat(res.data) });
                    } else {
                        //update
                        oldChildrenList.forEach(function (item) {
                            if (item.id == sendData.id) {
                                item = res.data;
                            }
                        });
                        _wepy2.default.setStorage({ key: 'childrenList', data: oldChildrenList });
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
        }
    }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiY2hpbGRyZW5JZCIsImRhdGUiLCJuaWNrTmFtZSIsImFycmF5IiwiaW5kZXgiLCJhdmF0YXJVcmwiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJnZW5kZXIiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJtZXRob2RzIiwiYmluZERhdGVDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYmluZFBpY2tlckNoYW5nZSIsImNoYW5nZVdlaWdodCIsImNoYW5nZUhlaWdodCIsImNoYW5nZU5pY2tOYW1lIiwiZGVsZXRlQ2hpbGRyZW4iLCJzZWxmIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ0aGVuIiwiY29kZSIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYXRjaCIsImVyciIsImVycm9yIiwiY2FuY2VsIiwidXBsb2FkSW1nIiwiY2hvb3NlSW1hZ2UiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicGxhdGZvcm0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZHJhd0ltYWdlIiwidGVtcEZpbGVQYXRocyIsImRyYXciLCJjYW52YXNHZXRJbWFnZURhdGEiLCJjYW52YXNJZCIsIngiLCJ5Iiwid2lkdGgiLCJyZXZlcnNlSW1nRGF0YSIsInBuZ0RhdGEiLCJ1cG5nIiwiZW5jb2RlIiwiYnVmZmVyIiwiYmFzZTY0IiwiYXJyYXlCdWZmZXJUb0Jhc2U2NCIsIm5ld0Jhc2U2NCIsIiRhcHBseSIsImZhaWwiLCJ1c2VySW5mbyIsInNlbmREYXRhIiwiYXZhdGFyIiwibmlja25hbWUiLCJzZXgiLCJiaXJ0aGRheSIsInNlbmRVc2VySW5mb0RhdGEiLCJjb2RlMSIsInNldFN0b3JhZ2UiLCJrZXkiLCJvbGRDaGlsZHJlbkxpc3QiLCJjb25jYXQiLCJmb3JFYWNoIiwiaXRlbSIsInciLCJoIiwiY29uIiwiaSIsImoiLCJiYXNlVXJsIiwiYXZhdGFydXJsIiwib3B0aW9uIiwiZ2V0Q2hpbGRJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLDRCQUFnQkMsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixFQUFvQ0MsRUFEakQ7QUFFSEMsd0JBQVksSUFGVDtBQUdIQyxrQkFBTSxZQUhIO0FBSUhDLHNCQUFVLEVBSlA7QUFLSEMsbUJBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUxKO0FBTUhDLG1CQUFPLENBTkosRUFNTTtBQUNUQyx1QkFBVyxFQVBSO0FBUUhDLG9CQUFRLElBUkw7QUFTSEMsb0JBQVEsSUFUTDtBQVVIQyxvQkFBT1gsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixFQUFvQ1U7QUFWeEMsUyxRQWFQQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBQ1RDLE8sR0FBVTtBQUNOQyw0QkFBZ0Isd0JBQVVDLENBQVYsRUFBYTtBQUN6QkMsd0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ0YsRUFBRUcsTUFBRixDQUFTQyxLQUExQztBQUNBLHFCQUFLaEIsSUFBTCxHQUFZWSxFQUFFRyxNQUFGLENBQVNDLEtBQXJCO0FBQ0gsYUFKSztBQUtOQyw4QkFBa0IsMEJBQVVMLENBQVYsRUFBYTtBQUMzQkMsd0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixFQUFFRyxNQUFGLENBQVNDLEtBQS9COztBQUVBLHFCQUFLYixLQUFMLEdB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QSxxQkFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxxQkFBS0wsUUFBTCxHQUFnQixFQUFoQjtBQUNBLHFCQUFLRCxJQUFMLEdBQVksWUFBWjtBQUVIO0FBQ2I7QUFDQTtBQUNBOztBQUdTOzs7O0VBalRvQ0osZUFBSytGLEk7O2tCQUF6QnBHLFciLCJmaWxlIjoiYWRkQ2hpbGRyZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCB1cG5nIGZyb20gJ3VwbmctanMnXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGFkZENoaWxkcmVuIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+a3u+WKoOWtqeWtkCdcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgZGVmYXVsdENoaWxkSWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZCcpLmlkLFxuICAgICAgICAgICAgY2hpbGRyZW5JZDogbnVsbCxcbiAgICAgICAgICAgIGRhdGU6ICcyMDEyLTA5LTAxJyxcbiAgICAgICAgICAgIG5pY2tOYW1lOiAnJyxcbiAgICAgICAgICAgIGFycmF5OiBbJ+WlsycsICfnlLcnXSxcbiAgICAgICAgICAgIGluZGV4OiAxLC8v6buY6K6k55S3XG4gICAgICAgICAgICBhdmF0YXJVcmw6ICcnLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgd2VpZ2h0OiBudWxsLFxuICAgICAgICAgICAgZ2VuZGVyOndlcHkuZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZCcpLmdlbmRlcixcbiAgICAgICAgfVxuXG4gICAgICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBiaW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kUGlja2VyQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjaGFuZ2VXZWlnaHQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VIZWlnaHQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBlLmRldGFpbC52YWx1ZVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlTmlja05hbWU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uaWNrTmFtZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIGRlbGV0ZUNoaWxkcmVuKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZElkID0gd2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkSWQnKS5pZFxuICAgICAgICAgICAgICAgIGlmKGRlZmF1bHRDaGlsZElkLmlkPT10aGlzLmRhdGEuY2hpbGRyZW5JZCl7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6J+S4jeiDveWIoOmZpOm7mOiupOeahOWtqeWtkCcsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmj5DnpLonLCBjb250ZW50OiAn56Gu6K6k5Yig6Zmk5a2p5a2QJywgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCgnZGVsQ2hpbGQnLCB7aWQ6IHNlbGYuZGF0YS5jaGlsZHJlbklkfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTUwMClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZSwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogZXJyLmVycm9yLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHVwbG9hZEltZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG5cbiAgICAgICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eUn+aIkOeahOWbvueJh+S4tOaXtui3r+W+hOeUu+aIkGNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdXaWR0aCA9IDYwLCBpbWdIZWlnaHQgPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocmVzLnRlbXBGaWxlUGF0aHNbMF0sIDAsIDAsIGltZ1dpZHRoLCBpbWdIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhdyhmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmNhbnZhc0dldEltYWdlRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogaW1nV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaW1nSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm0gPT09ICdpb3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YW85a655aSE55CG77yaaW9z6I635Y+W55qE5Zu+54mH5LiK5LiL6aKg5YCSXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBzZWxmLnJldmVyc2VJbWdEYXRhKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gcG5n57yW56CBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG5nRGF0YSA9IHVwbmcuZW5jb2RlKFtyZXMuZGF0YS5idWZmZXJdLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBiYXNlNjTnvJbnoIFcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocG5nRGF0YSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdCYXNlNjQgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhclVybCA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+WbvueJh+e8luivkemUmeivrycsaWNvbjonbm9uZSd9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vaW9z5Zu+54mH5aSE55CGXG5cblxuLy8gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbi8vICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbi8vICAgICAgICAgICAgY291bnQ6MSxcbi8vICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAodGVtcCkge1xuLy8gICAgICAgICAgICAgIGlmKHRlbXAudGVtcEZpbGVQYXRocy5sZW5ndGgpe1xuLy8gICAgICAgICAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSB0ZW1wLnRlbXBGaWxlUGF0aHNcbi8vICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbi8vICAgICAgICAgICAgICAgICAgc3JjOnRlbXBGaWxlUGF0aHNbMF0sXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHJlcykge1xuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aWR0aClcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuaGVpZ2h0KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4vLyAgICAgICAgICAgICAgICAgIHVybDogdGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInLFxuLy8gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocmVzLmRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZztiYXNlNjQsJyArIGJhc2U2NFxuLy8gICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIFxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLy8vICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vXG4vLyAgICAgICAgICAgICAgICAvL3NlbGYuc2V0RGF0YSh7YXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjR9KVxuLy9cbi8vXG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXApO1xuLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgICB9KVxuLy8gICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkcmVuKGUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighZS5kZXRhaWwudXNlckluZm8pe1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfpnIDopoHmgqjnmoTmjojmnYMnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZW5kRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHRoaXMuZGF0YS5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgbmlja25hbWU6IHRoaXMuZGF0YS5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICBzZXg6IHRoaXMuZGF0YS5pbmRleCxcbiAgICAgICAgICAgICAgICBiaXJ0aGRheTogdGhpcy5kYXRhLmRhdGUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmRhdGEuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdlaWdodDogdGhpcy5kYXRhLndlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5jaGlsZHJlbklkKSB7XG4gICAgICAgICAgICAgICAgc2VuZERhdGEuaWQgPSB0aGlzLmRhdGEuY2hpbGRyZW5JZFxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJykubmlja05hbWUpe1xuICAgICAgICAgICAgICAgIGxldCBzZW5kVXNlckluZm9EYXRhPXtcbiAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6c2VsZi51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOnNlbGYudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgICAgICAgICAgICBzZXg6c2VsZi51c2VySW5mby5nZW5kZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdCgnYXV0aEJpbmQnLHNlbmRVc2VySW5mb0RhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29kZTEhPTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogZS5kZXRhaWwudXNlckluZm99KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdCgnYWRkQ2hpbGRyZW4nLCBzZW5kRGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlfSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5kYXRhLmNoaWxkcmVuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkSWQnLCBkYXRhOiB7aWQ6IHJlcy5kYXRhLmlkLG5pY2tuYW1lOnJlcy5kYXRhLm5pY2tuYW1lfX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZENoaWxkcmVuTGlzdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjaGlsZHJlbkxpc3QnKVxuICAgICAgICAgICAgICAgICAgICBpZighc2VuZERhdGEuaWQpeyAgLy9hZGRcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnY2hpbGRyZW5MaXN0JywgZGF0YTpvbGRDaGlsZHJlbkxpc3QuY29uY2F0KHJlcy5kYXRhKX0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHsgLy91cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZENoaWxkcmVuTGlzdC5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmlkPT1zZW5kRGF0YS5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW09cmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdjaGlsZHJlbkxpc3QnLCBkYXRhOm9sZENoaWxkcmVuTGlzdH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiBlcnIubWVzc2FnZSwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICB9XG5cblxuICAgICAgICByZXZlcnNlSW1nRGF0YShyZXMpIHtcbiAgICAgICAgICAgIHZhciB3ID0gcmVzLndpZHRoXG4gICAgICAgICAgICB2YXIgaCA9IHJlcy5oZWlnaHRcbiAgICAgICAgICAgIGxldCBjb24gPSAwXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGggLyAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHcgKiA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uID0gcmVzLmRhdGFbaSAqIHcgKiA0ICsgal1cbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaSAqIHcgKiA0ICsgal0gPSByZXMuZGF0YVsoaCAtIGkgLSAxKSAqIHcgKiA0ICsgal1cbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbKGggLSBpIC0gMSkgKiB3ICogNCArIGpdID0gY29uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0Q2hpbGRJbmZvKGRhdGEpIHtcblxuICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBkYXRhLndlaWdodFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgICAgICAgICAgdGhpcy5kYXRlID0gZGF0YS5iaXJ0aGRheS8vIHJlcy5kYXRhXG4gICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gZGF0YS5uaWNrbmFtZVxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGRhdGEuc2V4XG4gICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuYmFzZVVybCArIGRhdGEuYXZhdGFydXJsXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRpb24pO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuSWQgPSBvcHRpb24uaWQgfHwgbnVsbFxuICAgICAgICAgICAgaWYgKG9wdGlvbi5pZCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QoJ2dldENoaWxkSW5mbycsIHtpZDogb3B0aW9uLmlkfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhLmRhdGU9cmVzLmRhdGEuYmlydGhkYXkvLyByZXMuZGF0YVxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYubmlja05hbWU9IHJlcy5kYXRhLm5pY2tuYW1lXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5pbmRleD1yZXMuZGF0YS5zZXgvL+m7mOiupOeUt1xuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuYXZhdGFyPXJlcy5kYXRhLmF2YXRhcnVybFxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENoaWxkSW5mbyhyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLndlaWdodCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5uaWNrTmFtZSA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gJzE5OTktMDEtMDEnXG5cbiAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgaGVhZGVyOiB7XG4vLyAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4vLyAgICAgICAgICAgIH0sXG5cblxuICAgICAgICB9XG4gICAgfVxuIl19