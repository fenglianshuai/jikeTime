// 预处理逻辑
function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }
    for (let prop in element.computedStyle) {
        let p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;
        if (element.style[prop].toString().match(/px$/)) {
            //px单位转为纯数字
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            // 字符串数字转为纯数字
            element.style[prop] = parseInt(element.style[prop]);
        }
    }

    return element.style;
}

module.exports = function layout(element) {
    // 预处理逻辑
    if (!element.computedStyle) return;

    let elementStyle = getStyle(element);

    if (elementStyle.display !== 'flex') return;
    // 过滤文本属性，惊醒sort为了支持order属性
    let items = element.children.filter(e => e.type === 'element');
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
    });
    let style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            stylep[size] = null;
        }
    })
    // 指定默认值
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'noWrap'
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (style.flexDirection === 'row') {
        // 主轴
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;
        // 交叉轴
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'row-reverse') {
        // 主轴
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;
        // 交叉轴
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'column') {
        // 主轴
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;
        // 交叉轴
        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexDirection === 'column-reverse') {
        // 主轴
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;
        // 交叉轴
        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexWrap === 'wrap-reverse') {
        // 反向换行，交叉轴开始和结束互换一下
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }


    // 父元素没有设置mianSize，所有子元素的mainSize之和就是父元素的mainSize

    let isAutoMainSize = false;
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + item[mainSize]
            }
        }
        isAutoMainSize = true;
    }

    // 将元素收进行（hang）
    let flexLine = [];
    let flexLines = [flexLine];
    // 剩余空间等于父元素的mainSize
    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemStyle = getStyle(item); // 去除所有的flexitem
        if (itemStyle[mainSize] === null) { // 没设主轴尺寸，默认0
            itemStyle[mainSize] = 0
        }

        if (itemStyle.flex) { // 该元素有flex属性，说明该元素是可伸缩的
            flexLine.push(item);
        } else if (style.flexWtap === 'nowrap' && isAutoMainSize) {
            crossSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                // 行高，取元素中最高的那个元素
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            flexLine.push(item)
        } else { // 换行逻辑
            if (itemStyle[mainSize] > style[mainSize]) { // 主轴尺寸大于父元素尺寸，将主轴尺寸压缩到父元素一样大
                itemStyle[mainSize] = style[mainSize]
            }
            if (mainSpace < itemStyle[mainSize]) { // 剩余空间不足以容纳元素了，采取换行操作
                flexLine.mainSpace = mainSpace; // 在此行上存储主轴剩余空间（实际剩余尺寸）
                flexLine.crossSpace = crossSpace;// 在此行上存储交叉轴空间（实际占用尺寸）
                flexLine = [item]; // 创建一个新的flexLine
                flexLines.push(flexLine);
                mainSpace = style[mainSize]; // 重置mainSpace
                crossSpace = 0; // 重置crossSpace
            } else { // 能放下
                flexLine.push(item);
            }
            // 计算交叉轴尺寸
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
    // 计算主轴
    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        // 进行等比压缩
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            // 找出所有属性
            itemStyle = getStyle(item);
            // 如果有flex属性则不参参加等比压缩
            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[main] * scale;
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd]
        }
    } else {
        flexLines.forEach(items => {
            let mainSpace = items.mainSpace;
            let flexToal = 0;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                itemStyle = getStyle(item);
                if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexToal += itemStyle.flex;
                    continue;
                }
            }

            if (flexToal > 0) {
                let currentMain = mainBase;
                for (let i = 0; i < items, length; i++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexToal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd]
                }
            } else {
                let currentMain;;
                let step;
                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase;
                    step = 0
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0
                }
                if (style.justifyContent === 'space-between') {
                    step = mainSpace / (items.length - 1) * mainSign;
                    currentMain = mainBase
                }
                if (style.justifyContent === 'space-around') {
                    step = mainSpace / item.length * mainSign;
                    currentMain = step / 2 + mainBase;
                }

                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }
    // 计算交叉轴
    let crossSpace2;

    if (!style[crossSize]) {
        crossSpace2 = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace2 = style[crossSize]
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace2 -= flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    let linSize = style[crossSize] / flexLines.length;
    let srossBase;
    let step;
    if (style.alignContent === 'flex-start' || style.alignContent === 'stretch') {
        srossBase += 0;
        step = 0;
    }
    if (style.alignContent === 'flex-end') {
        srossBase += crossSpace2 * crossSign;
        step = 0;
    }
    if (style.alignContent === 'center') {
        srossBase += crossSign * crossSpace2 / 2;
        step = 0;
    }
    if (style.alignContent === 'space-between') {
        srossBase += 0;
        step = crossSpace2 / (flexLines.length - 1);
    }
    if (style.alignContent === 'space-around') {
        step = crossSpace2 / (flexLines.length);
        srossBase += crossSign * step / 2;
    }

    flexLines.forEach(items => {
        let lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace2 / flexLines.length : items.crossSpace;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemsStyle = getStyle(item);
            let align = itemStyle.alignSelf || style.alignItems;

            if (item === null) {
                itemsStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
            }

            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemsStyle[crossSize];
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0) ? itemStyle[crossSize] : lineCrossSize));

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }
        }
        crossSpace2 += crossSign * (lineCrossSize + step)
    })
    // console.log(items, '?????/')
}