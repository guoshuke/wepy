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

var Index = (_dec = (0, _wepyRedux.connect)({
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
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var baseUrl = 'http://xxl.unimker.com';
      var self = this;
      if (this.$parent.globalData.baseData.user_id) {
        return this.$parent.globalData.baseData.user_id;
      } else {
        _wepy2.default.login({
          success: function success(res) {
            console.log('获取成功 code======>', res.code);

            _wepy2.default.request({
              url: 'http://glass.unimker.com/api/login',
              data: {
                code: res.code
              },
              //            header: {
              //              'Content-Type': 'application/x-www-form-urlencoded'
              //            },
              method: 'POST',
              success: function success(d) {
                if (d.statusCode == 200) {
                  console.log('openId Data=========>' + d);
                  var temp = { user_id: d.data.data.user_id, login_token: d.data.data.login_token };
                  _wepy2.default.setStorage({ key: 'baseData', data: temp });

                  self.$parent.globalData.baseData.user_id = d.data.data.user_id;
                  self.$parent.globalData.baseData.login_token = d.data.data.login_token;
                  self.$apply();
                }
              },
              fail: function fail(err) {
                console.log(err);
              }
            });

            //            wepy.request({
            //              url: baseUrl+'/api/login',
            //              data: {
            //                code: res.code
            //              },
            ////            header: {
            ////              'Content-Type': 'application/x-www-form-urlencoded'
            ////            },
            //              method: 'POST',
            //              success: function (d) {
            //                if(d.statusCode==200){
            //                  var temp={user_id:d.data.data.user_id,login_token:d.data.data.login_token}
            //                  wepy.setStorage({key: 'baseData', data: temp})
            //                  console.log('openId Data=========>'+d);
            //                  self.$apply()
            //                }
            //              },
            //              fail: function (err) {
            //                console.log(err);
            //              }
            //            })
          }
        });
      }

      //      this.$parent.getUserInfo(function (userInfo) {
      //        if (userInfo) {
      //          console.log(userInfo);
      //          self.userInfo = userInfo
      //        }
      //        self.normalTitle = '标题已被修改'
      //
      //        self.setTimeoutTitle = '标题三秒后会被修改'
      //        setTimeout(() => {
      //          self.setTimeoutTitle = '到三秒了'
      //          self.$apply()
      //        }, 3000)
      //
      //        self.$apply()
      //      })
    }
  }]);

  return Index;
}(_wepy2.default.page)) || _class);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {
    navigationBarTitleText: '眼镜小程序'
  };
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
    user: { url: '', name: '' },
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
      console.log(this.user);
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
      if (e.detail.userInfo) {
        debugger;
        var self = this;
        self.userInfo = e.detail.userInfo;

        _wepy2.default.setStorage({ key: 'userInfo', data: self.userInfo });

        self.$apply();
      } else {
        this.toast('您还未授权');
      }
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJtb2R1bGVBIiwiSW5kZXgiLCJudW0iLCJzdGF0ZSIsImNvdW50ZXIiLCJhc3luY051bSIsInN1bU51bSIsImJhc2VVcmwiLCJzZWxmIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJiYXNlRGF0YSIsInVzZXJfaWQiLCJ3ZXB5IiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwibWV0aG9kIiwiZCIsInN0YXR1c0NvZGUiLCJ0ZW1wIiwibG9naW5fdG9rZW4iLCJzZXRTdG9yYWdlIiwia2V5IiwiJGFwcGx5IiwiZmFpbCIsImVyciIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFuZWwiLCJQYW5lbCIsImNvdW50ZXIxIiwiQ291bnRlciIsImNvdW50ZXIyIiwibGlzdCIsIkxpc3QiLCJncm91cCIsIkdyb3VwIiwidG9hc3QiLCJUb2FzdCIsIm1peGlucyIsInRlc3RNaXhpbiIsIm15bnVtIiwidXNlckluZm8iLCJuaWNrTmFtZSIsIm5vcm1hbFRpdGxlIiwic2V0VGltZW91dFRpdGxlIiwiY291bnQiLCJuZXRyc3QiLCJ1c2VyIiwibmFtZSIsImdyb3VwTGlzdCIsImlkIiwiY2hpbGRpZCIsImNoaWxkbmFtZSIsImNvbXB1dGVkIiwibm93IiwiRGF0ZSIsIm1ldGhvZHMiLCJwbHVzIiwicHJvbWlzZSIsIiRpbnZva2UiLCJ0aXRsZSIsImltZyIsInRoZW4iLCJ0YXAiLCIkbmFtZSIsImNvbW11bmljYXRlIiwiJGJyb2FkY2FzdCIsImkiLCJtYXAiLCJjb3VudGVyRW1pdCIsIiRldmVudCIsImxlbmd0aCIsInNvdXJjZSIsImFncmVlR2V0VXNlciIsImUiLCJkZXRhaWwiLCJldmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQkFH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QUFlLE9BQUs0RSxLQUFwQixpQkFBcUNNLE9BQU90QixJQUE1QyxjQUF5RHNCLE9BQU9FLE1BQVAsQ0FBY1IsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkEvSVUxRSxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB7Y29ubmVjdH0gZnJvbSAnd2VweS1yZWR1eCdcbiAgaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgQ291bnRlciBmcm9tICdjb3VudGVyJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdCcgLy8gYWxpYXNGaWVsZHMgZXhhbXBsZVxuICBpbXBvcnQgbW9kdWxlQSBmcm9tICdtb2R1bGUtYScgLy8gYWxpYXNGaWVsZHMgaWdub3JlIG1vZHVsZSBleGFtcGxlXG4gIGltcG9ydCBHcm91cCBmcm9tICcuLi9jb21wb25lbnRzL2dyb3VwJ1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG5cbiAgY29uc29sZS5sb2coJ21vZHVsZUEgaWdub3JlZDogJywgbW9kdWxlQSkgLy8gPT4gbW9kdWxlQSBpZ25vcmVkOiB7fVxuXG4gIEBjb25uZWN0KHtcbiAgICBudW0oc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudGVyLm51bVxuICAgIH0sXG4gICAgYXN5bmNOdW0oc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudGVyLmFzeW5jTnVtXG4gICAgfSxcbiAgICBzdW1OdW0oc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudGVyLm51bSArIHN0YXRlLmNvdW50ZXIuYXN5bmNOdW1cbiAgICB9XG4gIH0pXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnnLzplZzlsI/nqIvluo8nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVyMVwiOntcInhtbG5zOnYtb25cIjpcIlwifSxcImNvdW50ZXIyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpudW0uc3luY1wiOlwibXludW1cIn0sXCJncm91cFwiOntcInYtYmluZDpncm91cGxpc3Qub25jZVwiOlwiaXRlbVwiLFwidi1iaW5kOmluZGV4YS5vbmNlXCI6XCJpbmRleFwifX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVyMVwiOntcInYtb246aW5kZXgtZW1pdFwiOlwiY291bnRlckVtaXRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHBhbmVsOiBQYW5lbCxcbiAgICAgIGNvdW50ZXIxOiBDb3VudGVyLFxuICAgICAgY291bnRlcjI6IENvdW50ZXIsXG4gICAgICBsaXN0OiBMaXN0LFxuICAgICAgZ3JvdXA6IEdyb3VwLFxuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICBteW51bTogMjAsXG4gICAgICB1c2VySW5mbzoge1xuICAgICAgICBuaWNrTmFtZTogJ+WKoOi9veS4rS4uLidcbiAgICAgIH0sXG4gICAgICBub3JtYWxUaXRsZTogJ+WOn+Wni+agh+mimCcsXG4gICAgICBzZXRUaW1lb3V0VGl0bGU6ICfmoIfpopjkuInnp5LlkI7kvJrooqvkv67mlLknLFxuICAgICAgY291bnQ6IDAsXG4gICAgICBuZXRyc3Q6ICcnLFxuICAgICAgdXNlcjp7dXJsOicnLG5hbWU6Jyd9LFxuICAgICAgZ3JvdXBMaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBuYW1lOiAn54K55Ye75pS55Y+YJyxcbiAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcxLjEnLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcxLjInLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcxLjMnLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgbmFtZTogJ+eCueWHu+aUueWPmCcsXG4gICAgICAgICAgbGlzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMi4xJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMi4yJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMi4zJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgIG5hbWU6ICfngrnlh7vmlLnlj5gnLFxuICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzMuMScsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXMoKSB7XG4gICAgICAgIHRoaXMubXludW0rK1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXIpO1xuICAgICAgfSxcbiAgICAgIHRvYXN0KCkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICB0aXRsZTogJ+iHquWumuS5ieagh+mimCcsXG4gICAgICAgICAgaW1nOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2tpaW5sYW0vd2V0b2FzdC9tYXN0ZXIvaW1hZ2VzL3N0YXIucG5nJ1xuICAgICAgICB9KVxuXG4gICAgICAgIHByb21pc2UudGhlbigoZCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2FzdCBkb25lJylcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0YXAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkbyBub3RpbmcgZnJvbSAnICsgdGhpcy4kbmFtZSlcbiAgICAgIH0sXG4gICAgICBjb21tdW5pY2F0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgdGFwJylcblxuICAgICAgICB0aGlzLiRpbnZva2UoJ2NvdW50ZXIyJywgJ21pbnVzJywgNDUsIDYpXG4gICAgICAgIHRoaXMuJGludm9rZSgnY291bnRlcjEnLCAncGx1cycsIDQ1LCA2KVxuXG4gICAgICAgIHRoaXMuJGJyb2FkY2FzdCgnaW5kZXgtYnJvYWRjYXN0JywgMSwgMywgNClcbiAgICAgIH0sXG4gICAgICByZXF1ZXN0KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgbGV0IGkgPSAxMFxuICAgICAgICBsZXQgbWFwID0gWydNQT09JywgJ01Rbz0nLCAnTWc9PScsICdNdz09JywgJ05BPT0nLCAnTlE9PScsICdOZz09JywgJ053PT0nLCAnT0E9PScsICdPUT09J11cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5tYWRjb2Rlci5jbi90ZXN0cy9zbGVlcC5waHA/dGltZT0xJnQ9Y3NzJmM9JyArIG1hcFtpXSArICcmaT0nICsgaSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgIHNlbGYubmV0cnN0ICs9IGQuZGF0YSArICcuJ1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvdW50ZXJFbWl0KC4uLmFyZ3MpIHtcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgICB9LFxuICAgICAgYWdyZWVHZXRVc2VyKGUpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsLnVzZXJJbmZvKSB7XG4gICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cblxuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiBzZWxmLnVzZXJJbmZvfSlcblxuICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMudG9hc3QoJ+aCqOi/mOacquaOiOadgycpXG4gICAgICAgIH1cblxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgYmFzZVVybCA9ICdodHRwOi8veHhsLnVuaW1rZXIuY29tJ1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBpZih0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5iYXNlRGF0YS51c2VyX2lkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmJhc2VEYXRhLnVzZXJfaWRcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgd2VweS5sb2dpbih7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaIkOWKnyBjb2RlPT09PT09PicscmVzLmNvZGUpO1xuXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vZ2xhc3MudW5pbWtlci5jb20vYXBpL2xvZ2luJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlXG4gICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgIGhlYWRlcjoge1xuLy8gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuLy8gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBpZihkLnN0YXR1c0NvZGU9PTIwMCl7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbklkIERhdGE9PT09PT09PT0+JytkKTtcbiAgICAgICAgICAgICAgICAgIHZhciB0ZW1wPXt1c2VyX2lkOmQuZGF0YS5kYXRhLnVzZXJfaWQsbG9naW5fdG9rZW46ZC5kYXRhLmRhdGEubG9naW5fdG9rZW59XG4gICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2Jhc2VEYXRhJywgZGF0YTogdGVtcH0pXG5cbiAgICAgICAgICAgICAgICAgIHNlbGYuJHBhcmVudC5nbG9iYWxEYXRhLmJhc2VEYXRhLnVzZXJfaWQ9ZC5kYXRhLmRhdGEudXNlcl9pZFxuICAgICAgICAgICAgICAgICAgc2VsZi4kcGFyZW50Lmdsb2JhbERhdGEuYmFzZURhdGEubG9naW5fdG9rZW49ZC5kYXRhLmRhdGEubG9naW5fdG9rZW5cbiAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4vLyAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4vLyAgICAgICAgICAgICAgdXJsOiBiYXNlVXJsKycvYXBpL2xvZ2luJyxcbi8vICAgICAgICAgICAgICBkYXRhOiB7XG4vLyAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxuLy8gICAgICAgICAgICAgIH0sXG4vLy8vICAgICAgICAgICAgaGVhZGVyOiB7XG4vLy8vICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbi8vLy8gICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkKSB7XG4vLyAgICAgICAgICAgICAgICBpZihkLnN0YXR1c0NvZGU9PTIwMCl7XG4vLyAgICAgICAgICAgICAgICAgIHZhciB0ZW1wPXt1c2VyX2lkOmQuZGF0YS5kYXRhLnVzZXJfaWQsbG9naW5fdG9rZW46ZC5kYXRhLmRhdGEubG9naW5fdG9rZW59XG4vLyAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnYmFzZURhdGEnLCBkYXRhOiB0ZW1wfSlcbi8vICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wZW5JZCBEYXRhPT09PT09PT09PicrZCk7XG4vLyAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuLy8gICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZnVuY3Rpb24gKHVzZXJJbmZvKSB7XG4vLyAgICAgICAgaWYgKHVzZXJJbmZvKSB7XG4vLyAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySW5mbyk7XG4vLyAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm9cbi8vICAgICAgICB9XG4vLyAgICAgICAgc2VsZi5ub3JtYWxUaXRsZSA9ICfmoIfpopjlt7Looqvkv67mlLknXG4vL1xuLy8gICAgICAgIHNlbGYuc2V0VGltZW91dFRpdGxlID0gJ+agh+mimOS4ieenkuWQjuS8muiiq+S/ruaUuSdcbi8vICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgICAgICAgIHNlbGYuc2V0VGltZW91dFRpdGxlID0gJ+WIsOS4ieenkuS6hidcbi8vICAgICAgICAgIHNlbGYuJGFwcGx5KClcbi8vICAgICAgICB9LCAzMDAwKVxuLy9cbi8vICAgICAgICBzZWxmLiRhcHBseSgpXG4vLyAgICAgIH0pXG5cbiAgICB9XG5cbiAgfVxuIl19