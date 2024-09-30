class Wave {
    constructor(enemyConfigs, player) {
        this.enemies = this.createEnemies(enemyConfigs, player);
    }

    createEnemies(enemyConfigs, player) {
        const enemies = [];
        enemyConfigs.forEach(config => {
            const [id, count] = config.split('.');
            for (let i = 0; i < parseInt(count); i++) {
                // Randomize initial positions for demonstration
                let x, y;
                const noSpawnRadius = 200;
                let distanceToPlayer;
                do {
                    x = Math.random() * 800;
                    y = Math.random() * 600;
                    distanceToPlayer = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
                } while (distanceToPlayer <= noSpawnRadius);

                // If the enemy is within the no-spawn radius, reposition it off-screen
                if (distanceToPlayer <= noSpawnRadius) {
                    const angle = Math.random() * Math.PI * 2;
                    x = player.x + Math.cos(angle) * (noSpawnRadius + 50);
                    y = player.y + Math.sin(angle) * (noSpawnRadius + 50);
                }

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

function initializeWaves(player) {
    return [
        new Wave(['1.1', '2.1'], player),
        new Wave(['3.1', '4.1'], player)
    ];
}

let currentWaveIndex = 0;
let enemies = [];
