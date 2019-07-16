// 实现轮播图功能
// 将所有的 component 封装到一个函数里面，防止污染全局作用域

// 封装绑定 “下一张” 和 “上一张” 按钮事件的函数
function nextButton(){
    // 找到 “下一张” 按钮
    var nextbtn = document.querySelector("#next");
    nextbtn.addEventListener('click', function(){
        // 找到包含 3 张图片的 div。div 里面的 data-imgs="3" 是图片总数
        // data-active="0" 是当前显示图片 id 的最后一位数字索引
        var dotIndicators = document.querySelector('.dot-indicators')
        var sideshowMenu = document.querySelector('.sideshow-menu');
        var nowPicIndex = parseInt(sideshowMenu.dataset.active);
        // 同步找到轮播图下面小圆点 id 最后一位数字索引
        var nowDotIndex = nowPicIndex;
        // log('nowPicIndex', nowPicIndex)
        var picNum = parseInt(sideshowMenu.dataset.imgs);
        // log('picNum', picNum)
        //  实现循环功能；
        var nextPicIndex = (nowPicIndex + picNum + 1) % picNum;
        var nextDotIndex = nextPicIndex;
        // 把即将显示的图片和小圆点的索引数字赋值给 data-active
        // 这样在下一张图片的数字索引才能算出来，才能正确循环下去
        sideshowMenu.dataset.active = nextPicIndex;
        dotIndicators.dataset.active = nextDotIndex;
        var nextPicId = "#id-img-" + String(nextPicIndex);
        var nextDotId = "#id-dot-" + String(nextPicIndex);
        log('nextPicId', nextPicId);
        // 将页面中所有的 active 和 red class属性去掉
        removeClassAll('active');
        removeClassAll('red');
        var nextPic = document.querySelector(nextPicId);
        var nextDot = document.querySelector(nextDotId);
        log('nextPic', nextPic)
        // 将下一张图片和对应小圆点的 class 加上 active 和 red
        // 利用 css 更改外观。
        nextPic.classList.add('active');
        nextDot.classList.add('red');
        clearInterval(autoplayID);
        autoplayID = autoplay();
    })
}

function formerButton(){
    var formerbtn = document.querySelector("#former");
    formerbtn.addEventListener('click', function(){
        var dotIndicators = document.querySelector('.dot-indicators');
        var sideshowMenu = document.querySelector('.sideshow-menu');
        var nowPicIndex = parseInt(sideshowMenu.dataset.active);
        var nowDotIndex = nowPicIndex;
        // log('nowPicIndex', nowPicIndex)
        var picNum = parseInt(sideshowMenu.dataset.imgs);
        // log('picNum', picNum)
        var nextPicIndex = (nowPicIndex + picNum + (picNum - 1)) % picNum;
        var nextDotIndex = nextPicIndex;
        sideshowMenu.dataset.active = nextPicIndex;
        dotIndicators.dataset.active = nextDotIndex;
        var nextPicId = "#id-img-" + String(nextPicIndex);
        var nextDotId = "#id-dot-" + String(nextDotIndex);
        log('nextPicId', nextPicId);
        removeClassAll('active');
        removeClassAll('red');
        var nextPic = document.querySelector(nextPicId);
        var nextDot = document.querySelector(nextDotId);
        log('nextPic', nextPic)
        nextPic.classList.add('active');
        nextDot.classList.add('red');
        clearInterval(autoplayID);
        autoplayID = autoplay();
    })
}

function clickDot() {
    var dotIndicators = document.querySelector('.dot-indicators');

    dotIndicators.addEventListener('click', function(event){
        var target = event.target;
        // var dotIndicators = document.querySelector('.dot-indicators');
        var sideshowMenu = document.querySelector('.sideshow-menu');
        var nowDotID = target.id;
        var nowDotIndex = nowDotID.slice(nowDotID.length - 1);
        var nowPicIndex = nowDotIndex;
        var nowPicId = 'id-img-' + nowPicIndex;
        // log('nowPicId', nowPicId)
        var nowPic = document.querySelector('#' + nowPicId);
        // log('nowPic element', nowPic)
        sideshowMenu.dataset.active = nowDotIndex;
        dotIndicators.dataset.active = nowDotIndex;
        removeClassAll('active');
        removeClassAll('red');
        nowPic.classList.add('active');
        target.classList.add('red');
    })
}


// 定时器实现自动播放功能
function autoplay() {
     setInterval(function() {
        var dotIndicators = document.querySelector('.dot-indicators')
        var sideshowMenu = document.querySelector('.sideshow-menu');
        var nowPicIndex = parseInt(sideshowMenu.dataset.active);
        var nowDotIndex = nowPicIndex;
        // log('nowPicIndex', nowPicIndex)
        var picNum = parseInt(sideshowMenu.dataset.imgs);
        // log('picNum', picNum)
        var nextPicIndex = (nowPicIndex + picNum + 1) % picNum;
        var nextDotIndex = nextPicIndex;
        sideshowMenu.dataset.active = nextPicIndex;
        dotIndicators.dataset.active = nextDotIndex;
        var nextPicId = "#id-img-" + String(nextPicIndex);
        var nextDotId = "#id-dot-" + String(nextPicIndex);
        log('nextPicId', nextPicId);
        removeClassAll('active');
        removeClassAll('red');
        var nextPic = document.querySelector(nextPicId);
        var nextDot = document.querySelector(nextDotId);
        log('nextPic', nextPic)
        nextPic.classList.add('active');
        nextDot.classList.add('red');
    }, 3000)
}

function sideshow() {
    var autoplayID = autoplay();
    nextButton();
    formerButton();
    clickDot();

}

function __main() {
    sideshow();
}

__main();
