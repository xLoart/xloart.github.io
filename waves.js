class Wave {
    constructor(enemyConfigs, player, waveNumber) {
        this.enemies = this.createEnemies(enemyConfigs, player, waveNumber);
    }

    createEnemies(enemyConfigs, player, waveNumber) {
        const enemies = [];
        console.log(`Creating enemies for wave ${waveNumber} with config:`, enemyConfigs);
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


                const enemy = createEnemy(parseInt(id), x, y, waveNumber);
                if (enemy) {
                    enemies.push(enemy);
                } else {
                    console.error(`Failed to create enemy with ID: ${id}`);
                    console.error(`Failed to create enemy with ID: ${id}`);
                }
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
        new Wave(['1.1', '2.1'], player, 1), // Wave 1: 1 red enemy, 1 green enemy
        new Wave(['3.1', '4.1'], player, 2)  // Wave 2: 1 blue enemy, 1 yellow enemy
        // Add more waves as needed
    ];
}

let currentWaveIndex = 0;
let enemies = [];
