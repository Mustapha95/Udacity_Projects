// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -100;
        let y_pos = [55, 140, 225];
        this.y = y_pos[getRandomIntInclusive(0, 2)];
        this.speed = getRandomIntInclusive(150, 450);
    }
    else if (player.x < this.x + 45 && player.x + 45 > this.x && player.y < this.y + 45 && player.y + 45 > this.y) {
        player.x = 200;
        player.y = 380;
        let board = document.querySelector('span');
        board.textContent = 'You Lose!';
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }
    update(dt) {
        if (this.y < 10) {
            this.x = 200;
            this.y = 380;
            let board = document.querySelector('span');
            board.textContent = 'You Won!';
        }
       
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        
            if (key == 'left' && this.x != -10)
                this.x -= 70;
            else if (key == 'up')
                this.y -= 70;
            else if (key == 'right' && this.x != 410)
                this.x += 70;
            else if (key == 'down' && this.y != 450)
                this.y += 70;
        
        let board = document.querySelector('span');
        board.textContent = 'Playing';
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let allEnemies = [];
let y_pos = [55, 140, 225];

for (let i = 0; i < 5; i++) {
    let y = getRandomIntInclusive(0, 2);
    let random_speed = getRandomIntInclusive(150, 450);
    let enemy = new Enemy(-100, y_pos[y], random_speed);
    allEnemies.push(enemy);
}

let player = new Player(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//from MDN
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}