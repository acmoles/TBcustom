// init

var PIXI = require('pixi.js');
var anime = require('animejs');
var body = require('/Users/anthonymoles/Documents/TBcustom/js/body.js');
var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');
var arm = require('/Users/anthonymoles/Documents/TBcustom/js/arm.js');



var init = function () {

  // init
  this.canvas = document.getElementById('Pcanvas');
  this.renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
  this.canvas.appendChild(this.renderer.view);
  this.renderer.view.setAttribute('class', 'canvas-class');

  // arm renderTexture
  this.brt = new PIXI.BaseRenderTexture(200, 80, PIXI.SCALE_MODES.LINEAR, 1);
  this.rt = new PIXI.RenderTexture(this.brt);

  // canvas viewport dimensions
  this.cWidth = 600;
  this.cHeight = 720;

  // create the root of the scene graph
  this.stage = new PIXI.Container();

  // add centred viewport (just in case going forward)
  this.viewport = new PIXI.Container();
  this.viewport.pivot.x = this.cWidth/2;
  this.viewport.pivot.y = this.cHeight/2;
  this.viewport.position.x = this.cWidth/2;
  this.viewport.position.y = this.cHeight/2;
  this.stage.addChild(this.viewport);

  // Route object for group animation
  this.route = new PIXI.Container();
  this.route.pivot.x = this.cWidth/2;
  this.route.pivot.y = this.cHeight;
  this.route.position.x = this.cWidth/2;
  this.route.position.y = this.cHeight - 40;
  this.route.skew.x = 0;
  this.route.rotation = 0;
  this.route.scale.y = 1;
  this.viewport.addChild(this.route);

  // Cape layer
  this.cape = new PIXI.Sprite.fromFrame('39.png');
  this.cape.anchor.set(0.5, 0.5);
  this.cape.alpha = 0;
  this.route.addChild(this.cape);
  this.cape.position.set(300, 520);


  // Body layer
  this.bodyLayer = new PIXI.Container();
  this.route.addChild(this.bodyLayer);

  // Clothes layer
  this.clothesLayer = new PIXI.Container();
  this.route.addChild(this.clothesLayer);

  // Arms layer
  this.armLayer = new PIXI.Container();
  this.route.addChild(this.armLayer);

  // Accessories layer
  this.accessoriesLayer = new PIXI.Container();
  this.route.addChild(this.accessoriesLayer);

  // Face layer
  this.faceLayer = new PIXI.Container();
  this.route.addChild(this.faceLayer);

  // list of all textures
  this.itemTextures = [];

  // arm points
  this.pointsR = [];
  this.pointsL = [];
  this.ropeLength = 200/19;

  this.wave = {
    bL: 0,
    bR: 0
  };

  this.isArmWaving = true;
  this.isMainArmLoop = false;
  this.isArmWiggle = false;
  this.isArmSwing = false;
  this.isArmSpiral = false;


  // animation count
  this.count = 0;
  // special count for arm - gets reset
  this.armCount = 0;

  var self = this;

  this.onClick = function(event) {
    var viewport = self.viewport;
    var id = event.target.id.toString();
    console.log('clicked item ID: ' + id);
    var index = id - 1;
    var image = self.itemTextures[index];
    var type;
    var add;

    // More toucanoo reactions
    self.initBody.oMouth();
    setTimeout (function() { self.initBody.sEyes(); }, 700);


    // Type logic

    if ( id === '40' || id === '32' || id === '7' ) {
        // CLOTHES
        console.log('clothes');
        type = 'Clothes';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.clothesLayer, 'Clothes');
        self.removeChildType(self.accessoriesLayer, 'Clothes');
        self.clothesLayer.addChild(add);
        add.startIntro();
        this.changeArms(id);
      }

      else if ( id === '5' || id === '45' ) {
        // CLOTHES 2
        console.log('clothes v2');
        type = 'Clothes';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.accessoriesLayer, 'Clothes');
        self.removeChildType(self.clothesLayer, 'Clothes');
        self.accessoriesLayer.addChild(add);
        add.startIntro();
        this.changeArms(id);
      }

      else if ( id === '1' || id === '8' || id === '18' || id === '22' || id === '29' || id === '37' || id === '46' || id === '52' ) {
        // HAIR
        console.log('hair');
        type = 'Hair';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.accessoriesLayer, 'Hair');
        self.accessoriesLayer.addChild(add);
        add.startIntro();
      }

      else if ( id === '2' || id === '11' || id === '21' || id === '25' || id === '48' || id === '55' ) {
        // HATS
        console.log('hats');
        type = 'Hats';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.accessoriesLayer, 'Hats');
        self.accessoriesLayer.addChild(add);
        add.startIntro();
      }

      else if ( id === '6' || id === '10' || id === '20' || id === '31' ) {
        // SHOES
        console.log('shoes');
        type = 'Shoes';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.accessoriesLayer, 'Shoes');
        self.accessoriesLayer.addChild(add);
        add.startIntro();
      }

      else if ( id === '3' || id === '27' || id === '33' || id === '38' || id === '47' ) {
        // FACELAYER
        console.log('facelayer');
        type = 'FaceLayer';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.faceLayer.addChild(add);
        add.startIntro();
      }

      else if ( id === '30' || id === '26' || id === '28' || id === '42' || id === '49' || id === '54' ) {
        // FACELAYERGLASSES
        console.log('glasses');
        type = 'Glasses';
        add = new item(id, image, type, this.cWidth, this.cHeight);
        self.removeChildType(self.faceLayer, 'Glasses');
        self.faceLayer.addChild(add);
        add.startIntro();
      }

      else if ( id === '39' ) {
        // LOW ACCESSORIES
        console.log('cape');
        type = 'Low Accessories';
        // increase alpha of cape - same ping in animation? TODO
        // kick off an anime tween
        self.cape.alpha = 1;

      }

    else {
      // ACCESSORIES
      console.log('accessories');
      type = 'Accessories';
      add = new item(id, image, type, this.cWidth, this.cHeight);
      self.route.addChild(add);
      add.startIntro();
    }

    // ACCESSORIES 4,7,9,12,13,14,15,16,17,19,23,24,34,36,41,43,44,50,51,53,56,57,58,59,60,61
    // LOW ACCESSORIES 39
    // CLOTHES 40,30,32,35,45
    // HAIR 1,8,18,22,29,37,46,52
    // HATS 2,11,21,25,48,55
    // SHOES 6,10,20,31
    // FACELAYER 3,27,33,38,47
    // FACELAYERGLASSES 5,26,28,42,49,54


  };



};





