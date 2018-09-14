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
            navigationBarTitleText: '眼镜小程序',
            enablePullDownRefresh: true //允许整个页面滚动上拉下拉加载数据
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
                    self.onPullDownRefresh(); //获取视力检查数据
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
                this.onPullDownRefresh(); //获取视力检查数据
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    } //全局变量

    _createClass(Index, [{
        key: 'onReachBottom',
        value: function onReachBottom() {
            wx.showLoading({
                title: '玩命加载中'
            });
            if (this.total < this.data.page * 10) {
                wx.hideLoading();
                return;
            }
            this.page = this.data.page + 1;
            this.$apply();
            this.eyesTested(this.page);
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            wx.showNavigationBarLoading();
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
                    self.onPullDownRefresh(); //获取视力检查数据
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
                    self.inspect = self.translateArr(self.inspect.concat(res.data.rows));
                    self.total = res.data.total;
                    self.$apply();
                    wx.hideNavigationBarLoading();
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                    wx.hideLoading();
                    console.log(self.inspect);
                }).catch(function (err) {
                    console.log(err);
                    wx.hideNavigationBarLoading();
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                    wx.hideLoading();
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
                            self.relationChild(); //关联孩子
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJzd2lwZUxpc3QiLCJjdXJyZW50SW5kZXgiLCJmbGFnIiwiaW5zcGVjdCIsImlzTG9hZCIsInBhZ2UiLCJ0b3RhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNob3ciLCIkYXBwbHkiLCJoaWRlIiwiZSIsInNlbGYiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwibmlja25hbWUiLCJkZWZhdWx0Q2hpbGRJZCIsImRlZmF1bHRDaGlsZE5hbWUiLCJ3ZXB5Iiwic2V0U3RvcmFnZSIsImtleSIsIm9uUHVsbERvd25SZWZyZXNoIiwiZ29BZGRDaGlsZHJlbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1N0b3JlRGV0YWlsIiwiY29uc29sZSIsImxvZyIsImdvdlZpc2lvbiIsImxvZ2lkIiwiY2hhbmdlU3RvcmUiLCJzdG9yZUlkIiwiZGV0YWlsIiwiY3VycmVudCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImhpZGVMb2FkaW5nIiwiZXllc1Rlc3RlZCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJjaGlsZHJlbkxpc3QiLCJnZXRTdG9yZUxpc3QiLCJjYXRjaCIsImFyciIsInJldHVybkFyciIsInllYXJMaXN0IiwiZm9yRWFjaCIsInllYXIiLCJpdGVtIiwiY2hlY2tfdGltZSIsInNwbGl0IiwibW9uIiwiZGF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJpIiwicHVzaCIsInNlbmREYXRhIiwic3RvcmVfaWQiLCJ0cmFuc2xhdGVBcnIiLCJjb25jYXQiLCJyb3dzIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImVyciIsImNvZGUiLCJyZXF1ZXN0IiwibWV0aG9kIiwic3VjY2VzcyIsImQiLCJzdGF0dXNDb2RlIiwidGVtcCIsInVzZXJfaWQiLCJsb2dpbl90b2tlbiIsImF2YXRhcnVybCIsInVzZXJJbmZvIiwiYXZhdGFyVXJsIiwiYmFzZVVybCIsIm5pY2tOYW1lIiwibW9iaWxlIiwiYmlydGhkYXkiLCJyZWxhdGlvbkNoaWxkIiwiZmFpbCIsInNob3dUb2FzdCIsImljb24iLCJsb2dpbiIsIm9wdGlvbiIsImNoZWNrU2Vzc2lvbiIsImdldFN0b3JhZ2VTeW5jIiwiYXV0aCIsImdldFVzZXJJbmZvIiwic2NlbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsT0FEbkI7QUFFTEMsbUNBQXNCLElBRmpCLENBRXFCO0FBRnJCLFMsUUFLVEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxJLEdBQU87QUFDSEMsdUJBQVUsRUFEUCxFQUNVO0FBQ2JDLDBCQUFhLENBRlY7QUFHSEMsa0JBQUssSUFIRixFQUdPO0FBQ1ZDLHFCQUFRLEVBSkwsRUFJUTtBQUNYQyxvQkFBTyxJQUxKLEVBS1M7QUFDWkMsa0JBQUssQ0FORjtBQU9IQyxtQkFBTTtBQVBILFMsUUFVUEMsUSxHQUFXLEUsUUFLWEMsTyxHQUFVO0FBQ05DLGtCQUFLLGdCQUFZO0FBQ2IscUJBQUtQLElBQUwsR0FBVSxDQUFDLEtBQUtILElBQUwsQ0FBVUcsSUFBckI7QUFDQSxxQkFBS1EsTUFBTDtBQUNILGFBSks7QUFLTkMsa0JBQUssY0FBVUMsQ0FBVixFQUFhO0FBQ2Qsb0JBQU1DLE9BQU8sSUFBYjtBQUNBLG9CQUFJQyxLQUFLRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsRUFBakM7QUFDQSxvQkFBSUcsV0FBU0wsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLFFBQXJDO0FBQ0Esb0JBQUdILE1BQUksS0FBS2YsSUFBTCxDQUFV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Q0FBWSxZQUFaO0FBQ0EsZ0JBQUloQixPQUFPLElBQVg7QUFDQTtBQUNBdUIsZUFBR3dELFlBQUgsQ0FBZ0I7QUFDWm5CLHlCQUFTLGlCQUFTOUIsR0FBVCxFQUFhO0FBQ2xCLHdCQUFJaUMsT0FBT3hDLEdBQUd5RCxjQUFILENBQWtCLFFBQWxCLENBQVg7QUFDQWpFLDRCQUFRQyxHQUFSLENBQVksZ0JBQWMrQyxJQUExQjtBQUNBeEMsdUJBQUdvRCxTQUFILENBQWEsRUFBQ2xELE9BQU9zQyxJQUFSLEVBQWFhLE1BQUssTUFBbEIsRUFBYjtBQUNBLHdCQUFHLENBQUNiLElBQUosRUFBUztBQUNML0QsNkJBQUtpRixJQUFMO0FBQ0g7QUFDRDtBQUNBMUQsdUJBQUcyRCxXQUFILENBQWU7QUFDWHRCLGlDQUFTLHNCQUFPO0FBQ1o7QUFDQTdDLG9DQUFRQyxHQUFSLENBQVljLElBQUlxQyxRQUFoQjtBQUVIO0FBTFUscUJBQWY7QUFPQW5FLHlCQUFLeUUsYUFBTDtBQUNILGlCQWpCVztBQWtCWkMsc0JBQU0sY0FBUzVDLEdBQVQsRUFBYTs7QUFFZmYsNEJBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FoQix5QkFBS2lGLElBQUw7QUFDSDtBQXRCVyxhQUFoQjs7QUF5QkEsZ0JBQUdILE9BQU9LLEtBQVYsRUFBZ0I7QUFDWixxQkFBSy9ELE9BQUwsR0FBYTBELE9BQU9LLEtBQXBCO0FBQ0E1RSwrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLFNBQU4sRUFBaUJ2QixNQUFNNEYsT0FBT0ssS0FBOUIsRUFBaEIsRUFGWSxDQUUwQztBQUN6RCxhQUhELE1BR007QUFDRjVFLCtCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssU0FBTixFQUFnQnZCLE1BQUssR0FBckIsRUFBaEIsRUFERSxDQUN5QztBQUM5QztBQUVKOzs7O0VBMVE4QnFCLGVBQUtmLEk7O2tCQUFuQlosSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9taXhpbnMvc2VydmljZSdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ecvOmVnOWwj+eoi+W6jycsXG4gICAgICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZS8v5YWB6K645pW05Liq6aG16Z2i5rua5Yqo5LiK5ouJ5LiL5ouJ5Yqg6L295pWw5o2uXG4gICAgICAgIH1cblxuICAgICAgICBtaXhpbnMgPSBbdGVzdE1peGluXS8v5YWo5bGA5Y+Y6YePXG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHN3aXBlTGlzdDpbXSwvL+i9ruaSreWIl+ihqFxuICAgICAgICAgICAgY3VycmVudEluZGV4OjAsXG4gICAgICAgICAgICBmbGFnOnRydWUsLy/lvLnlsYLlvIDlhbNcbiAgICAgICAgICAgIGluc3BlY3Q6W10sLy/lranlrZDmo4Dmn6Xljoblj7LliJfooahcbiAgICAgICAgICAgIGlzTG9hZDp0cnVlLC8v56ys5LiA5qyh5Y675o6Jb25TaG935Lit5aSa5qyh6I635Y+WY2hpbGRyZW5MaXN0XG4gICAgICAgICAgICBwYWdlOjEsXG4gICAgICAgICAgICB0b3RhbDoxMSxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVkID0ge1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBzaG93OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWc9IXRoaXMuZGF0YS5mbGFnXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhpZGU6ZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lPWUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5pY2tuYW1lXG4gICAgICAgICAgICAgICAgaWYoaWQhPXRoaXMuZGF0YS5kZWZhdWx0Q2hpbGRJZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoaWxkSWQ9aWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hpbGROYW1lPW5pY2tuYW1lXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdkZWZhdWx0Q2hpbGQnLCBkYXRhOntpZDogaWQsbmlja25hbWU6bmlja25hbWV9fSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vblB1bGxEb3duUmVmcmVzaCgpIC8v6I635Y+W6KeG5Yqb5qOA5p+l5pWw5o2uXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPXRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ29BZGRDaGlsZHJlbjpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPXRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvU3RvcmVEZXRhaWwoZSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdzdG9yZURldGFpbD9pZD0nK2UuY3VycmVudFRhcmdldC5pZH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ292VmlzaW9uKGUpe1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnb3B0b21ldHJ5P2lkPScrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubG9naWR9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVN0b3JlKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVJZD10aGlzLmRhdGEuc3dpcGVMaXN0W2UuZGV0YWlsLmN1cnJlbnRdLmlkXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnc3RvcmVJZCcsIGRhdGE6IHRoaXMuZGF0YS5zdG9yZUlkfSkgLy/mm7TmlrBzdG9yZUlkXG4gICAgICAgICAgICAgICAgdGhpcy5vblB1bGxEb3duUmVmcmVzaCgpIC8v6I635Y+W6KeG5Yqb5qOA5p+l5pWw5o2uXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgIH1cbiAgICAgICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+eOqeWRveWKoOi9veS4rScsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYodGhpcy50b3RhbDx0aGlzLmRhdGEucGFnZSoxMCl7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFnZT10aGlzLmRhdGEucGFnZSsxXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB0aGlzLmV5ZXNUZXN0ZWQodGhpcy5wYWdlKVxuICAgICAgICB9XG4gICAgICAgIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICAgICAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICAgICAgICAgIHRoaXMucGFnZT0xXG4gICAgICAgICAgICB0aGlzLnRvdGFsPTExXG4gICAgICAgICAgICB0aGlzLmluc3BlY3Q9W11cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIHRoaXMuZXllc1Rlc3RlZCh0aGlzLnBhZ2UpXG4gICAgICAgIH1cbiAgICAgICAgcmVsYXRpb25DaGlsZCgpe1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldENoaWxkcmVuTGlzdCcpLnRoZW4ocmVzID0+e1xuICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hpbGRyZW5MaXN0PXJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmRhdGEuZGVmYXVsdENoaWxkSWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWZhdWx0Q2hpbGROYW1lICA9IHJlcy5kYXRhWzBdLm5pY2tuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlZmF1bHRDaGlsZElkPXJlcy5kYXRhWzBdLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2RlZmF1bHRDaGlsZCcsIGRhdGE6e2lkOiByZXMuZGF0YVswXS5pZCxuaWNrbmFtZTpyZXMuZGF0YVswXS5uaWNrbmFtZX19KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnY2hpbGRyZW5MaXN0JywgZGF0YTpyZXMuZGF0YX0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25QdWxsRG93blJlZnJlc2goKSAvL+iOt+WPluinhuWKm+ajgOafpeaVsOaNrlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFN0b3JlTGlzdCgpIC8v6I635Y+W6Zeo5bqX5YiX6KGoXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+acquWFs+iBlOS7u+S9leWtqeWtkFxuICAgICAgICAgICAgICAgICAgIC8vIHdlcHkubmF2aWdhdGVUbyh7dXJsOidhZGRDaGlsZHJlbid9KVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT57XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdGVBcnIoYXJyKXtcbiAgICAgICAgICAgIHZhciByZXR1cm5BcnI9W11cbiAgICAgICAgICAgIHZhciB5ZWFyTGlzdD1bXVxuICAgICAgICAgICAgYXJyLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgICAgIGxldCB5ZWFyPSBpdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVswXVxuICAgICAgICAgICAgICAgIGl0ZW0ueWVhcj15ZWFyXG4gICAgICAgICAgICAgICAgaXRlbS5tb249aXRlbS5jaGVja190aW1lLnNwbGl0KCctJylbMV1cbiAgICAgICAgICAgICAgICBpdGVtLmRheT1pdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVsyXVxuICAgICAgICAgICAgICAgIGxldCBpbmRleD15ZWFyTGlzdC5maW5kSW5kZXgoZnVuY3Rpb24oaSl7cmV0dXJuIGkgPT0geWVhcn0pXG4gICAgICAgICAgICAgICAgaWYoaW5kZXg+LTEpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnJbaW5kZXhdLnB1c2goaXRlbSlcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJMaXN0LnB1c2goeWVhcilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuQXJyLnB1c2goW2l0ZW1dKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyXG4gICAgICAgIH1cblxuICAgICAgICBleWVzVGVzdGVkKHBhZ2Upe1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHZhciBzZW5kRGF0YT17aWQ6dGhpcy5kYXRhLmRlZmF1bHRDaGlsZElkLHN0b3JlX2lkOnNlbGYuc3RvcmVJZH1cbiAgICAgICAgICAgIGlmKHBhZ2Upe1xuICAgICAgICAgICAgICAgIHNlbmREYXRhLnBhZ2U9cGFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmRlZmF1bHRDaGlsZElkKXtcbiAgICAgICAgICAgICAgICByZXF1ZXN0VXJsKCdnZXRWaXNpb25TdGF0cycsc2VuZERhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5zcGVjdD0gIHNlbGYudHJhbnNsYXRlQXJyKHNlbGYuaW5zcGVjdC5jb25jYXQocmVzLmRhdGEucm93cykpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudG90YWw9cmVzLmRhdGEudG90YWxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5YGc5q2i5LiL5ouJ5Yqo5L2cXG4gICAgICAgICAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbnNwZWN0KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWBnOatouS4i+aLieWKqOS9nFxuICAgICAgICAgICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgbG9naW4oY29kZSl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vZ2xhc3MudW5pbWtlci5jb20vYXBpL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlSWQ6IHRoaXMuZGF0YS5zdG9yZUlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7dXNlcl9pZDogZC5kYXRhLmRhdGEudXNlcl9pZCwgbG9naW5fdG9rZW46IGQuZGF0YS5kYXRhLmxvZ2luX3Rva2VufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1kLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmF2YXRhcnVybCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi5iYXNlVXJsK2RhdGEuYXZhdGFydXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpkYXRhLm5pY2tuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGU6ZGF0YS5tb2JpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpcnRoZGF5OmRhdGEuYmlydGhkYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IHVzZXJJbmZvLHN1Y2Nlc3M6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2Jhc2VEYXRhJywgZGF0YTogdGVtcCxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbGF0aW9uQ2hpbGQoKSAvL+WFs+iBlOWtqeWtkFxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfnmbvlvZXlpLHotKUnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRTdG9yZUxpc3QoKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPXRoaXNcbiAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldFN0b3JlTGlzdCcpLnRoZW4ocmVzPT57XG5cbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZT09MSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dpcGVMaXN0PXJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEluZGV4PSByZXMuZGF0YS5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09IHNlbGYuc3RvcmVJZC0wXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgYXV0aCgpe1xuICAgICAgICAgICAgY29uc3QgIHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB3ZXB5LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmiJDlip8gY29kZT09PT09PT4nLCByZXMuY29kZSk7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnaXNBdXRoJywgZGF0YTogdHJ1ZSxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVsYXRpb25DaGlsZCgpIC8v5YWz6IGU5a2p5a2QXG4gICAgICAgICAgICAgICAgICAgIH19KVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW4ocmVzLmNvZGUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+aOiOadg+Wksei0pScsaWNvbjonbm9uZSd9KVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBvbkxvYWQob3B0aW9uKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBsb2FkJyk7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIC8vd2VweS5zaG93VG9hc3Qoe3RpdGxlOiAnc3RvcmVJZOaYryAnK29wdGlvbi5zY2VuZX0pXG4gICAgICAgICAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lzQXV0aCcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZW1wPT09PT0+ICcrdGVtcCk7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6IHRlbXAsaWNvbjonbm9uZSd9KVxuICAgICAgICAgICAgICAgICAgICBpZighdGVtcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dGgoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5YiX6KGoXG4gICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpznlKjmiLfngrnlh7vov4fmjojmnYPvvIzlj6/ku6Xnm7TmjqXojrflj5bliLDkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudXNlckluZm8pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWxhdGlvbkNoaWxkKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcyl7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpnIDopoHph43mlrDnmbvlvZVcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXV0aCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZihvcHRpb24uc2NlbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVJZD1vcHRpb24uc2NlbmVcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLCBkYXRhOiBvcHRpb24uc2NlbmV9KSAvL+i/m+adpeiuvue9ruW+ruS/oeeahHN0b3JlSWRcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLGRhdGE6JzEnfSkgLy/ov5vmnaXorr7nva7lvq7kv6HnmoRzdG9yZUlkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuIl19