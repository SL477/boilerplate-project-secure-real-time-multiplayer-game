import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');
const SPEED = 10;

const player = new Player({x: canvas.width / 2, y: canvas.height / 2, score: 0, id: Date.now()});

const collectable = new Collectible({x: 1, y: 2, value: 5, id: 1});

const clearGrid = () => {
    context.clearRect(0,0,canvas.width, canvas.height);
};

// Collectable
const resetCollectable = () => {
    collectable.x = Math.floor(Math.random() * 620);
    collectable.y = Math.floor(Math.random() * 440) + 20;
};
  
const startGame = () => {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.score = 0;
    resetCollectable();
};

startGame();
console.log('player',player);
socket.emit("test", player);

let rank = '';
let players = [];

const updateGameArea = () => {
    clearGrid();
    
    // Draw ghosts
    context.fillStyle = "grey";
    players.forEach(p => {
        if (p.id !== player.id) {
            context.fillRect(p.x, p.y, 20, 20);
        }
    });

    // Draw player
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, 20, 20);
    //context.fillRect(15, 15, 20, 20);

    // Draw collectible
    context.fillStyle = "green";
    context.fillRect(collectable.x, collectable.y, 20, 20);

    // Text
    context.fillStyle = "purple";
    context.font = "20px Arial";
    context.fillText('Score: ' + player.score.toString(), 10, 20);
    context.fillText(rank, 500, 20);

    // Emit score, id
    socket.emit("playerdata", {pid: player.id, score: player.score, x: player.x, y: player.y});
};

// Keyboard listener
document.addEventListener("keydown", (evt) => {
    console.log('keypress', evt.keyCode);
    if (evt.keyCode == 87 || evt.keyCode == 38) {
        // Up
        player.movePlayer('UP', SPEED);
    }
    if (evt.keyCode == 65 || evt.keyCode ==37) {
        // Left
        player.movePlayer('LEFT', SPEED);
    }
    if (evt.keyCode == 68 || evt.keyCode == 39) {
        // Right
        player.movePlayer('RIGHT', SPEED);
    }
    if (evt.keyCode == 83 || evt.keyCode == 40) {
        // Down
        player.movePlayer('DOWN', SPEED);
    }

    if (player.collision(collectable)) {
        console.log("score");
        resetCollectable();
    }
});

// Listen to player info
socket.on('allplayers', msg => {
    // convert from object to array
    let arr = [];
    Object.keys(msg).forEach(o => {
        arr.push({id: msg[o].pid, score: msg[o].score, x: msg[o].x, y: msg[o].y});
    });
    //console.log(msg, arr);
    rank = player.calculateRank(arr);
    players = arr;
});
  
let interval = setInterval(updateGameArea, 20);
updateGameArea();
