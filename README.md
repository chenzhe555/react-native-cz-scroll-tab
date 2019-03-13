
## Manual installation

npm install react-native-cz-scroll-tab --save

[Demo代码地址](https://github.com/chenzhe555/react-native-cz-demo)
	

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

###  2.属性:
```
type: type: -1(自定义样式), 1(见下图1), 2(见下图2)
```
![type=1](https://github.com/chenzhe555/react-native-cz-scroll-tab/blob/master/images/type1.png)
type=1

![type=2](https://github.com/chenzhe555/react-native-cz-scroll-tab/blob/master/images/type2.png)
type=2

![type=-1](https://github.com/chenzhe555/react-native-cz-scroll-tab/blob/master/images/type3.png)
type=-1
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

###  3.属性方法:
```
evaluateView: 赋值当前视图对象
```
```
selectItemAtIndex(item, index): 点击某个Item事件，item：当前对象；index：对应索引值
```
```
normalTextStyle: 未选中时样式：type:1 * {fontSize: 14, color: '#999999', fontFamily: 'PingFangSC-Regular'} * ; type:2 * {fontSize: 16, color: '#AAE039', fontFamily: 'PingFangSC-Semibold'} *
```
```
selectedTextStyle: 选中时样式：type:1 * {fontSize: 18, color: '#111111', fontFamily: 'PingFangSC-Semibold'} * ; type:2 * {fontSize: 16, color: '#FFFFFF', fontFamily: 'PingFangSC-Semibold'} *
```
```
normalBGStyle: 未选中背景样式 type:2 * {backgroundColor: '#FFFFFF'} *
```
```
selectedBGStyle: 选中背景样式 type:2 * {backgroundColor: '#AAE039'} *
```
```
renderCustomUnSelectedItemView(item, index): 自定义未选中样式
```
```
renderCustomSelectedItemView(item, index): 自定义选中样式
```

###  4.供外部调用的方法:
```
/*
* 直接修改数据源
* */
modifyList(list)
```
```
/*
* 切换到指定索引值(跳转效果细节后续优化)
* */
modifyIndex(index): 切换到指定索引值
```
