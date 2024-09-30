const canvas = document.getElementById('gameCanvas');
let ctx;

window.addEventListener('DOMContentLoaded', (event) => {
    ctx = canvas.getContext('2d');
    document.getElementById('newGameButton').addEventListener('click', startNewGame);
    document.getElementById('loadGameButton').addEventListener('click', loadGame);
    document.getElementById('optionsButton').addEventListener('click', showOptions);
});

let player = { x: 400, y: 300, size: 20, speed: 5 };
let projectiles = [];
let keys = {};
let mouse = { x: 0, y: 0 };
let lastSaveTime = 0;

import { wave1, wave2 } from './waves.js';

let enemies = [...wave1.enemies, ...wave2.enemies];

window.startNewGame = function() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    requestAnimationFrame(gameLoop);
}

window.loadGame = function() {
    const savedData = localStorage.getItem('gameState');
    if (savedData) {
        const state = JSON.parse(savedData);
        player = state.player;
        projectiles = state.projectiles;
    }
    startNewGame();
}

window.showOptions = function() {
    alert('Options are not implemented yet.');
}

function saveGame() {
    const state = { player, projectiles };
    localStorage.setItem('gameState', JSON.stringify(state));
}

function gameLoop(timestamp) {
    if (timestamp - lastSaveTime > 45000) {
        saveGame();
        lastSaveTime = timestamp;
    }

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

import { wave1, wave2 } from './waves.js';

let enemies = [...wave1.enemies, ...wave2.enemies];

function update() {
    enemies.forEach(enemy => {
        enemy.moveTowards(player.x, player.y);
    });
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    projectiles.forEach((proj, index) => {
        proj.x += proj.vx;
        proj.y += proj.vy;
        if (proj.x < 0 || proj.x > canvas.width || proj.y < 0 || proj.y > canvas.height) {
            projectiles.splice(index, 1);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);

    // Draw projectiles
    ctx.fillStyle = 'red';
    projectiles.forEach(proj => {
        ctx.fillRect(proj.x - 2, proj.y - 2, 4, 4);
    });

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x - 10, enemy.y - 10, 20, 20);
    });
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + Math.cos(angle) * 30, player.y + Math.sin(angle) * 30);
    ctx.stroke();
}

window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('click', () => {
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    const speed = 10;
    projectiles.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
    });
});
