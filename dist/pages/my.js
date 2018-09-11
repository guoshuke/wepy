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
      },
      id: ''
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
        self.data.id = res.data[0]['id'];
        self.setData({ list: res.data });
        self.$apply();
      }).catch(function (err) {
        console.log(err);
      });
    }
    //跳转到身高体重页

  }, {
    key: 'goHeightOrWeight',
    value: function goHeightOrWeight() {
      var self = this;
      _wepy2.default.navigateTo({ url: 'heightOrWeight?id=' + self.data.id }); //id 孩子id
    }

    //跳转到 视疲劳症状自查

  }, {
    key: 'goExamination',
    value: function goExamination() {
      var self = this;
      _wepy2.default.navigateTo({ url: 'examination?id=' + self.data.id }); //id 孩子id
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwidXNlckluZm8iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsImlkIiwibWl4aW5zIiwidGVzdE1peGluIiwiY29tcG9uZW50cyIsInRvYXN0IiwiVG9hc3QiLCJtZXRob2RzIiwiYWRkQ2hpbGRyZW4iLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImdvRGV0YWlsIiwic2VsZiIsImdldFN0b3JhZ2UiLCJrZXkiLCJjb21wbGV0ZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwic2V0RGF0YSIsIiRhcHBseSIsImNhdGNoIiwiZXJyIiwidGl0bGUiLCJpY29uIiwiY2IiLCIkaW52b2tlIiwiaW1nIiwiZCIsImdldENoaWxkcmVuTGlzdCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxnQkFBVTtBQUNSQyxrQkFBVSxFQURGO0FBRVJDLG1CQUFXO0FBRkgsT0FGTDtBQU1MQyxVQUFHO0FBTkUsSyxRQVFQQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLFUsR0FBYTtBQUNYQyxhQUFPQztBQURJLEssUUF5RGJDLE8sR0FBVTs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTUMsaUJBakJRLHVCQWlCSUMsQ0FqQkosRUFpQk07QUFDVixZQUFJUixLQUFJUSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QlYsRUFBaEM7O0FBRUEsWUFBR0EsRUFBSCxFQUFNO0FBQ0ZXLHlCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksb0JBQWtCYixFQUF2QixFQUFoQjtBQUNIO0FBQ0RXLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksYUFBTCxFQUFoQjtBQUNILE9BeEJPO0FBeUJOQyxjQXpCTSxvQkF5QkdOLENBekJILEVBeUJLO0FBQ1BHLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksY0FBTCxFQUFoQjtBQUNIO0FBM0JLLEs7Ozs7O2tDQXJERztBQUNYLFVBQUlFLE9BQUssSUFBVDtBQUNBSixxQkFBS0ssVUFBTCxDQUFnQixFQUFDQyxLQUFJLFVBQUwsRUFBZ0JDLFVBQVMsa0JBQVV2QixJQUFWLEVBQWdCO0FBQ3ZELGNBQUdBLEtBQUtBLElBQVIsRUFBYTtBQUNYb0IsaUJBQUtsQixRQUFMLEdBQWNGLEtBQUtBLElBQW5CO0FBQ0Q7QUFDRixTQUplLEVBQWhCO0FBS0Q7OztzQ0FFbUI7QUFDZCxVQUFNb0IsT0FBTyxJQUFiO0FBQ0EsNkJBQ0ksaUJBREosRUFFRUksSUFGRixDQUVPLGVBQU07QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBYUMsR0FBYjtBQUNBUCxhQUFLcEIsSUFBTCxDQUFVQyxJQUFWLEdBQWVtQixLQUFLbkIsSUFBTCxHQUFVMEIsSUFBSTNCLElBQTdCO0FBQ0FvQixhQUFLcEIsSUFBTCxDQUFVSyxFQUFWLEdBQWVzQixJQUFJM0IsSUFBSixDQUFTLENBQVQsRUFBWSxJQUFaLENBQWY7QUFDQW9CLGFBQUtRLE9BQUwsQ0FBYSxFQUFDM0IsTUFBSzBCLElBQUkzQixJQUFWLEVBQWI7QUFDQW9CLGFBQUtTLE1BQUw7QUFFSCxPQVRELEVBU0dDLEtBVEgsQ0FTUyxlQUFNO0FBQ1hMLGdCQUFRQyxHQUFSLENBQVlLLEdBQVo7QUFDSCxPQVhEO0FBY0g7QUFDRDs7Ozt1Q0FDa0I7QUFDZCxVQUFNWCxPQUFPLElBQWI7QUFDQUoscUJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSSx1QkFBcUJFLEtBQUtwQixJQUFMLENBQVVLLEVBQXBDLEVBQWhCLEVBRmMsQ0FFMkM7QUFDNUQ7O0FBRUQ7Ozs7b0NBQ2U7QUFDWCxVQUFNZSxPQUFPLElBQWI7QUFDQUoscUJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSSxvQkFBa0JFLEtBQUtwQixJQUFMLENBQVVLLEVBQWpDLEVBQWhCLEVBRlcsQ0FFMkM7QUFDekQ7OzswQkFFRzJCLEssRUFBT0MsSSxFQUFNQyxFLEVBQUk7QUFDckIsV0FBS0MsT0FBTCxDQUFhLE9BQWIsRUFBc0IsTUFBdEIsRUFBOEI7QUFDNUJILGVBQU9BLEtBRHFCO0FBRTVCSSxhQUFLSCxRQUFRO0FBRmUsT0FBOUIsRUFHR1QsSUFISCxDQUdRLFVBQUNhLENBQUQsRUFBTztBQUNiSCxjQUFNQSxJQUFOO0FBQ0QsT0FMRDtBQU1EOzs7NkJBQ087QUFDSixXQUFLSSxlQUFMO0FBQ0g7Ozs2QkFDTztBQUNKLFdBQUtDLFdBQUw7QUFDSDs7OztFQXJFNkJ2QixlQUFLd0IsSTs7a0JBQWhCM0MsRSIsImZpbGUiOiJteS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCByZXF1ZXN0ICAgZnJvbSAnLi4vbWl4aW5zL3NlcnZpY2UnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXSxcbiAgICAgIHVzZXJJbmZvOiB7XG4gICAgICAgIG5pY2tOYW1lOiAnJyxcbiAgICAgICAgYXZhdGFyVXJsOiAnJ1xuICAgICAgfSxcbiAgICAgIGlkOicnLFxuICAgIH1cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGdldFVzZXJJbmZvKCl7XG4gICAgICBsZXQgc2VsZj10aGlzXG4gICAgICB3ZXB5LmdldFN0b3JhZ2Uoe2tleTondXNlckluZm8nLGNvbXBsZXRlOmZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmKGRhdGEuZGF0YSl7XG4gICAgICAgICAgc2VsZi51c2VySW5mbz1kYXRhLmRhdGFcbiAgICAgICAgfVxuICAgICAgfX0pXG4gICAgfVxuXG4gICAgICBnZXRDaGlsZHJlbkxpc3QoKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICByZXF1ZXN0KFxuICAgICAgICAgICAgICAnZ2V0Q2hpbGRyZW5MaXN0JyxcbiAgICAgICAgICApLnRoZW4ocmVzID0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyggcmVzKTtcbiAgICAgICAgICAgICAgc2VsZi5kYXRhLmxpc3Q9c2VsZi5saXN0PXJlcy5kYXRhXG4gICAgICAgICAgICAgIHNlbGYuZGF0YS5pZCA9IHJlcy5kYXRhWzBdWydpZCddXG4gICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7bGlzdDpyZXMuZGF0YX0pXG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PntcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KVxuXG5cbiAgICAgIH1cbiAgICAgIC8v6Lez6L2s5Yiw6Lqr6auY5L2T6YeN6aG1XG4gICAgICBnb0hlaWdodE9yV2VpZ2h0KCl7XG4gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2hlaWdodE9yV2VpZ2h0P2lkPScrc2VsZi5kYXRhLmlkfSk7Ly9pZCDlranlrZBpZFxuICAgICAgfVxuXG4gICAgICAvL+i3s+i9rOWIsCDop4bnlrLlirPnl4fnirboh6rmn6VcbiAgICAgIGdvRXhhbWluYXRpb24oKXtcbiAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDonZXhhbWluYXRpb24/aWQ9JytzZWxmLmRhdGEuaWR9KTsvL2lkIOWtqeWtkGlkXG4gICAgICB9XG5cbiAgICB0b2FzdCh0aXRsZSwgaWNvbiwgY2IpIHtcbiAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBpbWc6IGljb24gfHwgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9raWlubGFtL3dldG9hc3QvbWFzdGVyL2ltYWdlcy9zdGFyLnBuZydcbiAgICAgIH0pLnRoZW4oKGQpID0+IHtcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaG93KCl7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW5MaXN0KClcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuZ2V0VXNlckluZm8oKVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG5cbi8vICAgICAgYWdyZWVHZXRVc2VyKGUpIHtcbi8vICAgICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcbi8vICAgICAgICAgIGRlYnVnZ2VyXG4vLyAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbi8vICAgICAgICAgIHNlbGYudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuLy9cbi8vICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBzZWxmLnVzZXJJbmZvfSlcbi8vXG4vLyAgICAgICAgICBzZWxmLiRhcHBseSgpXG4vL1xuLy8gICAgICAgIH1cbi8vICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgIHRoaXMudG9hc3QoJ+aCqOi/mOacquaOiOadgycpXG4vLyAgICAgICAgfVxuLy8gICAgICB9XG4gICAgICBhZGRDaGlsZHJlbihlKXtcbiAgICAgICAgICBsZXQgaWQgPWUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG5cbiAgICAgICAgICBpZihpZCl7XG4gICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidhZGRDaGlsZHJlbj9pZD0nK2lkfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICB9LFxuICAgICAgICBnb0RldGFpbChlKXtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidwZXJzb25hbEluZm8nfSlcbiAgICAgICAgfVxuXG4gICAgfVxuICB9XG4iXX0=