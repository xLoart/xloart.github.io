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
    1: { color: 'red', speed: 1, health: 1, strength: 2, attackCooldown: 1000 },
    2: { color: 'green', speed: 2, health: 2, strength: 3, attackCooldown: 800 },
    3: { color: 'blue', speed: 2, health: 2, strength: 4, attackCooldown: 600 },
    4: { color: 'yellow', speed: 3, health: 2, strength: 5, attackCooldown: 500 },
    5: { color: 'purple', speed: 3, health: 2, strength: 6, attackCooldown: 400 },
    6: { color: 'orange', speed: 3, health: 2, strength: 7, attackCooldown: 300 }
};

function createEnemy(id, x, y) {
    const def = enemyDefinitions[id];
    const enemy = new Enemy(x, y, def.health, def.speed, def.color, id);
    enemy.attackCooldown = def.attackCooldown; // Set attack cooldown
    return enemy;
}

