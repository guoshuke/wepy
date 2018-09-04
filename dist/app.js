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
      pages: ['pages/addChildren', 'pages/index', 'pages/t1', 'pages/my'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '眼镜小程序',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        list: [{
          "pagePath": "pages/index",
          "text": "首页",
          "iconPath": "asset/1.jpg",
          "selectedIconPath": "asset/1.jpg"
        }, {
          "pagePath": "pages/t1",
          "text": "新闻",
          "iconPath": "asset/1.jpg",
          "selectedIconPath": "asset/1.jpg"
        }, {
          "pagePath": "pages/my",
          "text": "我的",
          "iconPath": "asset/1.jpg",
          "selectedIconPath": "asset/1.jpg"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImxpc3QiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJiYXNlRGF0YSIsInVzZXJfaWQiLCJsb2dpbl90b2tlbiIsImNoaWxkcmVuTGlzdCIsInVzZSIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJ0aGF0Iiwid2VweSIsImdldFVzZXJJbmZvIiwic3VjY2VzcyIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBNkNFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUExQ2ZDLE1BMENlLEdBMUNOO0FBQ1BDLGFBQU8sQ0FDTCxtQkFESyxFQUVMLGFBRkssRUFHTCxVQUhLLEVBSUwsVUFKSyxDQURBO0FBT1BDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLE1BRnhCO0FBR05DLGdDQUF3QixPQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FQRDtBQWFQQyxjQUFRO0FBQ05DLGNBQU0sQ0FBQztBQUNMLHNCQUFZLGFBRFA7QUFFTCxrQkFBUSxJQUZIO0FBR0wsc0JBQVksYUFIUDtBQUlMLDhCQUFvQjtBQUpmLFNBQUQsRUFLSjtBQUNBLHNCQUFZLFVBRFo7QUFFQSxrQkFBUSxJQUZSO0FBR0Esc0JBQVksYUFIWjtBQUlBLDhCQUFvQjtBQUpwQixTQUxJLEVBVUo7QUFDQSxzQkFBWSxVQURaO0FBRUEsa0JBQVEsSUFGUjtBQUdBLHNCQUFZLGFBSFo7QUFJQSw4QkFBb0I7QUFKcEIsU0FWSTtBQURBO0FBYkQsS0EwQ007QUFBQSxVQVRmQyxVQVNlLEdBVEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxnQkFBUztBQUNQQyxpQkFBUSxFQUREO0FBRVBDLHFCQUFZO0FBRkwsT0FGRTtBQU1YQyxvQkFBYTtBQU5GLEtBU0U7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGYTtBQUdkOzs7OytCQUVVO0FBQ1QsV0FBS0MsU0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYkMsb0I7O0FBQ05DLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FJVUcsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiOztBQUVBLFVBQUksS0FBS2xCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNEa0IscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsZUFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1pKLGVBQUtsQixVQUFMLENBQWdCQyxRQUFoQixHQUEyQnFCLElBQUlyQixRQUEvQjtBQUNBZ0IsZ0JBQU1BLEdBQUdLLElBQUlyQixRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs2QkFDVSxDQUVWOzs7O0VBakYwQmtCLGVBQUtJLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2FkZENoaWxkcmVuJyxcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvdDEnLFxuICAgICAgJ3BhZ2VzL215JyxcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnnLzplZzlsI/nqIvluo8nLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBsaXN0OiBbe1xuICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5kZXhcIixcbiAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCIsXG4gICAgICAgIFwiaWNvblBhdGhcIjogXCJhc3NldC8xLmpwZ1wiLFxuICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8xLmpwZ1wiXG4gICAgICB9LHtcbiAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3QxXCIsXG4gICAgICAgIFwidGV4dFwiOiBcIuaWsOmXu1wiLFxuICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMS5qcGdcIixcbiAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMS5qcGdcIlxuICAgICAgfSx7XG4gICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9teVwiLFxuICAgICAgICBcInRleHRcIjogXCLmiJHnmoRcIixcbiAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzEuanBnXCIsXG4gICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImFzc2V0LzEuanBnXCJcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBiYXNlRGF0YTp7XG4gICAgICB1c2VyX2lkOicnLFxuICAgICAgbG9naW5fdG9rZW46JydcbiAgICB9LFxuICAgIGNoaWxkcmVuTGlzdDpbXVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcblxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cbiAgICB9XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG9uTG9hZCAgKCkge1xuXG4gIH1cblxufVxuIl19