const images = require('images')
module.exports = function render(viewProt, element) {
    if (element.style) {
        let img = images(element.style.width, element.style.height);

        if (element.style['background-color']) {
            let color = element.style['background-color'] || 'rgb(0,0,0)';
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
            viewProt.draw(img, element.style.left || 0, element.style.top || 0)
        }
    }

    if (element.children) {
        console.log('???')
        for (let child of element.children) {
            render(viewProt, child);
        }
    }
}




const a = {
    "type": "document",
    "children": [
        {
            "type": "text",
            "content": "\n        "
        },
        {
            "type": "element",
            "children": [
                {
                    "type": "text",
                    "content": "\n        "
                },
                {
                    "type": "element",
                    "children": [
                        {
                            "type": "text",
                            "content": "\n            "
                        },
                        {
                            "type": "element",
                            "children": [],
                            "attributes": [],
                            "tagName": "style",
                            "computedStyle": {},
                            "style": {}
                        },
                        {
                            "type": "text",
                            "content": "\n            "
                        },
                        {
                            "type": "element",
                            "children": [
                                {
                                    "type": "text",
                                    "content": "Document"
                                }
                            ],
                            "attributes": [],
                            "tagName": "title",
                            "computedStyle": {},
                            "style": {}
                        },
                        {
                            "type": "text",
                            "content": "\n        "
                        }
                    ],
                    "attributes": [],
                    "tagName": "head",
                    "computedStyle": {},
                    "style": {}
                },
                {
                    "type": "text",
                    "content": "\n        "
                },
                {
                    "type": "element",
                    "children": [
                        {
                            "type": "text",
                            "content": "\n            "
                        },
                        {
                            "type": "element",
                            "children": [
                                {
                                    "type": "text",
                                    "content": "\n                "
                                },
                                {
                                    "type": "element",
                                    "children": [],
                                    "attributes": [
                                        {
                                            "name": "id",
                                            "value": "one"
                                        }
                                    ],
                                    "tagName": "div",
                                    "computedStyle": {
                                        "width": {
                                            "value": "100px",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        },
                                        "height": {
                                            "value": "100px",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        },
                                        "background-color": {
                                            "value": "red",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        }
                                    },
                                    "style": {
                                        "width": 100,
                                        "height": 100,
                                        "background-color": "red"
                                    }
                                },
                                {
                                    "type": "text",
                                    "content": "\n                "
                                },
                                {
                                    "type": "element",
                                    "children": [],
                                    "attributes": [],
                                    "tagName": "div",
                                    "computedStyle": {
                                        "width": {
                                            "value": "100px",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        },
                                        "height": {
                                            "value": "100px",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        },
                                        "background-color": {
                                            "value": "red",
                                            "specificity": [
                                                0,
                                                1,
                                                0,
                                                1
                                            ]
                                        }
                                    },
                                    "style": {
                                        "width": 100,
                                        "height": 100,
                                        "background-color": "red",
                                        "left": 100,
                                        "right": 200,
                                        "top": 0,
                                        "bottom": 100
                                    }
                                },
                                {
                                    "type": "text",
                                    "content": "\n            "
                                }
                            ],
                            "attributes": [
                                {
                                    "name": "id",
                                    "value": "box"
                                }
                            ],
                            "tagName": "div",
                            "computedStyle": {
                                "width": {
                                    "value": "500px",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                },
                                "height": {
                                    "value": "100px",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                },
                                "background": {
                                    "value": "pind",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                },
                                "display": {
                                    "value": "flex",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                },
                                "flex-wrap": {
                                    "value": "wrap",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                },
                                "background-color": {
                                    "value": "rgba(255,255,255)",
                                    "specificity": [
                                        0,
                                        1,
                                        0,
                                        0
                                    ]
                                }
                            },
                            "style": {
                                "width": 500,
                                "height": 100,
                                "background": "pind",
                                "display": "flex",
                                "flex-wrap": "wrap",
                                "background-color": "rgba(255,255,255)",
                                "flexDirection": "row",
                                "alignItems": "stretch",
                                "justifyContent": "flex-start",
                                "flexWrap": "noWrap",
                                "alignContent": "stretch"
                            }
                        },
                        {
                            "type": "text",
                            "content": "\n        "
                        }
                    ],
                    "attributes": [],
                    "tagName": "body",
                    "computedStyle": {},
                    "style": {}
                },
                {
                    "type": "text",
                    "content": "\n        "
                }
            ],
            "attributes": [
                {
                    "name": "maaaa",
                    "value": "a"
                }
            ],
            "tagName": "html",
            "computedStyle": {},
            "style": {}
        },
        {
            "type": "text",
            "content": "\r\n"
        }
    ]
}