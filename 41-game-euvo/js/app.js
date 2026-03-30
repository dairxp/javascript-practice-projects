// Juego de Navegador Simple - Lo más básico de JavaScript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Nave
const nave = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    w: 40,
    h: 40,
    color: '#0ff',
    speed: 5
};

// Obstáculo
let obstaculo = {
    x: Math.random() * (canvas.width - 40),
    y: -40,
    w: 40,
    h: 40,
    color: '#f00',
    speed: 3
};

let gameOver = false;

function dibujarNave() {
    ctx.fillStyle = nave.color;
    ctx.fillRect(nave.x, nave.y, nave.w, nave.h);
}

function dibujarObstaculo() {
    ctx.fillStyle = obstaculo.color;
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.w, obstaculo.h);
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moverObstaculo() {
    obstaculo.y += obstaculo.speed;
    if (obstaculo.y > canvas.height) {
        obstaculo.y = -40;
        obstaculo.x = Math.random() * (canvas.width - obstaculo.w);
    }
}

function detectarColision() {
    if (
        nave.x < obstaculo.x + obstaculo.w &&
        nave.x + nave.w > obstaculo.x &&
        nave.y < obstaculo.y + obstaculo.h &&
        nave.y + nave.h > obstaculo.y
    ) {
        gameOver = true;
    }
}

function mostrarGameOver() {
    ctx.fillStyle = '#fff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Game Over!', canvas.width / 2, canvas.height / 2);
}

function loop() {
    limpiarCanvas();
    dibujarNave();
    dibujarObstaculo();
    moverObstaculo();
    detectarColision();
    if (gameOver) {
        mostrarGameOver();
        return;
    }
    requestAnimationFrame(loop);
}

// Controles
window.addEventListener('keydown', function(e) {
    if (gameOver) return;
    if (e.key === 'ArrowLeft' && nave.x > 0) {
        nave.x -= nave.speed;
    }
    if (e.key === 'ArrowRight' && nave.x < canvas.width - nave.w) {
        nave.x += nave.speed;
    }
});

loop();
