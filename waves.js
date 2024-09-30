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


                const enemy = createEnemy(parseInt(id), x, y, waveNumber);
                if (enemy) {
                    enemies.push(enemy);
                } else {
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
    const waves = [];
    const enemyProgression = [
        { id: 1, untilWave: 5 },  // Red enemies until wave 5
        { id: 2, untilWave: 10 }, // Green enemies start appearing until wave 10
        { id: 3, untilWave: 15 }, // Blue enemies start appearing until wave 15
        { id: 4, untilWave: 20 }, // Yellow enemies start appearing until wave 20
        { id: 5, untilWave: 25 }, // Purple enemies start appearing until wave 25
        { id: 6, untilWave: 30 }  // Orange enemies start appearing until wave 30
    ];

    for (let i = 0; i < 50; i++) {
        const enemyConfigs = [];
        const baseEnemyCount = 2 + Math.floor(i / 5); // Increase base enemy count every 5 waves

        // Determine which enemy types are available for this wave
        const availableEnemies = enemyProgression.filter(ep => i < ep.untilWave).map(ep => ep.id);

        for (let j = 0; j < baseEnemyCount; j++) {
            const enemyId = availableEnemies[j % availableEnemies.length]; // Cycle through available enemy types
            const count = 1 + Math.floor(i / 10); // Increase count every 10 waves
            enemyConfigs.push(`${enemyId}.${count}`);
        }

        waves.push(new Wave(enemyConfigs, player, i));
    }
    return waves;
}

let currentWaveIndex = 0;
let enemies = [];
