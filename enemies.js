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
    1: { color: 'red', speed: 1, health: 1, strength: 2 },
    2: { color: 'green', speed: 2, health: 2, strength: 3 },
    3: { color: 'blue', speed: 2, health: 2, strength: 4 },
    4: { color: 'yellow', speed: 3, health: 2, strength: 5 },
    5: { color: 'purple', speed: 3, health: 2, strength: 6 },
    6: { color: 'orange', speed: 3, health: 2, strength: 7 }
};

function createEnemy(id, x, y) {
    const def = enemyDefinitions[id];
    return new Enemy(x, y, def.health, def.speed, def.color, id); // Pass id
}

