# react-sortview

### A sort container that supports a specific drag button
### 支持特定拖拽按钮的排序容器

| 参数 | 数据类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| value | array | - | 待排序的数组 |
| key | string | - | renderItem的key字段 |
| dragbtn | string | - | 拖拽按钮的className |
| placeholderColor | string | '#e7f1ff' | 占位空间的背景色 |
| onChange | function | - | 排序后的回调 |
| renderItem | function | - | 渲染函数 |


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
                renderItem={(item, index) => {
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

