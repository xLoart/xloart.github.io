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
        new Wave(['1.4', '2.1'], player, 1),  // Wave 1: 4x Enemy 1, 1x Enemy 2
        new Wave(['3.1', '4.1'], player, 2),  // Wave 2: 1x Enemy 3, 1x Enemy 4
        new Wave(['1.3', '2.2', '5.1'], player, 3), // Wave 3: 3x Enemy 1, 2x Enemy 2, 1x Enemy 5
        new Wave(['2.3', '4.2'], player, 4),  // Wave 4: 3x Enemy 2, 2x Enemy 4
        new Wave(['1.2', '3.3', '5.1'], player, 5), // Wave 5: 2x Enemy 1, 3x Enemy 3, 1x Enemy 5
        new Wave(['6.1', '2.2', '3.1'], player, 6), // Wave 6: 1x Enemy 6, 2x Enemy 2, 1x Enemy 3
        new Wave(['4.2', '5.2'], player, 7),  // Wave 7: 2x Enemy 4, 2x Enemy 5
        new Wave(['2.4', '6.2'], player, 8),  // Wave 8: 4x Enemy 2, 2x Enemy 6
        new Wave(['3.3', '5.3', '7.1'], player, 9), // Wave 9: 3x Enemy 3, 3x Enemy 5, 1x Enemy 7
        new Wave(['1.1', '4.4', '6.1'], player, 10), // Wave 10: 1x Enemy 1, 4x Enemy 4, 1x Enemy 6
        
        // Continue scaling waves with gradual introduction of tougher enemies
        new Wave(['3.4', '6.2'], player, 11),  // Wave 11
        new Wave(['4.3', '5.4', '8.1'], player, 12), // Wave 12
        new Wave(['6.3', '7.2'], player, 13),  // Wave 13
        new Wave(['5.4', '8.2'], player, 14),  // Wave 14
        new Wave(['7.3', '9.1'], player, 15),  // Wave 15
        new Wave(['6.4', '8.3'], player, 16),  // Wave 16
        new Wave(['9.2', '5.3'], player, 17),  // Wave 17
        new Wave(['10.1', '8.4'], player, 18), // Wave 18
        new Wave(['7.4', '9.3'], player, 19),  // Wave 19
        new Wave(['10.2', '9.4'], player, 20), // Wave 20
        
        // Mid game, phasing out easier enemies (1 and 2), increasing difficulty
        new Wave(['6.4', '10.3'], player, 21), // Wave 21
        new Wave(['8.4', '11.1'], player, 22), // Wave 22
        new Wave(['9.3', '10.4'], player, 23), // Wave 23
        new Wave(['11.2', '7.4'], player, 24), // Wave 24
        new Wave(['8.5', '12.1'], player, 25), // Wave 25
        new Wave(['10.4', '11.3'], player, 26), // Wave 26
        new Wave(['12.2', '9.5'], player, 27), // Wave 27
        new Wave(['11.4', '8.4'], player, 28), // Wave 28
        new Wave(['12.3', '9.4'], player, 29), // Wave 29
        new Wave(['11.5', '10.5'], player, 30), // Wave 30
        
        // Late game, only harder enemies (5-12)
        new Wave(['10.5', '12.4'], player, 31), // Wave 31
        new Wave(['9.5', '11.5'], player, 32),  // Wave 32
        new Wave(['12.5', '8.5'], player, 33),  // Wave 33
        new Wave(['10.5', '11.4'], player, 34), // Wave 34
        new Wave(['12.4', '9.5'], player, 35),  // Wave 35
        new Wave(['11.5', '10.4'], player, 36), // Wave 36
        new Wave(['12.5', '9.4'], player, 37),  // Wave 37
        new Wave(['10.5', '12.4'], player, 38), // Wave 38
        new Wave(['9.5', '11.4'], player, 39),  // Wave 39
        new Wave(['12.5', '10.5'], player, 40), // Wave 40
        
        // Endgame waves (most difficult)
        new Wave(['11.5', '12.5'], player, 41), // Wave 41
        new Wave(['12.5', '10.5'], player, 42), // Wave 42
        new Wave(['11.5', '9.5'], player, 43),  // Wave 43
        new Wave(['12.5', '10.4'], player, 44), // Wave 44
        new Wave(['11.5', '12.4'], player, 45), // Wave 45
        new Wave(['12.5', '10.5'], player, 46), // Wave 46
        new Wave(['12.5', '11.5'], player, 47), // Wave 47
        new Wave(['12.5', '12.4'], player, 48), // Wave 48
        new Wave(['12.5', '11.4'], player, 49), // Wave 49
        new Wave(['12.5', '12.5'], player, 50)  // Wave 50
    ];
}


let currentWaveIndex = 0;
let enemies = [];
