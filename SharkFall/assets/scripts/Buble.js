// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    
    
    },

    //产生泡泡，给泡泡设置位置
    createBuble:function(x,y){
        this.node.x = x;
        this.node.y = y;

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        //开启气泡的碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        
    },
    onCollisionEnter: function (other, self) {
         this.game.shark.getComponent("Shark").onJump();
         console.log("sharkkkkkkkkkkkkk");
         this.node
    },

    start () {

    },

    update (dt) {
        this.node.x -= 5;
    },
});