init.prototype.loadTextures = function () {
  var i;

  for (i = 1; i <= 61; i++)
    {
       var texture = PIXI.Texture.fromFrame( i + '.png' );
       this.itemTextures.push(texture);
    }
};

init.prototype.populatePalette = function () {
  var i;

  var icons = document.getElementById('icons');

  for (i = 1; i <= 61; i++) {
    var node = document.createElement("li");
    node.className = 'js_slide sprite-icons icons-' + i;
    node.id = i;
    node.addEventListener( 'click' , this.onClick.bind(this) , false );
    icons.appendChild( node );
  }

};

init.prototype.initSlider = function (width, height) {

    var multiSlides = document.querySelector('.slider');
    console.log(width);
    console.log(400 >= width);
    if (400 >= width) {

    lory(multiSlides, {
        infinite: 0,
        enableMouseEvents: true,
        slidesToScroll: 3,
        rewind: true
    });

  } else if (800 >= width && width >= 400) {
      lory(multiSlides, {
          infinite: 0,
          enableMouseEvents: true,
          slidesToScroll: 4,
          rewind: true
      });
    } else if (width >= 800){
      lory(multiSlides, {
          infinite: 0,
          enableMouseEvents: true,
          slidesToScroll: 8,
          rewind: true
      });
    }

  // scroll left and then right to demonstrate TODO


};

init.prototype.makeTestFrame = function () {

  //TESTING frame

  this.graphics = new PIXI.Graphics();
  this.graphics.lineStyle(1, 0xffd900, 1);

  this.graphics.moveTo(0,0);
  this.graphics.lineTo(600, 0);
  this.graphics.lineTo(600, 720);
  this.graphics.lineTo(0, 720);
  this.graphics.lineTo(0, 0);

  this.viewport.addChild(this.graphics);

};

