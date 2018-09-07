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
            baseUrl: 'http://glass.unimker.com/api/'
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
            var self = this;
            _wepy2.default.getStorage({
                key: 'userInfo', complete: function complete(data) {
                    if (data.data) {
                        self.userInfo = data.data;
                        self.$apply();
                    }
                }
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwiYmFzZVVybCIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwic2VsZiIsIndlcHkiLCJnZXRTdG9yYWdlIiwia2V5IiwiY29tcGxldGUiLCJ1c2VySW5mbyIsIiRhcHBseSIsImdsb2JhbERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFPLHFCQURKO0FBRUhDLHFCQUFTO0FBRk4sUyxRQUlQQyxPLEdBQVU7QUFDTkMsZUFETSxpQkFDQTtBQUNGLHFCQUFLSCxLQUFMLEdBQWEsd0JBQWI7QUFDQUksd0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNIO0FBSkssUzs7Ozs7aUNBU0Q7QUFDTCxnQkFBTUMsT0FBTyxJQUFiO0FBQ0FDLDJCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHFCQUFLLFVBRE8sRUFDS0MsVUFBVSxrQkFBVVgsSUFBVixFQUFnQjtBQUN2Qyx3QkFBSUEsS0FBS0EsSUFBVCxFQUFlO0FBQ1hPLDZCQUFLSyxRQUFMLEdBQWdCWixLQUFLQSxJQUFyQjtBQUNBTyw2QkFBS00sTUFBTDtBQUNIO0FBQ0o7QUFOVyxhQUFoQjtBQVFIOzs7aUNBRVE7QUFDTFIsb0JBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FFLDJCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHFCQUFLLFVBRE8sRUFDS0MsVUFBVSxrQkFBVVgsSUFBVixFQUFnQjtBQUN2Qyx3QkFBSUEsS0FBS0EsSUFBVCxFQUFlO0FBQ1gsNkJBQUtjLFVBQUwsQ0FBZ0JGLFFBQWhCLEdBQTJCWixLQUFLQSxJQUFoQztBQUNIO0FBQ0o7QUFMVyxhQUFoQjtBQU9IOzs7O0VBbkNrQ1EsZUFBS1AsSzs7a0JBQXZCRixTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgICBkYXRhID0ge1xuICAgICAgICBtaXhpbjogJ1RoaXMgaXMgbWl4aW4gZGF0YS4nLFxuICAgICAgICBiYXNlVXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tL2FwaS8nLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB0YXAoKSB7XG4gICAgICAgICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXG4gICAgICAgIH0sXG5cbiAgICB9XG5cblxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTogJ3VzZXJJbmZvJywgY29tcGxldGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbWl4aW4gb25Mb2FkJylcbiAgICAgICAgd2VweS5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTogJ3VzZXJJbmZvJywgY29tcGxldGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19