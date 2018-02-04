import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Sortable extends Component {
    constructor(props) {
        super(props);
        this.listData = props.value;
        
        this.containerElement = null;
        this.dragItems = [];
        
        this.dragging = false;
        this.draggingIndex = -1;
        this.draggingElement = null;
        this.draggingPlaceholder = null;
        
        this.startPositionY = 0;
        this.startPageY = 0;
        
        this.sorting = false;
        this.sortingStartY = 0;
        
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.exchangeListItemVertically = this.exchangeListItemVertically.bind(this);
        this.removePlaceholderElement = this.removePlaceholderElement.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove, false);
        document.addEventListener('mouseup', this.handleMouseUp, false);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.listData = nextProps.value;
        }
    }
    
    shouldComponentUpdate() {
        if (!this.dragging) {
            this.removePlaceholderElement();
        }
        return !this.dragging;
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove, false);
        document.removeEventListener('mouseup', this.handleMouseUp, false);
    }
    
    removePlaceholderElement() {
        setTimeout(() => {
            let placeholderElement = document.getElementById('drag-placeholder');
            if (placeholderElement && this.containerElement) {
                this.containerElement.removeChild(placeholderElement);
            }
        });
    }
    
    handleMouseDown(e, index) {
        if (this.props.dragbtn && !e.target.className.includes(this.props.dragbtn)) {
            return false;
        }
        
        this.dragging = true;
        
        this.draggingIndex = index;
        this.startPageY = e.pageY;
        
        let itemElem = ReactDOM.findDOMNode(this.dragItems[index]); // eslint-disable-line
        this.containerElement = itemElem.parentNode;
        
        this.draggingPlaceholder = document.createElement('div');
        this.draggingPlaceholder.id = 'drag-placeholder';
        this.draggingPlaceholder.style.height = itemElem.getBoundingClientRect().height + 'px';
        this.draggingPlaceholder.style.backgroundColor = this.props.placeholderColor;
        
        if (this.draggingPlaceholder.parentNode !== this.containerElement) {
            this.containerElement.insertBefore(this.draggingPlaceholder, itemElem);
        }
        
        let offsetTop = this.draggingPlaceholder.offsetTop;
        
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
    
    handleMouseMove(e) {
        if (typeof this.draggingIndex !== 'number' || this.draggingIndex < 0) {
            return;
        }
        this.draggingElement.style.top = this.startPositionY + e.pageY - this.startPageY + 'px';
        
        // 判断拖拽到了哪个位置
        let diff = this.draggingElement.offsetTop - this.sortingStartY;
        let clientHeight = this.draggingPlaceholder.getBoundingClientRect().height;

        if (Math.abs(diff) > clientHeight * 0.7) {
            this.exchangeListItemVertically(diff > 0);
        }
    }
    
    handleMouseUp() {
        const {onChange} = this.props;
        if (!this.dragging) {
            return;
        }
        if (this.draggingPlaceholder && this.draggingPlaceholder.parentNode === this.containerElement) {
            this.containerElement.removeChild(this.draggingPlaceholder);
            this.draggingPlaceholder = null;
            
            this.draggingElement.removeAttribute("style");
        }
        this.dragging = false;
        onChange(this.listData.filter(data => !!data));        
        this.draggingIndex = -1;
    }
    
    /**
     * 交换相邻的list item
     * @param  {boolean} bool   true: 向下移动，false: 向上移动
     * @return {undefined}      [description]
     */
    exchangeListItemVertically(bool) {
        if (this.sorting) {
            return;
        }
        this.sorting = true;
        let index = this.draggingIndex;
        
        let dragNext = this.draggingElement.nextSibling;
        let placeholder = this.draggingPlaceholder;
        let placePrev = this.draggingPlaceholder.previousSibling;
        
        // 向上交换
        if (bool && dragNext && dragNext.nodeType === 1) {
            this.containerElement.insertBefore(dragNext ,placeholder);
            this.sortingStartY = placeholder.offsetTop;
            
            this.listData = [
                ...this.listData.slice(0, index),
                this.listData[index + 1],
                this.listData[index],
                ...this.listData.slice(index + 2)
            ];
            this.draggingIndex++;
        }
        // 向下交换
        if (!bool && placePrev && placePrev.nodeType === 1) {
            if (dragNext && dragNext.nodeType === 1) {
                this.containerElement.insertBefore(placePrev, dragNext);
            }
            else {
                this.containerElement.appendChild(placePrev);
            }
            this.sortingStartY = placeholder.offsetTop;
            this.listData = [
                ...this.listData.slice(0, index - 1),
                this.listData[index],
                this.listData[index - 1],
                ...this.listData.slice(index + 1)
            ];
            this.draggingIndex--;
        }
        this.sorting = false;
    }
    
    render() {
        const {renderItem, value, attrKey} = this.props;
        return value.map((item, index) => {
            if (!item) {
                return null;
            }
            let itemKey = attrKey ? item[attrKey || 'key'] : item;
            if (!itemKey) {
                throw new Error('you should set the key of each');
            }
            return (
                <div
                    key={itemKey}
                    ref={ref => {
                        this.dragItems[index] = ref;
                    }}
                    onMouseDown={(e) => {
                        this.handleMouseDown(e, index);
                    }}
                >
                    {renderItem(item, index)}
                </div>
            );
        });
    }
};

Sortable.propTypes = {
    placeholderColor: PropTypes.string,
    attrKey: PropTypes.string, // key of list item 渲染的key字段
    value: PropTypes.array, // array 数组
    dragbtn: PropTypes.string, // the dragable button className if needed. 拖拽按钮，不设置的话任何元素都可以拖拽
    onChange: PropTypes.func, // callback after dragged 拖拽完成的回调
    renderItem: PropTypes.func // render function of list item 渲染函数
}

Sortable.defaultProps = {
    placeholderColor: '#e7f1ff',
    attrKey: '',
    value: [],
    dragbtn: '',
    onChange: () => {},
    renderItem: () => null
}

export default Sortable;