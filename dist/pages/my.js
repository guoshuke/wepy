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

      //            header: {
      //              'Content-Type': 'application/x-www-form-urlencoded'
      //            },


      //        wepy.request({
      //          url: 'http://glass.unimker.com/api/sendSms',
      //          data: {
      //            mobile: mobile
      //          },
      ////            header: {
      ////              'Content-Type': 'application/x-www-form-urlencoded'
      ////            },
      //          method: 'POST',
      //          success: function (f) {
      //            console.log('code=========>' + f);
      //            if (f.data.code == 1) {
      //              console.log('开始计时');
      //              var time = 60
      //              var noTime = 0
      //              var s = setInterval(() => {
      //                noTime++
      //                console.log('剩余 ' + (time - noTime) + 's');
      //                if (noTime >= time) {
      //                  clearInterval(s)
      //
      //                }
      //              }, 1000)
      //            } else {
      //              this.toast(f.data.message)
      //            }
      //            //self.$parent.globalData.userInfo = f.data.data
      //          },
      //          fail: function (err) {
      //            console.log(err);
      //          }
      //        }) //
      //        wepy.request({
      //          url: 'http://glass.unimker.com/api/mobileBind',
      //          data: temp,
      ////            header: {
      ////              'Content-Type': 'application/x-www-form-urlencoded'
      ////            },
      //          method: 'POST',
      //          success: function (f) {
      //            console.log('code=========>' + f);
      //            self.$parent.globalData.userInfo = f.data.data
      //          },
      //          fail: function (err) {
      //            console.log(err);
      //          }
      //        })

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwidXNlckluZm8iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsImlkIiwibWl4aW5zIiwidGVzdE1peGluIiwiY29tcG9uZW50cyIsInRvYXN0IiwiVG9hc3QiLCJtZXRob2RzIiwiYWRkQ2hpbGRyZW4iLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImdvRGV0YWlsIiwic2VsZiIsImdldFN0b3JhZ2UiLCJrZXkiLCJjb21wbGV0ZSIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwic2V0RGF0YSIsIiRhcHBseSIsImNhdGNoIiwiZXJyIiwidGl0bGUiLCJpY29uIiwiY2IiLCIkaW52b2tlIiwiaW1nIiwiZCIsImdldENoaWxkcmVuTGlzdCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERDtBQUVMQyxnQkFBVTtBQUNSQyxrQkFBVSxFQURGO0FBRVJDLG1CQUFXO0FBRkgsT0FGTDtBQU1MQyxVQUFHO0FBTkUsSyxRQVFQQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBRVRDLFUsR0FBYTtBQUNYQyxhQUFPQztBQURJLEssUUFtRGJDLE8sR0FBVTs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTUMsaUJBakJRLHVCQWlCSUMsQ0FqQkosRUFpQk07QUFDVixZQUFJUixLQUFJUSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QlYsRUFBaEM7O0FBRUEsWUFBR0EsRUFBSCxFQUFNO0FBQ0ZXLHlCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksb0JBQWtCYixFQUF2QixFQUFoQjtBQUNIO0FBQ0RXLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksYUFBTCxFQUFoQjtBQUNILE9BeEJPO0FBeUJOQyxjQXpCTSxvQkF5QkdOLENBekJILEVBeUJLO0FBQ1BHLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksY0FBTCxFQUFoQjtBQUNIOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFoRmMsSzs7Ozs7a0NBL0NHO0FBQ1gsVUFBSUUsT0FBSyxJQUFUO0FBQ0FKLHFCQUFLSyxVQUFMLENBQWdCLEVBQUNDLEtBQUksVUFBTCxFQUFnQkMsVUFBUyxrQkFBVXZCLElBQVYsRUFBZ0I7QUFDdkQsY0FBR0EsS0FBS0EsSUFBUixFQUFhO0FBQ1hvQixpQkFBS2xCLFFBQUwsR0FBY0YsS0FBS0EsSUFBbkI7QUFDRDtBQUNGLFNBSmUsRUFBaEI7QUFLRDs7O3NDQUVtQjtBQUNkLFVBQU1vQixPQUFPLElBQWI7QUFDQSw2QkFDSSxpQkFESixFQUVFSSxJQUZGLENBRU8sZUFBTTtBQUNUQyxnQkFBUUMsR0FBUixDQUFhQyxHQUFiO0FBQ0FQLGFBQUtwQixJQUFMLENBQVVDLElBQVYsR0FBZW1CLEtBQUtuQixJQUFMLEdBQVUwQixJQUFJM0IsSUFBN0I7QUFDQW9CLGFBQUtwQixJQUFMLENBQVVLLEVBQVYsR0FBZXNCLElBQUkzQixJQUFKLENBQVMsQ0FBVCxFQUFZLElBQVosQ0FBZjtBQUNBb0IsYUFBS1EsT0FBTCxDQUFhLEVBQUMzQixNQUFLMEIsSUFBSTNCLElBQVYsRUFBYjtBQUNBb0IsYUFBS1MsTUFBTDtBQUVILE9BVEQsRUFTR0MsS0FUSCxDQVNTLGVBQU07QUFDWEwsZ0JBQVFDLEdBQVIsQ0FBWUssR0FBWjtBQUNILE9BWEQ7QUFjSDtBQUNEOzs7O3VDQUNrQjtBQUNkLFVBQU1YLE9BQU8sSUFBYjtBQUNBSixxQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFJLHVCQUFxQkUsS0FBS3BCLElBQUwsQ0FBVUssRUFBcEMsRUFBaEIsRUFGYyxDQUUyQztBQUM1RDs7OzBCQUVHMkIsSyxFQUFPQyxJLEVBQU1DLEUsRUFBSTtBQUNyQixXQUFLQyxPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QixFQUE4QjtBQUM1QkgsZUFBT0EsS0FEcUI7QUFFNUJJLGFBQUtILFFBQVE7QUFGZSxPQUE5QixFQUdHVCxJQUhILENBR1EsVUFBQ2EsQ0FBRCxFQUFPO0FBQ2JILGNBQU1BLElBQU47QUFDRCxPQUxEO0FBTUQ7Ozs2QkFDTztBQUNKLFdBQUtJLGVBQUw7QUFDSDs7OzZCQUNPO0FBQ0osV0FBS0MsV0FBTDtBQUNIOzs7O0VBL0Q2QnZCLGVBQUt3QixJOztrQkFBaEIzQyxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IHJlcXVlc3QgICBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBteSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgdXNlckluZm86IHtcbiAgICAgICAgbmlja05hbWU6ICcnLFxuICAgICAgICBhdmF0YXJVcmw6ICcnXG4gICAgICB9LFxuICAgICAgaWQ6JycsXG4gICAgfVxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKXtcbiAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgIHdlcHkuZ2V0U3RvcmFnZSh7a2V5Oid1c2VySW5mbycsY29tcGxldGU6ZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYoZGF0YS5kYXRhKXtcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvPWRhdGEuZGF0YVxuICAgICAgICB9XG4gICAgICB9fSlcbiAgICB9XG5cbiAgICAgIGdldENoaWxkcmVuTGlzdCgpIHtcbiAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgIHJlcXVlc3QoXG4gICAgICAgICAgICAgICdnZXRDaGlsZHJlbkxpc3QnLFxuICAgICAgICAgICkudGhlbihyZXMgPT57XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCByZXMpO1xuICAgICAgICAgICAgICBzZWxmLmRhdGEubGlzdD1zZWxmLmxpc3Q9cmVzLmRhdGFcbiAgICAgICAgICAgICAgc2VsZi5kYXRhLmlkID0gcmVzLmRhdGFbMF1bJ2lkJ11cbiAgICAgICAgICAgICAgc2VsZi5zZXREYXRhKHtsaXN0OnJlcy5kYXRhfSlcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuXG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pXG5cblxuICAgICAgfVxuICAgICAgLy/ot7PovazliLDouqvpq5jkvZPph43pobVcbiAgICAgIGdvSGVpZ2h0T3JXZWlnaHQoKXtcbiAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDonaGVpZ2h0T3JXZWlnaHQ/aWQ9JytzZWxmLmRhdGEuaWR9KTsvL2lkIOWtqeWtkGlkXG4gICAgICB9XG5cbiAgICB0b2FzdCh0aXRsZSwgaWNvbiwgY2IpIHtcbiAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBpbWc6IGljb24gfHwgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9raWlubGFtL3dldG9hc3QvbWFzdGVyL2ltYWdlcy9zdGFyLnBuZydcbiAgICAgIH0pLnRoZW4oKGQpID0+IHtcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaG93KCl7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW5MaXN0KClcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuZ2V0VXNlckluZm8oKVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG5cbi8vICAgICAgYWdyZWVHZXRVc2VyKGUpIHtcbi8vICAgICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcbi8vICAgICAgICAgIGRlYnVnZ2VyXG4vLyAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbi8vICAgICAgICAgIHNlbGYudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuLy9cbi8vICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBzZWxmLnVzZXJJbmZvfSlcbi8vXG4vLyAgICAgICAgICBzZWxmLiRhcHBseSgpXG4vL1xuLy8gICAgICAgIH1cbi8vICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgIHRoaXMudG9hc3QoJ+aCqOi/mOacquaOiOadgycpXG4vLyAgICAgICAgfVxuLy8gICAgICB9XG4gICAgICBhZGRDaGlsZHJlbihlKXtcbiAgICAgICAgICBsZXQgaWQgPWUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG5cbiAgICAgICAgICBpZihpZCl7XG4gICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidhZGRDaGlsZHJlbj9pZD0nK2lkfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICB9LFxuICAgICAgICBnb0RldGFpbChlKXtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOidwZXJzb25hbEluZm8nfSlcbiAgICAgICAgfVxuXG4vLyAgICAgICAgICAgIGhlYWRlcjoge1xuLy8gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuLy8gICAgICAgICAgICB9LFxuXG5cbi8vICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuLy8gICAgICAgICAgdXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tL2FwaS9zZW5kU21zJyxcbi8vICAgICAgICAgIGRhdGE6IHtcbi8vICAgICAgICAgICAgbW9iaWxlOiBtb2JpbGVcbi8vICAgICAgICAgIH0sXG4vLy8vICAgICAgICAgICAgaGVhZGVyOiB7XG4vLy8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZikge1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnY29kZT09PT09PT09PT4nICsgZik7XG4vLyAgICAgICAgICAgIGlmIChmLmRhdGEuY29kZSA9PSAxKSB7XG4vLyAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni+iuoeaXticpO1xuLy8gICAgICAgICAgICAgIHZhciB0aW1lID0gNjBcbi8vICAgICAgICAgICAgICB2YXIgbm9UaW1lID0gMFxuLy8gICAgICAgICAgICAgIHZhciBzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgbm9UaW1lKytcbi8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliankvZkgJyArICh0aW1lIC0gbm9UaW1lKSArICdzJyk7XG4vLyAgICAgICAgICAgICAgICBpZiAobm9UaW1lID49IHRpbWUpIHtcbi8vICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzKVxuLy9cbi8vICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICB9LCAxMDAwKVxuLy8gICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgIHRoaXMudG9hc3QoZi5kYXRhLm1lc3NhZ2UpXG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgLy9zZWxmLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGYuZGF0YS5kYXRhXG4vLyAgICAgICAgICB9LFxuLy8gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgfVxuLy8gICAgICAgIH0pIC8vXG4vLyAgICAgICAgd2VweS5yZXF1ZXN0KHtcbi8vICAgICAgICAgIHVybDogJ2h0dHA6Ly9nbGFzcy51bmlta2VyLmNvbS9hcGkvbW9iaWxlQmluZCcsXG4vLyAgICAgICAgICBkYXRhOiB0ZW1wLFxuLy8vLyAgICAgICAgICAgIGhlYWRlcjoge1xuLy8vLyAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4vLy8vICAgICAgICAgICAgfSxcbi8vICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGYpIHtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvZGU9PT09PT09PT0+JyArIGYpO1xuLy8gICAgICAgICAgICBzZWxmLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGYuZGF0YS5kYXRhXG4vLyAgICAgICAgICB9LFxuLy8gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgICAgfVxuLy8gICAgICAgIH0pXG5cbiAgICB9XG4gIH1cbiJdfQ==