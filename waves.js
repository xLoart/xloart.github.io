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
    new Enemy(100, 100, 100, 2, 'red'),
    new Enemy(200, 100, 100, 2, 'green'),
    new Enemy(300, 100, 100, 2, 'blue')
]);

const wave2 = new Wave([
    new Enemy(100, 100, 150, 3, 'yellow'),
    new Enemy(200, 100, 150, 3, 'purple'),
    new Enemy(300, 100, 150, 3, 'orange')
]);

export { wave1, wave2 };
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
    new Enemy(100, 100, 100, 2, 'red'),
    new Enemy(200, 100, 100, 2, 'green'),
    new Enemy(300, 100, 100, 2, 'blue')
]);

const wave2 = new Wave([
    new Enemy(100, 100, 150, 3, 'yellow'),
    new Enemy(200, 100, 150, 3, 'purple'),
    new Enemy(300, 100, 150, 3, 'orange')
]);

let enemies = [...wave1.enemies, ...wave2.enemies];
