
## Manual installation

npm install react-native-cz-scroll-tab --save

	

## Usage
###  1.引入组件
```
import ScrollTab from 'react-native-cz-scroll-tab';

<ScrollTab 
    isScroll={false} 
    style={{height: 50}} 
    list={[{'name': 'Tab1'}, {'name': 'Tab2', 'redCount': 22}]} 
    normalTextStyles={{color: 'blue', fontSize: 18}} 
    selectedTextStyles={{color: 'red', fontSize: 22}} 
    selectItemAtIndex={this._selectItemAtIndex}
    evaluateView={ (scrollTab) => {this.scrollTab = scrollTab}}
/>
```

###  2.方法说明:
```
/*
* 赋值当前视图
* */
evaluateView
```

```
/*
* 点击某个Item事件
* item：当前选中对象
* index：对应索引值
* */
selectItemAtIndex(item, index)
```

###  3.属性说明:
```
type: 1.默认类型，目前只支持1
```
```
isScroll: 是否可滚动；如果滚动，则根据文本排列，如果不滚动，则根据屏幕平分。默认不可滚动
```
```
style: 主视图样式：{'height': 50}；高度必须要有
```
```
list: 列表数据源: {'name': 'Tab1', 'redCount': '3'} name: 显示名称 redCount: 红点数量
```
```
currentIndex: 当前选中索引值，默认第一个
```
```
clickSame: 如果点击一样的Tab，是否也触发selectItemAtIndex方法。默认不触发
```
```
lineColor: 当type=1的时候，底部横线的颜色
```
```
normalTextStyles: 未选中时样式：{fontSize: 15, color: 'red'}
```
```
selectedTextStyles: 选中时样式：{fontSize: 18, color: 'red'}
```
