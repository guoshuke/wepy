'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; // alias example
// alias example
// aliasFields example
// aliasFields ignore module example


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _list = require('./../components/wepy-list.js');

var _list2 = _interopRequireDefault(_list);

var _moduleA = {};

var _moduleA2 = _interopRequireDefault(_moduleA);

var _group = require('./../components/group.js');

var _group2 = _interopRequireDefault(_group);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('moduleA ignored: ', _moduleA2.default); // => moduleA ignored: {}

var T1 = (_dec = (0, _wepyRedux.connect)({
  num: function num(state) {
    return state.counter.num;
  },
  asyncNum: function asyncNum(state) {
    return state.counter.asyncNum;
  },
  sumNum: function sumNum(state) {
    return state.counter.num + state.counter.asyncNum;
  }
}), _dec(_class = function (_wepy$page) {
  _inherits(T1, _wepy$page);

  function T1() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, T1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = T1.__proto__ || Object.getPrototypeOf(T1)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(T1, [{
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
    value: function onLoad() {}
  }]);

  return T1;
}(_wepy2.default.page)) || _class);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {
    navigationBarTitleText: 'test'
  };
  this.baseUrl = 'http://xxl.unimker.com';
  this.$repeat = {};
  this.$props = { "counter1": { "xmlns:v-on": "" }, "counter2": { "xmlns:v-bind": "", "v-bind:num.sync": "mynum" }, "group": { "v-bind:grouplist.once": "item", "v-bind:indexa.once": "index" } };
  this.$events = { "counter1": { "v-on:index-emit": "counterEmit" } };
  this.components = {
    panel: _panel2.default,
    counter1: _counter2.default,
    counter2: _counter2.default,
    list: _list2.default,
    group: _group2.default,
    toast: _wepyComToast2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    mynum: 20,
    userInfo: {
      nickName: '加载中...'
    },
    normalTitle: '原始标题',
    setTimeoutTitle: '标题三秒后会被修改',
    count: 0,
    netrst: '',
    groupList: [{
      id: 1,
      name: '点击改变',
      list: [{
        childid: '1.1',
        childname: '子项，点我改变'
      }, {
        childid: '1.2',
        childname: '子项，点我改变'
      }, {
        childid: '1.3',
        childname: '子项，点我改变'
      }]
    }, {
      id: 2,
      name: '点击改变',
      list: [{
        childid: '2.1',
        childname: '子项，点我改变'
      }, {
        childid: '2.2',
        childname: '子项，点我改变'
      }, {
        childid: '2.3',
        childname: '子项，点我改变'
      }]
    }, {
      id: 3,
      name: '点击改变',
      list: [{
        childid: '3.1',
        childname: '子项，点我改变'
      }]
    }]
  };
  this.computed = {
    now: function now() {
      return +new Date();
    }
  };
  this.methods = {
    plus: function plus() {
      this.mynum++;
    },
    toast: function toast() {
      var promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      });

      promise.then(function (d) {
        console.log('toast done');
      });
    },
    tap: function tap() {
      console.log('do noting from ' + this.$name);
    },
    communicate: function communicate() {
      console.log(this.$name + ' tap');

      this.$invoke('counter2', 'minus', 45, 6);
      this.$invoke('counter1', 'plus', 45, 6);

      this.$broadcast('index-broadcast', 1, 3, 4);
    },
    request: function request() {
      var self = this;
      var i = 10;
      var map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ=='];
      while (i--) {
        _wepy2.default.request({
          url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
          success: function success(d) {
            self.netrst += d.data + '.';
            self.$apply();
          }
        });
      }
    },
    counterEmit: function counterEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(this.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    },
    agreeGetUser: function agreeGetUser(e) {
      var self = this;
      if (e.detail.userInfo) {
        var _self = this;
        _self.userInfo = e.detail.userInfo;
        //http://glass.unimker.com/api/mobileBind
        _wepy2.default.getStorage({ key: 'baseData', complete: function complete(data) {
            if (data.data) {
              debugger;
              _wepy2.default.request({
                url: _self.baseUrl + '/api/mobileBind',
                method: 'POST',
                data: {
                  code: '',
                  code_token: '',
                  user_id: data.data.user_id,
                  login_token: data.data.login_token,
                  mobile: '',
                  nickName: _self.userInfo.nickName,
                  avatarUrl: _self.userInfo.avatarUrl,
                  sex: _self.userInfo.gender

                },
                success: function success(d) {
                  console.log(d);
                  //self.$apply()
                  _wepy2.default.setStorage({ key: 'userInfo', data: _self.userInfo });
                }
              });
            }
          } });

        console.log('授权成功======>', e.detail.userInfo); //登录授权信息
        _self.toast('授权成功');
      } else {
        console.log('授权取消');
        self.toast('您还未授权');
      }
    },
    request1: function request1() {
      var self = this;
      _wepy2.default.login({
        success: function success(res) {
          console.log('获取成功 code======>', res.code);
          console.log('request1');
          _wepy2.default.request({
            url: self.baseUrl + '/api/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function success(d) {
              console.log(d);
              //self.$apply()
            }
          });
        }
      });
      this.toast('request1');
    },
    request2: function request2() {
      _wepy2.default.request({
        url: this.baseUrl + '/api/getUserInfo',

        method: 'POST',
        success: function success(d) {
          //self.$apply()
          console.log(d);
          debugger;
        },
        fail: function fail(err) {
          debugger;
          console.log(err);
        }
      });

      this.toast('request2');
    },
    request3: function request3() {
      console.log('request3');
      this.toast('request3');
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref3;

      var $event = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(T1 , 'pages/t1'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInQxLmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJtb2R1bGVBIiwiVDEiLCJudW0iLCJzdGF0ZSIsImNvdW50ZXIiLCJhc3luY051bSIsInN1bU51bSIsInRpdGxlIiwiaWNvbiIsImNiIiwiJGludm9rZSIsImltZyIsInRoZW4iLCJkIiwid2VweSIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFzZVVybCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwiUGFuZWwiLCJjb3VudGVyMSIsIkNvdW50ZXIiLCJjb3VudGVyMiIsImxpc3QiLCJMaXN0IiwiZ3JvdXAiLCJHcm91cCIsInRvYXN0IiwiVG9hc3QiLCJtaXhpbnMiLCJ0ZXN0TWl4aW4iLCJkYXRhIiwibXludW0iLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwibm9ybWFsVGl0bGUiLCJzZXRUaW1lb3V0VGl0bGUiLCJjb3VudCIsIm5ldHJzdCIsImdyb3VwTGlzdCIsImlkIiwibmFtZSIsImNoaWxkaWQiLCJjaGlsZG5hbWUiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwicGx1cyIsInByb21pc2UiLCJ0YXAiLCIkbmFtZSIsImNvbW11bmljYXRlIiwiJGJyb2FkY2FzdCIsInJlcXVlc3QiLCJzZWxmIiwiaSIsIm1hcCIsInVybCIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJjb3VudGVyRW1pdCIsIiRldmVudCIsImxlbmd0aCIsInNvdXJjZSIsImFncmVlR2V0VXNlciIsImUiLCJkZXRhaWwiLCJnZXRTdG9yYWdlIiwia2V5IiwiY29tcGxldGUiLCJtZXRob2QiLCJjb2RlIiwiY29kZV90b2tlbiIsInVzZXJfaWQiLCJsb2dpbl90b2tlbiIsIm1vYmlsZSIsImF2YXRhclVybCIsInNleCIsImdlbmRlciIsInNldFN0b3JhZ2UiLCJyZXF1ZXN0MSIsImxvZ2luIiwicmVzIiwicmVxdWVzdDIiLCJmYWlsIiwi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WUF6R1Esc0JBeUdHO0FBQ1QzRSxxQkFBSzZDLE9BQUwsQ0FBYTtBQUNYSSxhQUFLLEtBQUs3QyxPQUFMLEdBQWUsa0JBRFQ7O0FBR1gwRCxnQkFBUSxNQUhHO0FBSVhaLGlCQUFTLGlCQUFVbkQsQ0FBVixFQUFhO0FBQ3BCO0FBQ0FmLGtCQUFRQyxHQUFSLENBQVljLENBQVo7QUFDQTtBQUNELFNBUlU7QUFTWDZFLGNBQU0sY0FBVUMsR0FBVixFQUFlO0FBQ25CO0FBQ0E3RixrQkFBUUMsR0FBUixDQUFZNEYsR0FBWjtBQUNEO0FBWlUsT0FBYjs7QUFlQSxXQUFLM0QsS0FBTCxDQUFXLFVBQVg7QUFDRCxLQTFITztBQTJIUjRELFlBM0hRLHNCQTJIRztBQUNUOUYsY0FBUUMsR0FBUixDQUFZLFVBQVo7QUFDQSxXQUFLaUMsS0FBTCxDQUFXLFVBQVg7QUFDRDtBQTlITyxHO09BaUlWNkQsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSTFCLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBdEUsY0FBUUMsR0FBUixDQUFlLE9BQUt5RCxLQUFwQixpQkFBcUNXLE9BQU9yQixJQUE1QyxjQUF5RHFCLE9BQU9FLE1BQVAsQ0FBY2IsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkExTlV2RCxFIiwiZmlsZSI6InQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB7Y29ubmVjdH0gZnJvbSAnd2VweS1yZWR1eCdcbiAgaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgQ291bnRlciBmcm9tICdjb3VudGVyJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdCcgLy8gYWxpYXNGaWVsZHMgZXhhbXBsZVxuICBpbXBvcnQgbW9kdWxlQSBmcm9tICdtb2R1bGUtYScgLy8gYWxpYXNGaWVsZHMgaWdub3JlIG1vZHVsZSBleGFtcGxlXG4gIGltcG9ydCBHcm91cCBmcm9tICcuLi9jb21wb25lbnRzL2dyb3VwJ1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG5cblxuICBjb25zb2xlLmxvZygnbW9kdWxlQSBpZ25vcmVkOiAnLCBtb2R1bGVBKSAvLyA9PiBtb2R1bGVBIGlnbm9yZWQ6IHt9XG5cbiAgQGNvbm5lY3Qoe1xuICAgIG51bShzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ZXIubnVtXG4gICAgfSxcbiAgICBhc3luY051bShzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ZXIuYXN5bmNOdW1cbiAgICB9LFxuICAgIHN1bU51bShzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ZXIubnVtICsgc3RhdGUuY291bnRlci5hc3luY051bVxuICAgIH1cbiAgfSlcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUMSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXG4gICAgfVxuICAgIGJhc2VVcmwgPSAnaHR0cDovL3h4bC51bmlta2VyLmNvbSdcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY291bnRlcjFcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJjb3VudGVyMlwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcIm15bnVtXCJ9LFwiZ3JvdXBcIjp7XCJ2LWJpbmQ6Z3JvdXBsaXN0Lm9uY2VcIjpcIml0ZW1cIixcInYtYmluZDppbmRleGEub25jZVwiOlwiaW5kZXhcIn19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlcjFcIjp7XCJ2LW9uOmluZGV4LWVtaXRcIjpcImNvdW50ZXJFbWl0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBwYW5lbDogUGFuZWwsXG4gICAgICBjb3VudGVyMTogQ291bnRlcixcbiAgICAgIGNvdW50ZXIyOiBDb3VudGVyLFxuICAgICAgbGlzdDogTGlzdCxcbiAgICAgIGdyb3VwOiBHcm91cCxcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgbXludW06IDIwLFxuICAgICAgdXNlckluZm86IHtcbiAgICAgICAgbmlja05hbWU6ICfliqDovb3kuK0uLi4nXG4gICAgICB9LFxuICAgICAgbm9ybWFsVGl0bGU6ICfljp/lp4vmoIfpopgnLFxuICAgICAgc2V0VGltZW91dFRpdGxlOiAn5qCH6aKY5LiJ56eS5ZCO5Lya6KKr5L+u5pS5JyxcbiAgICAgIGNvdW50OiAwLFxuICAgICAgbmV0cnN0OiAnJyxcbiAgICAgIGdyb3VwTGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgbmFtZTogJ+eCueWHu+aUueWPmCcsXG4gICAgICAgICAgbGlzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMS4xJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMS4yJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMS4zJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIG5hbWU6ICfngrnlh7vmlLnlj5gnLFxuICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzIuMScsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzIuMicsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzIuMycsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogMyxcbiAgICAgICAgICBuYW1lOiAn54K55Ye75pS55Y+YJyxcbiAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICczLjEnLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBub3coKSB7XG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRvYXN0KHRpdGxlLCBpY29uLCBjYikge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIGltZzogaWNvbiB8fCAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tpaW5sYW0vd2V0b2FzdC9tYXN0ZXIvaW1hZ2VzL3N0YXIucG5nJ1xuICAgICAgfSkudGhlbigoZCkgPT4ge1xuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbHVzKCkge1xuICAgICAgICB0aGlzLm15bnVtKytcbiAgICAgIH0sXG4gICAgICB0b2FzdCgpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgdGl0bGU6ICfoh6rlrprkuYnmoIfpopgnLFxuICAgICAgICAgIGltZzogJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9raWlubGFtL3dldG9hc3QvbWFzdGVyL2ltYWdlcy9zdGFyLnBuZydcbiAgICAgICAgfSlcblxuICAgICAgICBwcm9taXNlLnRoZW4oKGQpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndG9hc3QgZG9uZScpXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdGFwKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZG8gbm90aW5nIGZyb20gJyArIHRoaXMuJG5hbWUpXG4gICAgICB9LFxuICAgICAgY29tbXVuaWNhdGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXG5cbiAgICAgICAgdGhpcy4kaW52b2tlKCdjb3VudGVyMicsICdtaW51cycsIDQ1LCA2KVxuICAgICAgICB0aGlzLiRpbnZva2UoJ2NvdW50ZXIxJywgJ3BsdXMnLCA0NSwgNilcblxuICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ2luZGV4LWJyb2FkY2FzdCcsIDEsIDMsIDQpXG4gICAgICB9LFxuICAgICAgcmVxdWVzdCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBpID0gMTBcbiAgICAgICAgbGV0IG1hcCA9IFsnTUE9PScsICdNUW89JywgJ01nPT0nLCAnTXc9PScsICdOQT09JywgJ05RPT0nLCAnTmc9PScsICdOdz09JywgJ09BPT0nLCAnT1E9PSddXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cubWFkY29kZXIuY24vdGVzdHMvc2xlZXAucGhwP3RpbWU9MSZ0PWNzcyZjPScgKyBtYXBbaV0gKyAnJmk9JyArIGksXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICBzZWxmLm5ldHJzdCArPSBkLmRhdGEgKyAnLidcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb3VudGVyRW1pdCguLi5hcmdzKSB7XG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS4kbmFtZX1gKVxuICAgICAgfSxcbiAgICAgIGFncmVlR2V0VXNlcihlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBpZiAoZS5kZXRhaWwudXNlckluZm8pIHtcbiAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgICAvL2h0dHA6Ly9nbGFzcy51bmlta2VyLmNvbS9hcGkvbW9iaWxlQmluZFxuICAgICAgICAgIHdlcHkuZ2V0U3RvcmFnZSh7a2V5OidiYXNlRGF0YScsY29tcGxldGU6ZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEuZGF0YSl7XG4gICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBzZWxmLmJhc2VVcmwgKyAnL2FwaS9tb2JpbGVCaW5kJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjb2RlOiAnJyxcbiAgICAgICAgICAgICAgICAgIGNvZGVfdG9rZW46JycsXG4gICAgICAgICAgICAgICAgICB1c2VyX2lkOmRhdGEuZGF0YS51c2VyX2lkLFxuICAgICAgICAgICAgICAgICAgbG9naW5fdG9rZW46ZGF0YS5kYXRhLmxvZ2luX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgbW9iaWxlOicnLFxuICAgICAgICAgICAgICAgICAgbmlja05hbWU6c2VsZi51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgIGF2YXRhclVybDpzZWxmLnVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgICAgICAgIHNleDpzZWxmLnVzZXJJbmZvLmdlbmRlclxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICAgICAgICAvL3NlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBzZWxmLnVzZXJJbmZvfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX0pXG5cblxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aOiOadg+aIkOWKnz09PT09PT4nLCBlLmRldGFpbC51c2VySW5mbyk7IC8v55m75b2V5o6I5p2D5L+h5oGvXG4gICAgICAgICAgc2VsZi50b2FzdCgn5o6I5p2D5oiQ5YqfJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn5o6I5p2D5Y+W5raIJyk7XG4gICAgICAgICAgc2VsZi50b2FzdCgn5oKo6L+Y5pyq5o6I5p2DJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVlc3QxKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgd2VweS5sb2dpbih7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaIkOWKnyBjb2RlPT09PT09PicsIHJlcy5jb2RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0MScpO1xuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiBzZWxmLmJhc2VVcmwgKyAnL2FwaS9sb2dpbicsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgICAgICAvL3NlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudG9hc3QoJ3JlcXVlc3QxJylcbiAgICAgIH0sXG4gICAgICByZXF1ZXN0MigpIHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IHRoaXMuYmFzZVVybCArICcvYXBpL2dldFVzZXJJbmZvJyxcblxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAvL3NlbGYuJGFwcGx5KClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnRvYXN0KCdyZXF1ZXN0MicpXG4gICAgICB9LFxuICAgICAgcmVxdWVzdDMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0MycpO1xuICAgICAgICB0aGlzLnRvYXN0KCdyZXF1ZXN0MycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG5cblxuICAgIH1cbiAgfVxuIl19