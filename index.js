import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';

/*
* props:
* type: 1.默认类型
* isScroll: 是否可滚动；如果滚动，则根据文本排列，如果不滚动，则根据屏幕平分。默认不可滚动
* style: 主视图样式：{'height': 50}；高度必须要有
* list: 列表数据源: {'name': 'Tab1', 'redCount': '3'} name: 显示名称 redCount: 红点数量
* currentIndex: 当前选中索引值，默认第一个
* clickSame: 如果点击一样的Tab，是否也触发selectItemAtIndex方法。默认不触发
* lineColor: 当type=1的时候，底部横线的颜色
*
* func:
* evaluateView: 赋值当前视图对象
* selectItemAtIndex(item, index): 点击某个Item事件，item：当前对象；index：对应索引值
* normalTextStyle: 未选中时样式：type:1 * {fontSize: 14, color: '#999999', fontFamily: 'PingFangSC-Regular'} * ; type:2 * {fontSize: 16, color: '#AAE039', fontFamily: 'PingFangSC-Semibold'} *
* selectedTextStyle: 选中时样式：type:1 * {fontSize: 18, color: '#111111', fontFamily: 'PingFangSC-Semibold'} * ; type:2 * {fontSize: 16, color: '#FFFFFF', fontFamily: 'PingFangSC-Semibold'} *
* normalBGStyle: 未选中背景样式 type:2 * {backgroundColor: '#FFFFFF'} *
* selectedBGStyle: 选中背景样式 type:2 * {backgroundColor: '#AAE039'} *
* renderCustomUnSelectedItemView(item, index): 自定义未选中样式
* renderCustomSelectedItemView(item, index): 自定义选中样式
*
* export func:
* modifyList(list): 直接修改数据源
* modifyIndex(index): 切换到指定索引值
* */
export default class CZScrollTab extends Component{
    
    /************************** 生命周期 **************************/
    constructor(props) {
        super(props);
        this.initializeParams();
    }

    componentDidMount() {
        if (this.props.evaluateView) this.props.evaluateView(this);
    }
    /************************** 继承方法 **************************/
    /************************** 通知 **************************/
    /************************** 创建视图 **************************/
    /************************** 网络请求 **************************/
    /************************** 自定义方法 **************************/
    /*
    * 初始化参数
    * */
    initializeParams = () => {
        //整个组件宽度
        this.viewWidth = 0;
        this.state = {
            //当前ScrollTab样式
            type: this.props.type ? this.props.type : 1,
            //是否可滚动，默认不可滚动
            isScroll: this.props.isScroll ? true : false,
            //主视图样式
            style: this.props.style ? this.props.style : {},
            //数据源
            list: this.props.list ? this.props.list : [],
            //当前选中Item
            currentIndex: this.props.currentIndex ? this.props.currentIndex : 0,
            //点击同样的是否触发事件，默认不触发
            clickSame: this.props.clickSame ? true : false,
            //底部横线的颜色
            lineColor: this.props.lineColor ? this.props.lineColor : '#AAE039'
        };
    }

    /*
    * 点击Cell触发事件
    * */
    clickItemAtIndex = (index) => {
        const { clickSame, currentIndex, list } = this.state;

        if (clickSame || currentIndex != index) {
            this.setState({
                currentIndex: index
            });
            if (this.props.selectItemAtIndex) this.props.selectItemAtIndex(list[index], index);
        }
    }

    /************************** 外部调用方法 **************************/
    /*
    * 直接修改数据源
    * */
    modifyList = (list) => {
        this.setState({
            list: list
        });
    }

    /*
    * 切换到指定索引值(跳转效果细节后续优化)
    * */
    modifyIndex = (index) => {
        const { isScroll } = this.state;
        this.setState({
            currentIndex: index
        });
        //滚动到指定索引值并触发事件
        if (isScroll) this.flatlist.scrollToIndex({'index': index});
        if (this.props.selectItemAtIndex) this.props.selectItemAtIndex(this.state.list[index], index);
    }

    /************************** List相关方法 **************************/
    _renderItem = (item) => {
        //如果不能滚动且viewWidth还没值的时候直接返回null
        if (!this.state.isScroll && !this.viewWidth) return null;

        switch (this.state.type) {
            case -1:
            {
                return this.renderMinus1Item(item);
            }
                break;
            case 2:
            {
                return this.renderType2Item(item);
            }
             break;
            default:
            {
                return this.renderType1Item(item);
            }
             break;
        }
    }

    renderMinus1Item = (item) => {
        if (item.index == this.state.currentIndex) {
            if (this.props.renderCustomSelectedItemView) {
                return (
                    <TouchableWithoutFeedback onPress={this.clickItemAtIndex.bind(this,item.index)} underlayColor={'rgba(0,0,0,0)'}>
                        {this.props.renderCustomSelectedItemView(item.item, item.index)}
                    </TouchableWithoutFeedback>
                );
            } else {
                return null;
            }
        } else {
            if (this.props.renderCustomUnSelectedItemView) {
                return (
                    <TouchableWithoutFeedback onPress={this.clickItemAtIndex.bind(this,item.index)} underlayColor={'rgba(0,0,0,0)'}>
                        {this.props.renderCustomUnSelectedItemView(item.item, item.index)}
                    </TouchableWithoutFeedback>
                );
            } else {
                return null;
            }
        }
    }

