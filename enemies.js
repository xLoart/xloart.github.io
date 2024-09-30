class Enemy {
    constructor(x, y, health, speed, color, id) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = speed;
        this.color = color;
        this.id = id; // Store id
        this.attackCooldown = 1000; // Cooldown in milliseconds
        this.lastAttackTime = 0; // Last time the enemy attacked
    }

    moveTowards(targetX, targetY) {
        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            // Handle enemy death if needed
        }
    }
}

const enemyDefinitions = {
    1: { color: 'red', speed: 1.0, health: 1, strength: 2, attackCooldown: 1000, exp: 10 },
    2: { color: 'green', speed: 1.2, health: 2, strength: 3, attackCooldown: 900, exp: 15 },
    3: { color: 'blue', speed: 1.4, health: 2, strength: 4, attackCooldown: 850, exp: 20 },
    4: { color: 'yellow', speed: 1.6, health: 3, strength: 5, attackCooldown: 800, exp: 25 },
    5: { color: 'purple', speed: 1.8, health: 3, strength: 6, attackCooldown: 750, exp: 30 },
    6: { color: 'orange', speed: 2.0, health: 4, strength: 7, attackCooldown: 700, exp: 35 },
    7: { color: 'pink', speed: 2.2, health: 4, strength: 8, attackCooldown: 650, exp: 40 },
    8: { color: 'cyan', speed: 2.4, health: 5, strength: 9, attackCooldown: 600, exp: 45 },
    9: { color: 'magenta', speed: 2.6, health: 5, strength: 10, attackCooldown: 550, exp: 50 },
    10: { color: 'lime', speed: 2.8, health: 6, strength: 11, attackCooldown: 500, exp: 55 },
    11: { color: 'teal', speed: 3.0, health: 6, strength: 12, attackCooldown: 450, exp: 60 },
    12: { color: 'violet', speed: 3.2, health: 7, strength: 13, attackCooldown: 400, exp: 65 }
};


function createEnemy(id, x, y, waveNumber) {
    const def = enemyDefinitions[id];
    if (!def) {
        console.error(`Enemy definition not found for ID: ${id}`);
        return null; // Return null if the definition is not found
    }
    const healthMultiplier = 1 + Math.log(waveNumber + 1) * 0.05; // Logarithmic scaling for health
    if (isNaN(healthMultiplier)) {
        console.error(`Health multiplier is NaN for waveNumber: ${waveNumber}`);
    }
    const speedMultiplier = 1 + waveNumber * 0.02; // Linear scaling for speed
    const strengthMultiplier = 1 + waveNumber * 0.03; // Linear scaling for strength

    const health = def.health * healthMultiplier;
    if (isNaN(health)) {
        console.error(`Calculated health is NaN for enemy ID: ${id}, waveNumber: ${waveNumber}`);
    }
    
    const enemy = new Enemy(
        x,
        y,
        def.health * healthMultiplier,
        def.speed * speedMultiplier,
        def.color,
        id
    );
    enemy.attackCooldown = def.attackCooldown;
    enemy.strength = def.strength * strengthMultiplier; // Scale strength
    return enemy;
}

