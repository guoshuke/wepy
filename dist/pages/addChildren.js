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
                var defaultChildId = _wepy2.default.getStorageSync('defaultChild');
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
                                    //let newBase64 = 'data:image/jpeg;base64,' + base64
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
            var user = wx.getStorageSync('userInfo').nickName;

            if (!user) {

                self.userInfo = e.detail.userInfo;
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
                self.$apply();
                _wepy2.default.setStorage({ key: 'userInfo', data: self.userInfo });
            }
            var sendData = {
                nickname: this.data.nickName,
                sex: this.data.index,
                birthday: this.data.date,
                height: this.data.height,
                weight: this.data.weight
            };
            if (!this.data.avatarUrl) {
                wx.showToast({ title: '必须上传头像', icon: 'none' });
                return;
            }
            if (this.data.avatarUrl.indexOf('uploads') == -1) {
                sendData.avatar = this.data.avatarUrl;
            }
            if (this.data.childrenId) {
                sendData.id = this.data.childrenId;
            }
            if (!wx.getStorageSync('userInfo').nickName) {
                var _sendUserInfoData = {
                    nickName: self.userInfo.nickName,
                    avatarUrl: self.userInfo.avatarUrl,
                    sex: self.userInfo.gender
                };
                (0, _service2.default)('authBind', _sendUserInfoData).then(function (res) {
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
                    //默认孩子为最近添加的孩子  如果要改成之前的不变的话  把true改成   !self.data.childrenId
                    if (true) {
                        _wepy2.default.setStorage({ key: 'defaultChild', data: { id: res.data.id, nickname: res.data.nickname } });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiY2hpbGRyZW5JZCIsImRhdGUiLCJuaWNrTmFtZSIsImFycmF5IiwiaW5kZXgiLCJhdmF0YXJVcmwiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJnZW5kZXIiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJtZXRob2RzIiwiYmluZERhdGVDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYmluZFBpY2tlckNoYW5nZSIsImNoYW5nZVdlaWdodCIsImNoYW5nZUhlaWdodCIsImNoYW5nZU5pY2tOYW1lIiwiZGVsZXRlQ2hpbGRyZW4iLCJzZWxmIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ0aGVuIiwiY29kZSIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYXRjaCIsImVyciIsImVycm9yIiwiY2FuY2VsIiwidXBsb2FkSW1nIiwiY2hvb3NlSW1hZ2UiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicGxhdGZvcm0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZHJhd0ltYWdlIiwidGVtcEZpbGVQYXRocyIsImRyYXciLCJjYW52YXNHZXRJbWFnZURhdGEiLCJjYW52YXNJZCIsIngiLCJ5Iiwid2lkdGgiLCJyZXZlcnNlSW1nRGF0YSIsInBuZ0RhdGEiLCJ1cG5nIiwiZW5jb2RlIiwiYnVmZmVyIiwiYmFzZTY0IiwiYXJyYXlCdWZmZXJUb0Jhc2U2NCIsIiRhcHBseSIsImZhaWwiLCJ1c2VySW5mbyIsInVzZXIiLCJzZW5kVXNlckluZm9EYXRhIiwic2V4IiwiY29kZTEiLCJzZXRTdG9yYWdlIiwia2V5Iiwic2VuZERhdGEiLCJuaWNrbmFtZSIsImJpcnRoZGF5IiwiaW5kZXhPZiIsImF2YXRhciIsIm9sZENoaWxkcmVuTGlzdCIsImNvbmNhdCIsImZvckVhY2giLCJpdGVtIiwidyIsImgiLCJjb24iLCJpIiwiaiIsImJhc2VVcmwiLCJhdmF0YXJ1cmwiLCJvcHRpb24iLCJnZXRDaGlsZEluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsNEJBQWdCQyxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLEVBQW9DQyxFQURqRDtBQUVIQyx3QkFBWSxJQUZUO0FBR0hDLGtCQUFNLFlBSEg7QUFJSEMsc0JBQVUsRUFKUDtBQUtIQyxtQkFBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBTEo7QUFNSEMsbUJBQU8sQ0FOSixFQU1NO0FBQ1RDLHVCQUFXLEVBUFI7QUFRSEMsb0JBQVEsSUFSTDtBQVNIQyxvQkFBUSxJQVRMO0FBVUhDLG9CQUFPWCxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLEVBQW9DVTtBQVZ4QyxTLFFBYVBDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFDVEMsTyxHQUFVO0FBQ05DLDRCQUFnQix3QkFBVUMsQ0FBVixFQUFhO0FBQ3pCQyx3QkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRixFQUFFRyxNQUFGLENBQVNDLEtBQTFDO0FBQ0EscUJBQUtoQixJQUFMLEdBQVlZLEVBQUVHLE1BQUYsQ0FBU0MsS0FBckI7QUFDSCxhQUpLO0FBS05DLDhCQUFrQiwwQkFBVUwsQ0FBVixFQUFhO0FBQzNCQyx3QkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBL0I7O0FBRUEscUJBQUtiLEtB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QTVVb0NKLGVBQUtnRyxJOztrQkFBekJyRyxXIiwiZmlsZSI6ImFkZENoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdXBuZyBmcm9tICd1cG5nLWpzJ1xuICAgIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gICAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vbWl4aW5zL3NlcnZpY2UnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBhZGRDaGlsZHJlbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmt7vliqDlranlrZAnXG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGRlZmF1bHRDaGlsZElkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGQnKS5pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuSWQ6IG51bGwsXG4gICAgICAgICAgICBkYXRlOiAnMjAxMi0wOS0wMScsXG4gICAgICAgICAgICBuaWNrTmFtZTogJycsXG4gICAgICAgICAgICBhcnJheTogWyflpbMnLCAn55S3J10sXG4gICAgICAgICAgICBpbmRleDogMSwvL+m7mOiupOeUt1xuICAgICAgICAgICAgYXZhdGFyVXJsOiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdlaWdodDogbnVsbCxcbiAgICAgICAgICAgIGdlbmRlcjp3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGQnKS5nZW5kZXIsXG4gICAgICAgIH1cblxuICAgICAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BpY2tlcuWPkemAgemAieaLqeaUueWPmO+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXjkuLonLCBlLmRldGFpbC52YWx1ZSlcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2hhbmdlV2VpZ2h0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLndlaWdodCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlSGVpZ2h0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gZS5kZXRhaWwudmFsdWVcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZU5pY2tOYW1lOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBkZWxldGVDaGlsZHJlbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGRJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZCcpXG4gICAgICAgICAgICAgICAgaWYoZGVmYXVsdENoaWxkSWQuaWQ9PXRoaXMuZGF0YS5jaGlsZHJlbklkKXtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTon5LiN6IO95Yig6Zmk6buY6K6k55qE5a2p5a2QJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaPkOekuicsIGNvbnRlbnQ6ICfnoa7orqTliKDpmaTlranlrZAnLCBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KCdkZWxDaGlsZCcsIHtpZDogc2VsZi5kYXRhLmNoaWxkcmVuSWR9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiBlcnIuZXJyb3IsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdXBsb2FkSW1nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAgICAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v55Sf5oiQ55qE5Zu+54mH5Li05pe26Lev5b6E55S75oiQY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteUNhbnZhcycpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ1dpZHRoID0gNjAsIGltZ0hlaWdodCA9IDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShyZXMudGVtcEZpbGVQYXRoc1swXSwgMCwgMCwgaW1nV2lkdGgsIGltZ0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guY2FudmFzR2V0SW1hZ2VEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdteUNhbnZhcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbWdXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBpbWdIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybSA9PT0gJ2lvcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbzlrrnlpITnkIbvvJppb3Pojrflj5bnmoTlm77niYfkuIrkuIvpoqDlgJJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHNlbGYucmV2ZXJzZUltZ0RhdGEocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLiBwbmfnvJbnoIFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbmdEYXRhID0gdXBuZy5lbmNvZGUoW3Jlcy5kYXRhLmJ1ZmZlcl0sIHJlcy53aWR0aCwgcmVzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQuIGJhc2U2NOe8lueggVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChwbmdEYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgbmV3QmFzZTY0ID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hdmF0YXJVcmwgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICflm77niYfnvJbor5HplJnor68nLGljb246J25vbmUnfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL2lvc+WbvueJh+WkhOeQhlxuXG5cbi8vICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4vLyAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4vLyAgICAgICAgICAgIGNvdW50OjEsXG4vLyAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHRlbXApIHtcbi8vICAgICAgICAgICAgICBpZih0ZW1wLnRlbXBGaWxlUGF0aHMubGVuZ3RoKXtcbi8vICAgICAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gdGVtcC50ZW1wRmlsZVBhdGhzXG4vLyAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4vLyAgICAgICAgICAgICAgICAgIHNyYzp0ZW1wRmlsZVBhdGhzWzBdLFxuLy8gICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uIChyZXMpIHtcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMud2lkdGgpXG4vLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmhlaWdodClcbi8vICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuLy8gICAgICAgICAgICAgICAgICB1cmw6IHRlbXBGaWxlUGF0aHNbMF0sXG4vLyAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyxcbi8vICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuLy8gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBiYXNlNjQgPSB3eC5hcnJheUJ1ZmZlclRvQmFzZTY0KHJlcy5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICAgICBcbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8vLyAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4vL1xuLy8gICAgICAgICAgICAgICAgLy9zZWxmLnNldERhdGEoe2F2YXRhclVybDogJ2RhdGE6aW1hZ2UvanBnO2Jhc2U2NCwnICsgYmFzZTY0fSlcbi8vXG4vL1xuLy8gICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wKTtcbi8vICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgZmFpbDpmdW5jdGlvbiAoZXJyKSB7XG4vLyAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vICAgICAgICAgICAgfVxuLy8gICAgICAgICAgfSlcbi8vICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhZGRDaGlsZHJlbihlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIWUuZGV0YWlsLnVzZXJJbmZvKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn6ZyA6KaB5oKo55qE5o6I5p2DJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpLm5pY2tOYW1lXG5cbiAgICAgICAgICAgIGlmICghdXNlcikge1xuXG4gICAgICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgbGV0IHNlbmRVc2VySW5mb0RhdGE9e1xuICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpzZWxmLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi51c2VySW5mby5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIHNleDpzZWxmLnVzZXJJbmZvLmdlbmRlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdhdXRoQmluZCcsc2VuZFVzZXJJbmZvRGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29kZTEhPTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IHNlbGYudXNlckluZm99KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHNlbmREYXRhID0ge1xuICAgICAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLmRhdGEubmlja05hbWUsXG4gICAgICAgICAgICAgICAgc2V4OiB0aGlzLmRhdGEuaW5kZXgsXG4gICAgICAgICAgICAgICAgYmlydGhkYXk6IHRoaXMuZGF0YS5kYXRlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5kYXRhLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMuZGF0YS53ZWlnaHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuYXZhdGFyVXJsKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5b+F6aG75LiK5Lyg5aS05YOPJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuYXZhdGFyVXJsLmluZGV4T2YoJ3VwbG9hZHMnKT09LTEpe1xuICAgICAgICAgICAgICAgIHNlbmREYXRhLmF2YXRhcj10aGlzLmRhdGEuYXZhdGFyVXJsXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2hpbGRyZW5JZCkge1xuICAgICAgICAgICAgICAgIHNlbmREYXRhLmlkID0gdGhpcy5kYXRhLmNoaWxkcmVuSWRcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpLm5pY2tOYW1lKXtcbiAgICAgICAgICAgICAgICBsZXQgc2VuZFVzZXJJbmZvRGF0YT17XG4gICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOnNlbGYudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDpzZWxmLnVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgICAgICAgc2V4OnNlbGYudXNlckluZm8uZ2VuZGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVlc3QoJ2F1dGhCaW5kJyxzZW5kVXNlckluZm9EYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmNvZGUxIT0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IGUuZGV0YWlsLnVzZXJJbmZvfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoJ2FkZENoaWxkcmVuJywgc2VuZERhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZX0pXG4gICAgICAgICAgICAgICAgICAgIC8v6buY6K6k5a2p5a2Q5Li65pyA6L+R5re75Yqg55qE5a2p5a2QICDlpoLmnpzopoHmlLnmiJDkuYvliY3nmoTkuI3lj5jnmoTor50gIOaKinRydWXmlLnmiJAgICAhc2VsZi5kYXRhLmNoaWxkcmVuSWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkJywgZGF0YToge2lkOiByZXMuZGF0YS5pZCxuaWNrbmFtZTpyZXMuZGF0YS5uaWNrbmFtZX19KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRDaGlsZHJlbkxpc3QgPSB3eC5nZXRTdG9yYWdlU3luYygnY2hpbGRyZW5MaXN0JylcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbmREYXRhLmlkKXsgIC8vYWRkXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2NoaWxkcmVuTGlzdCcsIGRhdGE6b2xkQ2hpbGRyZW5MaXN0LmNvbmNhdChyZXMuZGF0YSl9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7IC8vdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaGlsZHJlbkxpc3QuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pZD09c2VuZERhdGEuaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtPXJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnY2hpbGRyZW5MaXN0JywgZGF0YTpvbGRDaGlsZHJlbkxpc3R9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogZXJyLm1lc3NhZ2UsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV2ZXJzZUltZ0RhdGEocmVzKSB7XG4gICAgICAgICAgICB2YXIgdyA9IHJlcy53aWR0aFxuICAgICAgICAgICAgdmFyIGggPSByZXMuaGVpZ2h0XG4gICAgICAgICAgICBsZXQgY29uID0gMFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoIC8gMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3ICogNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbiA9IHJlcy5kYXRhW2kgKiB3ICogNCArIGpdXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2kgKiB3ICogNCArIGpdID0gcmVzLmRhdGFbKGggLSBpIC0gMSkgKiB3ICogNCArIGpdXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhWyhoIC0gaSAtIDEpICogdyAqIDQgKyBqXSA9IGNvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuXG4gICAgICAgIGdldENoaWxkSW5mbyhkYXRhKSB7XG5cbiAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gZGF0YS53ZWlnaHRcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGEuYmlydGhkYXkvLyByZXMuZGF0YVxuICAgICAgICAgICAgdGhpcy5uaWNrTmFtZSA9IGRhdGEubmlja25hbWVcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBkYXRhLnNleFxuICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLmJhc2VVcmwgKyBkYXRhLmF2YXRhcnVybFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2cob3B0aW9uKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbklkID0gb3B0aW9uLmlkIHx8IG51bGxcbiAgICAgICAgICAgIGlmIChvcHRpb24uaWQpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdnZXRDaGlsZEluZm8nLCB7aWQ6IG9wdGlvbi5pZH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5kYXRlPXJlcy5kYXRhLmJpcnRoZGF5Ly8gcmVzLmRhdGFcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLm5pY2tOYW1lPSByZXMuZGF0YS5uaWNrbmFtZVxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5kZXg9cmVzLmRhdGEuc2V4Ly/pu5jorqTnlLdcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhcj1yZXMuZGF0YS5hdmF0YXJ1cmxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRDaGlsZEluZm8ocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9ICcxOTk5LTAxLTAxJ1xuXG4gICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIGhlYWRlcjoge1xuLy8gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuLy8gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgfVxuICAgIH1cbiJdfQ==