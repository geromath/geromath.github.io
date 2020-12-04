let myComponent;

window.state = {};

let controls = [];

function startGame() {
  gameArea.start();
  myComponent = new component(10, 120, 30, 30);
}

let gameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.getElementById('gameContainer').appendChild(this.canvas);
    this.interval = setInterval(update, 20);

    window.addEventListener('keydown', function (e) {
      gameArea.key = true;
      if (!controls.includes(e.key)) {
        controls.push(e.key);
      }
    });

    window.addEventListener('keyup', function (e) {
      controls.splice(controls.indexOf(e.key), 1);
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// Update functions go here
function update() {
  if (controls.length === 0) {
    gameArea.key = false;
  }
  gameArea.clear();
  myComponent.update();
}

function component(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.speed = 1;

  this.update = function () {
    context = gameArea.context;
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);

    if (gameArea.key) {
      console.log(controls);
    }
    if (gameArea.key && controls.includes('d')) {
      this.x += this.speed;
    }
    if (gameArea.key && controls.includes('a')) {
      this.x -= this.speed;
    }
    if (gameArea.key && controls.includes('w')) {
      this.y -= this.speed;
    }
    if (gameArea.key && controls.includes('s')) {
      this.y += this.speed;
    }
  };
}

startGame();