init.prototype.startAnimate = function () {
  // init first render cycle
  requestAnimationFrame(this.animate.bind(this));
  var init = this;
  init.animateWave();
  setInterval(function() { init.animateWave(); }, anime.random(16000, 22000));
  setInterval(function() { init.startArmWiggle(); }, anime.random(10000, 14000));
  setInterval(function() { init.startArmSwing(); }, anime.random(35000, 45000));
  // setInterval(function() { init.startArmSpiral(); }, 100000);

  console.log('main anim started');
};

init.prototype.startFaceAnimate = function () {
  // init first update cycle
  var init = this;
  setInterval(function() { init.initBody.doBlink(); }, anime.random(4000, 6000));
  setInterval(function() { init.initBody.swapMouth(); }, anime.random(5000, 7000));
  setInterval(function() { init.startAnimeFace(); }, anime.random(6000, 8000));


  console.log('face anim started');

};

init.prototype.animate = function () {
  this.count += 0.01;
  this.armCount += 0.01;
  // renderTexture
  this.renderer.render(this.initArm.armCanvas, this.rt);

  // render loop
  requestAnimationFrame(this.animate.bind(this));

  // loop animating toucanoo route
  this.route.rotation = 0.01 * Math.sin(this.count);
  this.route.scale.y = 1 + 0.015 * Math.sin(2.5 * this.count);

  // arm animations loop
  for (var i = 1; i < this.pointsR.length; i++) {

      this.pointsR[0].y = 0;
      this.pointsR[0].x = 0;

      if (this.isMainArmLoop) {
      // Arm loop
      this.pointsR[i].y = Math.pow( i, 1.1 * (Math.sin(3.5 * this.armCount) + 0.1 * Math.sin(5.5 * this.armCount + 60) ));
      this.pointsR[i].x = i * this.ropeLength - 0.5 * Math.pow( i, Math.sin(3.2 * this.armCount + 5) + 0.1 * Math.sin(8 * this.armCount + 30));
      this.pointsL[i].y = Math.pow( i, 1.1 * (Math.sin(3.55 * this.armCount) + 0.1 * Math.sin(5.55 * this.armCount + 61) ));
      this.pointsL[i].x = i * this.ropeLength - 0.5 * Math.pow( i, Math.sin(3.25 * this.armCount + 5.5) + 0.1 * Math.sin(7.5 * this.armCount + 30.5));
    } else if (this.isArmWiggle) {
      // Arm wiggle
      this.pointsR[i].y = 2 * Math.sin(i / 2 + 20 * this.armCount);
      this.pointsL[i].y = 2 * Math.sin(i / 2 + 20 * this.armCount);
    } else if (this.isArmSpiral) {
      // Spiral easter
      this.pointsR[i].y = -(10 * i) * Math.sin(this.armCount * (i / 13)) + 2 * Math.pow(Math.log(i), 2);
      this.pointsR[i].x = (6 * i) * Math.cos(this.armCount * (i / 13)) - 2 * Math.pow(Math.log(i), 2);
    } else if (this.isArmSwing) {
      // Loop wave
      this.pointsR[i].y = (i * this.ropeLength) * (Math.sin(0.05 * Math.sin(3 * this.armCount) * 0.9 * i));
      this.pointsR[i].x = (i * this.ropeLength) * (Math.cos(0.05 * Math.sin(3 * this.armCount) * i));
      this.pointsL[i].y = (i * this.ropeLength) * (Math.sin(0.05 * Math.sin(3 * this.armCount) * 0.9 * i));
      this.pointsL[i].x = (i * this.ropeLength) * (Math.cos(0.05 * Math.sin(3 * this.armCount) * i));
    } else if (this.isArmWaving) {
      // Arm wave controlled incl flip
      this.pointsR[i].y = -(i * this.ropeLength) * Math.sin(0.07 * i * this.wave.bR);
      this.pointsR[i].x = (i * this.ropeLength) * Math.cos(0.07 * i * this.wave.bR);
      this.pointsL[i].y = -(i * this.ropeLength) * Math.sin(0.07 * i * this.wave.bL);
      this.pointsL[i].x = (i * this.ropeLength) * Math.cos(0.07 * i * this.wave.bL);
      }

    } // loop all points end


  // render the stage
  this.renderer.render(this.stage);


};

