// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
         speed:5,
         scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        
         
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {

        // this.getSharkDistance();
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        // 
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    },
    // _onTouchMove(touchEvent) {

    //     //获取触摸移动增量
    //     let delta = touchEvent.getDelta();
    //     //当前节点位置+增量，更新节点位置
    //     this.node.position = delta.add(this.node.position);
    // },
    onCollisionEnter: function (other, self) {
        this.onPick();
        this.game.crash();
    },
    

   

    onPick:function(){
        // console.log(this.number);
        // 当金币被收集时产生新的金币
        // this.game.createNewPrefab();
        // 摧毁当前的金币
        this.node.destroy();
        this.game.gainScore(1);
        // cc.audioEngine.playEffect(this.scoreAudio, false);
        // var scorLable = parseInt(this.game.distance.getComponent(cc.Label).string) + 1;
        // this.game.distance.getComponent(cc.Label).string =scorLable;
    },

    
    

    start () {
    

    },

    update (dt) {
        this.node.x -= this.speed;
        if(this.node.x < -640){
            // this.game.createNewPrefab();
            this.node.destroy();
        }

        
    },
});
