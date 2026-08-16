const todayElement = document.querySelector('#today');
const startButton = document.querySelector('#startButton');
const message = document.querySelector('#message');
const welcomeCard = document.querySelector('#welcomeCard');
const celebration = document.querySelector('#celebration');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const dateText = new Intl.DateTimeFormat('zh-TW', {
  month: 'long',
  day: 'numeric',
  weekday: 'short'
}).format(new Date());

todayElement.textContent = dateText;

startButton.addEventListener('click', () => {
  message.textContent = '準備好了，祝你今天收穫滿滿！ ✨';
  message.classList.add('show');
  startButton.querySelector('span:first-child').textContent = '上課囉！';
  startButton.classList.add('started');

  if (!reduceMotion.matches) {
    createConfetti();
    window.setTimeout(() => startButton.classList.remove('started'), 600);
  }
});

welcomeCard.addEventListener('pointermove', (event) => {
  if (reduceMotion.matches || event.pointerType === 'touch') return;

  const bounds = welcomeCard.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  const rotateX = (0.5 - y) * 3;
  const rotateY = (x - 0.5) * 3;

  welcomeCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  welcomeCard.style.setProperty('--glow-x', `${x * 100}%`);
  welcomeCard.style.setProperty('--glow-y', `${y * 100}%`);
});

welcomeCard.addEventListener('pointerleave', () => {
  welcomeCard.style.transform = '';
  welcomeCard.style.removeProperty('--glow-x');
  welcomeCard.style.removeProperty('--glow-y');
});

function createConfetti() {
  const colors = ['#8b5cf6', '#d8b4fe', '#f0abfc', '#fbbf24', '#ffffff'];

  for (let index = 0; index < 22; index += 1) {
    const piece = document.createElement('span');
    const angle = (Math.PI * 2 * index) / 22;
    const distance = 90 + Math.random() * 130;

    piece.className = 'confetti';
    piece.style.setProperty('--confetti-color', colors[index % colors.length]);
    piece.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--y', `${Math.sin(angle) * distance - 70}px`);
    piece.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);
    piece.style.animationDelay = `${Math.random() * 100}ms`;
    celebration.append(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}
