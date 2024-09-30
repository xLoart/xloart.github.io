class Wave {
    constructor(enemyConfigs) {
        this.enemies = this.createEnemies(enemyConfigs);
    }

    createEnemies(enemyConfigs, player) {
        const enemies = [];
        enemyConfigs.forEach(config => {
            const [id, count] = config.split('.');
            for (let i = 0; i < parseInt(count); i++) {
                // Randomize initial positions for demonstration
                const x = Math.random() * 800;
                const y = Math.random() * 600;
                // Ensure enemies do not spawn within the no-spawn radius
                const noSpawnRadius = 100;
                const distanceToPlayer = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
                if (distanceToPlayer > noSpawnRadius) {
                    enemies.push(createEnemy(parseInt(id), x, y));
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
        new Wave(['1.1', '2.1'], player),
        new Wave(['3.1', '4.1'], player)
    ];
}
    new Wave(['1.1', '2.1']),
    new Wave(['3.1', '4.1'])
];

let currentWaveIndex = 0;
let enemies = [];
