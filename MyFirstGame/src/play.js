var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    scoreLabel: null,
    score: 0,
    timeoutLabel: null,
    timeout: 6,
    SushiSprites: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.SushiSprites = [];

        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);//加载帧图片到缓存

        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);//第二个参数类似z-index

        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 20);
        this.scoreLabel.attr({
            x: size.width / 2 + 100,
            y: size.height - 20
        });
        this.addChild(this.scoreLabel, 5);

        // timeout
        this.timeoutLabel = cc.LabelTTF.create("" + this.timeout, "Arial", 30);
        this.timeoutLabel.x = 20;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);


        this.schedule(this.update, 1, 16 * 1024, 1);//callback interval repeat delay
        // this.scheduleOnce(callback_fn, delay) //该函数只调用一次callback_fn的方法
        // this.scheduleUpdate() //每一帧都会调用update方法
        this.schedule(this.timer, 1, this.timeout, 1);//callback interval repeat delay
        return true;
    },
    update: function () {
        this.addSushi();
        this.removeSushi();
    },
    timer: function () {
        if (this.timeout == 0) {
            //cc.log('游戏结束');
            var gameOver = new cc.LayerColor(cc.color(225, 225, 225, 100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
            titleLabel.attr({
                x: size.width / 2,
                y: size.height / 2
            });
            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    cc.log("Menu is clicked!");
                    // var transition = cc.TransitionFade(1, new PlayScene(), cc.color(255, 255, 255, 255));
                    // cc.director.runScene(transition);
                    cc.director.runScene(new PlayScene());
                }, this);
            TryAgainItem.attr({
                x: size.width / 2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });

            var menu = new cc.Menu(TryAgainItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu, 1);
            this.getParent().addChild(gameOver);

            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }

        this.timeout -= 1;
        this.timeoutLabel.setString("" + this.timeout);
    },

    addSushi: function () {
        var sushi = new SushiSprite("#sushi_1n.png");
        // 使用TexturePacker工具,将多张帧图片打包成一张大图和一个.plist文件，提高读取速度，减少内存消耗。
        // cc.spriteFrameCache管理精灵缓存，通过cc.spriteFrameCache可以方便的读取打包好的大图到内存。
        // cc.spriteFrameCache.getSpriteFrame(str)方法可以根据.plist文件中的信息获取到各个精灵帧。
        
        // var sushi = new cc.Sprite(res.Sushi_png);
        var size = cc.winSize;

        var x = sushi.width / 2 + size.width / 2 * cc.random0To1();
        sushi.attr({
            x: x,
            y: size.height - 30
        });

        this.SushiSprites.push(sushi);

        sushi.index = this.SushiSprites.length;

        this.addChild(sushi, 5);

        var dorpAction = cc.MoveTo.create(4, cc.p(sushi.x, -30));//在规定时间内移动到指定位置
        sushi.runAction(dorpAction);//调用动画

    },
    removeSushiByindex: function (dx) {

        if (isNaN(dx) || dx > this.SushiSprites.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this.SushiSprites[i] != this[dx]) {
                cc.log("--------------");
                this.SushiSprites[n++] = this.SushiSprites[i]
            }
        }
        this.SushiSprites.length -= 1
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
    addScore: function () {
        this.score += 1;
        this.scoreLabel.setString("score:" + this.score);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});
