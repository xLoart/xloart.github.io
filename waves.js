import Enemy from './enemies.js';

class Wave {
    constructor(enemies) {
        this.enemies = enemies;
    }

    spawnEnemies() {
        // Logic to spawn enemies on the canvas
        this.enemies.forEach(enemy => {
            // Initialize enemy position and add to game
        });
    }
}

const wave1 = new Wave([
    new Enemy(100, 100, 100, 2),
    new Enemy(200, 100, 100, 2),
    new Enemy(300, 100, 100, 2)
]);

const wave2 = new Wave([
    new Enemy(100, 100, 150, 3),
    new Enemy(200, 100, 150, 3),
    new Enemy(300, 100, 150, 3)
]);

export { wave1, wave2 };
