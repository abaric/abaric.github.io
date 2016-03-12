var PARTICLE_QUANT = 100;
var FPS = 500;
var BOUNCE = -1;
//var PARTICLE_COLOR = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
var PARTICLE_COLOR = 'rgb(40,60,20)';
var ARC_RADIUS = 1;

var Particles = function($element) {
if ($element.length === 0) {
  return;
}

this.$element = $element;
      this.lastTimeStamp = null;
      this.particles = [];

      this.init();
};

var proto = Particles.prototype;
proto.init = function() {
  this.createChildren()
    .layout()
    .enable();
};

  proto.createChildren = function() {
      this.canvas = this.$element[0];
      this.context =      this.canvas.getContext('2d');
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.lastTimeStamp = new Date().getTime();

      return this;
  };


  proto.layout = function() {
      window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame         ||
          window.mozRequestAnimationFrame;
      })();

      return this;
  };

  proto.removeChildren = function() {
      this.context = null;
      this.canvasWidth = null;
      this.canvasHeight = null;
      this.lastTimeStamp = null;

      return this;
  };

  proto.enable = function() {
      this.createParticleData();
      this.renderLoop();
  };




 
  proto.createParticleData = function() {
      var i = 0;
      var l = PARTICLE_QUANT;

      for(; i < l; i++) {
          this.particles[i] = {};
          this.setParticleData(this.particles[i]);
      }
  };

  proto.setParticleData = function(particle) {
      particle.x = Math.random() * this.canvasWidth;
      particle.y = Math.random() * this.canvasHeight;
      particle.vx = (Math.random()) - 0.5;
      particle.vy = (Math.random()) - 0.5;
  };

  proto.update = function() {
      var i = 0;
      var l = PARTICLE_QUANT;
    
      for (; i < l; i++) {
          var particle = this.particles[i];

          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x > this.canvasWidth) {
              particle.x = this.canvasWidth;
              particle.vx *= BOUNCE;
          } else if (particle.x < 0) {
              particle.x = 0;
              particle.vx *= BOUNCE;
          }

          if (particle.y > this.canvasHeight) {
              particle.y = this.canvasHeight;
              particle.vy *= BOUNCE;
          } else if (particle.y < 0) {
              particle.y = 0;
              particle.vy *= BOUNCE;
          }
      }
  };

  proto.draw = function() {
      var i = 0;

      if (!this.context) {
          return;
      }

      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.strokeStyle = 'd32542';
      //this.context.strokeStyle = PARTICLE_COLOR;
    
    
      for(; i < PARTICLE_QUANT; i++) {
          var particle = this.particles[i];
          this.context.save();
          this.context.beginPath();
          this.context.arc(particle.x, particle.y, ARC_RADIUS, 0, Math.PI * 2);
          this.context.stroke();
          this.context.restore();
      }
  };

  proto.renderLoop = function() {
      requestAnimationFrame(this.renderLoop.bind(this));
      this.update();
      this.draw();
  };

var particles = new Particles($('#js-particles'));