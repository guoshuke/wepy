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
                            _wepy2.default.setStorage({ key: 'defaultChildId', data: { id: res.data.id, nickname: res.data.nickname } });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiY2hpbGRyZW5JZCIsImRhdGUiLCJuaWNrTmFtZSIsImFycmF5IiwiaW5kZXgiLCJhdmF0YXJVcmwiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJtZXRob2RzIiwiYmluZERhdGVDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYmluZFBpY2tlckNoYW5nZSIsImNoYW5nZVdlaWdodCIsImNoYW5nZUhlaWdodCIsImNoYW5nZU5pY2tOYW1lIiwic2VuZERhdGEiLCJhdmF0YXIiLCJuaWNrbmFtZSIsInNleCIsImJpcnRoZGF5Iiwic2VsZiIsInRoZW4iLCJyZXMiLCJjb2RlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtZXNzYWdlIiwic2V0U3RvcmFnZSIsImtleSIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImljb24iLCJjYXRjaCIsImVyciIsImRlbGV0ZUNoaWxkcmVuIiwid3giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsImNvbmZpcm0iLCJlcnJvciIsImNhbmNlbCIsInVwbG9hZEltZyIsImNob29zZUltYWdlIiwiY3R4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInBsYXRmb3JtIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJpbWdXaWR0aCIsImltZ0hlaWdodCIsImRyYXdJbWFnZSIsInRlbXBGaWxlUGF0aHMiLCJkcmF3IiwiY2FudmFzR2V0SW1hZ2VEYXRhIiwiY2FudmFzSWQiLCJ4IiwieSIsIndpZHRoIiwicmV2ZXJzZUltZ0RhdGEiLCJwbmdEYXRhIiwidXBuZyIsImVuY29kZSIsImJ1ZmZlciIsImJhc2U2NCIsImFycmF5QnVmZmVyVG9CYXNlNjQiLCJuZXdCYXNlNjQiLCIkYXBwbHkiLCJmYWlsIiwidyIsImgiLCJjb24iLCJpIiwiaiIsImJhc2VVcmwiLCJhdmF0YXJ1cmwiLCJvcHRpb24iLCJnZXRDaGlsZEluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsNEJBQWdCQyxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLEVBQW9DQyxFQURqRDtBQUVIQyx3QkFBWSxJQUZUO0FBR0hDLGtCQUFNLFlBSEg7QUFJSEMsc0JBQVUsRUFKUDtBQUtIQyxtQkFBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBTEo7QUFNSEMsbUJBQU8sQ0FOSixFQU1NO0FBQ1RDLHVCQUFXLEVBUFI7QUFRSEMsb0JBQVEsSUFSTDtBQVNIQyxvQkFBUTs7QUFUTCxTLFFBYVBDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFDVEMsTyxHQUFVO0FBQ05DLDRCQUFnQix3QkFBVUMsQ0FBVixFQUFhO0FBQ3pCQyx3QkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRixFQUFFRyxNQUFGLENBQVNDLEtBQTFDO0FBQ0EscUJBQUtmLElBQUwsR0FBWVcsRUFBRUcsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSks7QUFLTkMsOEJBQWtCLDBCQUFVTCxDQUFWLEVBQWE7QUFDM0JDLHdCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsRUFBRUcsTUFBRixDQUFTQyxLQUEvQjs7QUFFQSxxQkFBS1osS0FBTCxHQUFhUSxFQUFFRyxNQUFGLENBQVNDLEtBQXRCO0FBQ0gsYUFUSzs7QUFXTkUsMEJBQWMsc0JBQVVOLENBQVYsRUFBYTtBQUN2QkMsd0JBQVFDLEdBQVIsQ0FBWSxJQUFaLEVBQWtCRixFQUFFRyxNQUFGLENBQVNDLEtBQTNCO0FBQ0EscUJBQUtULE1B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QUw7QUFDSDs7OytCQUVNUyxNLEVBQVE7QUFDWHJFLG9CQUFRQyxHQUFSLENBQVlvRSxNQUFaO0FBQ0EsZ0JBQUl4RCxPQUFPLElBQVg7QUFDQSxpQkFBSzFCLFVBQUwsR0FBa0JrRixPQUFPbkYsRUFBUCxJQUFhLElBQS9CO0FBQ0EsZ0JBQUltRixPQUFPbkYsRUFBWCxFQUFlO0FBQ1gsdUNBQVEsY0FBUixFQUF3QixFQUFDQSxJQUFJbUYsT0FBT25GLEVBQVosRUFBeEIsRUFBeUM0QixJQUF6QyxDQUE4QyxlQUFPO0FBQ2pEZCw0QkFBUUMsR0FBUixDQUFZYyxJQUFJakMsSUFBaEI7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDb0IrQix5QkFBS3lELFlBQUwsQ0FBa0J2RCxJQUFJakMsSUFBdEI7QUFDSCxpQkFQRCxFQU9HNEMsS0FQSCxDQU9TLGVBQU8sQ0FFZixDQVREO0FBVUgsYUFYRCxNQVdPO0FBQ0gscUJBQUtsQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EscUJBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EscUJBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EscUJBQUtMLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxxQkFBS0QsSUFBTCxHQUFZLFlBQVo7QUFFSDtBQUNiO0FBQ0E7QUFDQTs7QUFHUzs7OztFQS9Rb0NKLGVBQUt1RixJOztrQkFBekI1RixXIiwiZmlsZSI6ImFkZENoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdXBuZyBmcm9tICd1cG5nLWpzJ1xuICAgIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gICAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vbWl4aW5zL3NlcnZpY2UnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBhZGRDaGlsZHJlbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmt7vliqDlranlrZAnXG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGRlZmF1bHRDaGlsZElkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGQnKS5pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuSWQ6IG51bGwsXG4gICAgICAgICAgICBkYXRlOiAnMjAxMi0wOS0wMScsXG4gICAgICAgICAgICBuaWNrTmFtZTogJycsXG4gICAgICAgICAgICBhcnJheTogWyflpbMnLCAn55S3J10sXG4gICAgICAgICAgICBpbmRleDogMSwvL+m7mOiupOeUt1xuICAgICAgICAgICAgYXZhdGFyVXJsOiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdlaWdodDogbnVsbCxcblxuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV45Li6JywgZS5kZXRhaWwudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNoYW5nZVdlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUhlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGUuZGV0YWlsLnZhbHVlXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VOaWNrTmFtZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgYWRkQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbmREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6IHRoaXMuZGF0YS5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLmRhdGEubmlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIHNleDogdGhpcy5kYXRhLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICBiaXJ0aGRheTogdGhpcy5kYXRhLmRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5kYXRhLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiB0aGlzLmRhdGEud2VpZ2h0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2hpbGRyZW5JZCkge1xuICAgICAgICAgICAgICAgICAgICBzZW5kRGF0YS5pZCA9IHRoaXMuZGF0YS5jaGlsZHJlbklkXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdhZGRDaGlsZHJlbicsIHNlbmREYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5kYXRhLmNoaWxkcmVuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2RlZmF1bHRDaGlsZElkJywgZGF0YToge2lkOiByZXMuZGF0YS5pZCxuaWNrbmFtZTpyZXMuZGF0YS5uaWNrbmFtZX19KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IGVyci5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGVsZXRlQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGRJZCcpXG4vLyAgICAgICAgICAgICAgICBpZihkZWZhdWx0Q2hpbGRJZC5pZD09dGhpcy5kYXRhLmNoaWxkcmVuSWQpe1xuLy8gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6J+S4jeiDveWIoOmZpOm7mOiupOeahOWtqeWtkCcsaWNvbjonbm9uZSd9KVxuLy8gICAgICAgICAgICAgICAgICAgIHJldHVyblxuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5o+Q56S6JywgY29udGVudDogJ+ehruiupOWIoOmZpOWtqeWtkCcsIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoJ2RlbENoaWxkJywge2lkOiBzZWxmLmRhdGEuY2hpbGRyZW5JZH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6IGVyci5lcnJvciwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGxvYWRJbWc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuXG4gICAgICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/nlJ/miJDnmoTlm77niYfkuLTml7bot6/lvoTnlLvmiJBjYW52YXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nV2lkdGggPSA2MCwgaW1nSGVpZ2h0ID0gNjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJlcy50ZW1wRmlsZVBhdGhzWzBdLCAwLCAwLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXcoZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5jYW52YXNHZXRJbWFnZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGltZ1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGltZ0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtID09PSAnaW9zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWFvOWuueWkhOeQhu+8mmlvc+iOt+WPlueahOWbvueJh+S4iuS4i+mioOWAklxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfmiJHmiafooYzkuoYyJ30pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBzZWxmLnJldmVyc2VJbWdEYXRhKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gcG5n57yW56CBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG5nRGF0YSA9IHVwbmcuZW5jb2RlKFtyZXMuZGF0YS5idWZmZXJdLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBiYXNlNjTnvJbnoIFcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocG5nRGF0YSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdCYXNlNjQgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF2YXRhclVybCA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+aIkeaJp+ihjOS6hjMnfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL2lvc+WbvueJh+WkhOeQhlxuXG5cbi8vICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4vLyAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4vLyAgICAgICAgICAgIGNvdW50OjEsXG4vLyAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHRlbXApIHtcbi8vICAgICAgICAgICAgICBpZih0ZW1wLnRlbXBGaWxlUGF0aHMubGVuZ3RoKXtcbi8vICAgICAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gdGVtcC50ZW1wRmlsZVBhdGhzXG4vLyAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbi8vICAgICAgICAgICAgICAgICAgc3JjOnRlbXBGaWxlUGF0aHNbMF0sXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24gKHJlcykge1xuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aWR0aClcbi8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuaGVpZ2h0KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4vLyAgICAgICAgICAgICAgICAgIHVybDogdGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInLFxuLy8gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChyZXMuZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGEoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLy8vICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vXG4vLyAgICAgICAgICAgICAgICAvL3NlbGYuc2V0RGF0YSh7YXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGc7YmFzZTY0LCcgKyBiYXNlNjR9KVxuLy9cbi8vXG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXApO1xuLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgICB9XG4vLyAgICAgICAgICB9KVxuLy8gICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmVyc2VJbWdEYXRhKHJlcykge1xuICAgICAgICAgICAgdmFyIHcgPSByZXMud2lkdGhcbiAgICAgICAgICAgIHZhciBoID0gcmVzLmhlaWdodFxuICAgICAgICAgICAgbGV0IGNvbiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaCAvIDI7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdyAqIDQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb24gPSByZXMuZGF0YVtpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpICogdyAqIDQgKyBqXSA9IHJlcy5kYXRhWyhoIC0gaSAtIDEpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVsoaCAtIGkgLSAxKSAqIHcgKiA0ICsgal0gPSBjb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cblxuICAgICAgICBnZXRDaGlsZEluZm8oZGF0YSkge1xuXG4gICAgICAgICAgICB0aGlzLndlaWdodCA9IGRhdGEud2VpZ2h0XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBkYXRhLmJpcnRoZGF5Ly8gcmVzLmRhdGFcbiAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSBkYXRhLm5pY2tuYW1lXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gZGF0YS5zZXhcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5iYXNlVXJsICsgZGF0YS5hdmF0YXJ1cmxcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5JZCA9IG9wdGlvbi5pZCB8fCBudWxsXG4gICAgICAgICAgICBpZiAob3B0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCgnZ2V0Q2hpbGRJbmZvJywge2lkOiBvcHRpb24uaWR9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuZGF0ZT1yZXMuZGF0YS5iaXJ0aGRheS8vIHJlcy5kYXRhXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5uaWNrTmFtZT0gcmVzLmRhdGEubmlja25hbWVcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmluZGV4PXJlcy5kYXRhLnNleC8v6buY6K6k55S3XG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdmF0YXI9cmVzLmRhdGEuYXZhdGFydXJsXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0Q2hpbGRJbmZvKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSAnMTk5OS0wMS0wMSdcblxuICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICBoZWFkZXI6IHtcbi8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vICAgICAgICAgICAgfSxcblxuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=