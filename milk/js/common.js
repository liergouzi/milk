/**
 * Created by Administrator on 2016/10/30.
 */
//命名空间
var ergou = {
    //给一个盒子绑定过渡结束的事件  可以处理c3兼容性问题
    //参数：1 绑定事件的对象 2 过渡结束事件 触发的操作
    addTransitionEnd: function (box, callback) {
        //判断用户传递的是否是一个对象 box不为空 并且是一个对象
        if (box && typeof(box) == "object") {
            //到此 box是可用的
            box.addEventListener('transitionEnd', function () {
                callback && callback();
            });
            box.addEventListener('webkitTransitionEnd', function () {
                callback && callback();
            });
        }
    },
    //tap事件  就是使用touch封装的-->
   //如果touchstart touchend 过程 鼠标没有移动过 并且这个时间小于150ms
    //给一个盒子绑定比click效率更高的事件
    //参数 1 绑定事件的对象 2  tap事件触发后要执行的操作
    tap: function (box,callback) {
        if (box && typeof(box) == "object") {
            var startTime=0;
            var isMove=false;
            box.addEventListener("touchstart", function () {
                //获取时间戳
                startTime=Date.now();
            })
            box.addEventListener("touchmove", function () {
                //如果鼠标移动了 就不是点击事件
                isMove=true;
            });
            box.addEventListener("touchend", function (e) {
                //如果是点击事件
                if(!isMove && Date.now()-startTime<150){
                    callback&&callback(e);
               }
                //数据重置
                isMove=false;
                startTime=0;
            });
        }
    }
}
