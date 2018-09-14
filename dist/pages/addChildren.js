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
                nickname: this.data.nickName,
                sex: this.data.index,
                birthday: this.data.date,
                height: this.data.height,
                weight: this.data.weight
            };
            if (!this.data.avatarUrl) {
                wx.showToast({ title: '必须上传头像', icon: 'none' });
            }
            if (this.data.avatarUrl.indexOf('uploads') == -1) {
                sendData.avatar = this.data.avatarUrl;
            }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiY2hpbGRyZW5JZCIsImRhdGUiLCJuaWNrTmFtZSIsImFycmF5IiwiaW5kZXgiLCJhdmF0YXJVcmwiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJnZW5kZXIiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJtZXRob2RzIiwiYmluZERhdGVDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYmluZFBpY2tlckNoYW5nZSIsImNoYW5nZVdlaWdodCIsImNoYW5nZUhlaWdodCIsImNoYW5nZU5pY2tOYW1lIiwiZGVsZXRlQ2hpbGRyZW4iLCJzZWxmIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ0aGVuIiwiY29kZSIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYXRjaCIsImVyciIsImVycm9yIiwiY2FuY2VsIiwidXBsb2FkSW1nIiwiY2hvb3NlSW1hZ2UiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicGxhdGZvcm0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZHJhd0ltYWdlIiwidGVtcEZpbGVQYXRocyIsImRyYXciLCJjYW52YXNHZXRJbWFnZURhdGEiLCJjYW52YXNJZCIsIngiLCJ5Iiwid2lkdGgiLCJyZXZlcnNlSW1nRGF0YSIsInBuZ0RhdGEiLCJ1cG5nIiwiZW5jb2RlIiwiYnVmZmVyIiwiYmFzZTY0IiwiYXJyYXlCdWZmZXJUb0Jhc2U2NCIsIm5ld0Jhc2U2NCIsIiRhcHBseSIsImZhaWwiLCJ1c2VySW5mbyIsInNlbmREYXRhIiwibmlja25hbWUiLCJzZXgiLCJiaXJ0aGRheSIsImluZGV4T2YiLCJhdmF0YXIiLCJzZW5kVXNlckluZm9EYXRhIiwiY29kZTEiLCJzZXRTdG9yYWdlIiwia2V5Iiwib2xkQ2hpbGRyZW5MaXN0IiwiY29uY2F0IiwiZm9yRWFjaCIsIml0ZW0iLCJ3IiwiaCIsImNvbiIsImkiLCJqIiwiYmFzZVVybCIsImF2YXRhcnVybCIsIm9wdGlvbiIsImdldENoaWxkSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyw0QkFBZ0JDLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsRUFBb0NDLEVBRGpEO0FBRUhDLHdCQUFZLElBRlQ7QUFHSEMsa0JBQU0sWUFISDtBQUlIQyxzQkFBVSxFQUpQO0FBS0hDLG1CQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FMSjtBQU1IQyxtQkFBTyxDQU5KLEVBTU07QUFDVEMsdUJBQVcsRUFQUjtBQVFIQyxvQkFBUSxJQVJMO0FBU0hDLG9CQUFRLElBVEw7QUFVSEMsb0JBQU9YLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsRUFBb0NVO0FBVnhDLFMsUUFhUEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUNUQyxPLEdBQVU7QUFDTkMsNEJBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFDekJDLHdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBMUM7QUFDQSxxQkFBS2hCLElBQUwsR0FBWVksRUFBRUcsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSks7QUFLTkMsOEJBQWtCLDBCQUFVTCxDQUFWLEVBQWE7QUFDM0JDLHdCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsRUFBRUcsTUFBRixDQUFTQyxLQUEvQjs7QUFFQSxxQkFB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Qiw0QkFBUUMsR0FBUixDQUFZZ0IsSUFBSXBDLElBQWhCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ29CNEIseUJBQUtxRSxZQUFMLENBQWtCN0QsSUFBSXBDLElBQXRCO0FBQ0gsaUJBUEQsRUFPRzRDLEtBUEgsQ0FPUyxlQUFPLENBRWYsQ0FURDtBQVVILGFBWEQsTUFXTztBQUNILHFCQUFLbEMsU0FBTCxHQUFpQixFQUFqQjtBQUNBLHFCQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLHFCQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLHFCQUFLTCxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EscUJBQUtELElBQUwsR0FBWSxZQUFaO0FBRUg7QUFDYjtBQUNBO0FBQ0E7O0FBR1M7Ozs7RUF0VG9DSixlQUFLZ0csSTs7a0JBQXpCckcsVyIsImZpbGUiOiJhZGRDaGlsZHJlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHVwbmcgZnJvbSAndXBuZy1qcydcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWRkQ2hpbGRyZW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5re75Yqg5a2p5a2QJ1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBkZWZhdWx0Q2hpbGRJZDogd2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkJykuaWQsXG4gICAgICAgICAgICBjaGlsZHJlbklkOiBudWxsLFxuICAgICAgICAgICAgZGF0ZTogJzIwMTItMDktMDEnLFxuICAgICAgICAgICAgbmlja05hbWU6ICcnLFxuICAgICAgICAgICAgYXJyYXk6IFsn5aWzJywgJ+eUtyddLFxuICAgICAgICAgICAgaW5kZXg6IDEsLy/pu5jorqTnlLdcbiAgICAgICAgICAgIGF2YXRhclVybDogJycsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB3ZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICBnZW5kZXI6d2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkJykuZ2VuZGVyLFxuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV45Li6JywgZS5kZXRhaWwudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNoYW5nZVdlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUhlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGUuZGV0YWlsLnZhbHVlXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VOaWNrTmFtZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgZGVsZXRlQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGQnKVxuICAgICAgICAgICAgICAgIGlmKGRlZmF1bHRDaGlsZElkLmlkPT10aGlzLmRhdGEuY2hpbGRyZW5JZCl7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6J+S4jeiDveWIoOmZpOm7mOiupOeahOWtqeWtkCcsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmj5DnpLonLCBjb250ZW50OiAn56Gu6K6k5Yig6Zmk5a2p5a2QJywgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCgnZGVsQ2hpbGQnLCB7aWQ6IHNlbGYuZGF0YS5jaGlsZHJlbklkfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTUwMClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZSwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogZXJyLmVycm9yLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHVwbG9hZEltZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG5cbiAgICAgICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eUn+aIkOeahOWbvueJh+S4tOaXtui3r+W+hOeUu+aIkGNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdXaWR0aCA9IDYwLCBpbWdIZWlnaHQgPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocmVzLnRlbXBGaWxlUGF0aHNbMF0sIDAsIDAsIGltZ1dpZHRoLCBpbWdIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhdyhmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmNhbnZhc0dldEltYWdlRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogaW1nV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaW1nSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm0gPT09ICdpb3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YW85a655aSE55CG77yaaW9z6I635Y+W55qE5Zu+54mH5LiK5LiL6aKg5YCSXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBzZWxmLnJldmVyc2VJbWdEYXRhKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gcG5n57yW56CBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG5nRGF0YSA9IHVwbmcuZW5jb2RlKFtyZXMuZGF0YS5idWZmZXJdLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBiYXNlNjTnvJbnoIFcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocG5nRGF0YSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdCYXNlNjQgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhclVybCA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+WbvueJh+e8luivkemUmeivrycsaWNvbjonbm9uZSd9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vaW9z5Zu+54mH5aSE55CGXG5cblxuLy8gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbi8vICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbi8vICAgICAgICAgICAgY291bnQ6MSxcbi8vICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAodGVtcCkge1xuLy8gICAgICAgICAgICAgIGlmKHRlbXAudGVtcEZpbGVQYXRocy5sZW5ndGgpe1xuLy8gICAgICAgICAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSB0ZW1wLnRlbXBGaWxlUGF0aHNcbi8vICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbi8vICAgICAgICAgICAgICAgICAgc3JjOnRlbXBGaWxlUGF0aHNbMF0sXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHJlcykge1xuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aWR0aClcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuaGVpZ2h0KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4vLyAgICAgICAgICAgICAgICAgIHVybDogdGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInLFxuLy8gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocmVzLmRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZztiYXNlNjQsJyArIGJhc2U2NFxuLy8gICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIFxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLy8vICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vXG4vLyAgICAgICAgICAgICAgICAvL3NlbGYuc2V0RGF0YSh7YXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjR9KVxuLy9cbi8vXG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXApO1xuLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgICB9KVxuLy8gICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENoaWxkcmVuKGUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighZS5kZXRhaWwudXNlckluZm8pe1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfpnIDopoHmgqjnmoTmjojmnYMnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZW5kRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBuaWNrbmFtZTogdGhpcy5kYXRhLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgIHNleDogdGhpcy5kYXRhLmluZGV4LFxuICAgICAgICAgICAgICAgIGJpcnRoZGF5OiB0aGlzLmRhdGEuZGF0ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZGF0YS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiB0aGlzLmRhdGEud2VpZ2h0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGhpcy5kYXRhLmF2YXRhclVybCl7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+W/hemhu+S4iuS8oOWktOWDjycsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmF2YXRhclVybC5pbmRleE9mKCd1cGxvYWRzJyk9PS0xKXtcbiAgICAgICAgICAgICAgICBzZW5kRGF0YS5hdmF0YXI9dGhpcy5kYXRhLmF2YXRhclVybFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5jaGlsZHJlbklkKSB7XG4gICAgICAgICAgICAgICAgc2VuZERhdGEuaWQgPSB0aGlzLmRhdGEuY2hpbGRyZW5JZFxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJykubmlja05hbWUpe1xuICAgICAgICAgICAgICAgIGxldCBzZW5kVXNlckluZm9EYXRhPXtcbiAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6c2VsZi51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOnNlbGYudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgICAgICAgICAgICBzZXg6c2VsZi51c2VySW5mby5nZW5kZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdCgnYXV0aEJpbmQnLHNlbmRVc2VySW5mb0RhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29kZTEhPTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogZS5kZXRhaWwudXNlckluZm99KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdCgnYWRkQ2hpbGRyZW4nLCBzZW5kRGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlfSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5kYXRhLmNoaWxkcmVuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkJywgZGF0YToge2lkOiByZXMuZGF0YS5pZCxuaWNrbmFtZTpyZXMuZGF0YS5uaWNrbmFtZX19KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRDaGlsZHJlbkxpc3QgPSB3eC5nZXRTdG9yYWdlU3luYygnY2hpbGRyZW5MaXN0JylcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbmREYXRhLmlkKXsgIC8vYWRkXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2NoaWxkcmVuTGlzdCcsIGRhdGE6b2xkQ2hpbGRyZW5MaXN0LmNvbmNhdChyZXMuZGF0YSl9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7IC8vdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaGlsZHJlbkxpc3QuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pZD09c2VuZERhdGEuaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtPXJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnY2hpbGRyZW5MaXN0JywgZGF0YTpvbGRDaGlsZHJlbkxpc3R9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogZXJyLm1lc3NhZ2UsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV2ZXJzZUltZ0RhdGEocmVzKSB7XG4gICAgICAgICAgICB2YXIgdyA9IHJlcy53aWR0aFxuICAgICAgICAgICAgdmFyIGggPSByZXMuaGVpZ2h0XG4gICAgICAgICAgICBsZXQgY29uID0gMFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoIC8gMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3ICogNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbiA9IHJlcy5kYXRhW2kgKiB3ICogNCArIGpdXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2kgKiB3ICogNCArIGpdID0gcmVzLmRhdGFbKGggLSBpIC0gMSkgKiB3ICogNCArIGpdXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhWyhoIC0gaSAtIDEpICogdyAqIDQgKyBqXSA9IGNvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuXG4gICAgICAgIGdldENoaWxkSW5mbyhkYXRhKSB7XG5cbiAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gZGF0YS53ZWlnaHRcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICAgICAgICAgIHRoaXMuZGF0ZSA9IGRhdGEuYmlydGhkYXkvLyByZXMuZGF0YVxuICAgICAgICAgICAgdGhpcy5uaWNrTmFtZSA9IGRhdGEubmlja25hbWVcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBkYXRhLnNleFxuICAgICAgICAgICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLmJhc2VVcmwgKyBkYXRhLmF2YXRhcnVybFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2cob3B0aW9uKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbklkID0gb3B0aW9uLmlkIHx8IG51bGxcbiAgICAgICAgICAgIGlmIChvcHRpb24uaWQpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdnZXRDaGlsZEluZm8nLCB7aWQ6IG9wdGlvbi5pZH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YS5kYXRlPXJlcy5kYXRhLmJpcnRoZGF5Ly8gcmVzLmRhdGFcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLm5pY2tOYW1lPSByZXMuZGF0YS5uaWNrbmFtZVxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5kZXg9cmVzLmRhdGEuc2V4Ly/pu5jorqTnlLdcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhcj1yZXMuZGF0YS5hdmF0YXJ1cmxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRDaGlsZEluZm8ocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSA9ICcxOTk5LTAxLTAxJ1xuXG4gICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIGhlYWRlcjoge1xuLy8gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuLy8gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgfVxuICAgIH1cbiJdfQ==