'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testMixin = function (_wepy$mixin) {
    _inherits(testMixin, _wepy$mixin);

    function testMixin() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, testMixin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = testMixin.__proto__ || Object.getPrototypeOf(testMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            mixin: 'This is mixin data.',
            baseUrl: 'http://glass.unimker.com',
            defaultChildId: wx.getStorageSync('defaultChild').id || null,
            defaultChildName: wx.getStorageSync('defaultChild').nickname || '',
            storeId: wx.getStorageSync('storeId') || null,
            childrenList: wx.getStorageSync('childrenList') || [],
            userInfo: wx.getStorageSync('userInfo') || {},
            baseData: wx.getStorageSync('baseData') || {}
        }, _this.methods = {
            tap: function tap() {
                this.mixin = 'mixin data was changed';
                console.log('mixin method tap');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(testMixin, [{
        key: 'onShow',
        value: function onShow() {
            console.log('mixin onShow');
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {
            console.log('mixin onLoad');
        }
    }]);

    return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwiYmFzZVVybCIsImRlZmF1bHRDaGlsZElkIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiZGVmYXVsdENoaWxkTmFtZSIsIm5pY2tuYW1lIiwic3RvcmVJZCIsImNoaWxkcmVuTGlzdCIsInVzZXJJbmZvIiwiYmFzZURhdGEiLCJtZXRob2RzIiwidGFwIiwiY29uc29sZSIsImxvZyIsIm9wdGlvbiIsIndlcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFPLHFCQURKO0FBRUhDLHFCQUFTLDBCQUZOO0FBR0hDLDRCQUFlQyxHQUFHQyxjQUFILENBQWtCLGNBQWxCLEVBQWtDQyxFQUFsQyxJQUFzQyxJQUhsRDtBQUlIQyw4QkFBaUJILEdBQUdDLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0NHLFFBQWxDLElBQTRDLEVBSjFEO0FBS0hDLHFCQUFRTCxHQUFHQyxjQUFILENBQWtCLFNBQWxCLEtBQThCLElBTG5DO0FBTUhLLDBCQUFhTixHQUFHQyxjQUFILENBQWtCLGNBQWxCLEtBQW1DLEVBTjdDO0FBT0hNLHNCQUFTUCxHQUFHQyxjQUFILENBQWtCLFVBQWxCLEtBQStCLEVBUHJDO0FBUUhPLHNCQUFTUixHQUFHQyxjQUFILENBQWtCLFVBQWxCLEtBQStCO0FBUnJDLFMsUUFVUFEsTyxHQUFVO0FBQ05DLGVBRE0saUJBQ0E7QUFDRixxQkFBS2IsS0FBTCxHQUFhLHdCQUFiO0FBQ0FjLHdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDSDtBQUpLLFM7Ozs7O2lDQVNEO0FBQ0xELG9CQUFRQyxHQUFSLENBQVksY0FBWjtBQUVIOzs7K0JBRU1DLE0sRUFBUTtBQUNYRixvQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDSDs7OztFQTNCa0NFLGVBQUtqQixLOztrQkFBdkJGLFMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRlc3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIG1peGluOiAnVGhpcyBpcyBtaXhpbiBkYXRhLicsXG4gICAgICAgIGJhc2VVcmw6ICdodHRwOi8vZ2xhc3MudW5pbWtlci5jb20nLFxuICAgICAgICBkZWZhdWx0Q2hpbGRJZDp3eC5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkJykuaWR8fG51bGwsXG4gICAgICAgIGRlZmF1bHRDaGlsZE5hbWU6d3guZ2V0U3RvcmFnZVN5bmMoJ2RlZmF1bHRDaGlsZCcpLm5pY2tuYW1lfHwnJyxcbiAgICAgICAgc3RvcmVJZDp3eC5nZXRTdG9yYWdlU3luYygnc3RvcmVJZCcpfHxudWxsLFxuICAgICAgICBjaGlsZHJlbkxpc3Q6d3guZ2V0U3RvcmFnZVN5bmMoJ2NoaWxkcmVuTGlzdCcpfHxbXSxcbiAgICAgICAgdXNlckluZm86d3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJyl8fHt9LFxuICAgICAgICBiYXNlRGF0YTp3eC5nZXRTdG9yYWdlU3luYygnYmFzZURhdGEnKXx8e31cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgdGFwKCkge1xuICAgICAgICAgICAgdGhpcy5taXhpbiA9ICdtaXhpbiBkYXRhIHdhcyBjaGFuZ2VkJ1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21peGluIG1ldGhvZCB0YXAnKVxuICAgICAgICB9LFxuXG4gICAgfVxuXG5cbiAgICBvblNob3coKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvblNob3cnKVxuXG4gICAgfVxuXG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnbWl4aW4gb25Mb2FkJylcbiAgICB9XG59XG4iXX0=