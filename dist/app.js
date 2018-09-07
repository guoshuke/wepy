'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/index', 'pages/t1', 'pages/my', 'pages/information', 'pages/addChildren', 'pages/personalInfo', 'pages/heightOrWeight', 'pages/addHeightOrWeight'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: '眼镜小程序',
                navigationBarTextStyle: 'black'
            },
            tabBar: {
                "selectedColor": "#3ad9d4",
                list: [{
                    "pagePath": "pages/index",
                    "text": "健康记录",
                    "iconPath": "asset/302.png",
                    "selectedIconPath": "asset/301.png"
                }, {
                    "pagePath": "pages/t1",
                    "text": "自查",
                    "iconPath": "asset/312.png",
                    "selectedIconPath": "asset/311.png"
                }, {
                    "pagePath": "pages/information",
                    "text": "资讯",
                    "iconPath": "asset/322.png",
                    "selectedIconPath": "asset/321.png"
                }, {
                    "pagePath": "pages/my",
                    "text": "我的",
                    "iconPath": "asset/332.png",
                    "selectedIconPath": "asset/331.png"
                }]
            }
        };
        _this.globalData = {
            userInfo: null,
            baseData: {
                user_id: '',
                login_token: ''
            },
            childrenList: []
        };

        _this.use('requestfix');
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            this.testAsync();
        }
    }, {
        key: 'sleep',
        value: function sleep(s) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve('promise resolved');
                }, s * 1000);
            });
        }
    }, {
        key: 'testAsync',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.sleep(3);

                            case 2:
                                data = _context.sent;

                                console.log(data);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function testAsync() {
                return _ref.apply(this, arguments);
            }

            return testAsync;
        }()
    }, {
        key: 'getUserInfo',
        value: function getUserInfo(cb) {
            var that = this;

            if (this.globalData.userInfo) {
                return this.globalData.userInfo;
            }
            _wepy2.default.getUserInfo({
                success: function success(res) {
                    that.globalData.userInfo = res.userInfo;
                    cb && cb(res.userInfo);
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImxpc3QiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJiYXNlRGF0YSIsInVzZXJfaWQiLCJsb2dpbl90b2tlbiIsImNoaWxkcmVuTGlzdCIsInVzZSIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJ0aGF0Iiwid2VweSIsImdldFVzZXJJbmZvIiwic3VjY2VzcyIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBdURJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0FwRGRDLE1Bb0RjLEdBcERMO0FBQ0xDLG1CQUFPLENBQ0gsYUFERyxFQUVILFVBRkcsRUFHSCxVQUhHLEVBSUgsbUJBSkcsRUFLSCxtQkFMRyxFQU1ILG9CQU5HLEVBT0gsc0JBUEcsRUFRSCx5QkFSRyxDQURGO0FBV0xDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLE9BSHBCO0FBSUpDLHdDQUF3QjtBQUpwQixhQVhIO0FBaUJMQyxvQkFBUTtBQUNKLGlDQUFpQixTQURiO0FBRUpDLHNCQUFNLENBQUM7QUFDSCxnQ0FBWSxhQURUO0FBRUgsNEJBQVEsTUFGTDtBQUdILGdDQUFZLGVBSFQ7QUFJSCx3Q0FBb0I7QUFKakIsaUJBQUQsRUFLSDtBQUNDLGdDQUFZLFVBRGI7QUFFQyw0QkFBUSxJQUZUO0FBR0MsZ0NBQVksZUFIYjtBQUlDLHdDQUFvQjtBQUpyQixpQkFMRyxFQVVKO0FBQ0UsZ0NBQVksbUJBRGQ7QUFFRSw0QkFBUSxJQUZWO0FBR0UsZ0NBQVksZUFIZDtBQUlFLHdDQUFvQjtBQUp0QixpQkFWSSxFQWVGO0FBQ0EsZ0NBQVksVUFEWjtBQUVBLDRCQUFRLElBRlI7QUFHQSxnQ0FBWSxlQUhaO0FBSUEsd0NBQW9CO0FBSnBCLGlCQWZFO0FBRkY7QUFqQkgsU0FvREs7QUFBQSxjQVRkQyxVQVNjLEdBVEQ7QUFDVEMsc0JBQVUsSUFERDtBQUVUQyxzQkFBVTtBQUNOQyx5QkFBUyxFQURIO0FBRU5DLDZCQUFhO0FBRlAsYUFGRDtBQU1UQywwQkFBYztBQU5MLFNBU0M7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGVTtBQUdiOzs7O21DQUVVO0FBQ1AsaUJBQUtDLFNBQUw7QUFDSDs7OzhCQUVLQyxDLEVBQUc7QUFDTCxtQkFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDQywyQkFBVyxZQUFNO0FBQ2JGLDRCQUFRLGtCQUFSO0FBQ0gsaUJBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0gsYUFKTSxDQUFQO0FBS0g7Ozs7Ozs7Ozs7O3VDQUdzQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYkMsb0M7O0FBQ05DLHdDQUFRQyxHQUFSLENBQVlGLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FJUUcsRSxFQUFJO0FBQ1osZ0JBQU1DLE9BQU8sSUFBYjs7QUFFQSxnQkFBSSxLQUFLbEIsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDMUIsdUJBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDSDtBQUNEa0IsMkJBQUtDLFdBQUwsQ0FBaUI7QUFDYkMsdUJBRGEsbUJBQ0xDLEdBREssRUFDQTtBQUNUSix5QkFBS2xCLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCcUIsSUFBSXJCLFFBQS9CO0FBQ0FnQiwwQkFBTUEsR0FBR0ssSUFBSXJCLFFBQVAsQ0FBTjtBQUNIO0FBSlksYUFBakI7QUFNSDs7O2lDQUVRLENBRVI7Ozs7RUE1RndCa0IsZUFBS0ksRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuICAgIGltcG9ydCB7c2V0U3RvcmV9IGZyb20gJ3dlcHktcmVkdXgnXG4gICAgaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbiAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKClcbiAgICBzZXRTdG9yZShzdG9yZSlcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBwYWdlczogW1xuICAgICAgICAgICAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3QxJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvbXknLFxuICAgICAgICAgICAgICAgICdwYWdlcy9pbmZvcm1hdGlvbicsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2FkZENoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvcGVyc29uYWxJbmZvJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvaGVpZ2h0T3JXZWlnaHQnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9hZGRIZWlnaHRPcldlaWdodCcsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jycsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJCYXI6IHtcbiAgICAgICAgICAgICAgICBcInNlbGVjdGVkQ29sb3JcIjogXCIjM2FkOWQ0XCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuWBpeW6t+iusOW9lVwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzAyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMDEucG5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy90MVwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLoh6rmn6VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzMxMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMzExLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLotYTorq9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzMyMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMzIxLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSwgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL215XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuaIkeeahFwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzMyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMzEucG5nXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgYmFzZURhdGE6IHtcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dpbl90b2tlbjogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGlsZHJlbkxpc3Q6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKClcbiAgICAgICAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTGF1bmNoKCkge1xuICAgICAgICAgICAgdGhpcy50ZXN0QXN5bmMoKVxuICAgICAgICB9XG5cbiAgICAgICAgc2xlZXAocykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICAgICAgICAgICAgfSwgcyAqIDEwMDApXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMgdGVzdEFzeW5jKCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKCkge1xuXG4gICAgICAgIH1cblxuICAgIH1cbiJdfQ==