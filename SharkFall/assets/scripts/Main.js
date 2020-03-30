// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Shark = require('Shark');
// var Rando = require('random');

 cc.Class({
    extends: cc.Component,

    properties: {



        my_bgs: [cc.Node],//背景
        bg_speed: 0.6,//背景移动速度

        shark: {
            default:null,
            type:cc.Node
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        //右上角的分
        score: {
            default:null,
            type:cc.Node
        },
        number: 0,//记录右上角的分
        // 金币
        bounsPrefab: {
            default: null,
            type: cc.Prefab
        },
        //别的鱼
        redFishPrefab: {
            default: null,
            type: cc.Prefab
        },
        //最大高度
        maxY:360,
        //最低高度
        minY:-360,
        
        // 滑动产生的泡泡
        bublePrefa:{
            default:null,
            type:cc.Prefab

        },

        //怪物
        monsterPrefab:{
            default:null,
            type:cc.Prefab
        },
        crashPrefab:{
            default:null,
            type:cc.Prefab
        },
        // 计时相关
        minDuration:3,
        maxDuration:5,
        //定时器
        Duration:0,
        // monster时间
        monsterDuraton:0,

        timer:0,

        flag:false,

        // gameBgAudio: {
        //     default: null,
        //     type: cc.AudioClip
        // },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        //播放背景音乐
        // this.audioSource.play();

        // this.node.on("touchstart", function (event) {
        //     // this.shark.getComponent("Shark").onJump();//调用shark身上脚本中的跳跃方法

        //     // get新产生的泡泡绑定位置
        //     var buble_pos = this.node.convertToNodeSpaceAR(event.getLocation());

        //     // 调用buble的方法
        //     this.buble.getComponent("Buble").createBuble(buble_pos.x,buble_pos.y);
             
        //     // this.jumpAudio.play();//播放音效
        // }, this);



        // 点击/滑动位置就是泡泡产生的位置

        this.node.on("touchstart",this.setBublePos,this);

        this.node.on("touchmove",this.setBublePos,this);

        //鲨鱼下掉
        this.shark.getComponent("Shark").startDrop();

        this.schedule(this.createNewMonsterPrefab,this.monsterDuraton);

        // 产生新的金币
        this.schedule(this.createBouns,5);
        // this.createBouns();

        // 产生新的redFish
        this.schedule(this.createRedFish,8);
        // this.createRedFish();


        // this.createNewPrefab();

    


    },
    // 碰撞产生的效果
    crash:function(){
        var newCrash = cc.instantiate(this.crashPrefab);
        console.log(this.shark.x);
        newCrash.x =  -300;
        newCrash.y = this.shark.y;
        this.node.addChild(newCrash);
        // console.log(newCrash.x);
    },

    

    createNewMonsterPrefab:function(){
        //产生新的monster
        var newMonster = cc.instantiate(this.monsterPrefab);
        var monster_pos = this.getPosition();
        // 设置monster的位置
        newMonster.setPosition(monster_pos);
        this.node.addChild(newMonster);

        newMonster.getComponent('Monster').game = this;

        // newMonster.getComponent("Monster").game = this;
    },

    setBublePos:function(event){

        // 产生新的气泡
        var newBuble = cc.instantiate(this.bublePrefa);
        // get新产生的泡泡绑定位置
        var buble_pos = this.node.convertToNodeSpaceAR(event.getLocation());

        //设置buble的位置
        newBuble.x = buble_pos.x;
        newBuble.y = buble_pos.y;

        this.node.addChild(newBuble);
        newBuble.getComponent('Buble').game = this;
        
    },

    // createNewPrefab:function(){
    //     console.log('start');
    //     var ran_case = Math.random();
    //     // console.log(ran_case);
    //     var newPrefab;
    //     var flag = true;
    //     if(ran_case < 0.3){
    //         newPrefab = cc.instantiate(this.redFishPrefab);
    //         flag =false;
    //     }else{
    //         newPrefab = cc.instantiate(this.bounsPrefab);
    //     }
    //     this.node.addChild(newPrefab);
    //     var new_pos = this.getPosition();
    //     newPrefab.setPosition(new_pos);
    //     if(flag == true){
    //         newPrefab.getComponent('Bouns').game = this;
    //         // console.log('bouns');
    //     }
    //     else{
    //         newPrefab.getComponent('Redfish').game = this;
    //         // console.log('redfish')
    //     }
    // },

    createRedFish:function(){

        var newRedFish = cc.instantiate(this.redFishPrefab);
        // 在当前节点上生成新的redfish节点
        this.node.addChild( newRedFish);
        // 为新生成的金币设置位置
        var r_pos = this.getPosition();
        //给redfish 生成位置
         newRedFish.setPosition(r_pos);
        //  在redfish组件上暂存当前组件的引用
        newRedFish.getComponent('Redfish').game = this;


    },



    

    // 随机生成金币
    createBouns:function(){

        var newBouns = cc.instantiate(this.bounsPrefab);
        // 在当前节点上生成新的bouns节点
        this.node.addChild( newBouns);
        // 为新生成的金币设置位置
        var pos = this.getPosition();
        //给金币 生成位置
         newBouns.setPosition(pos);
        //  在星星组件上暂存当前组件的引用
        newBouns.getComponent('Bouns').game = this;


    },

    gainScore:function(scores){

        cc.audioEngine.playEffect(this.scoreAudio, false);
        var tall_scores = parseInt(this.score.getComponent(cc.Label).string);
        this.score.getComponent(cc.Label).string = tall_scores + scores;

        // 吃完变回不透明 
        this.shark.opacity = 255;
        this.timer = 0;
        console.log(this.timer);
    },

    getPosition:function(){//随机生成的位置
        var temY =Math.random()*(this.maxY-this.minY);
        var ranY = parseInt( temY) + this.minY;
        // console.log(ranY);
        var ranX = 600;
        return cc.v2(ranX,ranY);
    },


    gameOver: function () {
        this.node.stopAllActions(); //停止 所有动作
        cc.director.loadScene('game_scene');
    },

    update(dt) {

       
        this.Move_speed(this.my_bgs, this.bg_speed);

        //10s 不吃到金币或者 鱼就GAMEOVER
        if(this.timer > this.Duration||this.shark.y > 400||this.shark.y < -380){
            this.gameOver();
            return;
        }
        console.log(this.timer);

        this.timer += dt;
       
        // 控制shark变透明
        //  逐渐透明
         var opacityRatio = 1 - this.timer/this.Duration;
         var minOpacity = 80;
         this.shark.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));

    },

    Move_speed: function (bgList, speed) {

        // this.newBouns.x -=(2*speed);
        // console.log(this.newBouns.x);
        for (var index = 0; index < bgList.length; index++) {
            bgList[index].x -= speed;

            //y坐标减去自身的height得到这张背景刚好完全离开场景时的y值
            if (bgList[index].x <= - bgList[index].width) {

                bgList[0].x = 1920; //离开场景后将此背景图的x重新赋值，位于场景的

            }

            // console.log(bgList[index].x);
        }





    }

});
