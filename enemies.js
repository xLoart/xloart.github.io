class Enemy {
    constructor(x, y, health, speed, color) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = speed;
        this.color = color;
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
    1: { color: 'red', speed: 2, health: 100 },
    2: { color: 'green', speed: 2, health: 100 },
    3: { color: 'blue', speed: 2, health: 100 },
    4: { color: 'yellow', speed: 3, health: 150 },
    5: { color: 'purple', speed: 3, health: 150 },
    6: { color: 'orange', speed: 3, health: 150 }
};

function createEnemy(id, x, y) {
    const def = enemyDefinitions[id];
    return new Enemy(x, y, def.health, def.speed, def.color);
}

