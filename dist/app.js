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
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/index', 'pages/selfSearch', 'pages/information', 'pages/my',
            //'pages/t1',
            'pages/addChildren', 'pages/personalInfo', 'pages/bindMobile', 'pages/examine', 'pages/questionnaire', 'pages/examination'],
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
        };
        _this.globalData = {
            userInfo: null,
            baseData: {
                user_id: '',
                login_token: ''
            },
            childrenList: []
        };
        return _this;
    }

    _createClass(_default, [{
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
        value: function onLoad(option) {
            if (option.storeId) {
                _wepy2.default.setStorage({ key: 'storeId', data: option ? option.storeId : '' }); //进来设置微信的storeId
            }
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiYmFzZURhdGEiLCJ1c2VyX2lkIiwibG9naW5fdG9rZW4iLCJjaGlsZHJlbkxpc3QiLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwicmVzIiwib3B0aW9uIiwic3RvcmVJZCIsInNldFN0b3JhZ2UiLCJrZXkiLCJkYXRhIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBMkRJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0F2RGRBLE1BdURjLEdBdkRMO0FBQ0xDLG1CQUFPLENBQ0gsYUFERyxFQUVILGtCQUZHLEVBR0gsbUJBSEcsRUFJSCxVQUpHO0FBS0g7QUFDQSwrQkFORyxFQU9ILG9CQVBHLEVBUUgsa0JBUkcsRUFTSCxlQVRHLEVBVUgscUJBVkcsRUFXSCxtQkFYRyxDQURGO0FBY0xDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLE9BSHBCO0FBSUpDLHdDQUF3QjtBQUpwQixhQWRIO0FBb0JMQyxvQkFBUTtBQUNKLGlDQUFpQixTQURiO0FBRUpDLHNCQUFNLENBQUM7QUFDSCxnQ0FBWSxhQURUO0FBRUgsNEJBQVEsTUFGTDtBQUdILGdDQUFZLGVBSFQ7QUFJSCx3Q0FBb0I7QUFKakIsaUJBQUQsRUFLSDtBQUNDLGdDQUFZLGtCQURiO0FBRUMsNEJBQVEsSUFGVDtBQUdDLGdDQUFZLGVBSGI7QUFJQyx3Q0FBb0I7QUFKckIsaUJBTEcsRUFVSjtBQUNFLGdDQUFZLG1CQURkO0FBRUUsNEJBQVEsSUFGVjtBQUdFLGdDQUFZLGVBSGQ7QUFJRSx3Q0FBb0I7QUFKdEIsaUJBVkksRUFlRjtBQUNBLGdDQUFZLFVBRFo7QUFFQSw0QkFBUSxJQUZSO0FBR0EsZ0NBQVksZUFIWjtBQUlBLHdDQUFvQjtBQUpwQixpQkFmRTtBQUZGO0FBcEJILFNBdURLO0FBQUEsY0FUZEMsVUFTYyxHQVREO0FBQ1RDLHNCQUFVLElBREQ7QUFFVEMsc0JBQVU7QUFDTkMseUJBQVMsRUFESDtBQUVOQyw2QkFBYTtBQUZQLGFBRkQ7QUFNVEMsMEJBQWM7QUFOTCxTQVNDO0FBQUE7QUFFYjs7OztvQ0FJV0MsRSxFQUFJO0FBQ1osZ0JBQU1DLE9BQU8sSUFBYjs7QUFFQSxnQkFBSSxLQUFLUCxVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUMxQix1QkFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNIO0FBQ0RPLDJCQUFLQyxXQUFMLENBQWlCO0FBQ2JDLHVCQURhLG1CQUNMQyxHQURLLEVBQ0E7QUFDVEoseUJBQUtQLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCVSxJQUFJVixRQUEvQjtBQUNBSywwQkFBTUEsR0FBR0ssSUFBSVYsUUFBUCxDQUFOO0FBQ0g7QUFKWSxhQUFqQjtBQU1IOzs7K0JBRU1XLE0sRUFBUTtBQUNYLGdCQUFHQSxPQUFPQyxPQUFWLEVBQWtCO0FBQ2RMLCtCQUFLTSxVQUFMLENBQWdCLEVBQUNDLEtBQUssU0FBTixFQUFpQkMsTUFBTUosU0FBT0EsT0FBT0MsT0FBZCxHQUFzQixFQUE3QyxFQUFoQixFQURjLENBQ29EO0FBQ3JFO0FBQ0o7Ozs7RUFoRndCTCxlQUFLUyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgcGFnZXM6IFtcbiAgICAgICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9zZWxmU2VhcmNoJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgICAgICdwYWdlcy9teScsXG4gICAgICAgICAgICAgICAgLy8ncGFnZXMvdDEnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9hZGRDaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3BlcnNvbmFsSW5mbycsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2JpbmRNb2JpbGUnLFxuICAgICAgICAgICAgICAgICdwYWdlcy9leGFtaW5lJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvcXVlc3Rpb25uYWlyZScsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2V4YW1pbmF0aW9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHdpbmRvdzoge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnnLzplZzlsI/nqIvluo8nLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFiQmFyOiB7XG4gICAgICAgICAgICAgICAgXCJzZWxlY3RlZENvbG9yXCI6IFwiIzNhZDlkNFwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFt7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLlgaXlurforrDlvZVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzMwMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMzAxLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvc2VsZlNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLoh6rmn6VcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzMxMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMzExLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCLotYTorq9cIixcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImFzc2V0LzMyMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiYXNzZXQvMzIxLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSwgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL215XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuaIkeeahFwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzMyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMzEucG5nXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgICAgICAgYmFzZURhdGE6IHtcbiAgICAgICAgICAgICAgICB1c2VyX2lkOiAnJyxcbiAgICAgICAgICAgICAgICBsb2dpbl90b2tlbjogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGlsZHJlbkxpc3Q6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKClcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBnZXRVc2VySW5mbyhjYikge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgICAgICAgIGlmKG9wdGlvbi5zdG9yZUlkKXtcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLCBkYXRhOiBvcHRpb24/b3B0aW9uLnN0b3JlSWQ6Jyd9KSAvL+i/m+adpeiuvue9ruW+ruS/oeeahHN0b3JlSWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuIl19