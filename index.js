import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

/*
 type: 1.默认类型   #显示类型
 list: [{'name': 'Tab名', 'redCount': 12}]   #初始数据源
 normalTextStyles: {fontSize: 15, color: 'red'}   #未选中样式
 selectedTextStyles: {fontSize: 18, color: 'red'}   #选中样式
 lineColor: '#FF0000'   #type=1的底部横线颜色
 */
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
    initializeParams() {
        this.state = {
            //额外样式
            style: this.props.style ? this.props.style : {},
            //显示数据源
            list: this.props.list ? this.props.list : [],
            //当前选中Item
            currentIndex: this.props.currentIndex ? this.props.currentIndex : 0,
            //是否可滚动，默认不可滚动
            isScroll: this.props.isScroll ? true : false,
            //点击同样的是否触发事件，默认不触发
            clickSame: this.props.clickSame ? true : false,
            //底部横线的颜色
            lineColor: this.props.lineColor ? this.props.lineColor : '#FF0000',
            //CZScrollTab宽度
            viewWidth: this.props.width ? this.props.width : Dimensions.get('window').width
        };
    }

    //点击Cell触发事件
    clickItemAtIndex(index) {
        const { clickSame, currentIndex, list } = this.state;

        if (clickSame || currentIndex != index) {
            this.setState({
                currentIndex: index
            });
            if (this.props.selectItemAtIndex) this.props.selectItemAtIndex(list[index], index);
        }
    }

    //点击某个Item事件
    callFuncAtIndex(index) {
        const { list } = this.state;
        if (this.props.selectItemAtIndex) this.props.selectItemAtIndex(list[index], index);
    }

    /************************** 外部调用方法 **************************/
    //直接修改数据源
    modifyList(list) {
        this.setState({
            list: list
        });
    }

    //切换到指定索引值
    modifyIndex(index) {
        const { isScroll } = this.state;
        this.setState({
            currentIndex: index
        });
        //滚动到指定索引值并触发事件
        if (isScroll) this.flatlist.scrollToIndex({'index': index});
        this.callFuncAtIndex(index);
    }

    /************************** List相关方法 **************************/
    _renderItem(item) {
        const { isScroll, lineColor, currentIndex, viewWidth, list } = this.state;
        const { normalTextStyles, selectedTextStyles } = this.props;

        //文本视图
        let textView = null;
        //横线视图
        let lineView = null;
        //显示Tab名
        let name = item.item['name'] ? item.item['name'] : '';
        //红点数
        let redCount = parseInt(item.item['redCount'] ? item.item['redCount'] : 0);
        let redCountText = redCount > 99 ? '99+' : redCount;

        //选中Item
        if (item.index == currentIndex) {
            //文本样式
            let textStyles = [{
                fontSize: 18,
                color: '#111111',
                fontFamily: 'PingFangSC-Semibold'
            }];
            if (isScroll) {
                textStyles.push({
                    marginLeft: 10,
                    marginRight: 10
                });
            };
            if (selectedTextStyles) textStyles.push(selectedTextStyles);

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
                <View style={[{ alignItems: 'center' }]}>
                    <View style={[{width: (name.length * 20), height: 2, backgroundColor: lineColor}]}></View>
                </View>
            );
        } else {
            let textStyles = [styles.UnSelectedTextView];
            if (normalTextStyles) textStyles.push(normalTextStyles);
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
        let mainStyles = [{
            flex: 1
        }];
        if (!isScroll) {
            mainStyles.push({
                width: viewWidth/list.length
            });
        }

        return (
            <TouchableOpacity onPress={this.clickItemAtIndex.bind(this,item.index)}>
                <View style={mainStyles}>
                    <View style={[styles.RowCenter, { flex: 1 }]}>
                        {textView}
                    </View>
                    {lineView}
                </View>
            </TouchableOpacity>
        );
    }
    /************************** Render中方法 **************************/


    render() {
        const { list, isScroll, style } = this.state;

        return (
            <View style={[styles.MainView, style]}>
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
    MainView: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

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

    UnSelectedTextView: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14,
        color: '#999999',
        fontFamily: 'PingFangSC-Regular'
    },

    RowCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})