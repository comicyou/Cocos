

cc.Class({
    extends: cc.Component,

    properties: {
        maxY:0,
        groundY:0,

        //鲨鱼下落时间间隔
        SHARK_DROP_INTERVAL :0,
        //鲨鱼加速度
        SHARK_DROP_ACC :0,
        //鲨鱼上升高度
        SHARK_JUMP_VALUE :0,
       

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter: function (other, self) {
        // console.log('crashhhhhh');
    },

    

    start () {
        this.speed =0;
    },
    
    
    startDrop:function(){ 
        //开启计时器 每0.2秒运行一次onDrop方法
        this.schedule(this.onDrop,this.SHARK_DROP_INTERVAL);
    },
    onDrop:function(){
        //赋值速度给node.y
        this.speed +=this.SHARK_DROP_ACC;
        this.node.y -=this.speed;
 
    },
    onJump:function(){
        //鲨鱼的移动力度
        this.speed =this.SHARK_JUMP_VALUE;
        // console.log(this.speed);
    },
    stop:function(){
        //关闭计时器
        this.unschedule(this.onDrop);
    },

    update (dt) {
       
    },
    
});
