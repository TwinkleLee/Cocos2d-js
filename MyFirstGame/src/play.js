var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    SushiSprites: null,
    ctor: function () {
        this._super();
        this.SushiSprites = [];
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);//加载帧图片到缓存

        var size = cc.winSize;
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);//第二个参数类似z-index
        this.schedule(this.update, 4, 16 * 1024, 0);//callback interval repeat delay
        // this.scheduleOnce(callback_fn, delay) //该函数只调用一次callback_fn的方法
        // this.scheduleUpdate() //每一帧都会调用update方法
        return true;
    },
    addSushi: function () {

        // var sushi = new cc.Sprite(res.Sushi_png);
        var sushi = new SushiSprite(res.Sushi_png);
        this.SushiSprites.push(sushi);

        var size = cc.winSize;
        var x = sushi.width / 2 + size.width / 2 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });


        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x, -30));//在规定时间内移动到指定位置
        sushi.runAction(dorpAction);//调用动画


        this.addChild(sushi, 5);
    },
    update: function () {
        this.addSushi();
        this.removeSushi();
    },
    removeSushi: function () {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            cc.log("removeSushi.........");
            if (0 > this.SushiSprites[i].y) {
                cc.log("==============remove:" + i);
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i, 1);
                i = i - 1;
            }
        }
    },
});

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});