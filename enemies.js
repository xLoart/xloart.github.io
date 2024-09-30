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
    1: { color: 'red', speed: 1, health: 1, strength: 2, attackCooldown: 1000, exp: 10 },
    2: { color: 'green', speed: 2, health: 1, strength: 2, attackCooldown: 800, exp: 20 },
    3: { color: 'blue', speed: 2, health: 2, strength: 4, attackCooldown: 600, exp: 30 },
    4: { color: 'yellow', speed: 1.2, health: 12, strength: 4, attackCooldown: 500, exp: 40 },
    5: { color: 'purple', speed: 3, health: 6, strength: 6, attackCooldown: 400, exp: 50 },
    6: { color: 'orange', speed: 3, health: 2, strength: 7, attackCooldown: 300, exp: 60 }
};

function createEnemy(id, x, y, waveNumber) {
    const def = enemyDefinitions[id];
    if (!def) {
        console.error(`Enemy definition not found for ID: ${id}`);
        return null; // Return null if the definition is not found
    }
    const healthMultiplier = 1 + Math.log(waveNumber + 1) * 0.05; // Logarithmic scaling for health
    const speedMultiplier = 1 + waveNumber * 0.02; // Linear scaling for speed
    const strengthMultiplier = 1 + waveNumber * 0.03; // Linear scaling for strength

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

