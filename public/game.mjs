import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');


const player = new Player({x: canvas.width / 2, y: canvas.height / 2, score: 0, id: 1});

const collectable = new Collectible({x: 1, y: 2, value: 5, id: 1});

const clearGrid = () => {
    context.clearRect(0,0,canvas.width, canvas.height);
};
  
const startGame = () => {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.score = 0;

};

startGame();
console.log('player',player);
socket.emit("test", player);

const updateGameArea = () => {
    clearGrid();

    // Draw player
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, 20, 20);
    //context.fillRect(15, 15, 20, 20);
};
  
let interval = setInterval(updateGameArea, 20);
updateGameArea();
