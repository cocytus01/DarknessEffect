var size;
//再生時間
var skillnum = [150, 200, 150 , 250 ];
var suu = 0;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

//デバッグ用ラベル
//var debugText;
var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    //デバッグ用ラベルをcreate
    debugText = cc.LabelTTF.create("debug","Arial","32", cc.TEXT_ALIGNMENT_CENTER);
    this.addChild(debugText);
    debugText.setPosition(450,size.height - 20);
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();


    var sprite = cc.Sprite.create(res.ss_BattleScene_bg3);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);

    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    //水キャラクターを追加
    var sprite11 = cc.Sprite.create(res.chara_princessselect_11);
    sprite11.setPosition(size.width * 0.2, size.height * 0.3);
    sprite11.setScale(0.8);
    this.addChild(sprite11, 0);

    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.6, size.height * 0.4);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {
    if (this.skillCnt == 1) {

     this.skillParticle(this.skillSelect);
    }
    if ((this.skillCnt % skillnum[suu]) == 0) {
      this.skillCnt = 0;

      this.removeAllChildren();
      this.skillSelect++;
      suu++;
      this.skillSelect = this.skillSelect % 4;
      if(suu == 4)
      suu = 0;

    }
    //フレームをカウントする
    this.skillCnt++;
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib, rare, x, y) {

    //debugText.setString("attrib:"+attrib);
  　　//HealとSlipスキル追加
    var skillName = ["Skill","Ignis","Boll","Shine"];
    var sName = "res." + skillName[attrib] ;

    debugText.setString("No."+attrib+sName);

    var tempParticle = new cc.ParticleSystem(eval(sName));

    tempParticle.setPosition(size.width * 0.25, size.height * 0.4);


    if(attrib == 1){
      tempParticle.setPosition(size.width * 0.6, size.height * 0.3);
    }

    if(attrib == 2){
      tempParticle.setPosition(size.width * 0.6, size.height * 0.3);

    }

    if(attrib == 3){
      tempParticle.setPosition(size.width * 0.6, size.height * 0.3);

    }

    if(attrib == 4){
      tempParticle.setPosition(size.width * 0.6, size.height * 0.4);

    }

    if(attrib == 5){
      tempParticle.setPosition(size.width * 0.55, size.height * 0.2);

    }


    this.addChild(tempParticle, 20);
    tempParticle.setAutoRemoveOnFinish(true);
  },

});
