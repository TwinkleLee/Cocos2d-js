var StartLayer = cc.Layer.extend({
  ctor: function () {
    this._super();
    var size = cc.winSize;


    this.bgSprite = new cc.Sprite(res.BackGround_png);
    this.bgSprite.attr({
      x: size.width / 2,
      y: size.height / 2,
    });
    this.addChild(this.bgSprite, 0);


    return true;
  }
});

var StartLayer2 = cc.Layer.extend({
  ctor: function () {
    this._super();
    var size = cc.winSize;

    var helloLabel = new cc.LabelTTF("消灭寿司", "", 38);
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height * 4 / 5;
    helloLabel.anchorX = 0.5;
    this.addChild(helloLabel);


    //add start menu
    var startItem = new cc.MenuItemImage(
      res.Start_N_png,
      res.Start_S_png,
      function () {
        cc.log("Menu is clicked!");
        cc.director.runScene(new PlayScene());//coocs2d-js 3.x 之后场景切换用的是 cc.director.runScene 
        // pushScene 终止正在运行的场景，把它放到暂停场景的堆栈（内存）中去，新的场景将被执行。由于将场景放置内存中，场景并没有release。
        // popScene 将经过pushScene的场景从堆栈（内存）中pop出来执行（前提是堆栈内存中存在场景），而当前执行的场景将被删除。
        // runScene 用一个新的场景去替换掉正在运行的场景，正在运行的场景将被终止。
      }, this);
    startItem.attr({
      x: size.width / 2,
      y: size.height / 2,
      anchorX: 0.5,
      anchorY: 0.5
    });

    var menu = new cc.Menu(startItem);
    menu.x = 0;
    menu.y = 0;
    this.addChild(menu, 1);

    return true;
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new StartLayer();
    var layer2 = new StartLayer2();
    this.addChild(layer);
    this.addChild(layer2);
  }
});

var a = 100;