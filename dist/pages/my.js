'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _service = require('./../mixins/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var my = function (_wepy$page) {
  _inherits(my, _wepy$page);

  function my() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, my);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = my.__proto__ || Object.getPrototypeOf(my)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.data = {
      list: [],
      userInfo: {
        nickName: '',
        avatarUrl: ''
      }

    }, _this.mixins = [_test2.default], _this.components = {
      toast: _wepyComToast2.default
    }, _this.methods = {

      //      agreeGetUser(e) {
      //        if (e.detail.userInfo) {
      //          debugger
      //          let self = this
      //          self.userInfo = e.detail.userInfo
      //
      //          wepy.setStorage({key: 'userInfo', data: self.userInfo})
      //
      //          self.$apply()
      //
      //        }
      //        else {
      //          this.toast('您还未授权')
      //        }
      //      }
      addChildren: function addChildren(e) {
        var id = e.currentTarget.dataset.id;

        if (id) {
          _wepy2.default.navigateTo({ url: 'addChildren?id=' + id });
        }
        _wepy2.default.navigateTo({ url: 'addChildren' });
      },
      goDetail: function goDetail(e) {
        _wepy2.default.navigateTo({ url: 'personalInfo' });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(my, [{
    key: 'getUserInfo',
    value: function getUserInfo() {
      var self = this;
      _wepy2.default.getStorage({ key: 'userInfo', complete: function complete(data) {
          if (data.data) {
            self.userInfo = data.data;
          }
        } });
    }
  }, {
    key: 'getChildrenList',
    value: function getChildrenList() {
      var self = this;
      (0, _service2.default)('getChildrenList').then(function (res) {
        console.log(res);
        self.data.list = self.list = res.data;
        self.setData({ list: res.data });
        self.$apply();
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'toast',
    value: function toast(title, icon, cb) {
      this.$invoke('toast', 'show', {
        title: title,
        img: icon || 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      }).then(function (d) {
        cb && cb();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getChildrenList();
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getUserInfo();
    }
  }]);

  return my;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(my , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwidXNlckluZm8iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsIm1peGlucyIsInRlc3RNaXhpbiIsImNvbXBvbmVudHMiLCJ0b2FzdCIsIlRvYXN0IiwibWV0aG9kcyIsImFkZENoaWxkcmVuIiwiZSIsImlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImdvRGV0YWlsIiwic2VsZiIsImdldFN0b3JhZ2UiLCJrZXkiLCJjb21wbGV0ZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwic2V0RGF0YSIsIiRhcHBseSIsImNhdGNoIiwiZXJyIiwidGl0bGUiLCJpY29uIiwiY2IiLCIkaW52b2tlIiwiaW1nIiwiZCIsImdldENoaWxkcmVuTGlzdCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxnQkFBVTtBQUNSQyxrQkFBVSxFQURGO0FBRVJDLG1CQUFXO0FBRkg7O0FBRkwsSyxRQVFQQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLFUsR0FBYTtBQUNYQyxhQUFPQztBQURJLEssUUE2Q2JDLE8sR0FBVTs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTUMsaUJBakJRLHVCQWlCSUMsQ0FqQkosRUFpQk07QUFDVixZQUFJQyxLQUFJRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsRUFBaEM7O0FBRUEsWUFBR0EsRUFBSCxFQUFNO0FBQ0ZHLHlCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksb0JBQWtCTCxFQUF2QixFQUFoQjtBQUNIO0FBQ0RHLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksYUFBTCxFQUFoQjtBQUNILE9BeEJPO0FBeUJOQyxjQXpCTSxvQkF5QkdQLENBekJILEVBeUJLO0FBQ1BJLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksY0FBTCxFQUFoQjtBQUNIO0FBM0JLLEs7Ozs7O2tDQXpDRztBQUNYLFVBQUlFLE9BQUssSUFBVDtBQUNBSixxQkFBS0ssVUFBTCxDQUFnQixFQUFDQyxLQUFJLFVBQUwsRUFBZ0JDLFVBQVMsa0JBQVV2QixJQUFWLEVBQWdCO0FBQ3ZELGNBQUdBLEtBQUtBLElBQVIsRUFBYTtBQUNYb0IsaUJBQUtsQixRQUFMLEdBQWNGLEtBQUtBLElBQW5CO0FBQ0Q7QUFDRixTQUplLEVBQWhCO0FBS0Q7OztzQ0FFbUI7QUFDZCxVQUFNb0IsT0FBTyxJQUFiO0FBQ0EsNkJBQ0ksaUJBREosRUFFRUksSUFGRixDQUVPLGVBQU07QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBYUMsR0FBYjtBQUNBUCxhQUFLcEIsSUFBTCxDQUFVQyxJQUFWLEdBQWVtQixLQUFLbkIsSUFBTCxHQUFVMEIsSUFBSTNCLElBQTdCO0FBQ0FvQixhQUFLUSxPQUFMLENBQWEsRUFBQzNCLE1BQUswQixJQUFJM0IsSUFBVixFQUFiO0FBQ0FvQixhQUFLUyxNQUFMO0FBRUgsT0FSRCxFQVFHQyxLQVJILENBUVMsZUFBTTtBQUNYTCxnQkFBUUMsR0FBUixDQUFZSyxHQUFaO0FBQ0gsT0FWRDtBQWFIOzs7MEJBRUdDLEssRUFBT0MsSSxFQUFNQyxFLEVBQUk7QUFDckIsV0FBS0MsT0FBTCxDQUFhLE9BQWIsRUFBc0IsTUFBdEIsRUFBOEI7QUFDNUJILGVBQU9BLEtBRHFCO0FBRTVCSSxhQUFLSCxRQUFRO0FBRmUsT0FBOUIsRUFHR1QsSUFISCxDQUdRLFVBQUNhLENBQUQsRUFBTztBQUNiSCxjQUFNQSxJQUFOO0FBQ0QsT0FMRDtBQU1EOzs7NkJBQ087QUFDSixXQUFLSSxlQUFMO0FBQ0g7Ozs2QkFDTztBQUNKLFdBQUtDLFdBQUw7QUFDSDs7OztFQXpENkJ2QixlQUFLd0IsSTs7a0JBQWhCM0MsRSIsImZpbGUiOiJteS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCByZXF1ZXN0ICAgZnJvbSAnLi4vbWl4aW5zL3NlcnZpY2UnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXSxcbiAgICAgIHVzZXJJbmZvOiB7XG4gICAgICAgIG5pY2tOYW1lOiAnJyxcbiAgICAgICAgYXZhdGFyVXJsOiAnJ1xuICAgICAgfVxuXG4gICAgfVxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKXtcbiAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgIHdlcHkuZ2V0U3RvcmFnZSh7a2V5Oid1c2VySW5mbycsY29tcGxldGU6ZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYoZGF0YS5kYXRhKXtcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvPWRhdGEuZGF0YVxuICAgICAgICB9XG4gICAgICB9fSlcbiAgICB9XG5cbiAgICAgIGdldENoaWxkcmVuTGlzdCgpIHtcbiAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgIHJlcXVlc3QoXG4gICAgICAgICAgICAgICdnZXRDaGlsZHJlbkxpc3QnLFxuICAgICAgICAgICkudGhlbihyZXMgPT57XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCByZXMpO1xuICAgICAgICAgICAgICBzZWxmLmRhdGEubGlzdD1zZWxmLmxpc3Q9cmVzLmRhdGFcbiAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtsaXN0OnJlcy5kYXRhfSlcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuXG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pXG5cblxuICAgICAgfVxuXG4gICAgdG9hc3QodGl0bGUsIGljb24sIGNiKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgaW1nOiBpY29uIHx8ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2lpbmxhbS93ZXRvYXN0L21hc3Rlci9pbWFnZXMvc3Rhci5wbmcnXG4gICAgICB9KS50aGVuKChkKSA9PiB7XG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuTGlzdCgpXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmdldFVzZXJJbmZvKClcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuXG4vLyAgICAgIGFncmVlR2V0VXNlcihlKSB7XG4vLyAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4vLyAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4vLyAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbi8vXG4vLyAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogc2VsZi51c2VySW5mb30pXG4vL1xuLy8gICAgICAgICAgc2VsZi4kYXBwbHkoKVxuLy9cbi8vICAgICAgICB9XG4vLyAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICB0aGlzLnRvYXN0KCfmgqjov5jmnKrmjojmnYMnKVxuLy8gICAgICAgIH1cbi8vICAgICAgfVxuICAgICAgYWRkQ2hpbGRyZW4oZSl7XG4gICAgICAgICAgbGV0IGlkID1lLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuXG4gICAgICAgICAgaWYoaWQpe1xuICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDonYWRkQ2hpbGRyZW4/aWQ9JytpZH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidhZGRDaGlsZHJlbid9KVxuICAgICAgfSxcbiAgICAgICAgZ29EZXRhaWwoZSl7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDoncGVyc29uYWxJbmZvJ30pXG4gICAgICAgIH1cblxuICAgIH1cbiAgfVxuIl19