// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
         speed:2,
        //  scoreAudio: {
        //     default: null,
        //     type: cc.AudioClip
        // },
       

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        // 打开碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function (other, self) {
        this.onPick();
        this.game.crash();
        // this.game.shark.scal
    },

    onPick:function(){
        // console.log(this.number);
        // this.game.createNewPrefab();
        // 摧毁当前的金币
        this.node.destroy();
        
        this.game.gainScore(10);
        // // 播放得分音效
        // cc.audioEngine.playEffect(this.scoreAudio, false);
        // var scorLable = parseInt(this.game.distance.getComponent(cc.Label).string) +10;
        // console.log(scorLable);
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
