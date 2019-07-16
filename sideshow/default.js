function log() {
    console.log.apply(console, arguments);
}


// 开关函数，若该元素没有这个 class，就加上，有就去掉
function toggleClass(element, className) {
    if(element.classList.contains(className)){
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

// find 函数可以 以 element 为根，查找子元素
function find(element, selector) {
    return element.querySelector(selector);
}

// 封装：给一个元素绑定事件
function bindEvent(element, eventName, callback) {
    return element.addEventListener(eventName, callback);
}
// 给多个相似元素循环绑定事件，避免闭包的副作用。
function bindEventAll(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        bindEvent(element, eventName, callback);
    }
}

function removeClassAll(className) {
    var selector = '.' + className;
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.classList.remove(className);
    }
}
