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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWZhdWx0Q2hpbGRJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiY2hpbGRyZW5JZCIsImRhdGUiLCJuaWNrTmFtZSIsImFycmF5IiwiaW5kZXgiLCJhdmF0YXJVcmwiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJnZW5kZXIiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJtZXRob2RzIiwiYmluZERhdGVDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiYmluZFBpY2tlckNoYW5nZSIsImNoYW5nZVdlaWdodCIsImNoYW5nZUhlaWdodCIsImNoYW5nZU5pY2tOYW1lIiwiZGVsZXRlQ2hpbGRyZW4iLCJzZWxmIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJ0aGVuIiwiY29kZSIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYXRjaCIsImVyciIsImVycm9yIiwiY2FuY2VsIiwidXBsb2FkSW1nIiwiY2hvb3NlSW1hZ2UiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwicGxhdGZvcm0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZHJhd0ltYWdlIiwidGVtcEZpbGVQYXRocyIsImRyYXciLCJjYW52YXNHZXRJbWFnZURhdGEiLCJjYW52YXNJZCIsIngiLCJ5Iiwid2lkdGgiLCJyZXZlcnNlSW1nRGF0YSIsInBuZ0RhdGEiLCJ1cG5nIiwiZW5jb2RlIiwiYnVmZmVyIiwiYmFzZTY0IiwiYXJyYXlCdWZmZXJUb0Jhc2U2NCIsIm5ld0Jhc2U2NCIsIiRhcHBseSIsImZhaWwiLCJ1c2VySW5mbyIsInNlbmREYXRhIiwibmlja25hbWUiLCJzZXgiLCJiaXJ0aGRheSIsImluZGV4T2YiLCJhdmF0YXIiLCJzZW5kVXNlckluZm9EYXRhIiwiY29kZTEiLCJzZXRTdG9yYWdlIiwia2V5Iiwib2xkQ2hpbGRyZW5MaXN0IiwiY29uY2F0IiwiZm9yRWFjaCIsIml0ZW0iLCJ3IiwiaCIsImNvbiIsImkiLCJqIiwiYmFzZVVybCIsImF2YXRhcnVybCIsIm9wdGlvbiIsImdldENoaWxkSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyw0QkFBZ0JDLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsRUFBb0NDLEVBRGpEO0FBRUhDLHdCQUFZLElBRlQ7QUFHSEMsa0JBQU0sWUFISDtBQUlIQyxzQkFBVSxFQUpQO0FBS0hDLG1CQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FMSjtBQU1IQyxtQkFBTyxDQU5KLEVBTU07QUFDVEMsdUJBQVcsRUFQUjtBQVFIQyxvQkFBUSxJQVJMO0FBU0hDLG9CQUFRLElBVEw7QUFVSEMsb0JBQU9YLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsRUFBb0NVO0FBVnhDLFMsUUFhUEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUNUQyxPLEdBQVU7QUFDTkMsNEJBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFDekJDLHdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBMUM7QUFDQSxxQkFBS2hCLElBQUwsR0FBWVksRUFBRUcsTUFBRixDQUFTQyxLQUFyQjtBQUNILGFBSks7QUFLTkMsOEJBQWtCLDBCQUFVTCxDQUFWLEVBQWE7QUFDM0JDLHdCQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsRUFBRUcsTUFBRixDQUFTQyxLQUEvQjs7QUFFQSxxQkFBS2IsS0FBTCxHQUFhUyxFQUFFRyxNQUFGLENBQVNDLEtBQXRCO0FBQ0gsYUFUSzs7QUFXTkUsMEJBQWMsc0JBQVVOLENBQVYsRUFBYTtBQUN2QkMsd0JBQVFDLEdBQVIsQ0FBWSxJQUFaLEVBQWtCRixFQUFFRyxNQUFGLENBQVNDLEtBQTNCO0FBQ0EscUJBQUtWLE1BQUwsR0FBY00sRUFBRUcsTUFBRixDQUFTQyxLQUF2QjtBQUNILGFBZEs7QUFlTkcsMEJBQWMsc0JBQVVQLENBQVYsRUFBYTtBQUN2QixxQkFBS1AsTUFBTCxHQUFjTyxFQUFFRyxNQUFGLENBQVNDLEtBQXZCO0FBRUgsYUFsQks7QUFtQk5JLDRCQUFnQix3QkFBVVIsQ0FBVixFQUFhO0FBQ3pCLHFCQUFLWCxRQUFMLEdBQWdCVyxFQUFFRyxNQUFGLENBQVNDLEtBQXpCO0FBQ0gsYUFyQks7O0FBd0JOSywwQkF4Qk0sNEJBd0JXO0FBQ2Isb0JBQU1DLE9BQU8sSUFBYjtBQUNBLG9CQUFJM0IsaUJBQWlCQyxlQUFLQyxjQUFMLENBQW9CLGdCQUFwQixFQUFzQ0MsRUFBM0Q7QUFDQSxvQkFBR0gsZUFBZUcsRUFBZixJQUFtQixLQUFLSixJQUFMLENBQVVLLFVBQWhDLEVBQTJDO0FBQ3ZDd0IsdUJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxPQUFNLFdBQVAsRUFBbUJDLE1BQUssTUFBeEIsRUFBYjtBQUNBO0FBQ0g7QUFDREgsbUJBQUdJLFNBQUgsQ0FBYTtBQUNURiwyQkFBTyxNQURFLEVBQ01HLFNBQVMsUUFEZixFQUN5QkMsU0FBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RELDRCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2IsbURBQVEsVUFBUixFQUFvQixFQUFDakMsSUFBSXdCLEtBQUs1QixJQUFMLENBQVVLLFVBQWYsRUFBcEIsRUFBZ0RpQyxJQUFoRCxDQUFxRCxVQUFDRixHQUFELEVBQVM7QUFDMURqQix3Q0FBUUMsR0FBUixDQUFZZ0IsR0FBWjtBQUNBLG9DQUFJQSxJQUFJRyxJQUFKLElBQVksQ0FBaEIsRUFBbUI7QUFDZnJDLG1EQUFLNEIsU0FBTCxDQUFlLEVBQUNDLE9BQU9LLElBQUlJLE9BQVosRUFBZjtBQUNBQywrQ0FBVyxZQUFZO0FBQ25CdkMsdURBQUt3QyxZQUFMLENBQWtCO0FBQ2RDLG1EQUFPO0FBRE8seUNBQWxCO0FBR0gscUNBSkQsRUFJRyxJQUpIO0FBTUgsaUNBUkQsTUFRTztBQUNIekMsbURBQUs0QixTQUFMLENBQWUsRUFBQ0MsT0FBT0ssSUFBSUksT0FBWixFQUFxQlIsTUFBTSxNQUEzQixFQUFmO0FBQ0g7QUFDSiw2QkFiRCxFQWFHWSxLQWJILENBYVMsVUFBQ0MsR0FBRCxFQUFTO0FBQ2RoQixtQ0FBR0MsU0FBSCxDQUFhLEVBQUNDLE9BQU9jLElBQUlDLEtBQVosRUFBbUJkLE1BQU0sTUFBekIsRUFBYjtBQUNILDZCQWZEO0FBZ0JILHlCQWpCRCxNQWlCTyxJQUFJSSxJQUFJVyxNQUFSLEVBQWdCO0FBQ25CNUIsb0NBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0g7QUFDSjtBQXRCUSxpQkFBYjtBQXlCSCxhQXhESzs7O0FBMERONEIsdUJBQVcscUJBQVk7QUFDbkIsb0JBQU1wQixPQUFPLElBQWI7O0FBRUFDLG1CQUFHb0IsV0FBSCxDQUFlO0FBQ1hkLDZCQUFTLHNCQUFPO0FBQ1o7QUFDQSw0QkFBTWUsTUFBTXJCLEdBQUdzQixtQkFBSCxDQUF1QixVQUF2QixDQUFaO0FBQ0EsNEJBQU1DLFdBQVd2QixHQUFHd0IsaUJBQUgsR0FBdUJELFFBQXhDO0FBQ0EsNEJBQU1FLFdBQVcsRUFBakI7QUFBQSw0QkFBcUJDLFlBQVksRUFBakM7QUFDQUwsNEJBQUlNLFNBQUosQ0FBY3BCLElBQUlxQixhQUFKLENBQWtCLENBQWxCLENBQWQsRUFBb0MsQ0FBcEMsRUFBdUMsQ0FBdkMsRUFBMENILFFBQTFDLEVBQW9EQyxTQUFwRDtBQUNBTCw0QkFBSVEsSUFBSixDQUFTLEtBQVQsRUFBZ0IsWUFBTTtBQUNsQjdCLCtCQUFHOEIsa0JBQUgsQ0FBc0I7QUFDbEJDLDBDQUFVLFVBRFE7QUFFbEJDLG1DQUFHLENBRmU7QUFHbEJDLG1DQUFHLENBSGU7QUFJbEJDLHVDQUFPVCxRQUpXO0FBS2xCM0Msd0NBQVE0QyxTQUxVO0FBTWxCcEIseUNBQVMsc0JBQU87O0FBRVosd0NBQUlpQixhQUFhLEtBQWpCLEVBQXdCO0FBQ3BCOztBQUVBaEIsOENBQU1SLEtBQUtvQyxjQUFMLENBQW9CNUIsR0FBcEIsQ0FBTjtBQUNIOztBQUVEO0FBQ0Esd0NBQUk2QixVQUFVQyxpQkFBS0MsTUFBTCxDQUFZLENBQUMvQixJQUFJcEMsSUFBSixDQUFTb0UsTUFBVixDQUFaLEVBQStCaEMsSUFBSTJCLEtBQW5DLEVBQTBDM0IsSUFBSXpCLE1BQTlDLENBQWQ7QUFDQTs7QUFFQSx3Q0FBSTBELFNBQVN4QyxHQUFHeUMsbUJBQUgsQ0FBdUJMLE9BQXZCLENBQWI7O0FBRUE5Qyw0Q0FBUUMsR0FBUixDQUFZLDRCQUE0QmlELE1BQXhDO0FBQ0Esd0NBQUlFLFlBQVksNEJBQTRCRixNQUE1QztBQUNwQztBQUNBO0FBQ0E7QUFDb0N6Qyx5Q0FBS2xCLFNBQUwsR0FBaUIsNEJBQTRCMkQsTUFBN0M7QUFDQXpDLHlDQUFLNEMsTUFBTDtBQUVILGlDQTVCaUI7QUE2QmxCQyxvQ0E3QmtCLGdCQTZCYnJDLEdBN0JhLEVBNkJSO0FBQ05QLHVDQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxRQUFSLEVBQWlCQyxNQUFLLE1BQXRCLEVBQWI7O0FBRUFiLDRDQUFRQyxHQUFSLENBQVlnQixHQUFaO0FBQ0g7QUFqQ2lCLDZCQUF0QjtBQW1DSCx5QkFwQ0Q7QUFxQ0g7QUE1Q1UsaUJBQWY7QUE4Q0g7QUFDRDs7O0FBR1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdKa0IsUzs7Ozs7b0NBZ0tFbEIsQyxFQUFHO0FBQ1gsZ0JBQUlVLE9BQU8sSUFBWDs7QUFFQSxnQkFBRyxDQUFDVixFQUFFRyxNQUFGLENBQVNxRCxRQUFiLEVBQXNCO0FBQ2xCN0MsbUJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxPQUFPLFFBQVIsRUFBaUJDLE1BQUssTUFBdEIsRUFBYjtBQUNBO0FBQ0g7QUFDRCxnQkFBSTJDLFdBQVc7QUFDWEMsMEJBQVUsS0FBSzVFLElBQUwsQ0FBVU8sUUFEVDtBQUVYc0UscUJBQUssS0FBSzdFLElBQUwsQ0FBVVMsS0FGSjtBQUdYcUUsMEJBQVUsS0FBSzlFLElBQUwsQ0FBVU0sSUFIVDtBQUlYSyx3QkFBUSxLQUFLWCxJQUFMLENBQVVXLE1BSlA7QUFLWEMsd0JBQVEsS0FBS1osSUFBTCxDQUFVWTtBQUxQLGFBQWY7QUFPQSxnQkFBRyxDQUFDLEtBQUtaLElBQUwsQ0FBVVUsU0FBZCxFQUF3QjtBQUNwQm1CLG1CQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxRQUFSLEVBQWlCQyxNQUFLLE1BQXRCLEVBQWI7QUFDSDtBQUNELGdCQUFHLEtBQUtoQyxJQUFMLENBQVVVLFNBQVYsQ0FBb0JxRSxPQUFwQixDQUE0QixTQUE1QixLQUF3QyxDQUFDLENBQTVDLEVBQThDO0FBQzFDSix5QkFBU0ssTUFBVCxHQUFnQixLQUFLaEYsSUFBTCxDQUFVVSxTQUExQjtBQUNIO0FBQ0QsZ0JBQUksS0FBS1YsSUFBTCxDQUFVSyxVQUFkLEVBQTBCO0FBQ3RCc0UseUJBQVN2RSxFQUFULEdBQWMsS0FBS0osSUFBTCxDQUFVSyxVQUF4QjtBQUVIO0FBQ0QsZ0JBQUcsQ0FBQ3dCLEdBQUcxQixjQUFILENBQWtCLFVBQWxCLEVBQThCSSxRQUFsQyxFQUEyQztBQUN2QyxvQkFBSTBFLG1CQUFpQjtBQUNqQjFFLDhCQUFTcUIsS0FBSzhDLFFBQUwsQ0FBY25FLFFBRE47QUFFakJHLCtCQUFVa0IsS0FBSzhDLFFBQUwsQ0FBY2hFLFNBRlA7QUFHakJtRSx5QkFBSWpELEtBQUs4QyxRQUFMLENBQWM3RDtBQUhELGlCQUFyQjtBQUtBLHVDQUFRLFVBQVIsRUFBbUJvRSxnQkFBbkIsRUFBcUMzQyxJQUFyQyxDQUEwQyxlQUFLO0FBQzNDbkIsNEJBQVFDLEdBQVIsQ0FBWWdCLEdBQVo7O0FBRUEsd0JBQUdBLElBQUk4QyxLQUFKLElBQVcsQ0FBZCxFQUFnQjtBQUNackQsMkJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxPQUFPSyxJQUFJSSxPQUFaLEVBQW9CUixNQUFLLE1BQXpCLEVBQWI7QUFDSDtBQUNKLGlCQU5ELEVBTUdZLEtBTkgsQ0FNUyxlQUFLO0FBQ1Z6Qiw0QkFBUUMsR0FBUixDQUFZeUIsR0FBWjtBQUNILGlCQVJEO0FBU0EzQywrQkFBS2lGLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxVQUFOLEVBQWtCcEYsTUFBTWtCLEVBQUVHLE1BQUYsQ0FBU3FELFFBQWpDLEVBQWhCO0FBQ0g7QUFDRCxtQ0FBUSxhQUFSLEVBQXVCQyxRQUF2QixFQUFpQ3JDLElBQWpDLENBQXNDLFVBQUNGLEdBQUQsRUFBUztBQUMzQ2pCLHdCQUFRQyxHQUFSLENBQVlnQixHQUFaO0FBQ0Esb0JBQUlBLElBQUlHLElBQUosSUFBWSxDQUFoQixFQUFtQjtBQUNmckMsbUNBQUs0QixTQUFMLENBQWUsRUFBQ0MsT0FBT0ssSUFBSUksT0FBWixFQUFmOztBQUVBLHdCQUFJLENBQUNaLEtBQUs1QixJQUFMLENBQVVLLFVBQWYsRUFBMkI7QUFDdkJILHVDQUFLaUYsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGdCQUFOLEVBQXdCcEYsTUFBTSxFQUFDSSxJQUFJZ0MsSUFBSXBDLElBQUosQ0FBU0ksRUFBZCxFQUFpQndFLFVBQVN4QyxJQUFJcEMsSUFBSixDQUFTNEUsUUFBbkMsRUFBOUIsRUFBaEI7QUFDSDtBQUNELHdCQUFJUyxrQkFBa0J4RCxHQUFHMUIsY0FBSCxDQUFrQixjQUFsQixDQUF0QjtBQUNBLHdCQUFHLENBQUN3RSxTQUFTdkUsRUFBYixFQUFnQjtBQUFHO0FBQ2ZGLHVDQUFLaUYsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBc0JwRixNQUFLcUYsZ0JBQWdCQyxNQUFoQixDQUF1QmxELElBQUlwQyxJQUEzQixDQUEzQixFQUFoQjtBQUNILHFCQUZELE1BRU07QUFBRTtBQUNKcUYsd0NBQWdCRSxPQUFoQixDQUF3QixnQkFBTTtBQUMxQixnQ0FBR0MsS0FBS3BGLEVBQUwsSUFBU3VFLFNBQVN2RSxFQUFyQixFQUF3QjtBQUNwQm9GLHVDQUFLcEQsSUFBSXBDLElBQVQ7QUFDSDtBQUNKLHlCQUpEO0FBS0FFLHVDQUFLaUYsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBc0JwRixNQUFLcUYsZUFBM0IsRUFBaEI7QUFDSDs7QUFHRDVDLCtCQUFXLFlBQVk7QUFDbkJ2Qyx1Q0FBS3dDLFlBQUwsQ0FBa0I7QUFDZEMsbUNBQU87QUFETyx5QkFBbEI7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLSCxpQkF4QkQsTUF3Qk87QUFDSHpDLG1DQUFLNEIsU0FBTCxDQUFlLEVBQUNDLE9BQU9LLElBQUlJLE9BQVosRUFBcUJSLE1BQU0sTUFBM0IsRUFBZjtBQUNIO0FBQ0osYUE3QkQsRUE2QkdZLEtBN0JILENBNkJTLFVBQUNDLEdBQUQsRUFBUztBQUNkMUIsd0JBQVFDLEdBQVIsQ0FBWXlCLEdBQVo7QUFDQTNDLCtCQUFLNEIsU0FBTCxDQUFlLEVBQUNDLE9BQU9jLElBQUlMLE9BQVosRUFBcUJSLE1BQU0sTUFBM0IsRUFBZjtBQUNILGFBaENEO0FBbUNIOzs7dUNBR2NJLEcsRUFBSztBQUNoQixnQkFBSXFELElBQUlyRCxJQUFJMkIsS0FBWjtBQUNBLGdCQUFJMkIsSUFBSXRELElBQUl6QixNQUFaO0FBQ0EsZ0JBQUlnRixNQUFNLENBQVY7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLElBQUksQ0FBeEIsRUFBMkJFLEdBQTNCLEVBQWdDO0FBQzVCLHFCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUosSUFBSSxDQUF4QixFQUEyQkksR0FBM0IsRUFBZ0M7QUFDNUJGLDBCQUFNdkQsSUFBSXBDLElBQUosQ0FBUzRGLElBQUlILENBQUosR0FBUSxDQUFSLEdBQVlJLENBQXJCLENBQU47QUFDQXpELHdCQUFJcEMsSUFBSixDQUFTNEYsSUFBSUgsQ0FBSixHQUFRLENBQVIsR0FBWUksQ0FBckIsSUFBMEJ6RCxJQUFJcEMsSUFBSixDQUFTLENBQUMwRixJQUFJRSxDQUFKLEdBQVEsQ0FBVCxJQUFjSCxDQUFkLEdBQWtCLENBQWxCLEdBQXNCSSxDQUEvQixDQUExQjtBQUNBekQsd0JBQUlwQyxJQUFKLENBQVMsQ0FBQzBGLElBQUlFLENBQUosR0FBUSxDQUFULElBQWNILENBQWQsR0FBa0IsQ0FBbEIsR0FBc0JJLENBQS9CLElBQW9DRixHQUFwQztBQUNIO0FBQ0o7QUFDRCxtQkFBT3ZELEdBQVA7QUFDSDs7O3FDQUVZcEMsSSxFQUFNOztBQUVmLGlCQUFLWSxNQUFMLEdBQWNaLEtBQUtZLE1BQW5CO0FBQ0EsaUJBQUtELE1BQUwsR0FBY1gsS0FBS1csTUFBbkI7QUFDQSxpQkFBS0wsSUFBTCxHQUFZTixLQUFLOEUsUUFBakIsQ0FKZSxDQUlVO0FBQ3pCLGlCQUFLdkUsUUFBTCxHQUFnQlAsS0FBSzRFLFFBQXJCO0FBQ0EsaUJBQUtuRSxLQUFMLEdBQWFULEtBQUs2RSxHQUFsQjtBQUNBLGlCQUFLbkUsU0FBTCxHQUFpQixLQUFLb0YsT0FBTCxHQUFlOUYsS0FBSytGLFNBQXJDO0FBQ0EsaUJBQUt2QixNQUFMO0FBQ0g7OzsrQkFFTXdCLE0sRUFBUTtBQUNYN0Usb0JBQVFDLEdBQVIsQ0FBWTRFLE1BQVo7QUFDQSxnQkFBSXBFLE9BQU8sSUFBWDtBQUNBLGlCQUFLdkIsVUFBTCxHQUFrQjJGLE9BQU81RixFQUFQLElBQWEsSUFBL0I7QUFDQSxnQkFBSTRGLE9BQU81RixFQUFYLEVBQWU7QUFDWCx1Q0FBUSxjQUFSLEVBQXdCLEVBQUNBLElBQUk0RixPQUFPNUYsRUFBWixFQUF4QixFQUF5Q2tDLElBQXpDLENBQThDLGVBQU87QUFDakRuQiw0QkFBUUMsR0FBUixDQUFZZ0IsSUFBSXBDLElBQWhCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ29CNEIseUJBQUtxRSxZQUFMLENBQWtCN0QsSUFBSXBDLElBQXRCO0FBQ0gsaUJBUEQsRUFPRzRDLEtBUEgsQ0FPUyxlQUFPLENBRWYsQ0FURDtBQVVILGFBWEQsTUFXTztBQUNILHFCQUFLbEMsU0FBTCxHQUFpQixFQUFqQjtBQUNBLHFCQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLHFCQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLHFCQUFLTCxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EscUJBQUtELElBQUwsR0FBWSxZQUFaO0FBRUg7QUFDYjtBQUNBO0FBQ0E7O0FBR1M7Ozs7RUF0VG9DSixlQUFLZ0csSTs7a0JBQXpCckcsVyIsImZpbGUiOiJhZGRDaGlsZHJlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHVwbmcgZnJvbSAndXBuZy1qcydcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWRkQ2hpbGRyZW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5re75Yqg5a2p5a2QJ1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBkZWZhdWx0Q2hpbGRJZDogd2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkJykuaWQsXG4gICAgICAgICAgICBjaGlsZHJlbklkOiBudWxsLFxuICAgICAgICAgICAgZGF0ZTogJzIwMTItMDktMDEnLFxuICAgICAgICAgICAgbmlja05hbWU6ICcnLFxuICAgICAgICAgICAgYXJyYXk6IFsn5aWzJywgJ+eUtyddLFxuICAgICAgICAgICAgaW5kZXg6IDEsLy/pu5jorqTnlLdcbiAgICAgICAgICAgIGF2YXRhclVybDogJycsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB3ZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICBnZW5kZXI6d2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkJykuZ2VuZGVyLFxuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV45Li6JywgZS5kZXRhaWwudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNoYW5nZVdlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZUhlaWdodDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGUuZGV0YWlsLnZhbHVlXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VOaWNrTmFtZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgZGVsZXRlQ2hpbGRyZW4oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGRJZCcpLmlkXG4gICAgICAgICAgICAgICAgaWYoZGVmYXVsdENoaWxkSWQuaWQ9PXRoaXMuZGF0YS5jaGlsZHJlbklkKXtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTon5LiN6IO95Yig6Zmk6buY6K6k55qE5a2p5a2QJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaPkOekuicsIGNvbnRlbnQ6ICfnoa7orqTliKDpmaTlranlrZAnLCBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KCdkZWxDaGlsZCcsIHtpZDogc2VsZi5kYXRhLmNoaWxkcmVuSWR9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiBlcnIuZXJyb3IsIGljb246ICdub25lJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdXBsb2FkSW1nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAgICAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v55Sf5oiQ55qE5Zu+54mH5Li05pe26Lev5b6E55S75oiQY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteUNhbnZhcycpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ1dpZHRoID0gNjAsIGltZ0hlaWdodCA9IDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShyZXMudGVtcEZpbGVQYXRoc1swXSwgMCwgMCwgaW1nV2lkdGgsIGltZ0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guY2FudmFzR2V0SW1hZ2VEYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdteUNhbnZhcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbWdXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBpbWdIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybSA9PT0gJ2lvcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbzlrrnlpITnkIbvvJppb3Pojrflj5bnmoTlm77niYfkuIrkuIvpoqDlgJJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHNlbGYucmV2ZXJzZUltZ0RhdGEocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLiBwbmfnvJbnoIFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbmdEYXRhID0gdXBuZy5lbmNvZGUoW3Jlcy5kYXRhLmJ1ZmZlcl0sIHJlcy53aWR0aCwgcmVzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQuIGJhc2U2NOe8lueggVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChwbmdEYXRhKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0Jhc2U2NCA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBiYXNlNjRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDogJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXZhdGFyVXJsID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5Zu+54mH57yW6K+R6ZSZ6K+vJyxpY29uOidub25lJ30pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9pb3Plm77niYflpITnkIZcblxuXG4vLyAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuLy8gICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuLy8gICAgICAgICAgICBjb3VudDoxLFxuLy8gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uICh0ZW1wKSB7XG4vLyAgICAgICAgICAgICAgaWYodGVtcC50ZW1wRmlsZVBhdGhzLmxlbmd0aCl7XG4vLyAgICAgICAgICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IHRlbXAudGVtcEZpbGVQYXRoc1xuLy8gICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuLy8gICAgICAgICAgICAgICAgICBzcmM6dGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLndpZHRoKVxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5oZWlnaHQpXG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbi8vICAgICAgICAgICAgICAgICAgdXJsOiB0ZW1wRmlsZVBhdGhzWzBdLFxuLy8gICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbi8vICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChyZXMuZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtcbi8vICAgICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDogJ2RhdGE6aW1hZ2UvanBnO2Jhc2U2NCwnICsgYmFzZTY0XG4vLyAgICAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vLy8gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuLy9cbi8vICAgICAgICAgICAgICAgIC8vc2VsZi5zZXREYXRhKHthdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZztiYXNlNjQsJyArIGJhc2U2NH0pXG4vL1xuLy9cbi8vICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgY29uc29sZS5sb2codGVtcCk7XG4vLyAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgIGZhaWw6ZnVuY3Rpb24gKGVycikge1xuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICAgIH0pXG4vLyAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWRkQ2hpbGRyZW4oZSkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFlLmRldGFpbC51c2VySW5mbyl7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+mcgOimgeaCqOeahOaOiOadgycsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHNlbmREYXRhID0ge1xuICAgICAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLmRhdGEubmlja05hbWUsXG4gICAgICAgICAgICAgICAgc2V4OiB0aGlzLmRhdGEuaW5kZXgsXG4gICAgICAgICAgICAgICAgYmlydGhkYXk6IHRoaXMuZGF0YS5kYXRlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5kYXRhLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IHRoaXMuZGF0YS53ZWlnaHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuYXZhdGFyVXJsKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5b+F6aG75LiK5Lyg5aS05YOPJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuYXZhdGFyVXJsLmluZGV4T2YoJ3VwbG9hZHMnKT09LTEpe1xuICAgICAgICAgICAgICAgIHNlbmREYXRhLmF2YXRhcj10aGlzLmRhdGEuYXZhdGFyVXJsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmNoaWxkcmVuSWQpIHtcbiAgICAgICAgICAgICAgICBzZW5kRGF0YS5pZCA9IHRoaXMuZGF0YS5jaGlsZHJlbklkXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKS5uaWNrTmFtZSl7XG4gICAgICAgICAgICAgICAgbGV0IHNlbmRVc2VySW5mb0RhdGE9e1xuICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpzZWxmLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi51c2VySW5mby5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIHNleDpzZWxmLnVzZXJJbmZvLmdlbmRlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0KCdhdXRoQmluZCcsc2VuZFVzZXJJbmZvRGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5jb2RlMSE9MSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZSxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBlLmRldGFpbC51c2VySW5mb30pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KCdhZGRDaGlsZHJlbicsIHNlbmREYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2V9KVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmRhdGEuY2hpbGRyZW5JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdkZWZhdWx0Q2hpbGRJZCcsIGRhdGE6IHtpZDogcmVzLmRhdGEuaWQsbmlja25hbWU6cmVzLmRhdGEubmlja25hbWV9fSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkQ2hpbGRyZW5MaXN0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NoaWxkcmVuTGlzdCcpXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZW5kRGF0YS5pZCl7ICAvL2FkZFxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdjaGlsZHJlbkxpc3QnLCBkYXRhOm9sZENoaWxkcmVuTGlzdC5jb25jYXQocmVzLmRhdGEpfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgeyAvL3VwZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hpbGRyZW5MaXN0LmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaWQ9PXNlbmREYXRhLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbT1yZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2NoaWxkcmVuTGlzdCcsIGRhdGE6b2xkQ2hpbGRyZW5MaXN0fSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZSwgaWNvbjogJ25vbmUnfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6IGVyci5tZXNzYWdlLCBpY29uOiAnbm9uZSd9KVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldmVyc2VJbWdEYXRhKHJlcykge1xuICAgICAgICAgICAgdmFyIHcgPSByZXMud2lkdGhcbiAgICAgICAgICAgIHZhciBoID0gcmVzLmhlaWdodFxuICAgICAgICAgICAgbGV0IGNvbiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaCAvIDI7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdyAqIDQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb24gPSByZXMuZGF0YVtpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpICogdyAqIDQgKyBqXSA9IHJlcy5kYXRhWyhoIC0gaSAtIDEpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVsoaCAtIGkgLSAxKSAqIHcgKiA0ICsgal0gPSBjb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cblxuICAgICAgICBnZXRDaGlsZEluZm8oZGF0YSkge1xuXG4gICAgICAgICAgICB0aGlzLndlaWdodCA9IGRhdGEud2VpZ2h0XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmRhdGUgPSBkYXRhLmJpcnRoZGF5Ly8gcmVzLmRhdGFcbiAgICAgICAgICAgIHRoaXMubmlja05hbWUgPSBkYXRhLm5pY2tuYW1lXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gZGF0YS5zZXhcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5iYXNlVXJsICsgZGF0YS5hdmF0YXJ1cmxcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5JZCA9IG9wdGlvbi5pZCB8fCBudWxsXG4gICAgICAgICAgICBpZiAob3B0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCgnZ2V0Q2hpbGRJbmZvJywge2lkOiBvcHRpb24uaWR9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEuZGF0ZT1yZXMuZGF0YS5iaXJ0aGRheS8vIHJlcy5kYXRhXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5uaWNrTmFtZT0gcmVzLmRhdGEubmlja25hbWVcbi8vICAgICAgICAgICAgICAgICAgICBzZWxmLmluZGV4PXJlcy5kYXRhLnNleC8v6buY6K6k55S3XG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZi5hdmF0YXI9cmVzLmRhdGEuYXZhdGFydXJsXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0Q2hpbGRJbmZvKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhclVybCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSAnMTk5OS0wMS0wMSdcblxuICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICBoZWFkZXI6IHtcbi8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vICAgICAgICAgICAgfSxcblxuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=