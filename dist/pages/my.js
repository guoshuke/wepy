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
            //this.$parent.getGlobalData(this)

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsInRlc3RNaXhpbiIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYWRkQ2hpbGRyZW4iLCJlIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb0RldGFpbCIsImRldGFpbCIsInVzZXJJbmZvIiwic2VsZiIsInVzZXIiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwibmlja05hbWUiLCJzZW5kRGF0YSIsImF2YXRhclVybCIsInNleCIsImdlbmRlciIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwiY29kZTEiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJpY29uIiwiY2F0Y2giLCJlcnIiLCIkYXBwbHkiLCJzZXRTdG9yYWdlIiwia2V5IiwiZGF0YSIsInN1Y2Nlc3MiLCJnb0Fib3V0VXMiLCJ0ZW1wSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7a0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxVLEdBQWEsRSxRQWtCYkMsTyxHQUFVO0FBQ05DLHVCQURNLHVCQUNNQyxDQUROLEVBQ1M7QUFDWEMsK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxhQUFOLEVBQWhCO0FBQ0gsYUFISztBQUtOQyxvQkFMTSxvQkFLR0osQ0FMSCxFQUtNO0FBQ1Isb0JBQUlBLEVBQUVLLE1BQUYsQ0FBU0MsUUFBYixFQUF1QjtBQUNuQix3QkFBSUMsT0FBTyxJQUFYO0FBQ0Esd0JBQUlDLE9BQU9DLEdBQUdDLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEJDLFFBQXpDOztBQUVBLHdCQUFJLENBQUNILElBQUwsRUFBVzs7QUFFUEQsNkJBQUtELFFBQUwsR0FBZ0JOLEVBQUVLLE1BQUYsQ0FBU0MsUUFBekI7QUFDQSw0QkFBSU0sV0FBUztBQUNURCxzQ0FBU0osS0FBS0QsUUFBTCxDQUFjSyxRQURkO0FBRVRFLHVDQUFVTixLQUFLRCxRQUFMLENBQWNPLFNBRmY7QUFHVEMsaUNBQUlQLEtBQUtELFFBQUwsQ0FBY1M7QUFIVCx5QkFBYjtBQUtBLCtDQUFRLFVBQVIsRUFBbUJILFFBQW5CLEVBQTZCSSxJQUE3QixDQUFrQyxlQUFLO0FBQ25DQyxvQ0FBUUMsR0FBUixDQUFZQyxHQUFaOztBQUVBLGdDQUFHQSxJQUFJQyxLQUFKLElBQVcsQ0FBZCxFQUFnQjtBQUNaWCxtQ0FBR1ksU0FBSCxDQUFhLEVBQUNDLE9BQU9ILElBQUlJLE9BQVosRUFBb0JDLE1BQUssTUFBekIsRUFBYjtBQUNIO0FBQ0oseUJBTkQsRUFNR0MsS0FOSCxDQU1TLGVBQUs7QUFDVlIsb0NBQVFDLEdBQVIsQ0FBWVEsR0FBWjtBQUNILHlCQVJEO0FBU0FuQiw2QkFBS29CLE1BQUw7QUFDQTFCLHVDQUFLMkIsVUFBTCxDQUFnQixFQUFDQyxLQUFLLFVBQU4sRUFBa0JDLE1BQU12QixLQUFLRCxRQUE3QixFQUF1Q3lCLFNBQVMsbUJBQVk7QUFDcEU5QiwrQ0FBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBaEI7QUFDSDtBQUZXLHlCQUFoQjtBQUlILHFCQXRCRCxNQXNCTTtBQUNGRix1Q0FBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBaEI7QUFDSDtBQUNKLGlCQTdCRCxNQThCSztBQUNETSx1QkFBR1ksU0FBSCxDQUFhLEVBQUNDLE9BQU8sTUFBUixFQUFlRSxNQUFLLE1BQXBCLEVBQWI7QUFDSDtBQUdKLGFBekNLO0FBMENOUSxxQkExQ00scUJBMENJaEMsQ0ExQ0osRUEwQ007QUFDUkMsK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSSxjQUFMLEVBQWhCO0FBQ0g7QUE1Q0ssUzs7Ozs7aUNBZEQ7QUFDTDs7QUFFSDs7O2lDQUNPLENBRVA7OzttQ0FFVUgsQyxFQUFHO0FBQ1YsZ0JBQU1pQyxTQUFPakMsRUFBRWtDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxLQUFyQztBQUNBbkIsb0JBQVFDLEdBQVIsQ0FBWWUsTUFBWjtBQUNBaEMsMkJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxpQkFBaUI4QixNQUF2QixFQUFoQjtBQUNIOzs7O0VBdkIyQmhDLGVBQUtvQyxJOztrQkFBaEI3QyxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuICAgIGltcG9ydCBnICAgICAgICBmcm9tICcuLi9taXhpbnMvZ2xvYmFsJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBvblNob3coKSB7XG4gICAgICAgICAgICAvL3RoaXMuJHBhcmVudC5nZXRHbG9iYWxEYXRhKHRoaXMpXG5cbiAgICAgICAgfVxuICAgICAgICBvbkxvYWQoKXtcblxuICAgICAgICB9XG5cbiAgICAgICAgZ29BcmNoaXZlcyhlKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wSWQ9ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBJZCk7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2FyY2hpdmVzP2lkPScgKyB0ZW1wSWR9KVxuICAgICAgICB9XG5cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGFkZENoaWxkcmVuKGUpIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2FkZENoaWxkcmVuJ30pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnb0RldGFpbChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpLm5pY2tOYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbmREYXRhPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpzZWxmLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDpzZWxmLnVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXg6c2VsZi51c2VySW5mby5nZW5kZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QoJ2F1dGhCaW5kJyxzZW5kRGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmNvZGUxIT0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogcmVzLm1lc3NhZ2UsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IHNlbGYudXNlckluZm8sIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdwZXJzb25hbEluZm8nfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ3BlcnNvbmFsSW5mbyd9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5Y+W5raI5o6I5p2DJyxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnb0Fib3V0VXMoZSl7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2V4YW1pbmU/aWQ9MCd9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4iXX0=