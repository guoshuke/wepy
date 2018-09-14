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
                    var user = this.data.userInfo.nickName;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsInRlc3RNaXhpbiIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYWRkQ2hpbGRyZW4iLCJlIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0RldGFpbCIsImRldGFpbCIsInVzZXJJbmZvIiwic2VsZiIsInVzZXIiLCJkYXRhIiwibmlja05hbWUiLCJzZW5kRGF0YSIsImF2YXRhclVybCIsInNleCIsImdlbmRlciIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiY29kZTEiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibWVzc2FnZSIsImljb24iLCJjYXRjaCIsImVyciIsIiRhcHBseSIsInNldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwiZ29BYm91dFVzIiwiJHBhcmVudCIsImdldEdsb2JhbERhdGEiLCJ0ZW1wSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7a0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxVLEdBQWEsRSxRQWtCYkMsTyxHQUFVO0FBQ05DLHVCQURNLHVCQUNNQyxDQUROLEVBQ1M7QUFDWEMsK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxhQUFOLEVBQWhCO0FBQ0gsYUFISztBQUtOQyxvQkFMTSxvQkFLR0osQ0FMSCxFQUtNO0FBQ1Isb0JBQUlBLEVBQUVLLE1BQUYsQ0FBU0MsUUFBYixFQUF1QjtBQUNuQix3QkFBSUMsT0FBTyxJQUFYO0FBQ0Esd0JBQUlDLE9BQU8sS0FBS0MsSUFBTCxDQUFVSCxRQUFWLENBQW1CSSxRQUE5Qjs7QUFFQSx3QkFBSSxDQUFDRixJQUFMLEVBQVc7O0FBRVBELDZCQUFLRCxRQUFMLEdBQWdCTixFQUFFSyxNQUFGLENBQVNDLFFBQXpCO0FBQ0EsNEJBQUlLLFdBQVM7QUFDVEQsc0NBQVNILEtBQUtELFFBQUwsQ0FBY0ksUUFEZDtBQUVURSx1Q0FBVUwsS0FBS0QsUUFBTCxDQUFjTSxTQUZmO0FBR1RDLGlDQUFJTixLQUFLRCxRQUFMLENBQWNRO0FBSFQseUJBQWI7QUFLQSwrQ0FBUSxVQUFSLEVBQW1CSCxRQUFuQixFQUE2QkksSUFBN0IsQ0FBa0MsZUFBSztBQUNuQ0Msb0NBQVFDLEdBQVIsQ0FBWUMsR0FBWjs7QUFFQSxnQ0FBR0EsSUFBSUMsS0FBSixJQUFXLENBQWQsRUFBZ0I7QUFDWkMsbUNBQUdDLFNBQUgsQ0FBYSxFQUFDQyxPQUFPSixJQUFJSyxPQUFaLEVBQW9CQyxNQUFLLE1BQXpCLEVBQWI7QUFDSDtBQUNKLHlCQU5ELEVBTUdDLEtBTkgsQ0FNUyxlQUFLO0FBQ1ZULG9DQUFRQyxHQUFSLENBQVlTLEdBQVo7QUFDSCx5QkFSRDtBQVNBbkIsNkJBQUtvQixNQUFMO0FBQ0ExQix1Q0FBSzJCLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxVQUFOLEVBQWtCcEIsTUFBTUYsS0FBS0QsUUFBN0IsRUFBdUN3QixTQUFTLG1CQUFZO0FBQ3BFN0IsK0NBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxjQUFOLEVBQWhCO0FBQ0g7QUFGVyx5QkFBaEI7QUFJSCxxQkF0QkQsTUFzQk07QUFDRkYsdUNBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxjQUFOLEVBQWhCO0FBQ0g7QUFDSixpQkE3QkQsTUE4Qks7QUFDRGlCLHVCQUFHQyxTQUFILENBQWEsRUFBQ0MsT0FBTyxNQUFSLEVBQWVFLE1BQUssTUFBcEIsRUFBYjtBQUNIO0FBR0osYUF6Q0s7QUEwQ05PLHFCQTFDTSxxQkEwQ0kvQixDQTFDSixFQTBDTTtBQUNSQywrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFJLGNBQUwsRUFBaEI7QUFDSDtBQTVDSyxTOzs7OztpQ0FkRDtBQUNMLGlCQUFLNkIsT0FBTCxDQUFhQyxhQUFiLENBQTJCLElBQTNCO0FBRUg7OztpQ0FDTyxDQUVQOzs7bUNBRVVqQyxDLEVBQUc7QUFDVixnQkFBTWtDLFNBQU9sQyxFQUFFbUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEtBQXJDO0FBQ0FyQixvQkFBUUMsR0FBUixDQUFZaUIsTUFBWjtBQUNBakMsMkJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxpQkFBaUIrQixNQUF2QixFQUFoQjtBQUNIOzs7O0VBdkIyQmpDLGVBQUtxQyxJOztrQkFBaEI5QyxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuICAgIGltcG9ydCBnICAgICAgICBmcm9tICcuLi9taXhpbnMvZ2xvYmFsJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBvblNob3coKSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0R2xvYmFsRGF0YSh0aGlzKVxuXG4gICAgICAgIH1cbiAgICAgICAgb25Mb2FkKCl7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdvQXJjaGl2ZXMoZSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcElkPWUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wSWQpO1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhcmNoaXZlcz9pZD0nICsgdGVtcElkfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBhZGRDaGlsZHJlbihlKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29EZXRhaWwoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSB0aGlzLmRhdGEudXNlckluZm8ubmlja05hbWVcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VuZERhdGE9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOnNlbGYudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOnNlbGYudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNleDpzZWxmLnVzZXJJbmZvLmdlbmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCgnYXV0aEJpbmQnLHNlbmREYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29kZTEhPTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiByZXMubWVzc2FnZSxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogc2VsZi51c2VySW5mbywgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ3BlcnNvbmFsSW5mbyd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAncGVyc29uYWxJbmZvJ30pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICflj5bmtojmjojmnYMnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvQWJvdXRVcyhlKXtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDonZXhhbWluZT9pZD0wJ30pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiJdfQ==