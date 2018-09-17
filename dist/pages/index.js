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
                url: 'https://glass.unimker.com/api/login',
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

                    var currentIndex = res.data.findIndex(function (item) {
                        return item.store_id == self.storeId - 0;
                    });
                    self.currentIndex = currentIndex == -1 ? 0 : currentIndex;

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
                            self.login(res.code);
                        } });
                },
                fail: function fail() {
                    wx.showToast({ title: '授权失败', icon: 'none' });
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            debugger;
            if (this.data.swipeList.length == 0 && this.data.baseData.user_id) {
                this.getStoreList();
            }
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
                        console.log(11);
                        self.auth();
                    } else {
                        console.log(22);
                        self.relationChild();
                    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm1peGlucyIsInRlc3RNaXhpbiIsImRhdGEiLCJzd2lwZUxpc3QiLCJjdXJyZW50SW5kZXgiLCJmbGFnIiwiaW5zcGVjdCIsImlzTG9hZCIsInBhZ2UiLCJ0b3RhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInNob3ciLCIkYXBwbHkiLCJoaWRlIiwiZSIsInNlbGYiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwibmlja25hbWUiLCJkZWZhdWx0Q2hpbGRJZCIsImRlZmF1bHRDaGlsZE5hbWUiLCJ3ZXB5Iiwic2V0U3RvcmFnZSIsImtleSIsIm9uUHVsbERvd25SZWZyZXNoIiwiZ29BZGRDaGlsZHJlbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1N0b3JlRGV0YWlsIiwiY29uc29sZSIsImxvZyIsImdvdlZpc2lvbiIsImxvZ2lkIiwiY2hhbmdlU3RvcmUiLCJzdG9yZUlkIiwiZGV0YWlsIiwiY3VycmVudCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImhpZGVMb2FkaW5nIiwiZXllc1Rlc3RlZCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJjaGlsZHJlbkxpc3QiLCJnZXRTdG9yZUxpc3QiLCJjYXRjaCIsImFyciIsInJldHVybkFyciIsInllYXJMaXN0IiwiZm9yRWFjaCIsInllYXIiLCJpdGVtIiwiY2hlY2tfdGltZSIsInNwbGl0IiwibW9uIiwiZGF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJpIiwicHVzaCIsInNlbmREYXRhIiwic3RvcmVfaWQiLCJ0cmFuc2xhdGVBcnIiLCJjb25jYXQiLCJyb3dzIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImVyciIsImNvZGUiLCJyZXF1ZXN0IiwibWV0aG9kIiwic3VjY2VzcyIsImQiLCJzdGF0dXNDb2RlIiwidGVtcCIsInVzZXJfaWQiLCJsb2dpbl90b2tlbiIsImF2YXRhcnVybCIsInVzZXJJbmZvIiwiYXZhdGFyVXJsIiwiYmFzZVVybCIsIm5pY2tOYW1lIiwibW9iaWxlIiwiYmlydGhkYXkiLCJyZWxhdGlvbkNoaWxkIiwiZmFpbCIsInNob3dUb2FzdCIsImljb24iLCJsb2dpbiIsImJhc2VEYXRhIiwib3B0aW9uIiwiY2hlY2tTZXNzaW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJhdXRoIiwic2NlbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsT0FEbkI7QUFFTEMsbUNBQXNCLElBRmpCLENBRXFCO0FBRnJCLFMsUUFLVEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVUQyxJLEdBQU87QUFDSEMsdUJBQVUsRUFEUCxFQUNVO0FBQ2JDLDBCQUFhLENBRlY7QUFHSEMsa0JBQUssSUFIRixFQUdPO0FBQ1ZDLHFCQUFRLEVBSkwsRUFJUTtBQUNYQyxvQkFBTyxJQUxKLEVBS1M7QUFDWkMsa0JBQUssQ0FORjtBQU9IQyxtQkFBTTtBQVBILFMsUUFVUEMsUSxHQUFXLEUsUUFLWEMsTyxHQUFVO0FBQ05DLGtCQUFLLGdCQUFZO0FBQ2IscUJBQUtQLElBQUwsR0FBVSxDQUFDLEtBQUtILElBQUwsQ0FBVUcsSUFBckI7QUFDQSxxQkFBS1EsTUFBTDtBQUNILGFBSks7QUFLTkMsa0JBQUssY0FBVUMsQ0FBVixFQUFhO0FBQ2Qsb0JBQU1DLE9BQU8sSUFBYjtBQUNBLG9CQUFJQyxLQUFLRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsRUFBakM7QUFDQSxvQkFBSUcsV0FBU0wsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLFFBQXJDO0FBQ0Esb0JBQUdILE1BQUksS0FBS2YsSUFBTCxDQUFVbUIs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QkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLFNBQU4sRUFBZ0J2QixNQUFLLEdBQXJCLEVBQWhCLEVBREUsQ0FDeUM7QUFDOUM7QUFFSjs7OztFQS9ROEJxQixlQUFLZixJOztrQkFBbkJaLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gICAgaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vbWl4aW5zL3NlcnZpY2UnXG5cbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnnLzplZzlsI/nqIvluo8nLFxuICAgICAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOnRydWUvL+WFgeiuuOaVtOS4qumhtemdoua7muWKqOS4iuaLieS4i+aLieWKoOi9veaVsOaNrlxuICAgICAgICB9XG5cbiAgICAgICAgbWl4aW5zID0gW3Rlc3RNaXhpbl0vL+WFqOWxgOWPmOmHj1xuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBzd2lwZUxpc3Q6W10sLy/ova7mkq3liJfooahcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleDowLFxuICAgICAgICAgICAgZmxhZzp0cnVlLC8v5by55bGC5byA5YWzXG4gICAgICAgICAgICBpbnNwZWN0OltdLC8v5a2p5a2Q5qOA5p+l5Y6G5Y+y5YiX6KGoXG4gICAgICAgICAgICBpc0xvYWQ6dHJ1ZSwvL+esrOS4gOasoeWOu+aOiW9uU2hvd+S4reWkmuasoeiOt+WPlmNoaWxkcmVuTGlzdFxuICAgICAgICAgICAgcGFnZToxLFxuICAgICAgICAgICAgdG90YWw6MTEsXG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlZCA9IHtcblxuICAgICAgICB9XG5cblxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgc2hvdzpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnPSF0aGlzLmRhdGEuZmxhZ1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlOmZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICAgICAgICAgIHZhciBuaWNrbmFtZT1lLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uaWNrbmFtZVxuICAgICAgICAgICAgICAgIGlmKGlkIT10aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDaGlsZElkPWlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoaWxkTmFtZT1uaWNrbmFtZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7a2V5OiAnZGVmYXVsdENoaWxkJywgZGF0YTp7aWQ6IGlkLG5pY2tuYW1lOm5pY2tuYW1lfX0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25QdWxsRG93blJlZnJlc2goKSAvL+iOt+WPluinhuWKm+ajgOafpeaVsOaNrlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZmxhZz10cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvQWRkQ2hpbGRyZW46ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZz10cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnYWRkQ2hpbGRyZW4nfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnb1N0b3JlRGV0YWlsKGUpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnc3RvcmVEZXRhaWw/aWQ9JytlLmN1cnJlbnRUYXJnZXQuaWR9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdvdlZpc2lvbihlKXtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ29wdG9tZXRyeT9pZD0nK2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmxvZ2lkfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTdG9yZShlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlSWQ9dGhpcy5kYXRhLnN3aXBlTGlzdFtlLmRldGFpbC5jdXJyZW50XS5pZFxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ3N0b3JlSWQnLCBkYXRhOiB0aGlzLmRhdGEuc3RvcmVJZH0pIC8v5pu05pawc3RvcmVJZFxuICAgICAgICAgICAgICAgIHRoaXMub25QdWxsRG93blJlZnJlc2goKSAvL+iOt+WPluinhuWKm+ajgOafpeaVsOaNrlxuICAgICAgICAgICAgfSxcblxuICAgICAgICB9XG4gICAgICAgIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnjqnlkb3liqDovb3kuK0nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmKHRoaXMudG90YWw8dGhpcy5kYXRhLnBhZ2UqMTApe1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhZ2U9dGhpcy5kYXRhLnBhZ2UrMVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgdGhpcy5leWVzVGVzdGVkKHRoaXMucGFnZSlcbiAgICAgICAgfVxuICAgICAgICBvblB1bGxEb3duUmVmcmVzaCgpe1xuICAgICAgICAgICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLnBhZ2U9MVxuICAgICAgICAgICAgdGhpcy50b3RhbD0xMVxuICAgICAgICAgICAgdGhpcy5pbnNwZWN0PVtdXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB0aGlzLmV5ZXNUZXN0ZWQodGhpcy5wYWdlKVxuICAgICAgICB9XG4gICAgICAgIHJlbGF0aW9uQ2hpbGQoKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICByZXF1ZXN0VXJsKCdnZXRDaGlsZHJlbkxpc3QnKS50aGVuKHJlcyA9PntcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNoaWxkcmVuTGlzdD1yZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5kYXRhLmRlZmF1bHRDaGlsZElkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVmYXVsdENoaWxkTmFtZSAgPSByZXMuZGF0YVswXS5uaWNrbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWZhdWx0Q2hpbGRJZD1yZXMuZGF0YVswXS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdkZWZhdWx0Q2hpbGQnLCBkYXRhOntpZDogcmVzLmRhdGFbMF0uaWQsbmlja25hbWU6cmVzLmRhdGFbMF0ubmlja25hbWV9fSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2NoaWxkcmVuTGlzdCcsIGRhdGE6cmVzLmRhdGF9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uUHVsbERvd25SZWZyZXNoKCkgLy/ojrflj5bop4blipvmo4Dmn6XmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTdG9yZUxpc3QoKSAvL+iOt+WPlumXqOW6l+WIl+ihqFxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrlhbPogZTku7vkvZXlranlrZBcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6J2FkZENoaWxkcmVuJ30pXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PntcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0ZUFycihhcnIpe1xuICAgICAgICAgICAgdmFyIHJldHVybkFycj1bXVxuICAgICAgICAgICAgdmFyIHllYXJMaXN0PVtdXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICAgICAgbGV0IHllYXI9IGl0ZW0uY2hlY2tfdGltZS5zcGxpdCgnLScpWzBdXG4gICAgICAgICAgICAgICAgaXRlbS55ZWFyPXllYXJcbiAgICAgICAgICAgICAgICBpdGVtLm1vbj1pdGVtLmNoZWNrX3RpbWUuc3BsaXQoJy0nKVsxXVxuICAgICAgICAgICAgICAgIGl0ZW0uZGF5PWl0ZW0uY2hlY2tfdGltZS5zcGxpdCgnLScpWzJdXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXllYXJMaXN0LmZpbmRJbmRleChmdW5jdGlvbihpKXtyZXR1cm4gaSA9PSB5ZWFyfSlcbiAgICAgICAgICAgICAgICBpZihpbmRleD4tMSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFycltpbmRleF0ucHVzaChpdGVtKVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeWVhckxpc3QucHVzaCh5ZWFyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnIucHVzaChbaXRlbV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJcbiAgICAgICAgfVxuXG4gICAgICAgIGV5ZXNUZXN0ZWQocGFnZSl7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgdmFyIHNlbmREYXRhPXtpZDp0aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQsc3RvcmVfaWQ6c2VsZi5zdG9yZUlkfVxuICAgICAgICAgICAgaWYocGFnZSl7XG4gICAgICAgICAgICAgICAgc2VuZERhdGEucGFnZT1wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuZGVmYXVsdENoaWxkSWQpe1xuICAgICAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldFZpc2lvblN0YXRzJyxzZW5kRGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnNwZWN0PSAgc2VsZi50cmFuc2xhdGVBcnIoc2VsZi5pbnNwZWN0LmNvbmNhdChyZXMuZGF0YS5yb3dzKSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b3RhbD1yZXMuZGF0YS50b3RhbFxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAvLyDlgZzmraLkuIvmi4nliqjkvZxcbiAgICAgICAgICAgICAgICAgICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmluc3BlY3QpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5YGc5q2i5LiL5ouJ5Yqo5L2cXG4gICAgICAgICAgICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBsb2dpbihjb2RlKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZ2xhc3MudW5pbWtlci5jb20vYXBpL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlSWQ6IHRoaXMuZGF0YS5zdG9yZUlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7dXNlcl9pZDogZC5kYXRhLmRhdGEudXNlcl9pZCwgbG9naW5fdG9rZW46IGQuZGF0YS5kYXRhLmxvZ2luX3Rva2VufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1kLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmF2YXRhcnVybCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6c2VsZi5iYXNlVXJsK2RhdGEuYXZhdGFydXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTpkYXRhLm5pY2tuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGU6ZGF0YS5tb2JpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpcnRoZGF5OmRhdGEuYmlydGhkYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICd1c2VySW5mbycsIGRhdGE6IHVzZXJJbmZvLHN1Y2Nlc3M6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe2tleTogJ2Jhc2VEYXRhJywgZGF0YTogdGVtcCxzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbGF0aW9uQ2hpbGQoKSAvL+WFs+iBlOWtqeWtkFxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfnmbvlvZXlpLHotKUnLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBnZXRTdG9yZUxpc3QoKXtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPXRoaXNcbiAgICAgICAgICAgIHJlcXVlc3RVcmwoJ2dldFN0b3JlTGlzdCcpLnRoZW4ocmVzPT57XG5cbiAgICAgICAgICAgICAgICBpZihyZXMuY29kZT09MSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dpcGVMaXN0PXJlcy5kYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleD0gcmVzLmRhdGEuZmluZEluZGV4KGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdG9yZV9pZCA9PSBzZWxmLnN0b3JlSWQtMFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbmRleD0gY3VycmVudEluZGV4ID09IC0xPzA6Y3VycmVudEluZGV4XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBhdXRoKCl7XG4gICAgICAgICAgICBjb25zdCAgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHdlcHkubG9naW4oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaIkOWKnyBjb2RlPT09PT09PicsIHJlcy5jb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdpc0F1dGgnLCBkYXRhOiB0cnVlLHN1Y2Nlc3M6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbihyZXMuY29kZSlcbiAgICAgICAgICAgICAgICAgICAgfX0pXG5cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfmjojmnYPlpLHotKUnLGljb246J25vbmUnfSlcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgb25TaG93KCl7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnN3aXBlTGlzdC5sZW5ndGg9PTAmJnRoaXMuZGF0YS5iYXNlRGF0YS51c2VyX2lkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0b3JlTGlzdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25Mb2FkKG9wdGlvbikge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggbG9hZCcpO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICAvL3dlcHkuc2hvd1RvYXN0KHt0aXRsZTogJ3N0b3JlSWTmmK8gJytvcHRpb24uc2NlbmV9KVxuICAgICAgICAgICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpc0F1dGgnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGVtcD09PT09PiAnK3RlbXApO1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiB0ZW1wLGljb246J25vbmUnfSlcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRlbXApe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hdXRoKClcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWxhdGlvbkNoaWxkKClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZyA6KaB6YeN5paw55m75b2VXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1dGgoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYob3B0aW9uLnNjZW5lKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlSWQ9b3B0aW9uLnNjZW5lXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdzdG9yZUlkJywgZGF0YTogb3B0aW9uLnNjZW5lfSkgLy/ov5vmnaXorr7nva7lvq7kv6HnmoRzdG9yZUlkXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtrZXk6ICdzdG9yZUlkJyxkYXRhOicxJ30pIC8v6L+b5p2l6K6+572u5b6u5L+h55qEc3RvcmVJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiJdfQ==