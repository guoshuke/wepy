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
                debugger;
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
                    _wepy2.default.navigateTo({ url: 'addChildren' });
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
                                self.relationChild(); //关联孩子
                            } });
                    }
                },
                fail: function fail(err) {
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
        key: 'onLoad',
        value: function onLoad(option) {

            console.log('index load');
            var self = this;
            _wepy2.default.showToast({ title: 'storeId是 ' + option.scene });
            wx.checkSession({
                success: function success(res) {
                    //获取列表
                    self.relationChild();
                },
                fail: function fail(res) {

                    console.log("需要重新登录");
                    _wepy2.default.login({
                        success: function success(res) {
                            console.log('获取成功 code======>', res.code);
                            self.login(res.code);
                        }
                    });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJzd2lwZUxpc3QiLCJjdXJyZW50SW5kZXgiLCJmbGFnIiwiaW5zcGVjdCIsImlzTG9hZCIsInBhZ2UiLCJ0b3RhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNob3ciLCIkYXBwbHkiLCJoaWRlIiwiZSIsInNlbGYiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwibmlja25hbWUiLCJkZWZhdWx0Q2hpbGRJZCIsImRlZmF1bHRDaGlsZE5hbWUiLCJ3ZXB5Iiwic2V0U3RvcmFnZSIsImtleSIsInNjcm9sbEJvdHRvbSIsImdvQWRkQ2hpbGRyZW4iLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29TdG9yZURldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJnb3ZWaXNpb24iLCJsb2dpZCIsImNoYW5nZVN0b3JlIiwic3RvcmVJZCIsImRldGFpbCIsImN1cnJlbnQiLCJleWVzVGVzdGVkIiwidGhlbiIsInJlcyIsImxlbmd0aCIsImNoaWxkcmVuTGlzdCIsImdldFN0b3JlTGlzdCIsImNhdGNoIiwiYXJyIiwicmV0dXJuQXJyIiwieWVhckxpc3QiLCJmb3JFYWNoIiwieWVhciIsIml0ZW0iLCJjaGVja190aW1lIiwic3BsaXQiLCJtb24iLCJkYXkiLCJpbmRleCIsImZpbmRJbmRleCIsImkiLCJwdXNoIiwic2VuZERhdGEiLCJzdG9yZV9pZCIsImNvbmNhdCIsInRyYW5zbGF0ZUFyciIsInJvd3MiLCJlcnIiLCJjb2RlIiwicmVxdWVzdCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJkIiwic3RhdHVzQ29kZSIsInRlbXAiLCJ1c2VyX2lkIiwibG9naW5fdG9rZW4iLCJhdmF0YXJ1cmwiLCJ1c2VySW5mbyIsImF2YXRhclVybCIsImJhc2VVcmwiLCJuaWNrTmFtZSIsIm1vYmlsZSIsImJpcnRoZGF5IiwicmVsYXRpb25DaGlsZCIsImZhaWwiLCJvcHRpb24iLCJzaG93VG9hc3QiLCJ0aXRsZSIsInNjZW5lIiwid3giLCJjaGVja1Nlc3Npb24iLCJsb2dpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFFVEMsSSxHQUFPO0FBQ0hDLHVCQUFVLEVBRFAsRUFDVTtBQUNiQywwQkFBYSxDQUZWO0FBR0hDLGtCQUFLLElBSEYsRUFHTztBQUNWQyxxQkFBUSxFQUpMLEVBSVE7QUFDWEMsb0JBQU8sSUFMSixFQUtTO0FBQ1pDLGtCQUFLLENBTkY7QUFPSEMsbUJBQU07QUFQSCxTLFFBVVBDLFEsR0FBVyxFLFFBS1hDLE8sR0FBVTtBQUNOQyxrQkFBSyxnQkFBWTtBQUNiLHFCQUFLUCxJQUFMLEdBQVUsQ0FBQyxLQUFLSCxJQUFMLENBQVVHLElBQXJCO0FBQ0EscUJBQUtRLE1BQUw7QUFDSCxhQUpLO0FBS05DLGtCQUFLLGNBQVVDLENBQVYsRUFBYTtBQUNkLG9CQUFNQyxPQUFPLElBQWI7QUFDQSxvQkFBSUMsS0FBS0YsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEVBQWpDO0FBQ0Esb0JBQUlHLFdBQVNMLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxRQUFyQztBQUNBLG9CQUFHSCxNQUFJLEtBQUtmLElBQUwsQ0FBVW1CLGNBQWpCLEVBQWdDO0FBQzVCLHlCQUFLQSxjQUFMLEdBQW9CSixFQUFwQjtBQUNBLHlCQUFLSyxnQkFBTCxHQUFzQkYsUUFBdEI7QUFDQSx5QkFBS1AsTUFBTDtBQUNBVSxtQ0FBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGNBQU4sRUFBc0J2QixNQUFLLEVBQUNlLElBQUlBLEVBQUwsRUFBUUcsVUFBU0EsUUFBakIsRUFBM0IsRUFBaEI7QUFDQUoseUJBQUtVLFlB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RU1tQixNLEVBQVE7O0FBRVhyRCxvQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQSxnQkFBSWhCLE9BQU8sSUFBWDtBQUNBTywyQkFBSzhELFNBQUwsQ0FBZSxFQUFDQyxPQUFPLGNBQVlGLE9BQU9HLEtBQTNCLEVBQWY7QUFDQUMsZUFBR0MsWUFBSCxDQUFnQjtBQUNacEIseUJBQVMsaUJBQVM1QixHQUFULEVBQWE7QUFDbEI7QUFDQXpCLHlCQUFLa0UsYUFBTDtBQUNILGlCQUpXO0FBS1pDLHNCQUFNLGNBQVMxQyxHQUFULEVBQWE7O0FBRWZWLDRCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBVCxtQ0FBS21FLEtBQUwsQ0FBVztBQUNQckIsaUNBQVMsaUJBQVU1QixHQUFWLEVBQWU7QUFDcEJWLG9DQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0NTLElBQUl5QixJQUFwQztBQUNBbEQsaUNBQUswRSxLQUFMLENBQVdqRCxJQUFJeUIsSUFBZjtBQUNIO0FBSk0scUJBQVg7QUFNSDtBQWRXLGFBQWhCOztBQWlCQSxnQkFBR2tCLE9BQU9HLEtBQVYsRUFBZ0I7QUFDWixxQkFBS25ELE9BQUwsR0FBYWdELE9BQU9HLEtBQXBCO0FBQ0FoRSwrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLFNBQU4sRUFBaUJ2QixNQUFNa0YsT0FBT0csS0FBOUIsRUFBaEIsRUFGWSxDQUUwQztBQUN6RCxhQUhELE1BR007QUFDRmhFLCtCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssU0FBTixFQUFnQnZCLE1BQUssR0FBckIsRUFBaEIsRUFERSxDQUN5QztBQUM5QztBQUVKOzs7O0VBbE84QnFCLGVBQUtmLEk7O2tCQUFuQlgsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jydcbiAgICAgICAgfVxuXG4gICAgICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dLy/lhajlsYDlj5jph49cblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgc3dpcGVMaXN0OltdLC8v6L2u5pKt5YiX6KGoXG4gICAgICAgICAgICBjdXJyZW50SW5kZXg6MCxcbiAgICAgICAgICAgIGZsYWc6dHJ1ZSwvL+W8ueWxguW8gOWFs1xuICAgICAgICAgICAgaW5zcGVjdDpbXSwvL+WtqeWtkOajgOafpeWOhuWPsuWIl+ihqFxuICAgICAgICAgICAgaXNMb2FkOnRydWUsLy/nrKzkuIDmrKHljrvmjolvblNob3fkuK3lpJrmrKHojrflj5ZjaGlsZHJlbkxpc3RcbiAgICAgICAgICAgIHBhZ2U6MSxcbiAgICAgICAgICAgIHRvdGFsOjExLFxuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZWQgPSB7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIHNob3c6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZz0hdGhpcy5kYXRhLmZsYWdcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGlkZTpmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICAgICAgICB2YXIgbmlja25hbWU9ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmlja25hbWVcbiAgICAgICAgICAgICAgICBpZihpZCE9dGhpcy5kYXRhLmRlZmF1bHRDaGlsZElkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hpbGRJZD1pZFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDaGlsZE5hbWU9bmlja25hbWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2RlZmF1bHRDaGlsZCcsIGRhdGE6e2lkOiBpZCxuaWNrbmFtZTpuaWNrbmFtZX19KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbEJvdHRvbSgpIC8v6I635Y+W6KeG5Yqb5qOA5p+l5pWw5o2uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPXRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ29BZGRDaGlsZHJlbjpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPXRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvU3RvcmVEZXRhaWwoZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdzdG9yZURldGFpbD9pZD0nK2UuY3VycmVudFRhcmdldC5pZH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ292VmlzaW9uKGUpe1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnb3B0b21ldHJ5P2lkPScrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubG9naWR9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVN0b3JlKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVJZD10aGlzLmRhdGEuc3dpcGVMaXN0W2UuZGV0YWlsLmN1cnJlbnRdLmlkXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnc3RvcmVJZCcsIGRhdGE6IHRoaXMuZGF0YS5zdG9yZUlkfSkgLy/mm7TmlrBzdG9yZUlkXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb3R0b20oKSAvL+iOt+WPluinhuWKm+ajgOafpeaVsOaNrlxuICAgICAgICAgICAgfSxcblxuICAgICAgICB9XG4gICAgICAgIHNjcm9sbEJvdHRvbSAoKSB7XG4gICAgICAgICAgICBpZih0aGlzLnRvdGFsPHRoaXMuZGF0YS5wYWdlKjEwKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFnZT10aGlzLmRhdGEucGFnZSsxXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB0aGlzLmV5ZXNUZXN0ZWQodGhpcy5wYWdlKVxuICAgICAgICB9XG4gICAgICAgIHNjcm9sbFRvcCgpe1xuICAgICAgICAgICAgdGhpcy5wYWdlPTFcbiAgICAgICAgICAgIHRoaXMudG90YWw9MTFcbiAgICAgICAgICAgIHRoaXMuaW5zcGVjdD1bXVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgdGhpcy5leWVzVGVzdGVkKHRoaXMucGFnZSlcbiAgICAgICAgfVxuICAgICAgICByZWxhdGlvbkNoaWxkKCl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgcmVxdWVzdFVybCgnZ2V0Q2hpbGRyZW5MaXN0JykudGhlbihyZXMgPT57XG4gICAgICAgICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGlsZHJlbkxpc3Q9cmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuZGF0YS5kZWZhdWx0Q2hpbGRJZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlZmF1bHRDaGlsZE5hbWUgID0gcmVzLmRhdGFbMF0ubmlja25hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVmYXVsdENoaWxkSWQ9cmVzLmRhdGFbMF0uaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkJywgZGF0YTp7aWQ6IHJlcy5kYXRhWzBdLmlkLG5pY2tuYW1lOnJlcy5kYXRhWzBdLm5pY2tuYW1lfX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdjaGlsZHJlbkxpc3QnLCBkYXRhOnJlcy5kYXRhfSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leWVzVGVzdGVkKCkgLy/ojrflj5bop4blipvmo4Dmn6XmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTdG9yZUxpc3QoKSAvL+iOt+WPlumXqOW6l+WIl+ihqFxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrlhbPogZTku7vkvZXlranlrZBcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PntcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0ZUFycihhcnIpe1xuICAgICAgICAgICAgdmFyIHJldHVybkFycj1bXVxuICAgICAgICAgICAgdmFyIHllYXJMaXN0PVtdXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgbGV0IHllYXI9IGl0ZW0uY2hlY2tfdGltZS5zcGxpdCgnLScpWzBdXG4gICAgICAgICAgICAgICAgaXRlbS55ZWFyPXllYXJcbiAgICAgICAgICAgICAgICBpdGVtLm1vbj1pdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVsxXVxuICAgICAgICAgICAgICAgIGl0ZW0uZGF5PWl0ZW0uY2hlY2tfdGltZS5zcGxpdCgnLScpWzJdXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXllYXJMaXN0LmZpbmRJbmRleChmdW5jdGlvbihpKXtyZXR1cm4gaSA9PSB5ZWFyfSlcbiAgICAgICAgICAgICAgICBpZihpbmRleD4tMSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFycltpbmRleF0ucHVzaChpdGVtKVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeWVhckxpc3QucHVzaCh5ZWFyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnIucHVzaChbaXRlbV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJcbiAgICAgICAgfVxuXG4gICAgICAgIGV5ZXNUZXN0ZWQocGFnZSl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIHNlbmREYXRhPXtpZDp0aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQsc3RvcmVfaWQ6c2VsZi5zdG9yZUlkfVxuICAgICAgICAgICAgaWYocGFnZSl7XG4gICAgICAgICAgICAgICAgc2VuZERhdGEucGFnZT1wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQpe1xuICAgICAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldFZpc2lvblN0YXRzJyxzZW5kRGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNwZWN0PSAgc2VsZi5pbnNwZWN0LmNvbmNhdChzZWxmLnRyYW5zbGF0ZUFycihyZXMuZGF0YS5yb3dzKSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3RhbD1yZXMuZGF0YS50b3RhbFxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW5zcGVjdCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgbG9naW4oY29kZSl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vZ2xhc3MudW5pbWtlci5jb20vYXBpL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlSWQ6IHRoaXMuZGF0YS5zdG9yZUlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7dXNlcl9pZDogZC5kYXRhLmRhdGEudXNlcl9pZCwgbG9naW5fdG9rZW46IGQuZGF0YS5kYXRhLmxvZ2luX3Rva2VufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1kLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmF2YXRhcnVybCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi5iYXNlVXJsK2RhdGEuYXZhdGFydXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpkYXRhLm5pY2tuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGU6ZGF0YS5tb2JpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpcnRoZGF5OmRhdGEuYmlydGhkYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IHVzZXJJbmZvLHN1Y2Nlc3M6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2Jhc2VEYXRhJywgZGF0YTogdGVtcCxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbGF0aW9uQ2hpbGQoKSAvL+WFs+iBlOWtqeWtkFxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0U3RvcmVMaXN0KCl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID10aGlzXG4gICAgICAgICAgICByZXF1ZXN0VXJsKCdnZXRTdG9yZUxpc3QnKS50aGVuKHJlcz0+e1xuXG4gICAgICAgICAgICAgICAgaWYocmVzLmNvZGU9PTEpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN3aXBlTGlzdD1yZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbmRleD0gcmVzLmRhdGEuZmluZEluZGV4KGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBzZWxmLnN0b3JlSWQtMFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTG9hZChvcHRpb24pIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZGV4IGxvYWQnKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe3RpdGxlOiAnc3RvcmVJZOaYryAnK29wdGlvbi5zY2VuZX0pXG4gICAgICAgICAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVsYXRpb25DaGlsZCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZyA6KaB6YeN5paw55m75b2VXCIpO1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5oiQ5YqfIGNvZGU9PT09PT0+JywgcmVzLmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW4ocmVzLmNvZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZihvcHRpb24uc2NlbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVJZD1vcHRpb24uc2NlbmVcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLCBkYXRhOiBvcHRpb24uc2NlbmV9KSAvL+i/m+adpeiuvue9ruW+ruS/oeeahHN0b3JlSWRcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLGRhdGE6JzEnfSkgLy/ov5vmnaXorr7nva7lvq7kv6HnmoRzdG9yZUlkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuIl19