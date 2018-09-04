'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _urls = require('./urls.js');

var _urls2 = _interopRequireDefault(_urls);

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
      baseurl: 'http://glass.unimker.com',
      api: '/api',
      urls: _urls2.default
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
      _wepy2.default.getStorage({ key: 'userInfo', complete: function complete(data) {
          if (data.data) {
            self.userInfo = data.data;
            self.$apply();
          }
        } });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('mixin onLoad');
      _wepy2.default.getStorage({ key: 'userInfo', complete: function complete(data) {
          if (data.data) {
            this.globalData.userInfo = data.data;
          }
        } });
    }
  }]);

  return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwiYmFzZXVybCIsImFwaSIsInVybHMiLCJtZXRob2RzIiwidGFwIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJ3ZXB5IiwiZ2V0U3RvcmFnZSIsImtleSIsImNvbXBsZXRlIiwidXNlckluZm8iLCIkYXBwbHkiLCJnbG9iYWxEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLGFBQU8scUJBREY7QUFFTEMsZUFBUSwwQkFGSDtBQUdMQyxXQUFJLE1BSEM7QUFJTEMsWUFBS0E7QUFKQSxLLFFBTVBDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0wsYUFBS0wsS0FBTCxHQUFhLHdCQUFiO0FBQ0FNLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDRDtBQUpPLEs7Ozs7OzZCQU9EO0FBQ1AsVUFBTUMsT0FBTSxJQUFaO0FBQ0FDLHFCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksVUFBTCxFQUFnQkMsVUFBUyxrQkFBVWIsSUFBVixFQUFnQjtBQUN2RCxjQUFHQSxLQUFLQSxJQUFSLEVBQWE7QUFDWFMsaUJBQUtLLFFBQUwsR0FBY2QsS0FBS0EsSUFBbkI7QUFDQVMsaUJBQUtNLE1BQUw7QUFDRDtBQUNGLFNBTGUsRUFBaEI7QUFNRDs7OzZCQUVRO0FBQ1BSLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FFLHFCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksVUFBTCxFQUFnQkMsVUFBUyxrQkFBVWIsSUFBVixFQUFnQjtBQUN2RCxjQUFHQSxLQUFLQSxJQUFSLEVBQWE7QUFDWCxpQkFBS2dCLFVBQUwsQ0FBZ0JGLFFBQWhCLEdBQXlCZCxLQUFLQSxJQUE5QjtBQUNEO0FBQ0YsU0FKZSxFQUFoQjtBQUtEOzs7O0VBL0JvQ1UsZUFBS1QsSzs7a0JBQXZCRixTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHVybHMgZnJvbSAnLi91cmxzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgZGF0YSA9IHtcbiAgICBtaXhpbjogJ1RoaXMgaXMgbWl4aW4gZGF0YS4nLFxuICAgIGJhc2V1cmw6J2h0dHA6Ly9nbGFzcy51bmlta2VyLmNvbScsXG4gICAgYXBpOicvYXBpJyxcbiAgICB1cmxzOnVybHNcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHRhcCAoKSB7XG4gICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXG4gICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXG4gICAgfVxuICB9XG5cbiAgb25TaG93KCkge1xuICAgIGNvbnN0IHNlbGYgPXRoaXNcbiAgICB3ZXB5LmdldFN0b3JhZ2Uoe2tleTondXNlckluZm8nLGNvbXBsZXRlOmZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZihkYXRhLmRhdGEpe1xuICAgICAgICBzZWxmLnVzZXJJbmZvPWRhdGEuZGF0YVxuICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICB9XG4gICAgfX0pXG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coJ21peGluIG9uTG9hZCcpXG4gICAgd2VweS5nZXRTdG9yYWdlKHtrZXk6J3VzZXJJbmZvJyxjb21wbGV0ZTpmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWYoZGF0YS5kYXRhKXtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvPWRhdGEuZGF0YVxuICAgICAgfVxuICAgIH19KVxuICB9XG59XG4iXX0=