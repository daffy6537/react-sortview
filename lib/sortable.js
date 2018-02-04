'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sortable = function (_Component) {
    _inherits(Sortable, _Component);

    function Sortable(props) {
        _classCallCheck(this, Sortable);

        var _this = _possibleConstructorReturn(this, (Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call(this, props));

        _this.listData = props.value;

        _this.containerElement = null;
        _this.dragItems = [];

        _this.dragging = false;
        _this.draggingIndex = -1;
        _this.draggingElement = null;
        _this.draggingPlaceholder = null;

        _this.startPositionY = 0;
        _this.startPageY = 0;

        _this.sorting = false;
        _this.sortingStartY = 0;

        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseUp = _this.handleMouseUp.bind(_this);
        _this.exchangeListItemVertically = _this.exchangeListItemVertically.bind(_this);
        _this.removePlaceholderElement = _this.removePlaceholderElement.bind(_this);
        return _this;
    }

    _createClass(Sortable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousemove', this.handleMouseMove, false);
            document.addEventListener('mouseup', this.handleMouseUp, false);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value) {
                this.listData = nextProps.value;
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            if (!this.dragging) {
                this.removePlaceholderElement();
            }
            return !this.dragging;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.handleMouseMove, false);
            document.removeEventListener('mouseup', this.handleMouseUp, false);
        }
    }, {
        key: 'removePlaceholderElement',
        value: function removePlaceholderElement() {
            var _this2 = this;

            setTimeout(function () {
                var placeholderElement = document.getElementById('drag-placeholder');
                if (placeholderElement && _this2.containerElement) {
                    _this2.containerElement.removeChild(placeholderElement);
                }
            });
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e, index) {
            if (this.props.dragbtn && !e.target.className.includes(this.props.dragbtn)) {
                return false;
            }

            this.dragging = true;

            this.draggingIndex = index;
            this.startPageY = e.pageY;

            var itemElem = _reactDom2.default.findDOMNode(this.dragItems[index]); // eslint-disable-line
            this.containerElement = itemElem.parentNode;

            this.draggingPlaceholder = document.createElement('div');
            this.draggingPlaceholder.id = 'drag-placeholder';
            this.draggingPlaceholder.style.height = itemElem.getBoundingClientRect().height + 'px';
            this.draggingPlaceholder.style.backgroundColor = this.props.placeholderColor;

            if (this.draggingPlaceholder.parentNode !== this.containerElement) {
                this.containerElement.insertBefore(this.draggingPlaceholder, itemElem);
            }

            var offsetTop = this.draggingPlaceholder.offsetTop;

            itemElem.style.position = 'absolute';
            itemElem.style.width = '100%';
            itemElem.style.left = '0px';
            itemElem.style.backgroundColor = 'white';
            itemElem.style.top = offsetTop + 'px';
            itemElem.style.zIndex = '1000';
            this.startPositionY = offsetTop;
            this.sortingStartY = offsetTop;
            this.draggingElement = itemElem;
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(e) {
            if (typeof this.draggingIndex !== 'number' || this.draggingIndex < 0) {
                return;
            }
            this.draggingElement.style.top = this.startPositionY + e.pageY - this.startPageY + 'px';

            // 判断拖拽到了哪个位置
            var diff = this.draggingElement.offsetTop - this.sortingStartY;
            var clientHeight = this.draggingPlaceholder.getBoundingClientRect().height;

            if (Math.abs(diff) > clientHeight * 0.7) {
                this.exchangeListItemVertically(diff > 0);
            }
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp() {
            var onChange = this.props.onChange;

            if (!this.dragging) {
                return;
            }
            if (this.draggingPlaceholder && this.draggingPlaceholder.parentNode === this.containerElement) {
                this.containerElement.removeChild(this.draggingPlaceholder);
                this.draggingPlaceholder = null;

                this.draggingElement.removeAttribute("style");
            }
            this.dragging = false;
            onChange(this.listData.filter(function (data) {
                return !!data;
            }));
            this.draggingIndex = -1;
        }

        /**
         * 交换相邻的list item
         * @param  {boolean} bool   true: 向下移动，false: 向上移动
         * @return {undefined}      [description]
         */

    }, {
        key: 'exchangeListItemVertically',
        value: function exchangeListItemVertically(bool) {
            if (this.sorting) {
                return;
            }
            this.sorting = true;
            var index = this.draggingIndex;

            var dragNext = this.draggingElement.nextSibling;
            var placeholder = this.draggingPlaceholder;
            var placePrev = this.draggingPlaceholder.previousSibling;

            // 向上交换
            if (bool && dragNext && dragNext.nodeType === 1) {
                this.containerElement.insertBefore(dragNext, placeholder);
                this.sortingStartY = placeholder.offsetTop;

                this.listData = [].concat(_toConsumableArray(this.listData.slice(0, index)), [this.listData[index + 1], this.listData[index]], _toConsumableArray(this.listData.slice(index + 2)));
                this.draggingIndex++;
            }
            // 向下交换
            if (!bool && placePrev && placePrev.nodeType === 1) {
                if (dragNext && dragNext.nodeType === 1) {
                    this.containerElement.insertBefore(placePrev, dragNext);
                } else {
                    this.containerElement.appendChild(placePrev);
                }
                this.sortingStartY = placeholder.offsetTop;
                this.listData = [].concat(_toConsumableArray(this.listData.slice(0, index - 1)), [this.listData[index], this.listData[index - 1]], _toConsumableArray(this.listData.slice(index + 1)));
                this.draggingIndex--;
            }
            this.sorting = false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                renderItem = _props.renderItem,
                value = _props.value,
                attrKey = _props.attrKey;

            return value.map(function (item, index) {
                if (!item) {
                    return null;
                }
                var itemKey = attrKey ? item[attrKey || 'key'] : item;
                if (!itemKey) {
                    throw new Error('you should set the key of each');
                }
                return _react2.default.createElement(
                    'div',
                    {
                        key: itemKey,
                        ref: function ref(_ref) {
                            _this3.dragItems[index] = _ref;
                        },
                        onMouseDown: function onMouseDown(e) {
                            _this3.handleMouseDown(e, index);
                        }
                    },
                    renderItem(item, index)
                );
            });
        }
    }]);

    return Sortable;
}(_react.Component);

;

Sortable.propTypes = {
    placeholderColor: _propTypes2.default.string,
    attrKey: _propTypes2.default.string, // key of list item 渲染的key字段
    value: _propTypes2.default.array, // array 数组
    dragbtn: _propTypes2.default.string, // the dragable button className if needed. 拖拽按钮，不设置的话任何元素都可以拖拽
    onChange: _propTypes2.default.func, // callback after dragged 拖拽完成的回调
    renderItem: _propTypes2.default.func // render function of list item 渲染函数
};

Sortable.defaultProps = {
    placeholderColor: '#e7f1ff',
    attrKey: '',
    value: [],
    dragbtn: '',
    onChange: function onChange() {},
    renderItem: function renderItem() {
        return null;
    }
};

exports.default = Sortable;
//# sourceMappingURL=sortable.js.map