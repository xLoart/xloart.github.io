class Enemy {
    constructor(x, y, health, speed, color, id) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = speed;
        this.color = color;
        this.id = id; // Store id
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
    1: { color: 'red', speed: 1, health: 1, strength: 10 }, // Add strength property
    2: { color: 'green', speed: 2, health: 2, strength: 15 },
    3: { color: 'blue', speed: 2, health: 2, strength: 20 },
    4: { color: 'yellow', speed: 3, health: 2, strength: 25 },
    5: { color: 'purple', speed: 3, health: 2, strength: 30 },
    6: { color: 'orange', speed: 3, health: 2, strength: 35 }
};

function createEnemy(id, x, y) {
    const def = enemyDefinitions[id];
    return new Enemy(x, y, def.health, def.speed, def.color, id); // Pass id
}

