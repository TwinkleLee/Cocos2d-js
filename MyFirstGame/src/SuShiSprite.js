var SushiSprite = cc.Sprite.extend({
    disappearAction: null,//消失动画
    touchListener: null,
    index: null,//在数组中的索引

    onEnter: function () {
        cc.log("onEnter");
        this._super();

        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();

        this.addTouchEventListenser()
    },

    onExit: function () {
        cc.log("onExit");
        this.disappearAction.release();
        this._super();
    },

    createDisappearAction: function () {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_" + i + ".png"
            cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.02);
        var action = new cc.Animate(animation);

        return action;
    },

    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.removeTouchEventListenser();
                    //响应精灵点中
                    cc.log("touched", "pos.x=" + pos.x + ",pos.y=" + pos.y);
                    target.stopAllActions();
                    
					var ac = target.disappearAction;
					var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
						cc.log("callfun........");
						target.getParent().addScore();
						target.getParent().removeSushiByindex(target.index - 1);
						target.removeFromParent();

					},target) );

					target.runAction(seqAc);

                    return true;
                } else {
                    cc.log('notTouched')
                    return false;
                }
                //还可以添加onTouchMoved/onTouchEnded方法监听touch移动和结束的回调。
                //如果onTouchBegan返回false后onTouchMoved/onTouchEnded不会执行。
            }
        });

        cc.eventManager.addListener(this.touchListener, this);
    },

    removeTouchEventListenser: function () {
        cc.eventManager.removeListener(this.touchListener);
    }

});
