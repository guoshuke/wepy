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
            defaultChildId: _wepy2.default.getStorageSync('defaultChildId')
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
        value: function onLoad() {
            console.log('mixin onLoad');
            _wepy2.default.getStorage({
                key: 'userInfo', complete: function complete(data) {
                    if (data.data) {
                        this.globalData.userInfo = data.data;
                    }
                }
            });
        }
    }]);

    return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwiYmFzZVVybCIsImRlZmF1bHRDaGlsZElkIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdG9yYWdlIiwia2V5IiwiY29tcGxldGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFPLHFCQURKO0FBRUhDLHFCQUFTLDBCQUZOO0FBR0hDLDRCQUFlQyxlQUFLQyxjQUFMLENBQW9CLGdCQUFwQjtBQUhaLFMsUUFLUEMsTyxHQUFVO0FBQ05DLGVBRE0saUJBQ0E7QUFDRixxQkFBS04sS0FBTCxHQUFhLHdCQUFiO0FBQ0FPLHdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDSDtBQUpLLFM7Ozs7O2lDQVNEO0FBQ0xELG9CQUFRQyxHQUFSLENBQVksY0FBWjtBQUNIOzs7aUNBRVE7QUFDTEQsb0JBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FMLDJCQUFLTSxVQUFMLENBQWdCO0FBQ1pDLHFCQUFLLFVBRE8sRUFDS0MsVUFBVSxrQkFBVVosSUFBVixFQUFnQjtBQUN2Qyx3QkFBSUEsS0FBS0EsSUFBVCxFQUFlO0FBQ1gsNkJBQUthLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCZCxLQUFLQSxJQUFoQztBQUNIO0FBQ0o7QUFMVyxhQUFoQjtBQU9IOzs7O0VBNUJrQ0ksZUFBS0gsSzs7a0JBQXZCRixTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgICBkYXRhID0ge1xuICAgICAgICBtaXhpbjogJ1RoaXMgaXMgbWl4aW4gZGF0YS4nLFxuICAgICAgICBiYXNlVXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tJyxcbiAgICAgICAgZGVmYXVsdENoaWxkSWQ6d2VweS5nZXRTdG9yYWdlU3luYygnZGVmYXVsdENoaWxkSWQnKVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAoKSB7XG4gICAgICAgICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXG4gICAgICAgIH0sXG5cbiAgICB9XG5cblxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ21peGluIG9uU2hvdycpXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbWl4aW4gb25Mb2FkJylcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTogJ3VzZXJJbmZvJywgY29tcGxldGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19