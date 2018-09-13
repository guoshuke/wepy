'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _default);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            pages: ['pages/index', 'pages/selfSearch', 'pages/information', 'pages/my', 'pages/addChildren', 'pages/personalInfo', 'pages/bindMobile', 'pages/examine', 'pages/questionnaire', 'pages/heightOrWeight', 'pages/addHeightOrWeight', 'pages/archives', 'pages/examination', 'pages/upload', 'pages/storeDetail', 'pages/vision', 'pages/optometry'],
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
                    "pagePath": "pages/selfSearch",
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
        }, _this.globalData = {
            userInfo: wx.getStorageSync('userInfo') || {},
            baseData: wx.getStorageSync('baseData') || {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_default, [{
        key: 'getGlobalData',
        value: function getGlobalData(self) {
            self.defaultChildId = wx.getStorageSync('defaultChild').id || null;
            self.defaultChildName = wx.getStorageSync('defaultChild').nickname || '';
            self.storeId = wx.getStorageSync('storeId') || null;
            self.childrenList = wx.getStorageSync('childrenList') || [];
            self.userInfo = wx.getStorageSync('userInfo') || {};
            self.baseData = wx.getStorageSync('baseData') || {};
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImJhc2VEYXRhIiwic2VsZiIsImRlZmF1bHRDaGlsZElkIiwiaWQiLCJkZWZhdWx0Q2hpbGROYW1lIiwibmlja25hbWUiLCJzdG9yZUlkIiwiY2hpbGRyZW5MaXN0Iiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhMQUdJQSxNLEdBQVM7QUFDTEMsbUJBQU8sQ0FDSCxhQURHLEVBRUgsa0JBRkcsRUFHSCxtQkFIRyxFQUlILFVBSkcsRUFLSCxtQkFMRyxFQU1ILG9CQU5HLEVBT0gsa0JBUEcsRUFRSCxlQVJHLEVBU0gscUJBVEcsRUFVSCxzQkFWRyxFQVdILHlCQVhHLEVBWUgsZ0JBWkcsRUFhSCxtQkFiRyxFQWNILGNBZEcsRUFlSCxtQkFmRyxFQWdCSCxjQWhCRyxFQWlCSCxpQkFqQkcsQ0FERjtBQW9CTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsT0FIcEI7QUFJSkMsd0NBQXdCO0FBSnBCLGFBcEJIO0FBMEJMQyxvQkFBUTtBQUNKLGlDQUFpQixTQURiO0FBRUpDLHNCQUFNLENBQUM7QUFDSCxnQ0FBWSxhQURUO0FBRUgsNEJBQVEsTUFGTDtBQUdILGdDQUFZLGVBSFQ7QUFJSCx3Q0FBb0I7QUFKakIsaUJBQUQsRUFLSDtBQUNDLGdDQUFZLGtCQURiO0FBRUMsNEJBQVEsSUFGVDtBQUdDLGdDQUFZLGVBSGI7QUFJQyx3Q0FBb0I7QUFKckIsaUJBTEcsRUFVSjtBQUNFLGdDQUFZLG1CQURkO0FBRUUsNEJBQVEsSUFGVjtBQUdFLGdDQUFZLGVBSGQ7QUFJRSx3Q0FBb0I7QUFKdEIsaUJBVkksRUFlRjtBQUNBLGdDQUFZLFVBRFo7QUFFQSw0QkFBUSxJQUZSO0FBR0EsZ0NBQVksZUFIWjtBQUlBLHdDQUFvQjtBQUpwQixpQkFmRTtBQUZGO0FBMUJILFMsUUFtRFRDLFUsR0FBYTtBQUNUQyxzQkFBU0MsR0FBR0MsY0FBSCxDQUFrQixVQUFsQixLQUErQixFQUQvQjtBQUVUQyxzQkFBU0YsR0FBR0MsY0FBSCxDQUFrQixVQUFsQixLQUErQjtBQUYvQixTOzs7OztzQ0FJQ0UsSSxFQUFLO0FBQ1hBLGlCQUFLQyxjQUFMLEdBQW9CSixHQUFHQyxjQUFILENBQWtCLGNBQWxCLEVBQWtDSSxFQUFsQyxJQUFzQyxJQUExRDtBQUNBRixpQkFBS0csZ0JBQUwsR0FBc0JOLEdBQUdDLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0NNLFFBQWxDLElBQTRDLEVBQWxFO0FBQ0FKLGlCQUFLSyxPQUFMLEdBQWFSLEdBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsS0FBOEIsSUFBM0M7QUFDQUUsaUJBQUtNLFlBQUwsR0FBa0JULEdBQUdDLGNBQUgsQ0FBa0IsY0FBbEIsS0FBbUMsRUFBckQ7QUFDQUUsaUJBQUtKLFFBQUwsR0FBY0MsR0FBR0MsY0FBSCxDQUFrQixVQUFsQixLQUErQixFQUE3QztBQUNBRSxpQkFBS0QsUUFBTCxHQUFjRixHQUFHQyxjQUFILENBQWtCLFVBQWxCLEtBQStCLEVBQTdDO0FBQ1A7Ozs7RUEvRHdCUyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICAgICAncGFnZXMvc2VsZlNlYXJjaCcsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2luZm9ybWF0aW9uJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvbXknLFxuICAgICAgICAgICAgICAgICdwYWdlcy9hZGRDaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3BlcnNvbmFsSW5mbycsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2JpbmRNb2JpbGUnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9leGFtaW5lJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvcXVlc3Rpb25uYWlyZScsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2hlaWdodE9yV2VpZ2h0JyxcbiAgICAgICAgICAgICAgICAncGFnZXMvYWRkSGVpZ2h0T3JXZWlnaHQnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9hcmNoaXZlcycsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2V4YW1pbmF0aW9uJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvdXBsb2FkJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvc3RvcmVEZXRhaWwnLFxuICAgICAgICAgICAgICAgICdwYWdlcy92aXNpb24nLFxuICAgICAgICAgICAgICAgICdwYWdlcy9vcHRvbWV0cnknXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jycsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJCYXI6IHtcbiAgICAgICAgICAgICAgICBcInNlbGVjdGVkQ29sb3JcIjogXCIjM2FkOWQ0XCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuWBpeW6t+iusOW9lVwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzAyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMDEucG5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9zZWxmU2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuiHquafpVwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzEyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMTEucG5nXCJcbiAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIui1hOiur1wiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzIyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMjEucG5nXCJcbiAgICAgICAgICAgICAgICB9LCAge1xuICAgICAgICAgICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvbXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJhc3NldC8zMzIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImFzc2V0LzMzMS5wbmdcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOnd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpfHx7fSxcbiAgICAgICAgICAgIGJhc2VEYXRhOnd4LmdldFN0b3JhZ2VTeW5jKCdiYXNlRGF0YScpfHx7fSxcbiAgICAgICAgfVxuICAgICAgICBnZXRHbG9iYWxEYXRhKHNlbGYpe1xuICAgICAgICAgICAgICAgIHNlbGYuZGVmYXVsdENoaWxkSWQ9d3guZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZCcpLmlkfHxudWxsXG4gICAgICAgICAgICAgICAgc2VsZi5kZWZhdWx0Q2hpbGROYW1lPXd4LmdldFN0b3JhZ2VTeW5jKCdkZWZhdWx0Q2hpbGQnKS5uaWNrbmFtZXx8JydcbiAgICAgICAgICAgICAgICBzZWxmLnN0b3JlSWQ9d3guZ2V0U3RvcmFnZVN5bmMoJ3N0b3JlSWQnKXx8bnVsbFxuICAgICAgICAgICAgICAgIHNlbGYuY2hpbGRyZW5MaXN0PXd4LmdldFN0b3JhZ2VTeW5jKCdjaGlsZHJlbkxpc3QnKXx8W11cbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvPXd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpfHx7fVxuICAgICAgICAgICAgICAgIHNlbGYuYmFzZURhdGE9d3guZ2V0U3RvcmFnZVN5bmMoJ2Jhc2VEYXRhJyl8fHt9XG4gICAgICAgIH1cbiAgICB9XG4iXX0=