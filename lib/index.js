'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sortable = require('./sortable');

var _sortable2 = _interopRequireDefault(_sortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortView = function SortView(props) {
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement(_sortable2.default, props)
    );
};
exports.default = SortView;
//# sourceMappingURL=index.js.map