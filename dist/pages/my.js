'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _service = require('./../mixins/service.js');

var _service2 = _interopRequireDefault(_service);

var _global = require('./../mixins/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var my = function (_wepy$page) {
    _inherits(my, _wepy$page);

    function my() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, my);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = my.__proto__ || Object.getPrototypeOf(my)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个人中心'
        }, _this.mixins = [_test2.default], _this.components = {}, _this.methods = {
            addChildren: function addChildren(e) {
                _wepy2.default.navigateTo({ url: 'addChildren' });
            },
            goDetail: function goDetail(e) {
                if (e.detail.userInfo) {
                    var self = this;
                    var user = wx.getStorageSync('userInfo').nickName;

                    if (!user) {

                        self.userInfo = e.detail.userInfo;
                        var sendData = {
                            nickName: self.userInfo.nickName,
                            avatarUrl: self.userInfo.avatarUrl,
                            sex: self.userInfo.gender
                        };
                        (0, _service2.default)('authBind', sendData).then(function (res) {
                            console.log(res);

                            if (res.code1 != 1) {
                                wx.showToast({ title: res.message, icon: 'none' });
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                        self.$apply();
                        _wepy2.default.setStorage({ key: 'userInfo', data: self.userInfo, success: function success() {
                                _wepy2.default.navigateTo({ url: 'personalInfo' });
                            }
                        });
                    } else {
                        _wepy2.default.navigateTo({ url: 'personalInfo' });
                    }
                } else {
                    wx.showToast({ title: '取消授权', icon: 'none' });
                }
            },
            goAboutUs: function goAboutUs(e) {
                _wepy2.default.navigateTo({ url: 'examine?id=0' });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(my, [{
        key: 'onShow',
        value: function onShow() {
            this.$parent.getGlobalData(this);
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'goArchives',
        value: function goArchives(e) {
            var tempId = e.currentTarget.dataset.index;
            console.log(tempId);
            _wepy2.default.navigateTo({ url: 'archives?id=' + tempId });
        }
    }]);

    return my;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(my , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsInRlc3RNaXhpbiIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYWRkQ2hpbGRyZW4iLCJlIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0RldGFpbCIsImRldGFpbCIsInVzZXJJbmZvIiwic2VsZiIsInVzZXIiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwibmlja05hbWUiLCJzZW5kRGF0YSIsImF2YXRhclVybCIsInNleCIsImdlbmRlciIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiY29kZTEiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJpY29uIiwiY2F0Y2giLCJlcnIiLCIkYXBwbHkiLCJzZXRTdG9yYWdlIiwia2V5IiwiZGF0YSIsInN1Y2Nlc3MiLCJnb0Fib3V0VXMiLCIkcGFyZW50IiwiZ2V0R2xvYmFsRGF0YSIsInRlbXBJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxFOzs7Ozs7Ozs7Ozs7OztrTEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLFUsR0FBYSxFLFFBa0JiQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ01DLENBRE4sRUFDUztBQUNYQywrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGFBQU4sRUFBaEI7QUFDSCxhQUhLO0FBS05DLG9CQUxNLG9CQUtHSixDQUxILEVBS007QUFDUixvQkFBSUEsRUFBRUssTUFBRixDQUFTQyxRQUFiLEVBQXVCO0FBQ25CLHdCQUFJQyxPQUFPLElBQVg7QUFDQSx3QkFBSUMsT0FBT0MsR0FBR0MsY0FBSCxDQUFrQixVQUFsQixFQUE4QkMsUUFBekM7O0FBRUEsd0JBQUksQ0FBQ0gsSUFBTCxFQUFXOztBQUVQRCw2QkFBS0QsUUFBTCxHQUFnQk4sRUFBRUssTUFBRixDQUFTQyxRQUF6QjtBQUNBLDRCQUFJTSxXQUFTO0FBQ1RELHNDQUFTSixLQUFLRCxRQUFMLENBQWNLLFFBRGQ7QUFFVEUsdUNBQVVOLEtBQUtELFFBQUwsQ0FBY08sU0FGZjtBQUdUQyxpQ0FBSVAsS0FBS0QsUUFBTCxDQUFjUztBQUhULHlCQUFiO0FBS0EsK0NBQVEsVUFBUixFQUFtQkgsUUFBbkIsRUFBNkJJLElBQTdCLENBQWtDLGVBQUs7QUFDbkNDLG9DQUFRQyxHQUFSLENBQVlDLEdBQVo7O0FBRUEsZ0NBQUdBLElBQUlDLEtBQUosSUFBVyxDQUFkLEVBQWdCO0FBQ1pYLG1DQUFHWSxTQUFILENBQWEsRUFBQ0MsT0FBT0gsSUFBSUksT0FBWixFQUFvQkMsTUFBSyxNQUF6QixFQUFiO0FBQ0g7QUFDSix5QkFORCxFQU1HQyxLQU5ILENBTVMsZUFBSztBQUNWUixvQ0FBUUMsR0FBUixDQUFZUSxHQUFaO0FBQ0gseUJBUkQ7QUFTQW5CLDZCQUFLb0IsTUFBTDtBQUNBMUIsdUNBQUsyQixVQUFMLENBQWdCLEVBQUNDLEtBQUssVUFBTixFQUFrQkMsTUFBTXZCLEtBQUtELFFBQTdCLEVBQXVDeUIsU0FBUyxtQkFBWTtBQUNwRTlCLCtDQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssY0FBTixFQUFoQjtBQUNIO0FBRlcseUJBQWhCO0FBSUgscUJBdEJELE1Bc0JNO0FBQ0ZGLHVDQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssY0FBTixFQUFoQjtBQUNIO0FBQ0osaUJBN0JELE1BOEJLO0FBQ0RNLHVCQUFHWSxTQUFILENBQWEsRUFBQ0MsT0FBTyxNQUFSLEVBQWVFLE1BQUssTUFBcEIsRUFBYjtBQUNIO0FBR0osYUF6Q0s7QUEwQ05RLHFCQTFDTSxxQkEwQ0loQyxDQTFDSixFQTBDTTtBQUNSQywrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFJLGNBQUwsRUFBaEI7QUFDSDtBQTVDSyxTOzs7OztpQ0FkRDtBQUNMLGlCQUFLOEIsT0FBTCxDQUFhQyxhQUFiLENBQTJCLElBQTNCO0FBRUg7OztpQ0FDTyxDQUVQOzs7bUNBRVVsQyxDLEVBQUc7QUFDVixnQkFBTW1DLFNBQU9uQyxFQUFFb0MsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEtBQXJDO0FBQ0FyQixvQkFBUUMsR0FBUixDQUFZaUIsTUFBWjtBQUNBbEMsMkJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxpQkFBaUJnQyxNQUF2QixFQUFoQjtBQUNIOzs7O0VBdkIyQmxDLGVBQUtzQyxJOztrQkFBaEIvQyxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuICAgIGltcG9ydCBnICAgICAgICBmcm9tICcuLi9taXhpbnMvZ2xvYmFsJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBvblNob3coKSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0R2xvYmFsRGF0YSh0aGlzKVxuXG4gICAgICAgIH1cbiAgICAgICAgb25Mb2FkKCl7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdvQXJjaGl2ZXMoZSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcElkPWUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wSWQpO1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhcmNoaXZlcz9pZD0nICsgdGVtcElkfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBhZGRDaGlsZHJlbihlKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29EZXRhaWwoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKS5uaWNrTmFtZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZW5kRGF0YT17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6c2VsZi51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi51c2VySW5mby5hdmF0YXJVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V4OnNlbGYudXNlckluZm8uZ2VuZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KCdhdXRoQmluZCcsc2VuZERhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5jb2RlMSE9MSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5tZXNzYWdlLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBzZWxmLnVzZXJJbmZvLCBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAncGVyc29uYWxJbmZvJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdwZXJzb25hbEluZm8nfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+WPlua2iOaOiOadgycsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ29BYm91dFVzKGUpe1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidleGFtaW5lP2lkPTAnfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuIl19