'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _upngJs = require('./../npm/upng-js/UPNG.js');

var _upngJs2 = _interopRequireDefault(_upngJs);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addChildren = function (_wepy$page) {
  _inherits(addChildren, _wepy$page);

  function addChildren() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, addChildren);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = addChildren.__proto__ || Object.getPrototypeOf(addChildren)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '添加孩子'
    }, _this.data = {
      date: '2016-09-01',
      list: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }],
      userInfo: {
        nickName: '',
        avatarUrl: ''
      },
      avatarUrl: ''

    }, _this.mixins = [_test2.default], _this.methods = {
      bindDateChange: function bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          date: e.detail.value
        });
      },
      uploadImg: function uploadImg() {
        var _this2 = this;

        var ctx = wx.createCanvasContext('myCanvas');
        var platform = wx.getSystemInfoSync().platform;
        var imgWidth = 500,
            imgHeight = 500;
        wx.chooseImage({
          success: function success(res) {
            //生成的图片临时路径画成canvas
            ctx.drawImage(res.tempFilePaths[0], 0, 0, imgWidth, imgHeight);
            ctx.draw(false, function () {
              wx.canvasGetImageData({
                canvasId: 'myCanvas',
                x: 0,
                y: 0,
                width: imgWidth,
                height: imgHeight,
                success: function success(res) {
                  if (platform === 'ios') {
                    // 兼容处理：ios获取的图片上下颠倒
                    res = _this2.reverseImgData(res);
                  }
                  // 3. png编码
                  var pngData = _upngJs2.default.encode([res.data.buffer], res.width, res.height);
                  // 4. base64编码
                  var base64 = wx.arrayBufferToBase64(res.data);
                  debugger;
                  //let base64 = wx.arrayBufferToBase64(pngData)
                  debugger;
                  console.log('data:image/jpeg;base64,' + base64);
                  _this2.setData({
                    avatarUrl: 'data:image/jpeg;base64,' + base64
                  });
                },
                fail: function fail(res) {
                  debugger;
                  console.log(res);
                }
              });
            });
          }
        });
      },
      //ios图片处理
      reverseImgData: function reverseImgData(res) {
        var w = res.width;
        var h = res.height;
        var con = 0;
        for (var i = 0; i < h / 2; i++) {
          for (var j = 0; j < w * 4; j++) {
            con = res.data[i * w * 4 + j];
            res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j];
            res.data[(h - i - 1) * w * 4 + j] = con;
          }
        }
        return res;
      }

      //          const self = this
      //          wx.chooseImage({
      //            count:1,
      //            success:function (temp) {
      //              if(temp.tempFilePaths.length){
      //                var tempFilePaths = temp.tempFilePaths
      //                debugger
      //                wx.getImageInfo({
      //                  src:tempFilePaths[0],
      //                  success:function (res) {
      //                    console.log(res.width)
      //                    console.log(res.height)
      //                  }
      //                })
      //                wx.request({
      //                  url: tempFilePaths[0],
      //                  method: 'GET',
      //                  responseType: 'arraybuffer',
      //                  success: function (res) {
      //                    debugger
      //                    var base64 = wx.arrayBufferToBase64(res.data);
      //                    debugger
      //                    self.setData({
      //                      avatarUrl: 'data:image/jpg;base64,' + base64
      //                    })
      //                  }
      //                });
      //
      //                debugger
      //
      //
      //
      //
      //
      ////                self.$apply()
      //
      //                //self.setData({avatarUrl: 'data:image/jpg;base64,' + base64})
      //
      //
      //              }
      //              console.log(temp);
      //            },
      //            fail:function (err) {
      //              console.log(err);
      //            }
      //          })
      //        }

    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return addChildren;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(addChildren , 'pages/addChildren'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZENoaWxkcmVuLmpzIl0sIm5hbWVzIjpbImFkZENoaWxkcmVuIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkYXRlIiwibGlzdCIsIm5hbWUiLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwibWl4aW5zIiwidGVzdE1peGluIiwibWV0aG9kcyIsImJpbmREYXRlQ2hhbmdlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsInNldERhdGEiLCJ1cGxvYWRJbWciLCJjdHgiLCJ3eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJwbGF0Zm9ybSIsImdldFN5c3RlbUluZm9TeW5jIiwiaW1nV2lkdGgiLCJpbWdIZWlnaHQiLCJjaG9vc2VJbWFnZSIsInN1Y2Nlc3MiLCJkcmF3SW1hZ2UiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiZHJhdyIsImNhbnZhc0dldEltYWdlRGF0YSIsImNhbnZhc0lkIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsInJldmVyc2VJbWdEYXRhIiwicG5nRGF0YSIsInVwbmciLCJlbmNvZGUiLCJidWZmZXIiLCJiYXNlNjQiLCJhcnJheUJ1ZmZlclRvQmFzZTY0IiwiZmFpbCIsInciLCJoIiwiY29uIiwiaSIsImoiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBSyxZQURBO0FBRUxDLFlBQU0sQ0FBQyxFQUFDQyxNQUFNLENBQVAsRUFBRCxFQUFZLEVBQUNBLE1BQU0sQ0FBUCxFQUFaLEVBQXVCLEVBQUNBLE1BQU0sQ0FBUCxFQUF2QixFQUFrQyxFQUFDQSxNQUFNLENBQVAsRUFBbEMsRUFBNkMsRUFBQ0EsTUFBTSxDQUFQLEVBQTdDLENBRkQ7QUFHTEMs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VCxJQUFjSCxDQUFkLEdBQWtCLENBQWxCLEdBQXNCSSxDQUEvQixJQUFvQ0YsR0FBcEM7QUFDRDtBQUNGO0FBQ0QsZUFBT25CLEdBQVA7QUFDRDs7QUFHWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQS9HYyxLOzs7O0VBaEIrQnNCLGVBQUtDLEk7O2tCQUF6QnRELFciLCJmaWxlIjoiYWRkQ2hpbGRyZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAgIGltcG9ydCB1cG5nIGZyb20gJ3VwbmctanMnXG4gICAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcblxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGFkZENoaWxkcmVuIGV4dGVuZHMgd2VweS5wYWdle1xuICAgICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5re75Yqg5a2p5a2QJ1xuICAgICAgfVxuICAgICAgZGF0YSA9IHtcbiAgICAgICAgZGF0ZTonMjAxNi0wOS0wMScsXG4gICAgICAgIGxpc3Q6IFt7bmFtZTogMX0sIHtuYW1lOiAyfSwge25hbWU6IDN9LCB7bmFtZTogNH0sIHtuYW1lOiA1fV0sXG4gICAgICAgIHVzZXJJbmZvOiB7XG4gICAgICAgICAgbmlja05hbWU6ICcnLFxuICAgICAgICAgIGF2YXRhclVybDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYXZhdGFyVXJsOiAnJ1xuXG4gICAgICB9XG5cbiAgICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG4gICAgICBtZXRob2RzPXtcbiAgICAgICAgYmluZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3BpY2tlcuWPkemAgemAieaLqeaUueWPmO+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBkYXRlOiBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHVwbG9hZEltZzpmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJylcbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVxuICAgICAgICAgICAgY29uc3QgaW1nV2lkdGggPSA1MDAsIGltZ0hlaWdodD01MDA7XG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy/nlJ/miJDnmoTlm77niYfkuLTml7bot6/lvoTnlLvmiJBjYW52YXNcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJlcy50ZW1wRmlsZVBhdGhzWzBdLCAwLCAwLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KVxuICAgICAgICAgICAgICAgIGN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3eC5jYW52YXNHZXRJbWFnZURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzJyxcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGltZ1dpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGltZ0hlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm0gPT09ICdpb3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbzlrrnlpITnkIbvvJppb3Pojrflj5bnmoTlm77niYfkuIrkuIvpoqDlgJJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHRoaXMucmV2ZXJzZUltZ0RhdGEocmVzKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyAzLiBwbmfnvJbnoIFcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgcG5nRGF0YSA9IHVwbmcuZW5jb2RlKFtyZXMuZGF0YS5idWZmZXJdLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgLy8gNC4gYmFzZTY057yW56CBXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2U2NCA9IHd4LmFycmF5QnVmZmVyVG9CYXNlNjQocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgICAgLy9sZXQgYmFzZTY0ID0gd3guYXJyYXlCdWZmZXJUb0Jhc2U2NChwbmdEYXRhKVxuICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGJhc2U2NClcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgYmFzZTY0XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvL2lvc+WbvueJh+WkhOeQhlxuICAgICAgICAgIHJldmVyc2VJbWdEYXRhKHJlcykge1xuICAgICAgICAgICAgdmFyIHcgPSByZXMud2lkdGhcbiAgICAgICAgICAgIHZhciBoID0gcmVzLmhlaWdodFxuICAgICAgICAgICAgbGV0IGNvbiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaCAvIDI7IGkrKykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHcgKiA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb24gPSByZXMuZGF0YVtpICogdyAqIDQgKyBqXVxuICAgICAgICAgICAgICAgIHJlcy5kYXRhW2kgKiB3ICogNCArIGpdID0gcmVzLmRhdGFbKGggLSBpIC0gMSkgKiB3ICogNCArIGpdXG4gICAgICAgICAgICAgICAgcmVzLmRhdGFbKGggLSBpIC0gMSkgKiB3ICogNCArIGpdID0gY29uXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICB9XG5cblxuLy8gICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbi8vICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbi8vICAgICAgICAgICAgY291bnQ6MSxcbi8vICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAodGVtcCkge1xuLy8gICAgICAgICAgICAgIGlmKHRlbXAudGVtcEZpbGVQYXRocy5sZW5ndGgpe1xuLy8gICAgICAgICAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSB0ZW1wLnRlbXBGaWxlUGF0aHNcbi8vICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4vLyAgICAgICAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuLy8gICAgICAgICAgICAgICAgICBzcmM6dGVtcEZpbGVQYXRoc1swXSxcbi8vICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbiAocmVzKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLndpZHRoKVxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5oZWlnaHQpXG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbi8vICAgICAgICAgICAgICAgICAgdXJsOiB0ZW1wRmlsZVBhdGhzWzBdLFxuLy8gICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXG4vLyAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbi8vICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgICAgICAgICAgIHZhciBiYXNlNjQgPSB3eC5hcnJheUJ1ZmZlclRvQmFzZTY0KHJlcy5kYXRhKTtcbi8vICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuLy8gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZztiYXNlNjQsJyArIGJhc2U2NFxuLy8gICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vLy8gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuLy9cbi8vICAgICAgICAgICAgICAgIC8vc2VsZi5zZXREYXRhKHthdmF0YXJVcmw6ICdkYXRhOmltYWdlL2pwZztiYXNlNjQsJyArIGJhc2U2NH0pXG4vL1xuLy9cbi8vICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgY29uc29sZS5sb2codGVtcCk7XG4vLyAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgIGZhaWw6ZnVuY3Rpb24gKGVycikge1xuLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICAgIH0pXG4vLyAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiJdfQ==