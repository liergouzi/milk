   window.onload=function(){
    document.querySelector('.header-right span').onclick=function(){
      document.querySelector('.nav').classList.toggle('show');
    }
    var navs=document.querySelector('.nav').children;
    console.log(navs);
    for (var i = 0; i < navs.length; i++) {
      var item=navs[i];
      item.onclick=function(){
       document.querySelector('.nav').classList.toggle('show');
      }
    }
    banner();
  }
  //轮播图
function banner(){
    //滑动切换轮播图
    //如果滑动距离小于屏幕宽度的1/3，不进行滑动 否则进行滑动下一张
    var banner=document.querySelector(".banner");
    var imgbox=document.querySelector(".img-box");
    var points=document.querySelectorAll(".points>li");
    var w=banner.offsetWidth;
    var index=1;
    //设置imgbox的位移
    function setTranslateX(x){
        imgbox.style.transform="translateX("+x+"px)";
        imgbox.style.webkitTransform="translateX("+x+"px)";
    }
    function removeTranslateX(){
        imgbox.style.transition="none";
        imgbox.style.webkitTransition="none";
    }
    //添加过渡效果
    function addTransition(){
        imgbox.style.transition="all 0.4s";
        imgbox.style.webkitTransition="all 0.4s";
    }
    //监听结束事件
    function transitionEnd(){
        //判断数据是否越界
        if(index>=4){
            index=1;
            //快速跳转
        }else if(index<=0){
            index=3;
        }
        var left=-index*w;
        removeTranslateX();
        setTranslateX(left);

        //让角标同步
        setPoints(index);
    }
    //定时器封装函数
    function turn(){
        index++;
        //切换轮播图 使用c3实现
        var left=-index*w;
        //切换前添加过渡
        addTransition();
        setTranslateX(left);
    }



    //----------------------------定时器模块--------------------------------
        var timer1=setInterval(turn,3000);
    //--------------------------监听过渡完成事件-----------------------------
    ergou.addTransitionEnd(imgbox, function () {
        transitionEnd();
    });
    //-----------------------------角标同步模块------------------------------
    function setPoints(index){
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('current');
        }
        points[index-1].classList.add("current");
    }
    //-----------------------------触屏滑动操作------------------------------
    var startX=0;
    var moveX=0;
    var distaceX=0;
    banner.addEventListener('touchstart', function (e) {
       //记录起始的触屏位置
        startX= e.targetTouches[0].clientX;
        clearInterval(timer1);
    });
    banner.addEventListener('touchmove', function (e) {
        moveX= e.targetTouches[0].clientX;
        distaceX=moveX-startX;
        //imgbox跟随鼠标移动而移动
        setTranslateX(-index*w+distaceX);
    })
    banner.addEventListener('touchend', function (e) {
        //记录起始的触屏位置
        //imgbox要选择不移动还是下一张还是上一张
        //如果滑动的距离大于屏幕宽度的1/3 切换图片
        if(Math.abs(distaceX)>w/3){
            if(distaceX>0){ //向右滑动 上一张
                index--;
            }else if(distaceX<0){ //向左滑动 下一张
                index++;
            }
        }
        var left=-index*w;
        addTransition();
        setTranslateX(left);
        timer1=setInterval(turn,1000)
    });
    //过渡完成后监听imgbox的过渡完成事件 动画执行完了 判断数据是否越界
    //imgbox.addEventListener("transitionEnd", function () {
    //    transitionEnd();
    //});
    //imgbox.addEventListener("webkitTransitionEnd", function () {
    //    transitionEnd();
    //});
}