    /*
    * type = 1时样式
    * */
    renderType1Item = (item) => {
        const { isScroll, lineColor, currentIndex, list } = this.state;
        const { viewWidth } = this;
        const {
            normalBGStyle = {backgroundColor: '#FFFFFF'},
            selectedBGStyle = {backgroundColor: '#FFFFFF'},
            normalTextStyle = {fontSize: 14, color: '#999999', fontFamily: 'PingFangSC-Regular'},
            selectedTextStyle = {fontSize: 18, color: '#111111', fontFamily: 'PingFangSC-Semibold'}
        } = this.props;

        //文本视图
        let textView = null;
        //横线视图
        let lineView = null;
        //显示Tab名
        let name = item.item['name'] ? item.item['name'] : '';
        //红点数
        let redCount = parseInt(item.item['redCount'] ? item.item['redCount'] : 0);
        let redCountText = redCount > 99 ? '99+' : redCount;

        let mainStyles = [{
            flex: 1
        }];

        //选中Item
        //TODO: 后期红点使用react-native-cz-reddot
        if (item.index == currentIndex) {
            mainStyles.push(selectedBGStyle);
            //文本样式
            let textStyles = [selectedTextStyle];
            if (isScroll) {
                textStyles.push(styles.CommonSpace);
            };

            textView = (
                <View>
                    <Text style={textStyles}>{name}</Text>
                    {
                        redCount > 0 ? (
                            <View style={[styles.RadiusPointView, styles.RowCenter]}>
                                <Text style={[styles.RadiusPointTextView]}>{redCountText}</Text>
                            </View>
                        ) : null
                    }
                </View>
            );
            lineView = (
                <View style={[{width: '100%', height: 2, backgroundColor: lineColor}]}></View>
            );
        } else {
            mainStyles.push(normalBGStyle);
            let textStyles = [normalTextStyle, styles.CommonSpace];
            textView = (
                <View>
                    <Text style={textStyles}>{name}</Text>
                    {
                        redCount > 0 ? (
                            <View style={[styles.RadiusPointView, {right: 2}, styles.RowCenter]}>
                                <Text style={[styles.RadiusPointTextView]}>{redCountText}</Text>
                            </View>
                        ) : null
                    }
                </View>
            );
        }

        //如果不能滚动，则定宽
        if (!isScroll) {
            mainStyles.push({
                width: viewWidth/list.length
            });
        }

        return (
            <TouchableWithoutFeedback onPress={this.clickItemAtIndex.bind(this,item.index)} underlayColor={'rgba(0,0,0,0)'}>
                <View style={mainStyles}>
                    <View style={[styles.RowCenter, { flex: 1 }]}>
                        {textView}
                    </View>
                    {lineView}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    /*
    * type = 2时样式
    * */
    renderType2Item = (item) => {
        const {
            normalBGStyle = {backgroundColor: '#FFFFFF'},
            selectedBGStyle = {backgroundColor: '#AAE039'},
            normalTextStyle = {fontSize: 16, color: '#AAE039', fontFamily: 'PingFangSC-Semibold'},
            selectedTextStyle = {fontSize: 16, color: '#FFFFFF', fontFamily: 'PingFangSC-Semibold'}
        } = this.props;
        const { viewWidth = 0 } = this;
        const { isScroll, currentIndex, list } = this.state;
        if (!viewWidth && !isScroll) return null;

        //背景样式
        let mainStyles = [{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }];
        //如果不能滚动，则定宽
        if (!isScroll) {
            mainStyles.push({
                width: viewWidth/list.length
            });
        }

        //文本样式
        let textStyles = [styles.CommonSpace];

        if (item.index == currentIndex) {
            mainStyles.push(selectedBGStyle);
            textStyles.push(selectedTextStyle);
        } else {
            mainStyles.push(normalBGStyle);
            textStyles.push(normalTextStyle);
        }

        return (
            <TouchableWithoutFeedback onPress={this.clickItemAtIndex.bind(this,item.index)} underlayColor={'rgba(0,0,0,0)'}>
                <View style={mainStyles}>
                    <Text style={textStyles}>{item.item['name'] ? item.item['name'] : ''}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    /************************** Render中方法 **************************/
    /*
    * 获取视图尺寸
    * */
    _onLayout = (event) => {
        const{ isScroll } = this.state;
        this.viewWidth = event.nativeEvent.layout.width;
        //由于获取到视图宽度的时候，已经render了，如果isScroll是fasle的话，第一次渲染的时候不能获取到宽度，所以这里重新render一次
        if (!isScroll) {
            this.setState({
                isScroll: isScroll
            });
        }
    }


    render() {
        const { list, isScroll, style } = this.state;

        return (
            <View style={[style]} onLayout={this._onLayout}>
                <FlatList
                    ref={(flatlist) => this.flatlist = flatlist}
                    data={list}
                    renderItem={this._renderItem.bind(this)}
                    horizontal={true}
                    extraData={this.state}
                    keyExtractor={(item, index) => {return "index" + index}}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={isScroll}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RadiusPointView: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: '#FE3113',
        width: 16,
        height: 16,
        borderRadius: 8
    },

    RadiusPointTextView: {
        fontSize: 8,
        color: '#FFFFFF'
    },

    CommonSpace: {
        marginLeft: 10,
        marginRight: 10,
    },

    RowCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})