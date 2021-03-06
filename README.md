# react-sortview

### A react sortable list container support unique drag button whenever you want.
### 支持特定拖拽按钮的排序容器

| params | type | default | description |
| -- | -- | -- | -- |
| value | array | - | 待排序的数组 |
| key | string | - | renderItem的key字段 |
| dragbtn | string | - | 拖拽按钮的className |
| placeholderColor | string | '#e7f1ff' | 占位空间的背景色 |
| onChange | function | - | 排序后的回调 |
| renderItem | function | - | 渲染函数 |

+ DEMO

    [Click to open the demo on jsfiddle.com](http://jsfiddle.net/daffy6537/69z2wepo/100550/)
    
    [![Demo shortcut](/static/img/demo.png "Demo shortcut")](http://jsfiddle.net/daffy6537/69z2wepo/100550/)
 
+ INSTALL

```
npm install react-sortview
```
+ USE
```
import react, {Component} from 'react';
import SortView from 'react-sortview';

export default class Demo extends Component {
    contructor(props){
        super(props);
    }
    
    render() {
        return (
            <SortView
                dragbtn="drag-btn"
                value={[1,2,3]}
                onChange={(val) => {
                    console.log(val);
                }}
                renderItem={(item, index, array) => {
                    return (
                        <div>
                            <span>{item}</span>
                            <button className="drag-btn">drag here</button>
                        </div>
                    );
                }}
            />
        );
    }
};
```

