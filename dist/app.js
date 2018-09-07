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
            'pages/addChildren', 'pages/personalInfo', 'pages/bindMobile', 'pages/examine', 'pages/questionnaire'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiYmFzZURhdGEiLCJ1c2VyX2lkIiwibG9naW5fdG9rZW4iLCJjaGlsZHJlbkxpc3QiLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwicmVzIiwib3B0aW9uIiwic3RvcmVJZCIsInNldFN0b3JhZ2UiLCJrZXkiLCJkYXRhIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBMERJLHdCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0F0RGRBLE1Bc0RjLEdBdERMO0FBQ0xDLG1CQUFPLENBQ0gsYUFERyxFQUVILGtCQUZHLEVBR0gsbUJBSEcsRUFJSCxVQUpHO0FBS0g7QUFDQSwrQkFORyxFQU9ILG9CQVBHLEVBUUgsa0JBUkcsRUFTSCxlQVRHLEVBVUgscUJBVkcsQ0FERjtBQWFMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixPQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEIsYUFiSDtBQW1CTEMsb0JBQVE7QUFDSixpQ0FBaUIsU0FEYjtBQUVKQyxzQkFBTSxDQUFDO0FBQ0gsZ0NBQVksYUFEVDtBQUVILDRCQUFRLE1BRkw7QUFHSCxnQ0FBWSxlQUhUO0FBSUgsd0NBQW9CO0FBSmpCLGlCQUFELEVBS0g7QUFDQyxnQ0FBWSxrQkFEYjtBQUVDLDRCQUFRLElBRlQ7QUFHQyxnQ0FBWSxlQUhiO0FBSUMsd0NBQW9CO0FBSnJCLGlCQUxHLEVBVUo7QUFDRSxnQ0FBWSxtQkFEZDtBQUVFLDRCQUFRLElBRlY7QUFHRSxnQ0FBWSxlQUhkO0FBSUUsd0NBQW9CO0FBSnRCLGlCQVZJLEVBZUY7QUFDQSxnQ0FBWSxVQURaO0FBRUEsNEJBQVEsSUFGUjtBQUdBLGdDQUFZLGVBSFo7QUFJQSx3Q0FBb0I7QUFKcEIsaUJBZkU7QUFGRjtBQW5CSCxTQXNESztBQUFBLGNBVGRDLFVBU2MsR0FURDtBQUNUQyxzQkFBVSxJQUREO0FBRVRDLHNCQUFVO0FBQ05DLHlCQUFTLEVBREg7QUFFTkMsNkJBQWE7QUFGUCxhQUZEO0FBTVRDLDBCQUFjO0FBTkwsU0FTQztBQUFBO0FBRWI7Ozs7b0NBSVdDLEUsRUFBSTtBQUNaLGdCQUFNQyxPQUFPLElBQWI7O0FBRUEsZ0JBQUksS0FBS1AsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDMUIsdUJBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDSDtBQUNETywyQkFBS0MsV0FBTCxDQUFpQjtBQUNiQyx1QkFEYSxtQkFDTEMsR0FESyxFQUNBO0FBQ1RKLHlCQUFLUCxVQUFMLENBQWdCQyxRQUFoQixHQUEyQlUsSUFBSVYsUUFBL0I7QUFDQUssMEJBQU1BLEdBQUdLLElBQUlWLFFBQVAsQ0FBTjtBQUNIO0FBSlksYUFBakI7QUFNSDs7OytCQUVNVyxNLEVBQVE7QUFDWCxnQkFBR0EsT0FBT0MsT0FBVixFQUFrQjtBQUNkTCwrQkFBS00sVUFBTCxDQUFnQixFQUFDQyxLQUFLLFNBQU4sRUFBaUJDLE1BQU1KLFNBQU9BLE9BQU9DLE9BQWQsR0FBc0IsRUFBN0MsRUFBaEIsRUFEYyxDQUNvRDtBQUNyRTtBQUNKOzs7O0VBL0V3QkwsZUFBS1MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICAgICAncGFnZXMvc2VsZlNlYXJjaCcsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL2luZm9ybWF0aW9uJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvbXknLFxuICAgICAgICAgICAgICAgIC8vJ3BhZ2VzL3QxJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvYWRkQ2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgICdwYWdlcy9wZXJzb25hbEluZm8nLFxuICAgICAgICAgICAgICAgICdwYWdlcy9iaW5kTW9iaWxlJyxcbiAgICAgICAgICAgICAgICAncGFnZXMvZXhhbWluZScsXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3F1ZXN0aW9ubmFpcmUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jycsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJCYXI6IHtcbiAgICAgICAgICAgICAgICBcInNlbGVjdGVkQ29sb3JcIjogXCIjM2FkOWQ0XCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuWBpeW6t+iusOW9lVwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzAyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMDEucG5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9zZWxmU2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIuiHquafpVwiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzEyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMTEucG5nXCJcbiAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2luZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIui1hOiur1wiLFxuICAgICAgICAgICAgICAgICAgICBcImljb25QYXRoXCI6IFwiYXNzZXQvMzIyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJhc3NldC8zMjEucG5nXCJcbiAgICAgICAgICAgICAgICB9LCAge1xuICAgICAgICAgICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvbXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJhc3NldC8zMzIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImFzc2V0LzMzMS5wbmdcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnbG9iYWxEYXRhID0ge1xuICAgICAgICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICAgICAgICBiYXNlRGF0YToge1xuICAgICAgICAgICAgICAgIHVzZXJfaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luX3Rva2VuOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuTGlzdDogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICAgICAgaWYob3B0aW9uLnN0b3JlSWQpe1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnc3RvcmVJZCcsIGRhdGE6IG9wdGlvbj9vcHRpb24uc3RvcmVJZDonJ30pIC8v6L+b5p2l6K6+572u5b6u5L+h55qEc3RvcmVJZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG4iXX0=