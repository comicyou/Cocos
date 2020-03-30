// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
        monster_speed:5,
        dieAudio: {
            default: null,
            type: cc.AudioClip
        },
        
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter(){


        this.game.gameOver();
    },



    start () {

    },

    update (dt) {
        this.node.x -= this.monster_speed;
    },
});