init.prototype.animateWave = function(side) {

  var init = this;
  if (!this.isArmWiggle && !this.isArmSwing && !this.isArmSpiral) {

    init.isArmWaving = true;
    init.isMainArmLoop = false;

  this.animeWave1 = anime({
    targets: this.wave,
    //bL: 1,
    bR: 1.2,
    autoplay: false,
    duration: 2000,
    elasticity: 600,
    direction: 'alternate',
    loop: 1,
    update: function() {
      if ( init.wave.bR <= 0 ) {
        if (init.initArm.flipToggle){
        init.initArm.toggleArmHand();
      }
    }
  },
    begin: function() {
      init.initArm.toggleArmHand();
    },
    complete: function() {
      init.isArmWaving = false;
      init.isMainArmLoop = true;
      init.armCount = 0;
    }
  });

  this.animeWaveCompensate = anime({
    targets: this.ropeR,
    rotation: - 1.4, //0.89
    autoplay: false,
    duration: 2000,
    elasticity: 600,
    direction: 'alternate',
    loop: 1
  });

  this.animeWaveCompensate2 = anime({
    targets: this.ropeR.position,
    x: 192, //179
    y: 408, //403
    autoplay: false,
    duration: 2000,
    elasticity: 600,
    direction: 'alternate',
    loop: 1
  });

  this.animeWaveCompensate3 = anime({
    targets: this.ropeR.scale,
    y: 0.72,
    autoplay: false,
    duration: 2000,
    elasticity: 400,
    direction: 'alternate',
    loop: 1
  });

  this.animeSkew = anime({
    targets: this.route.skew,
    x: -0.04,
    autoplay: false,
    duration: 2000,
    elasticity: 400,
    direction: 'alternate',
    loop: 1
  });

  this.animeWave1.play();
  this.animeWaveCompensate.play();
  this.animeWaveCompensate2.play();
  this.animeWaveCompensate3.play();
  this.animeSkew.play();
}

};

init.prototype.startArmWiggle = function() {
  var self = this;
  if (!this.isArmWiggle && !this.isArmWaving && !this.isArmSwing && !this.isArmSpiral) {
    console.log('wiggle on');
    this.isArmWaving = false;
    this.isMainArmLoop = false;
    this.isArmWiggle = true;
    this.isArmSwing = false;
    this.isArmSpiral = false;
    setTimeout (function() { self.startArmWiggle(); }, 4000);
  } else if (this.isArmWiggle && !this.isArmWaving && !this.isArmSwing && !this.isArmSpiral) {
    console.log('wiggle off');
    this.isArmWaving = false;
    this.isMainArmLoop = true;
    this.isArmWiggle = false;
    this.isArmSwing = false;
    this.isArmSpiral = false;
  }

};

init.prototype.startArmSwing = function() {
  var self = this;
  if (!this.isArmWiggle && !this.isArmWaving && !this.isArmSwing && !this.isArmSpiral) {
    console.log('swing on');
    this.isArmWaving = false;
    this.isMainArmLoop = false;
    this.isArmWiggle = false;
    this.isArmSwing = true;
    this.isArmSpiral = false;
    setTimeout (function() { self.startArmSwing(); }, 6000);
  } else if (!this.isArmWiggle && !this.isArmWaving && this.isArmSwing && !this.isArmSpiral) {
    console.log('swing off');
    this.isArmWaving = false;
    this.isMainArmLoop = true;
    this.isArmWiggle = false;
    this.isArmSwing = false;
    this.isArmSpiral = false;
  }
};

init.prototype.startArmSpiral = function() {
  var self = this;
  if (!this.isArmWiggle && !this.isArmWaving && !this.isArmSwing && !this.isArmSpiral) {
    console.log('spiral on');
    this.isArmWaving = false;
    this.isMainArmLoop = false;
    this.isArmWiggle = false;
    this.isArmSwing = false;
    this.isArmSpiral = true;
    setTimeout (function() { self.startArmSpiral(); }, 8000);
  } else if (!this.isArmWiggle && !this.isArmWaving && !this.isArmSwing && this.isArmSpiral) {
    console.log('spiral off');
    this.isArmWaving = false;
    this.isMainArmLoop = true;
    this.isArmWiggle = false;
    this.isArmSwing = false;
    this.isArmSpiral = false;
  }
};

