class Wave {
    constructor(enemyConfigs, player, waveNumber) {
        this.enemies = this.createEnemies(enemyConfigs, player, waveNumber);
    }

    createEnemies(enemyConfigs, player, waveNumber) {
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


                enemies.push(createEnemy(parseInt(id), x, y, waveNumber));
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
    const waves = [];
    for (let i = 0; i < 50; i++) {
        const enemyConfigs = [];
        const baseEnemyCount = 2 + Math.floor(i / 5); // Increase base enemy count every 5 waves
        const enemyTypes = Object.keys(enemyDefinitions).length;

        for (let j = 0; j < baseEnemyCount; j++) {
            const enemyId = (j % enemyTypes) + 1; // Cycle through enemy types
            const count = 1 + Math.floor(i / 10); // Increase count every 10 waves
            enemyConfigs.push(`${enemyId}.${count}`);
        }

        waves.push(new Wave(enemyConfigs, player, i));
    }
    return waves;
}

let currentWaveIndex = 0;
let enemies = [];
