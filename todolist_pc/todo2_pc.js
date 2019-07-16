function log() {
    console.log.apply(console, arguments);
}

function bindEvent() {
    //  ****** 给 “添加” 按钮绑定事件
    var addButton = document.querySelector('#id-addButton');
    addButton.addEventListener('click', function(){
        var inputContent = document.querySelector('#id-input-content');
        var todoEvent = inputContent.value;
        insertTodos(todoEvent, false);
        saveTodos();
    })

    // *******给 “完成” 和 “删除” 按钮绑定事件
    var todoContent = document.querySelector('.todo-content');
    todoContent.addEventListener('click', function(event) {
        //  target : 被惦记的元素
        var target = event.target;
        var todoCell = target.parentElement;
        if(target.classList.contains('todo-done')) {
            log('click done');
            toggleClass(todoCell, 'done');
            // todoCell.remove();
            toggleClass(todoCell, 'hide');
            saveTodos();
            // var content = todoCell.querySelector(".content");
            showdonetodo();

        } else if(target.classList.contains('todo-delete')){
            todoCell.remove();
            saveTodos();
        }
    })

}



function insertTodos(todoEvent, status) {
    var t = templateTodo(todoEvent, status);
    var todoContent = document.querySelector('.todo-content');
    todoContent.insertAdjacentHTML('beforeend', t);
}

// 在图片的下方, time div 里面添加现在的年月日。

function addcurrenttime() {
    var time = document.querySelector(".time");
    var t = timeTodo();
    time.insertAdjacentHTML('beforeend', t);
}


function timeTodo() {
    var today = nowdate();
    var t = `
        TODAY  <span>${today}</span>
    `
    return t;
}


function templateTodo(todoEvent, status) {
    var time = now();
    // 创建 todo 的时候，创建一个 时间戳，用来做 localStorage.todos 的 id
    if(status) {
        var done = 'done'
    } else {
        done = ''
    }
    var t = `
    <div class="todoCell ${done}">

        <button class= 'todo-done' type="button"></button>
        <button class= 'todo-delete' type="button"></button>
        <span class='content' contenteditable="true">${todoEvent}</span>
        <div class="now">${time}</div>

    </div>
    `
    return t;
}




function showdonetodo() {
    var todo_havebeendone = document.querySelector('.todo-havebeendone');
    // todo_havebeendone.appendChild(content)
    // 在 已完成界面 显示已经完成的 todos。
    /*
        1， 初始化界面为空
        2， 得到所有已完成状态的 donetodolist
        3， 显示
    */
    todo_havebeendone.innerHTML = " "
    var donetodolist = loaddonetodos()
    log("donetodolist", donetodolist);
    for (var i = 0; i < donetodolist.length; i++) {
        var donetodo = donetodolist[i];
        var donetodotask = donetodo.content;
        var t = `
            <div class="donetodoCell">
                <span class="content">${donetodotask}</span>
            </div>
        `
        todo_havebeendone.insertAdjacentHTML("beforeend", t);
    }
}

// 从 localStorage.todos 里面取出 status 为 true 的 todo
function loaddonetodos() {
    // 读取 localStorage.todos 里面的内容，并且反序列化
    var todoStr = localStorage.todos;
    if(todoStr === undefined) {
        todoStr = "[]"
    }
    var todoList = JSON.parse(todoStr);
    var donetodos = []
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        if(todo.status === true) {
            donetodos.push(todo);
        }
    }
    return donetodos;

}


function toggleClass(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

// ******* 解决刷新之后，todolist 状态不能保存的问题。
//         将 todo 内容存在数组 todos 里面，保存在 localStorage 里面
function save(array) {
    // 先将 array 序列化，再进行保存
    var s = JSON.stringify(array);
    return localStorage.todos = s;
}

function load() {
    var todoStr = localStorage.todos;
    if(todoStr === undefined) {
        todoStr = "[]"
    }
    var array = JSON.parse(todoStr);
    return array;
}

function saveTodos() {
    // 先取得所有的 todo 内容，存进 todos 这个数组里面
    var todos = [];
    // contents 所有的 span 元素
    var alltodos = document.querySelector('.alltodos');
    var contents = alltodos.querySelectorAll('.content');
    for (var i = 0; i < contents.length; i++) {
        //  取得每一个 span 元素 contents 中的每一个 span 元素
        var content = contents[i]
        var done = content.parentElement.classList.contains('done');
        var todo = {
            status: done,
            content: content.innerHTML
        }
        todos.push(todo);
        save(todos);
    }
}

function loadTodos() {
    var todos = load();
    log('load todos', todos);
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        insertTodos(todo.content, todo.status);
    }
}



// 时间标准库
// 常用用法如下
// var d = new Date()
// d.getFullYear()
// 年份, 2016
// d.getMonth()
// 月份, 0-11
// d.getDate()
// 日期, 1-31
// d.getHours()
// 小时, 0-23
// d.getMinutes()
// 分钟, 0-59
// d.getSeconds()
// 秒数, 0-59
// d.getMilliseconds()
// 毫秒, 0-999
// d.getDay()
// 星期几, 0-6

function now() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hour = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()

    return `${hour}:${min}`
    // return nm + '/' + yt + '/' + ri + ' ' + ui + ':' + ff + ':' + mc
}

function nowdate() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hour = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()

    return `${year}-${month}-${date}`
    // return nm + '/' + yt + '/' + ri + ' ' + ui + ':' + ff + ':' + mc
}

function __main() {
    bindEvent();
    loadTodos();
    addcurrenttime();
    showdonetodo();

}

__main();
