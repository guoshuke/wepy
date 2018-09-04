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
      list: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }],
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
      addChildren: function addChildren() {
        _wepy2.default.navigateTo({ url: 'addChildren' });
      },
      getChildrenList: function getChildrenList() {
        var self = this;
        _wepy2.default.getStorage({ key: 'baseData', complete: function complete(data) {

            if (data.data) {
              debugger;
              _wepy2.default.request({
                url: self.baseurl + self.api + self.urls.getChildrenList,
                //            header: {
                //              'Content-Type': 'application/x-www-form-urlencoded'
                //            },
                data: data.data,
                method: 'POST',
                success: function success(f) {
                  console.log('code=========>' + f);

                  debugger;
                  //self.$parent.globalData.userInfo = f.data.data
                },
                fail: function fail(err) {
                  console.log(err);
                }

              });
            }
          } });

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
    key: 'onLoad',
    value: function onLoad() {
      this.getUserInfo();
    }
  }]);

  return my;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(my , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIm15IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwibmFtZSIsInVzZXJJbmZvIiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJjb21wb25lbnRzIiwidG9hc3QiLCJUb2FzdCIsIm1ldGhvZHMiLCJhZGRDaGlsZHJlbiIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ2V0Q2hpbGRyZW5MaXN0Iiwic2VsZiIsImdldFN0b3JhZ2UiLCJrZXkiLCJjb21wbGV0ZSIsInJlcXVlc3QiLCJiYXNldXJsIiwiYXBpIiwidXJscyIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJmIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJlcnIiLCJ0aXRsZSIsImljb24iLCJjYiIsIiRpbnZva2UiLCJpbWciLCJ0aGVuIiwiZCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLENBQUMsRUFBQ0MsTUFBTSxDQUFQLEVBQUQsRUFBWSxFQUFDQSxNQUFNLENBQVAsRUFBWixFQUF1QixFQUFDQSxNQUFNLENBQVAsRUFBdkIsRUFBa0MsRUFBQ0EsTUFBTSxDQUFQLEVBQWxDLEVBQTZDLEVBQUNBLE1BQU0sQ0FBUCxFQUE3QyxDQUREO0FBRUxDLGdCQUFVO0FBQ1JDLGtCQUFVLEVBREY7QUFFUkMsbUJBQVc7QUFGSDs7QUFGTCxLLFFBUVBDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFFVEMsVSxHQUFhO0FBQ1hDLGFBQU9DO0FBREksSyxRQTBCYkMsTyxHQUFVOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNNQyxpQkFqQlEseUJBaUJLO0FBQ1hDLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUksYUFBTCxFQUFoQjtBQUNELE9BbkJPO0FBb0JSQyxxQkFwQlEsNkJBb0JVO0FBQ2hCLFlBQU1DLE9BQU8sSUFBYjtBQUNBSix1QkFBS0ssVUFBTCxDQUFnQixFQUFDQyxLQUFJLFVBQUwsRUFBZ0JDLFVBQVMsa0JBQVVwQixJQUFWLEVBQWdCOztBQUV2RCxnQkFBR0EsS0FBS0EsSUFBUixFQUFhO0FBQ1g7QUFDQWEsNkJBQUtRLE9BQUwsQ0FBYTtBQUNYTixxQkFBS0UsS0FBS0ssT0FBTCxHQUFlTCxLQUFLTSxHQUFwQixHQUEwQk4sS0FBS08sSUFBTCxDQUFVUixlQUQ5QjtBQUV6QjtBQUNBO0FBQ0E7QUFDY2hCLHNCQUFNQSxLQUFLQSxJQUxBO0FBTVh5Qix3QkFBUSxNQU5HO0FBT1hDLHlCQUFTLGlCQUFVQyxDQUFWLEVBQWE7QUFDcEJDLDBCQUFRQyxHQUFSLENBQVksbUJBQW1CRixDQUEvQjs7QUFFQTtBQUNBO0FBQ0QsaUJBWlU7QUFhWEcsc0JBQU0sY0FBVUMsR0FBVixFQUFlO0FBQ25CSCwwQkFBUUMsR0FBUixDQUFZRSxHQUFaO0FBQ0Q7O0FBZlUsZUFBYjtBQWtCRDtBQUNGLFdBdkJlLEVBQWhCOztBQXlCUjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQW5HTyxLOzs7OztrQ0F0Qkc7QUFDWCxVQUFJZCxPQUFLLElBQVQ7QUFDQUoscUJBQUtLLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSSxVQUFMLEVBQWdCQyxVQUFTLGtCQUFVcEIsSUFBVixFQUFnQjs7QUFFdkQsY0FBR0EsS0FBS0EsSUFBUixFQUFhO0FBQ1hpQixpQkFBS2QsUUFBTCxHQUFjSCxLQUFLQSxJQUFuQjtBQUNEO0FBQ0YsU0FMZSxFQUFoQjtBQU1EOzs7MEJBRUtnQyxLLEVBQU9DLEksRUFBTUMsRSxFQUFJO0FBQ3JCLFdBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCSCxlQUFPQSxLQURxQjtBQUU1QkksYUFBS0gsUUFBUTtBQUZlLE9BQTlCLEVBR0dJLElBSEgsQ0FHUSxVQUFDQyxDQUFELEVBQU87QUFDYkosY0FBTUEsSUFBTjtBQUNELE9BTEQ7QUFNRDs7OzZCQUNPO0FBQ04sV0FBS0ssV0FBTDtBQUNEOzs7O0VBdEM2QjFCLGVBQUsyQixJOztrQkFBaEIzQyxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBteSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFt7bmFtZTogMX0sIHtuYW1lOiAyfSwge25hbWU6IDN9LCB7bmFtZTogNH0sIHtuYW1lOiA1fV0sXG4gICAgICB1c2VySW5mbzoge1xuICAgICAgICBuaWNrTmFtZTogJycsXG4gICAgICAgIGF2YXRhclVybDogJydcbiAgICAgIH1cblxuICAgIH1cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGdldFVzZXJJbmZvKCl7XG4gICAgICBsZXQgc2VsZj10aGlzXG4gICAgICB3ZXB5LmdldFN0b3JhZ2Uoe2tleTondXNlckluZm8nLGNvbXBsZXRlOmZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgaWYoZGF0YS5kYXRhKXtcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvPWRhdGEuZGF0YVxuICAgICAgICB9XG4gICAgICB9fSlcbiAgICB9XG5cbiAgICB0b2FzdCh0aXRsZSwgaWNvbiwgY2IpIHtcbiAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBpbWc6IGljb24gfHwgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9raWlubGFtL3dldG9hc3QvbWFzdGVyL2ltYWdlcy9zdGFyLnBuZydcbiAgICAgIH0pLnRoZW4oKGQpID0+IHtcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKClcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuXG4vLyAgICAgIGFncmVlR2V0VXNlcihlKSB7XG4vLyAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4vLyAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4vLyAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbi8vXG4vLyAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3VzZXJJbmZvJywgZGF0YTogc2VsZi51c2VySW5mb30pXG4vL1xuLy8gICAgICAgICAgc2VsZi4kYXBwbHkoKVxuLy9cbi8vICAgICAgICB9XG4vLyAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICB0aGlzLnRvYXN0KCfmgqjov5jmnKrmjojmnYMnKVxuLy8gICAgICAgIH1cbi8vICAgICAgfVxuICAgICAgYWRkQ2hpbGRyZW4oKXtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICB9LFxuICAgICAgZ2V0Q2hpbGRyZW5MaXN0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICB3ZXB5LmdldFN0b3JhZ2Uoe2tleTonYmFzZURhdGEnLGNvbXBsZXRlOmZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICBpZihkYXRhLmRhdGEpe1xuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogc2VsZi5iYXNldXJsICsgc2VsZi5hcGkgKyBzZWxmLnVybHMuZ2V0Q2hpbGRyZW5MaXN0LFxuLy8gICAgICAgICAgICBoZWFkZXI6IHtcbi8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29kZT09PT09PT09PT4nICsgZik7XG5cbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIC8vc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBmLmRhdGEuZGF0YVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfX0pXG5cbi8vICAgICAgICAgICAgaGVhZGVyOiB7XG4vLyAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4vLyAgICAgICAgICAgIH0sXG5cblxuLy8gICAgICAgIHdlcHkucmVxdWVzdCh7XG4vLyAgICAgICAgICB1cmw6ICdodHRwOi8vZ2xhc3MudW5pbWtlci5jb20vYXBpL3NlbmRTbXMnLFxuLy8gICAgICAgICAgZGF0YToge1xuLy8gICAgICAgICAgICBtb2JpbGU6IG1vYmlsZVxuLy8gICAgICAgICAgfSxcbi8vLy8gICAgICAgICAgICBoZWFkZXI6IHtcbi8vLy8gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuLy8vLyAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChmKSB7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb2RlPT09PT09PT09PicgKyBmKTtcbi8vICAgICAgICAgICAgaWYgKGYuZGF0YS5jb2RlID09IDEpIHtcbi8vICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL6K6h5pe2Jyk7XG4vLyAgICAgICAgICAgICAgdmFyIHRpbWUgPSA2MFxuLy8gICAgICAgICAgICAgIHZhciBub1RpbWUgPSAwXG4vLyAgICAgICAgICAgICAgdmFyIHMgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICBub1RpbWUrK1xuLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WJqeS9mSAnICsgKHRpbWUgLSBub1RpbWUpICsgJ3MnKTtcbi8vICAgICAgICAgICAgICAgIGlmIChub1RpbWUgPj0gdGltZSkge1xuLy8gICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHMpXG4vL1xuLy8gICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIH0sIDEwMDApXG4vLyAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgdGhpcy50b2FzdChmLmRhdGEubWVzc2FnZSlcbi8vICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAvL3NlbGYuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZi5kYXRhLmRhdGFcbi8vICAgICAgICAgIH0sXG4vLyAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICAgICB9XG4vLyAgICAgICAgfSkgLy9cbi8vICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuLy8gICAgICAgICAgdXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tL2FwaS9tb2JpbGVCaW5kJyxcbi8vICAgICAgICAgIGRhdGE6IHRlbXAsXG4vLy8vICAgICAgICAgICAgaGVhZGVyOiB7XG4vLy8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZikge1xuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnY29kZT09PT09PT09PT4nICsgZik7XG4vLyAgICAgICAgICAgIHNlbGYuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZi5kYXRhLmRhdGFcbi8vICAgICAgICAgIH0sXG4vLyAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICAgICB9XG4vLyAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==