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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '眼镜小程序'
        }, _this.components = {}, _this.mixins = [_test2.default], _this.data = {
            userInfo: {
                nickName: '加载中...'
            }

        }, _this.computed = {}, _this.methods = {
            agreeGetUser: function agreeGetUser(e) {
                if (e.detail.userInfo) {
                    debugger;
                    var self = this;
                    self.userInfo = e.detail.userInfo;

                    _wepy2.default.setStorage({ key: 'userInfo', data: self.userInfo });

                    self.$apply();
                } else {
                    this.toast('您还未授权');
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'relationChild',
        value: function relationChild() {
            if (wx.getStorageSync('defaultChildId')) {
                return;
            }
            (0, _service2.default)('getChildrenList').then(function (res) {
                if (res.data.length) {
                    _wepy2.default.setStorage({ key: 'defaultChildId', data: { id: res.data[0].id } });
                } else {
                    //未关联任何孩子
                    _wepy2.default.navigateTo({ url: 'addChildren' });
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'login',
        value: function login(code) {
            var self = this;
            var defaultChildId = _wepy2.default.getStorageSync('defaultChildId');
            _wepy2.default.request({
                url: 'http://glass.unimker.com/api/login',
                data: {
                    code: code,
                    storeId: _wepy2.default.getStorageSync('storeId') || null
                },
                method: 'POST',
                success: function success(d) {
                    if (d.statusCode == 200) {
                        var temp = { user_id: d.data.data.user_id, login_token: d.data.data.login_token };
                        _wepy2.default.setStorage({ key: 'baseData', data: temp });

                        self.$parent.globalData.baseData.user_id = d.data.data.user_id;
                        self.$parent.globalData.baseData.login_token = d.data.data.login_token;
                        self.$apply();

                        if (!defaultChildId || defaultChildId == {}) {
                            self.relationChild(); //关联孩子
                        }
                    }
                },
                fail: function fail(err) {
                    console.log(err);
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            //this.relationChild()
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            var self = this;
            var baseData = _wepy2.default.getStorageSync('baseData');
            if (baseData && baseData != {}) {
                return this.$parent.globalData.baseData.user_id;
            } else {
                _wepy2.default.login({
                    success: function success(res) {
                        console.log('获取成功 code======>', res.code);
                        self.login(res.code);
                    }
                });
            }
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJkYXRhIiwidXNlckluZm8iLCJuaWNrTmFtZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImFncmVlR2V0VXNlciIsImUiLCJkZXRhaWwiLCJzZWxmIiwid2VweSIsInNldFN0b3JhZ2UiLCJrZXkiLCIkYXBwbHkiLCJ0b2FzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiY29kZSIsImRlZmF1bHRDaGlsZElkIiwicmVxdWVzdCIsInN0b3JlSWQiLCJtZXRob2QiLCJzdWNjZXNzIiwiZCIsInN0YXR1c0NvZGUiLCJ0ZW1wIiwidXNlcl9pZCIsImxvZ2luX3Rva2VuIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJiYXNlRGF0YSIsInJlbGF0aW9uQ2hpbGQiLCJmYWlsIiwib3B0aW9uIiwibG9naW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFJYkMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFDTkMsMEJBQVU7QUFESjs7QUFEUCxTLFFBT1BDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUVOQyx3QkFGTSx3QkFFT0MsQ0FGUCxFQUVVO0FBQ1osb0JBQUlBLEVBQUVDLE1BQUYsQ0FBU04sUUFBYixFQUF1QjtBQUNuQjtBQUNBLHdCQUFJTyxPQUFPLElBQVg7QUFDQUEseUJBQUtQLFFBQUwsR0FBZ0JLLEVBQUVDLE1B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O0FBQ0FsQiw2QkFBS21DLEtBQUwsQ0FBVzFCLElBQUlTLElBQWY7QUFDSDtBQUpNLGlCQUFYO0FBTUg7QUFFSjs7OztFQTNHOEJqQixlQUFLbUMsSTs7a0JBQW5CbEQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jydcbiAgICAgICAgfVxuICAgICAgICBjb21wb25lbnRzID0ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VySW5mbzoge1xuICAgICAgICAgICAgICAgIG5pY2tOYW1lOiAn5Yqg6L295LitLi4uJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG5cbiAgICAgICAgICAgIGFncmVlR2V0VXNlcihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cblxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogc2VsZi51c2VySW5mb30pXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KCfmgqjov5jmnKrmjojmnYMnKVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVsYXRpb25DaGlsZCgpe1xuICAgICAgICAgICAgaWYod3guZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZElkJykpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFVybCgnZ2V0Q2hpbGRyZW5MaXN0JykudGhlbihyZXMgPT57XG4gICAgICAgICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdkZWZhdWx0Q2hpbGRJZCcsIGRhdGE6e2lkOiByZXMuZGF0YVswXS5pZH19KVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrlhbPogZTku7vkvZXlranlrZBcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2luKGNvZGUpe1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGRJZD0gIHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZElkJylcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tL2FwaS9sb2dpbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZUlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzdG9yZUlkJykgfHwgbnVsbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge3VzZXJfaWQ6IGQuZGF0YS5kYXRhLnVzZXJfaWQsIGxvZ2luX3Rva2VuOiBkLmRhdGEuZGF0YS5sb2dpbl90b2tlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnYmFzZURhdGEnLCBkYXRhOiB0ZW1wfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEuYmFzZURhdGEudXNlcl9pZCA9IGQuZGF0YS5kYXRhLnVzZXJfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHBhcmVudC5nbG9iYWxEYXRhLmJhc2VEYXRhLmxvZ2luX3Rva2VuID0gZC5kYXRhLmRhdGEubG9naW5fdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWRlZmF1bHRDaGlsZElkfHxkZWZhdWx0Q2hpbGRJZD09e30pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVsYXRpb25DaGlsZCgpIC8v5YWz6IGU5a2p5a2QXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TaG93KCl7XG4gICAgICAgICAgICAvL3RoaXMucmVsYXRpb25DaGlsZCgpXG4gICAgICAgIH1cblxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGxldCBiYXNlRGF0YSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2Jhc2VEYXRhJylcbiAgICAgICAgICAgIGlmIChiYXNlRGF0YSAmJiBiYXNlRGF0YSAhPSB7fSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5iYXNlRGF0YS51c2VyX2lkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkubG9naW4oe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5oiQ5YqfIGNvZGU9PT09PT0+JywgcmVzLmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbihyZXMuY29kZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuIl19