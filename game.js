const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fruits = [
    { name: 'apple', image: 'images/apple.png' },
    { name: 'blackberry', image: 'images/blackberry.png' },
    { name: 'blueberry', image: 'images/blueberry.png' },
    { name: 'cherry', image: 'images/cherry.png' },
    { name: 'cranberry', image: 'images/cranberry.png' },
    { name: 'grape', image: 'images/grape.png' },
    { name: 'lemon', image: 'images/lemon.png' },
    { name: 'mango', image: 'images/mango.png' },
    { name: 'omija', image: 'images/omija.png' },
    { name: 'peach', image: 'images/peach.png' },
    { name: 'potato', image: 'images/potato.png' },
    { name: 'raspberry', image: 'images/raspberry.png' },
    { name: 'strawberry', image: 'images/strawberry.png' },
    { name: 'watermelon', image: 'images/watermelon.png' }
];

let fallingFruits = [];
let speed = 2; // 초기 속도
let score = 0;

function startGame() {
    fallingFruits = [];
    message.style.display = 'none';
    generateFruits();
    gameLoop();
}

function generateFruits() {
    for (let i = 0; i < 5; i++) {
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        fallingFruits.push({
            name: fruit.name,
            image: new Image(),
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            speed: Math.random() * 2 + speed
        });
        fallingFruits[i].image.src = fruit.image;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fallingFruits.forEach(fruit => {
        ctx.drawImage(fruit.image, fruit.x, fruit.y, 80, 80);
        fruit.y += fruit.speed;

        if (fruit.y > canvas.height) {
            fruit.y = Math.random() * -canvas.height;
            fruit.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    fallingFruits.forEach((fruit, index) => {
        if (x > fruit.x && x < fruit.x + 80 && y > fruit.y && y < fruit.y + 80) {
            if (fruit.name === 'omija') {
                score++;
                if (score % 3 === 0) {
                    speed += 1; // 속도 증가
                }
                nextRound();
            } else {
                alert(fruit.name); // 과일 이름 출력
                playSound(fruit.name);
            }
        }
    });
});

function nextRound() {
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
        startGame();
    }, 1000);
}

function playSound(name) {
    const audio = new Audio(`audio/${name}.mp3`);  // "audio" 폴더에 저장된 오디오 파일 재생
    audio.play();
}

startGame();