init.prototype.makeBody = function() {
  // add name container banner
  this.banner = new PIXI.Sprite.fromFrame('b1.png');
  this.banner.anchor.x = 0.5;
  this.banner.anchor.y = 0.5;
  this.banner.position.x = this.cWidth / 2;
  this.banner.position.y = 40;
  // Add when exporting - when to add child/toucanoo name? Popup modal? TODO
  // this.viewport.addChild(this.banner);

  // construct base toucanoo
  this.initBody = new body(this.route, this.bodyLayer, this.faceLayer, this.cWidth, this.cHeight);

};

init.prototype.startAnimeFace = function() {
  var self = this;
  this.animeFace = anime({
    targets: this.faceLayer.position,
    x: function(el, index) {
    return anime.random(6, 9);
  },
    y: function(el, index) {
    return -anime.random(0, 2);
  },
    autoplay: false,
    duration: function(el, index) {
    return anime.random(600, 1000);
  },
    delay: function(el, index) {
    return anime.random(100, 300);
  },
    direction: 'alternate',
    easing: 'easeOutExpo',
    loop: 1,
    complete: function() {
      self.animeFace2.play();
    }
  });

  this.animeFace2 = anime({
    targets: this.faceLayer.position,
    x: function(el, index) {
    return -anime.random(4, 6);
  },
    y: function(el, index) {
    return -anime.random(0, 2);
  },
    autoplay: false,
    duration: function(el, index) {
    return anime.random(600, 1000);
  },
    delay: function(el, index) {
    return anime.random(200, 800);
  },
    direction: 'alternate',
    easing: 'easeOutExpo',
    loop: 1
  });

  this.animeFace.play();
};

init.prototype.makeArms = function() {
  // construct toucanoo arms

  this.initArm = new arm();

  // Arm rope
  for (var i = 0; i < 20; i++)
  {
      this.pointsR.push(new PIXI.Point(i * this.ropeLength, null));
  }
  this.ropeR = new PIXI.mesh.Rope(this.rt, this.pointsR);
  this.ropeR.pivot.x = 38;
  this.ropeR.pivot.y = 0;
  this.ropeR.scale.x = -1;
  this.armLayer.addChild(this.ropeR);
  this.ropeR.rotation = - 0.89;
  this.ropeR.position.x = 179;
  this.ropeR.position.y = 403;

  // Rarm pivot visual
  // this.visualPivotR = new PIXI.Circle(this.ropeR.position.x, this.ropeR.position.y, 5);
  // this.drawHit = new PIXI.Graphics();
  // this.drawHit.beginFill(0xffd900);
  // this.drawHit.drawShape(this.visualPivotR);

  //L rope
  for (i = 0; i < 20; i++)
  {
      this.pointsL.push(new PIXI.Point(i * this.ropeLength, null));
  }
  this.ropeL = new PIXI.mesh.Rope(this.rt, this.pointsL);
  this.ropeL.pivot.x = 38;
  this.ropeL.pivot.y = 0;
  this.armLayer.addChild(this.ropeL);
  this.ropeL.rotation = 0.89;
  this.ropeL.position.x = 421;
  this.ropeL.position.y = 403;


  // Larm pivot visual
  // this.visualPivotL = new PIXI.Circle(this.ropeL.position.x, this.ropeL.position.y, 5);
  // this.drawHit.drawShape(this.visualPivotL);
  // this.armLayer.addChild(this.drawHit);
};

init.prototype.changeArms = function(id) {
  // change arms - functionality in arm constructor
  this.initArm.changeArmClothes(id);
};

init.prototype.removeChildType = function(parent, type) {
    for (var i = parent.children.length - 1; i >= 0; i--) {
        if ( parent.children[i].type === type ) {
      	parent.removeChild(parent.children[i]);
      }
    }

};


module.exports = new init();
