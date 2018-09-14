'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _service = require('./../mixins/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '眼镜小程序'
        }, _this.mixins = [_test2.default], _this.data = {
            swipeList: [], //轮播列表
            currentIndex: 0,
            flag: true, //弹层开关
            inspect: [], //孩子检查历史列表
            isLoad: true, //第一次去掉onShow中多次获取childrenList
            page: 1,
            total: 11
        }, _this.computed = {}, _this.methods = {
            show: function show() {
                this.flag = !this.data.flag;
                this.$apply();
            },
            hide: function hide(e) {
                var self = this;
                var id = e.currentTarget.dataset.id;
                var nickname = e.currentTarget.dataset.nickname;
                if (id != this.data.defaultChildId) {
                    this.defaultChildId = id;
                    this.defaultChildName = nickname;
                    this.$apply();
                    _wepy2.default.setStorage({ key: 'defaultChild', data: { id: id, nickname: nickname } });
                    self.scrollBottom(); //获取视力检查数据
                }

                this.flag = true;
                this.$apply();
            },
            goAddChildren: function goAddChildren() {
                this.flag = true;
                this.$apply();
                _wepy2.default.navigateTo({ url: 'addChildren' });
            },
            goStoreDetail: function goStoreDetail(e) {
                console.log(e);
                _wepy2.default.navigateTo({ url: 'storeDetail?id=' + e.currentTarget.id });
            },
            govVision: function govVision(e) {
                _wepy2.default.navigateTo({ url: 'optometry?id=' + e.currentTarget.dataset.logid });
            },
            changeStore: function changeStore(e) {
                console.log(e);
                this.storeId = this.data.swipeList[e.detail.current].id;
                this.$apply();
                _wepy2.default.setStorage({ key: 'storeId', data: this.data.storeId }); //更新storeId
                this.scrollBottom(); //获取视力检查数据
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    } //全局变量

    _createClass(Index, [{
        key: 'scrollBottom',
        value: function scrollBottom() {
            if (this.total < this.data.page * 10) {
                return;
            }
            this.page = this.data.page + 1;
            this.$apply();
            this.eyesTested(this.page);
        }
    }, {
        key: 'scrollTop',
        value: function scrollTop() {
            this.page = 1;
            this.total = 11;
            this.inspect = [];
            this.$apply();
            this.eyesTested(this.page);
        }
    }, {
        key: 'relationChild',
        value: function relationChild() {
            var self = this;
            (0, _service2.default)('getChildrenList').then(function (res) {
                if (res.data.length) {
                    self.childrenList = res.data;
                    if (!self.data.defaultChildId) {
                        self.defaultChildName = res.data[0].nickname;
                        self.defaultChildId = res.data[0].id;
                        self.$apply();
                        _wepy2.default.setStorage({ key: 'defaultChild', data: { id: res.data[0].id, nickname: res.data[0].nickname } });
                    }
                    _wepy2.default.setStorage({ key: 'childrenList', data: res.data });
                    self.eyesTested(); //获取视力检查数据
                    self.getStoreList(); //获取门店列表
                } else {
                        //未关联任何孩子
                        // wepy.navigateTo({url:'addChildren'})
                    }
            }).catch(function (err) {
                //console.log(err);
            });
        }
    }, {
        key: 'translateArr',
        value: function translateArr(arr) {
            var returnArr = [];
            var yearList = [];
            arr.forEach(function (item) {
                var year = item.check_time.split('-')[0];
                item.year = year;
                item.mon = item.check_time.split('-')[1];
                item.day = item.check_time.split('-')[2];
                var index = yearList.findIndex(function (i) {
                    return i == year;
                });
                if (index > -1) {
                    returnArr[index].push(item);
                } else {
                    yearList.push(year);
                    returnArr.push([item]);
                }
            });
            return returnArr;
        }
    }, {
        key: 'eyesTested',
        value: function eyesTested(page) {
            var self = this;
            var sendData = { id: this.data.defaultChildId, store_id: self.storeId };
            if (page) {
                sendData.page = page;
            }
            if (this.data.defaultChildId) {
                (0, _service2.default)('getVisionStats', sendData).then(function (res) {
                    self.inspect = self.inspect.concat(self.translateArr(res.data.rows));
                    self.total = res.data.total;
                    self.$apply();
                    console.log(self.inspect);
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: 'login',
        value: function login(code) {
            var self = this;
            _wepy2.default.request({
                url: 'http://glass.unimker.com/api/login',
                data: {
                    code: code,
                    storeId: this.data.storeId
                },
                method: 'POST',
                success: function success(d) {
                    if (d.statusCode == 200) {
                        var temp = { user_id: d.data.data.user_id, login_token: d.data.data.login_token };

                        var data = d.data.data;
                        console.log(data);
                        if (data.avatarurl) {
                            var userInfo = {
                                avatarUrl: self.baseUrl + data.avatarurl,
                                nickName: data.nickname,
                                mobile: data.mobile,
                                birthday: data.birthday
                            };
                            _wepy2.default.setStorage({ key: 'userInfo', data: userInfo, success: function success() {} });
                        }

                        _wepy2.default.setStorage({ key: 'baseData', data: temp, success: function success() {
                                //self.relationChild() //关联孩子
                            } });
                    }
                },
                fail: function fail(err) {
                    wx.showToast({ title: '登录失败', icon: 'none' });
                    console.log(err);
                }
            });
        }
    }, {
        key: 'getStoreList',
        value: function getStoreList() {
            var self = this;
            (0, _service2.default)('getStoreList').then(function (res) {

                if (res.code == 1) {
                    self.swipeList = res.data;
                    self.currentIndex = res.data.findIndex(function (item) {
                        return item.id == self.storeId - 0;
                    });
                    self.$apply();
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'auth',
        value: function auth() {
            var self = this;
            _wepy2.default.login({
                success: function success(res) {
                    console.log('获取成功 code======>', res.code);
                    _wepy2.default.setStorage({ key: 'isAuth', data: true, success: function success() {
                            //self.relationChild() //关联孩子
                        } });

                    self.login(res.code);
                },
                fail: function fail() {
                    wx.showToast({ title: '授权失败', icon: 'none' });
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(option) {

            console.log('index load');
            var self = this;
            //wepy.showToast({title: 'storeId是 '+option.scene})
            wx.checkSession({
                success: function success(res) {
                    var temp = wx.getStorageSync('isAuth');
                    console.log('temp=====> ' + temp);
                    wx.showToast({ title: temp, icon: 'none' });
                    if (!temp) {
                        self.auth();
                    }
                    //获取列表
                    wx.getUserInfo({
                        success: function success(res) {
                            //如果用户点击过授权，可以直接获取到信息
                            console.log(res.userInfo);
                        }
                    });
                    self.relationChild();
                },
                fail: function fail(res) {

                    console.log("需要重新登录");
                    self.auth();
                }
            });

            if (option.scene) {
                this.storeId = option.scene;
                _wepy2.default.setStorage({ key: 'storeId', data: option.scene }); //进来设置微信的storeId
            } else {
                _wepy2.default.setStorage({ key: 'storeId', data: '1' }); //进来设置微信的storeId
            }
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJzd2lwZUxpc3QiLCJjdXJyZW50SW5kZXgiLCJmbGFnIiwiaW5zcGVjdCIsImlzTG9hZCIsInBhZ2UiLCJ0b3RhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNob3ciLCIkYXBwbHkiLCJoaWRlIiwiZSIsInNlbGYiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwibmlja25hbWUiLCJkZWZhdWx0Q2hpbGRJZCIsImRlZmF1bHRDaGlsZE5hbWUiLCJ3ZXB5Iiwic2V0U3RvcmFnZSIsImtleSIsInNjcm9sbEJvdHRvbSIsImdvQWRkQ2hpbGRyZW4iLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29TdG9yZURldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJnb3ZWaXNpb24iLCJsb2dpZCIsImNoYW5nZVN0b3JlIiwic3RvcmVJZCIsImRldGFpbCIsImN1cnJlbnQiLCJleWVzVGVzdGVkIiwidGhlbiIsInJlcyIsImxlbmd0aCIsImNoaWxkcmVuTGlzdCIsImdldFN0b3JlTGlzdCIsImNhdGNoIiwiYXJyIiwicmV0dXJuQXJyIiwieWVhckxpc3QiLCJmb3JFYWNoIiwieWVhciIsIml0ZW0iLCJjaGVja190aW1lIiwic3BsaXQiLCJtb24iLCJkYXkiLCJpbmRleCIsImZpbmRJbmRleCIsImkiLCJwdXNoIiwic2VuZERhdGEiLCJzdG9yZV9pZCIsImNvbmNhdCIsInRyYW5zbGF0ZUFyciIsInJvd3MiLCJlcnIiLCJjb2RlIiwicmVxdWVzdCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJkIiwic3RhdHVzQ29kZSIsInRlbXAiLCJ1c2VyX2lkIiwibG9naW5fdG9rZW4iLCJhdmF0YXJ1cmwiLCJ1c2VySW5mbyIsImF2YXRhclVybCIsImJhc2VVcmwiLCJuaWNrTmFtZSIsIm1vYmlsZSIsImJpcnRoZGF5IiwiZmFpbCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibG9naW4iLCJvcHRpb24iLCJjaGVja1Nlc3Npb24iLCJnZXRTdG9yYWdlU3luYyIsImF1dGgiLCJnZXRVc2VySW5mbyIsInJlbGF0aW9uQ2hpbGQiLCJzY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFFVEMsSSxHQUFPO0FBQ0hDLHVCQUFVLEVBRFAsRUFDVTtBQUNiQywwQkFBYSxDQUZWO0FBR0hDLGtCQUFLLElBSEYsRUFHTztBQUNWQyxxQkFBUSxFQUpMLEVBSVE7QUFDWEMsb0JBQU8sSUFMSixFQUtTO0FBQ1pDLGtCQUFLLENBTkY7QUFPSEMsbUJBQU07QUFQSCxTLFFBVVBDLFEsR0FBVyxFLFFBS1hDLE8sR0FBVTtBQUNOQyxrQkFBSyxnQkFBWTtBQUNiLHFCQUFLUCxJQUFMLEdBQVUsQ0FBQyxLQUFLSCxJQUFMLENBQVVHLElBQXJCO0FBQ0EscUJBQUtRLE1BQUw7QUFDSCxhQUpLO0FBS05DLGtCQUFLLGNBQVVDLENBQVYsRUFBYTtBQUNkLG9CQUFNQyxPQUFPLElBQWI7QUFDQSxvQkFBSUMsS0FBS0YsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEVBQWpDO0FBQ0Esb0JBQUlHLFdBQVNMLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxRQUFyQztBQUNBLG9CQUFHSCxNQUFJLEtBQUtmLElBQUwsQ0FBVW1CLGNBQWpCLEVBQWdDO0FBQzVCLHlCQUFLQSxjQUFMLEdBQW9CSixFQUFwQjtBQUNBLHlCQUFLSyxnQkFBTCxHQUFzQkYsUUFBdEI7QUFDQSx5QkFBS1AsTUFBTDtBQUNBVSxtQ0FBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBc0J2QixNQUFLLEVBQUNlLElBQUlBLEVBQUws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ekMsR0FBVCxFQUFhOztBQUVmViw0QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQWhCLHlCQUFLMkUsSUFBTDtBQUNIO0FBdEJXLGFBQWhCOztBQXlCQSxnQkFBR0gsT0FBT00sS0FBVixFQUFnQjtBQUNaLHFCQUFLMUQsT0FBTCxHQUFhb0QsT0FBT00sS0FBcEI7QUFDQXZFLCtCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssU0FBTixFQUFpQnZCLE1BQU1zRixPQUFPTSxLQUE5QixFQUFoQixFQUZZLENBRTBDO0FBQ3pELGFBSEQsTUFHTTtBQUNGdkUsK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxTQUFOLEVBQWdCdkIsTUFBSyxHQUFyQixFQUFoQixFQURFLENBQ3lDO0FBQzlDO0FBRUo7Ozs7RUE1UDhCcUIsZUFBS2YsSTs7a0JBQW5CWCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICAgIGltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uL21peGlucy9zZXJ2aWNlJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55y86ZWc5bCP56iL5bqPJ1xuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl0vL+WFqOWxgOWPmOmHj1xuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBzd2lwZUxpc3Q6W10sLy/ova7mkq3liJfooahcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleDowLFxuICAgICAgICAgICAgZmxhZzp0cnVlLC8v5by55bGC5byA5YWzXG4gICAgICAgICAgICBpbnNwZWN0OltdLC8v5a2p5a2Q5qOA5p+l5Y6G5Y+y5YiX6KGoXG4gICAgICAgICAgICBpc0xvYWQ6dHJ1ZSwvL+esrOS4gOasoeWOu+aOiW9uU2hvd+S4reWkmuasoeiOt+WPlmNoaWxkcmVuTGlzdFxuICAgICAgICAgICAgcGFnZToxLFxuICAgICAgICAgICAgdG90YWw6MTEsXG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlZCA9IHtcblxuICAgICAgICB9XG5cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgc2hvdzpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPSF0aGlzLmRhdGEuZmxhZ1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlOmZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgICAgICAgIHZhciBuaWNrbmFtZT1lLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uaWNrbmFtZVxuICAgICAgICAgICAgICAgIGlmKGlkIT10aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDaGlsZElkPWlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoaWxkTmFtZT1uaWNrbmFtZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkJywgZGF0YTp7aWQ6IGlkLG5pY2tuYW1lOm5pY2tuYW1lfX0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsQm90dG9tKCkgLy/ojrflj5bop4blipvmo4Dmn6XmlbDmja5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZsYWc9dHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnb0FkZENoaWxkcmVuOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWc9dHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2FkZENoaWxkcmVuJ30pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ29TdG9yZURldGFpbChlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ3N0b3JlRGV0YWlsP2lkPScrZS5jdXJyZW50VGFyZ2V0LmlkfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnb3ZWaXNpb24oZSl7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdvcHRvbWV0cnk/aWQ9JytlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5sb2dpZH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU3RvcmUoZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZUlkPXRoaXMuZGF0YS5zd2lwZUxpc3RbZS5kZXRhaWwuY3VycmVudF0uaWRcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdzdG9yZUlkJywgZGF0YTogdGhpcy5kYXRhLnN0b3JlSWR9KSAvL+abtOaWsHN0b3JlSWRcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvdHRvbSgpIC8v6I635Y+W6KeG5Yqb5qOA5p+l5pWw5o2uXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsQm90dG9tICgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMudG90YWw8dGhpcy5kYXRhLnBhZ2UqMTApe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYWdlPXRoaXMuZGF0YS5wYWdlKzFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIHRoaXMuZXllc1Rlc3RlZCh0aGlzLnBhZ2UpXG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsVG9wKCl7XG4gICAgICAgICAgICB0aGlzLnBhZ2U9MVxuICAgICAgICAgICAgdGhpcy50b3RhbD0xMVxuICAgICAgICAgICAgdGhpcy5pbnNwZWN0PVtdXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB0aGlzLmV5ZXNUZXN0ZWQodGhpcy5wYWdlKVxuICAgICAgICB9XG4gICAgICAgIHJlbGF0aW9uQ2hpbGQoKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICByZXF1ZXN0VXJsKCdnZXRDaGlsZHJlbkxpc3QnKS50aGVuKHJlcyA9PntcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNoaWxkcmVuTGlzdD1yZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5kYXRhLmRlZmF1bHRDaGlsZElkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVmYXVsdENoaWxkTmFtZSAgPSByZXMuZGF0YVswXS5uaWNrbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWZhdWx0Q2hpbGRJZD1yZXMuZGF0YVswXS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdkZWZhdWx0Q2hpbGQnLCBkYXRhOntpZDogcmVzLmRhdGFbMF0uaWQsbmlja25hbWU6cmVzLmRhdGFbMF0ubmlja25hbWV9fSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2NoaWxkcmVuTGlzdCcsIGRhdGE6cmVzLmRhdGF9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmV5ZXNUZXN0ZWQoKSAvL+iOt+WPluinhuWKm+ajgOafpeaVsOaNrlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFN0b3JlTGlzdCgpIC8v6I635Y+W6Zeo5bqX5YiX6KGoXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+acquWFs+iBlOS7u+S9leWtqeWtkFxuICAgICAgICAgICAgICAgICAgIC8vIHdlcHkubmF2aWdhdGVUbyh7dXJsOidhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT57XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdGVBcnIoYXJyKXtcbiAgICAgICAgICAgIHZhciByZXR1cm5BcnI9W11cbiAgICAgICAgICAgIHZhciB5ZWFyTGlzdD1bXVxuICAgICAgICAgICAgYXJyLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgIGxldCB5ZWFyPSBpdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVswXVxuICAgICAgICAgICAgICAgIGl0ZW0ueWVhcj15ZWFyXG4gICAgICAgICAgICAgICAgaXRlbS5tb249aXRlbS5jaGVja190aW1lLnNwbGl0KCctJylbMV1cbiAgICAgICAgICAgICAgICBpdGVtLmRheT1pdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVsyXVxuICAgICAgICAgICAgICAgIGxldCBpbmRleD15ZWFyTGlzdC5maW5kSW5kZXgoZnVuY3Rpb24oaSl7cmV0dXJuIGkgPT0geWVhcn0pXG4gICAgICAgICAgICAgICAgaWYoaW5kZXg+LTEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnJbaW5kZXhdLnB1c2goaXRlbSlcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJMaXN0LnB1c2goeWVhcilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuQXJyLnB1c2goW2l0ZW1dKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyXG4gICAgICAgIH1cblxuICAgICAgICBleWVzVGVzdGVkKHBhZ2Upe1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHZhciBzZW5kRGF0YT17aWQ6dGhpcy5kYXRhLmRlZmF1bHRDaGlsZElkLHN0b3JlX2lkOnNlbGYuc3RvcmVJZH1cbiAgICAgICAgICAgIGlmKHBhZ2Upe1xuICAgICAgICAgICAgICAgIHNlbmREYXRhLnBhZ2U9cGFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmRlZmF1bHRDaGlsZElkKXtcbiAgICAgICAgICAgICAgICByZXF1ZXN0VXJsKCdnZXRWaXNpb25TdGF0cycsc2VuZERhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zcGVjdD0gIHNlbGYuaW5zcGVjdC5jb25jYXQoc2VsZi50cmFuc2xhdGVBcnIocmVzLmRhdGEucm93cykpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG90YWw9cmVzLmRhdGEudG90YWxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmluc3BlY3QpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2luKGNvZGUpe1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2dsYXNzLnVuaW1rZXIuY29tL2FwaS9sb2dpbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZUlkOiB0aGlzLmRhdGEuc3RvcmVJZFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge3VzZXJfaWQ6IGQuZGF0YS5kYXRhLnVzZXJfaWQsIGxvZ2luX3Rva2VuOiBkLmRhdGEuZGF0YS5sb2dpbl90b2tlbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9ZC5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5hdmF0YXJ1cmwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOnNlbGYuYmFzZVVybCtkYXRhLmF2YXRhcnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6ZGF0YS5uaWNrbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9iaWxlOmRhdGEubW9iaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXJ0aGRheTpkYXRhLmJpcnRoZGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAndXNlckluZm8nLCBkYXRhOiB1c2VySW5mbyxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdiYXNlRGF0YScsIGRhdGE6IHRlbXAsc3VjY2VzczpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnJlbGF0aW9uQ2hpbGQoKSAvL+WFs+iBlOWtqeWtkFxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfnmbvlvZXlpLHotKUnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRTdG9yZUxpc3QoKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPXRoaXNcbiAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldFN0b3JlTGlzdCcpLnRoZW4ocmVzPT57XG5cbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZT09MSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dpcGVMaXN0PXJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEluZGV4PSByZXMuZGF0YS5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09IHNlbGYuc3RvcmVJZC0wXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgYXV0aCgpe1xuICAgICAgICAgICAgY29uc3QgIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmiJDlip8gY29kZT09PT09PT4nLCByZXMuY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnaXNBdXRoJywgZGF0YTogdHJ1ZSxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5yZWxhdGlvbkNoaWxkKCkgLy/lhbPogZTlranlrZBcbiAgICAgICAgICAgICAgICAgICAgfX0pXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbihyZXMuY29kZSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5o6I5p2D5aSx6LSlJyxpY29uOidub25lJ30pXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV4IGxvYWQnKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgLy93ZXB5LnNob3dUb2FzdCh7dGl0bGU6ICdzdG9yZUlk5pivICcrb3B0aW9uLnNjZW5lfSlcbiAgICAgICAgICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB3eC5nZXRTdG9yYWdlU3luYygnaXNBdXRoJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RlbXA9PT09PT4gJyt0ZW1wKTtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogdGVtcCxpY29uOidub25lJ30pXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0ZW1wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0aCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy/ojrflj5bliJfooahcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOeUqOaIt+eCueWHu+i/h+aOiOadg++8jOWPr+S7peebtOaOpeiOt+WPluWIsOS/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51c2VySW5mbylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbGF0aW9uQ2hpbGQoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKXtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumcgOimgemHjeaWsOeZu+W9lVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG9wdGlvbi5zY2VuZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZUlkPW9wdGlvbi5zY2VuZVxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnc3RvcmVJZCcsIGRhdGE6IG9wdGlvbi5zY2VuZX0pIC8v6L+b5p2l6K6+572u5b6u5L+h55qEc3RvcmVJZFxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnc3RvcmVJZCcsZGF0YTonMSd9KSAvL+i/m+adpeiuvue9ruW+ruS/oeeahHN0b3JlSWRcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG4iXX0=