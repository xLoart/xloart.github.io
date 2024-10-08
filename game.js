const canvas = document.getElementById('gameCanvas');
let ctx;
let isMouseDown = false;
let lastFireTime = 0;
const fireCooldown = 300; // Cooldown in milliseconds for holding fire
let isGameOver = false; // Track game over state
let waves = [];

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

const touches = {};
let joystick = { x: 0, y: 0, active: false };

window.addEventListener('DOMContentLoaded', (event) => {
    resizeCanvas(); // Set initial canvas size

    if (isMobileDevice()) {
        document.getElementById('joystickContainer').style.display = 'block';

        const joystickContainer = document.getElementById('joystickContainer');
        const joystickElement = document.getElementById('joystick');

        joystickContainer.addEventListener('touchstart', (e) => {
            Array.from(e.changedTouches).forEach(touch => {
                touches[touch.identifier] = touch;
                if (!joystick.active) {
                    joystick.active = true;
                    updateJoystickPosition(touch);
                }
            });
        });

        joystickContainer.addEventListener('touchmove', (e) => {
            Array.from(e.changedTouches).forEach(touch => {
                if (touches[touch.identifier]) {
                    updateJoystickPosition(touch);
                }
            });
        });

        joystickContainer.addEventListener('touchend', (e) => {
            Array.from(e.changedTouches).forEach(touch => {
                delete touches[touch.identifier];
                if (Object.keys(touches).length === 0) {
                    joystick.active = false;
                    joystick.x = 0;
                    joystick.y = 0;
                    joystickElement.style.top = '30px';
                    joystickElement.style.left = '30px';
                }
            });
        });

        canvas.addEventListener('touchstart', (e) => {
            Array.from(e.changedTouches).forEach(touch => {
                if (!touches[touch.identifier]) {
                    touches[touch.identifier] = touch;
                    fireProjectile();
                }
            });
        });

        canvas.addEventListener('touchend', (e) => {
            Array.from(e.changedTouches).forEach(touch => {
                delete touches[touch.identifier];
            });
        });
    }
    ctx = canvas.getContext('2d');
    document.getElementById('newGameButton').addEventListener('click', startNewGame);
    document.getElementById('loadGameButton').addEventListener('click', loadGame);
    document.getElementById('optionsButton').addEventListener('click', showOptions);
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

let player = { x: 400, y: 300, size: 20, speed: 5, health: 10, exp: 0, level: 1 };
let projectiles = [];
let keys = {};

function levelUp() {
    const expToNextLevel = player.level * 100; // Example: 100 EXP per level
    if (player.exp >= expToNextLevel) {
        player.level++;
        player.exp -= expToNextLevel;
        player.health += 5; // Increase health by 5 for each level-up
        console.log(`Level Up! New Level: ${player.level}, Health: ${player.health}`);
    }
}
function fireProjectile() {
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    const speed = 10;
    projectiles.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
    });
}

let showNoSpawnArea = true; // Variable to toggle the visibility of the no-spawn area
const noSpawnRadius = 200; // Radius of the no-spawn area
let mouse = { x: 0, y: 0 };
let lastSaveTime = 0;


window.startNewGame = function() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    console.log('Canvas is now visible.');
    waves = initializeWaves(player);
    currentWaveIndex = 0; // Reset wave index
    enemies = waves[currentWaveIndex].enemies; // Initialize enemies for the first wave
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



function update() {
    if (isGameOver) return; // Stop updating if the game is over

    const currentTime = Date.now(); // Get the current time in milliseconds

    // Handle firing when the mouse is held down
    if (isMouseDown && currentTime - lastFireTime >= fireCooldown) {
        fireProjectile();
        lastFireTime = currentTime;
    }

    enemies.forEach(enemy => {
        enemy.moveTowards(player.x, player.y);

        // Check for collision with player
        if (Math.abs(enemy.x - player.x) < player.size / 2 + 10 &&
            Math.abs(enemy.y - player.y) < player.size / 2 + 10) {
            if (currentTime - enemy.lastAttackTime >= enemy.attackCooldown) {
                player.health -= enemyDefinitions[enemy.id].strength; // Apply damage
                enemy.lastAttackTime = currentTime; // Update last attack time
                if (player.health <= 0) {
                    player.health = 0;
                    isGameOver = true; // Set game over state
                }
            }
        }
    });
    if (isMobileDevice() && joystick.active) {
        player.x = Math.max(Math.min(player.x + joystick.x * 0.1, canvas.width - player.size / 2), player.size / 2);
        player.y = Math.max(Math.min(player.y + joystick.y * 0.1, canvas.height - player.size / 2), player.size / 2);
    } else {
        if (keys['arrowup'] || keys['w']) player.y = Math.max(player.y - player.speed, player.size / 2);
        if (keys['arrowdown'] || keys['s']) player.y = Math.min(player.y + player.speed, canvas.height - player.size / 2);
        if (keys['arrowleft'] || keys['a']) player.x = Math.max(player.x - player.speed, player.size / 2);
        if (keys['arrowright'] || keys['d']) player.x = Math.min(player.x + player.speed, canvas.width - player.size / 2);
    }

    projectiles.forEach((proj, projIndex) => {
        proj.x += proj.vx;
        proj.y += proj.vy;
        if (proj.x < 0 || proj.x > canvas.width || proj.y < 0 || proj.y > canvas.height) {
            projectiles.splice(projIndex, 1);
        } else {
            enemies.forEach((enemy, enemyIndex) => {
                if (proj.x > enemy.x - 10 && proj.x < enemy.x + 10 &&
                    proj.y > enemy.y - 10 && proj.y < enemy.y + 10) {
                    enemy.takeDamage(1);
                    projectiles.splice(projIndex, 1);
                    if (enemy.health <= 0) {
                        player.exp += enemyDefinitions[enemy.id].exp; // Award EXP
                        enemies.splice(enemyIndex, 1);
                        levelUp(); // Check for level-up
                    }
                }
            });
        }
    });

    if (enemies.length === 0 && currentWaveIndex < waves.length) {
        console.log(`Starting wave ${currentWaveIndex + 1} with ${waves[currentWaveIndex].enemies.length} enemies.`);
        enemies = waves[currentWaveIndex].enemies;
        console.log(`Wave ${currentWaveIndex + 1} initialized with ${enemies.length} enemies.`);
        currentWaveIndex++;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px sans-serif';
        ctx.fillText('Click to return to the main menu', canvas.width / 2, canvas.height / 2 + 50);
        return; // Stop drawing other elements
    }
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);

    // Draw player health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 10); // Background bar
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, (player.health / 10) * 100, 10); // Health bar

    // Draw player level and EXP
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Level: ${player.level}`, 10, 40);
    ctx.fillText(`EXP: ${player.exp}`, 10, 60);
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Wave: ${currentWaveIndex + 1}`, canvas.width - 100, 30);

    // Draw remaining enemies
    ctx.fillText(`Enemies: ${enemies.length}`, canvas.width - 100, 60);
    ctx.fillStyle = 'red';
    projectiles.forEach(proj => {
        ctx.fillRect(proj.x - 2, proj.y - 2, 4, 4);
    });

    // Draw no-spawn area if enabled
    if (showNoSpawnArea) {
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(player.x, player.y, noSpawnRadius, 0, Math.PI * 2);
        ctx.stroke();
    }
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

window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('click', () => {
    if (isGameOver) {
        isGameOver = false; // Reset game over state
        window.location.reload(); // Reload to return to the main menu
    } else {
        fireProjectile();
    }
});
