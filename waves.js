class Wave {
    constructor(enemyConfigs) {
        this.enemies = this.createEnemies(enemyConfigs);
    }

    createEnemies(enemyConfigs) {
        const enemies = [];
        enemyConfigs.forEach(config => {
            const [id, count] = config.split('.');
            for (let i = 0; i < parseInt(count); i++) {
                // Randomize initial positions for demonstration
                const x = Math.random() * 800;
                const y = Math.random() * 600;
                enemies.push(createEnemy(parseInt(id), x, y));
            }
        });
        return enemies;
    }

    spawnEnemies() {
        // Logic to spawn enemies on the canvas
        this.enemies.forEach(enemy => {
            // Initialize enemy position and add to game
        });
    }
}

const wave1 = new Wave(['1.3', '2.2']);
const wave2 = new Wave(['3.1', '4.2']);

let enemies = [...wave1.enemies, ...wave2.enemies];
