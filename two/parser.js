const FLS = Symbol('FLS');
let currentTextNode = null;
let currentToken = null;
let currentAttribute = null;

let stack = [{ type: 'document', children: [] }]

function emit(token) {
    let top = stack[stack.length - 1];

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for (let p in token) {
            if (p != 'type' && p != 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        top.children.push(element); // 设置子元素
        element.parent = top; // 设置父元素currentTextNode

        if (!token.isSelfClosing) {
            stack.push(element)
        }
        currentTextNode = null;
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error('开始标签与结束标签不一致')
        } else {
            stack.pop()
        }
        currentTextNode = null;
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

function start(h) {
    if (h === '<') {
        return tagOpen;
    } else if (h === FLS) {
        emit({
            type: 'FLS'
        });
        return;
    } else {
        emit({
            type: 'text',
            content: h
        })
        return start;
    }
}

function tagOpen(h) {
    if (h === '/') {
        return endTagOpen;
    } else if (h.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(h);
    } else {
        return;
    }
}

function endTagOpen(h) {
    if (h.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(h)
    } else if (h === '>') {

    } else if (h === FLS) {

    } else {

    }
}

function tagName(h) {
    if (h.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (h === '/') {
        return selfClosingStartTag;
    } else if (h.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += h; // .toLowerCase()
        return tagName;
    } else if (h === '>') {
        emit(currentToken);
        return start;
    } else {
        return tagName;
    }
}

function beforeAttributeName(h) {
    if (h.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (h === '>' || h === '/' || h === FLS) {
        return afterAttributeName(h);
    } else if (h === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(h);
    }
}

/*处理属性*/

function attributeName(h) {
    if (h.match(/^[\t\n\f ]$/) || h === '/' || h === '>' || h === FLS) {
        return afterAttributeName(h)
    } else if (h === '=') {
        return beforeAttributeValue;
    } else if (h === '\u0000') {

    } else if (h === '\"' || h === "'" || h === '<') {

    } else {
        currentAttribute.name += h;
        return attributeName;
    }
}

function beforeAttributeValue(h) {
    if (h.match(/^[\t\n\f ]$/) || h === '/' || h === ">" || h === FLS) {
        return beforeAttributeValue;
    } else if (h === "\"") {
        return doubleQuotedAttributeValue;
    } else if (h === "\'") {
        return singleQuotedAttributeValue;
    } else if (h === '>') {

    } else {
        return UnquotedAttributeValue(h)
    }
}

function doubleQuotedAttributeValue(h) { // 找双引号结束
    if (h === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (h === '\u0000') {

    } else if (h === FLS) {

    } else {
        currentAttribute.value += h;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(h) { // 找单引号结束
    if (h === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (h === '\c0000') {

    } else if (h === FLS) {

    } else {
        currentAttribute.value += h;
        return doubleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(h) {
    if (h.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (h === '/') {
        return selfClosingStartTag;
    } else if (h === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return start;
    } else if (h === FLS) {

    } else {
        currentAttribute.value += h;
        return doubleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(h) { // 找字符
    if (h.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (h === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag;
    } else if (h === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken);
        return start;
    } else if (h === '\u0000') {

    } else if (h === '\"' || h === "'" || h === '<' || h === '=' | h === '`') {

    } else if (h === FLS) {

    } else {
        currentAttribute.value += h;
        return UnquotedAttributeValue;
    }
}


function selfClosingStartTag(h) {
    if (h === '>') {
        currentToken.isSelfClosing = true
        return start;
    } else if (h === FLS) {

    } else {

    }
}

function afterAttributeName(h) {
    if (h.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (h === '/') {
        return selfClosingStartTag
    } else if (h === '=') {
        return beforeAttributeValue;
    } else if (h === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return start
    } else if (h === FLS) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(h)
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = start;
    for (let h of html) {
        state = state(h);
    }
    state = state(FLS);
    console.log(stack[0], '[end]')
}