const todayElement = document.querySelector('#today');
const startButton = document.querySelector('#startButton');
const message = document.querySelector('#message');
const welcomeCard = document.querySelector('#welcomeCard');
const particleLayer = document.querySelector('.ambient-particles');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const dateText = new Intl.DateTimeFormat('zh-TW', {
  month: 'long',
  day: 'numeric',
  weekday: 'short'
}).format(new Date());

todayElement.textContent = dateText;

const particleColors = ['#d97855', '#e9b56d', '#8fab86'];

if (!reduceMotion.matches) {
  for (let index = 0; index < 14; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'ambient-particle';
    particle.style.setProperty('--size', `${4 + Math.random() * 7}px`);
    particle.style.setProperty('--duration', `${9 + Math.random() * 8}s`);
    particle.style.setProperty('--delay', `${Math.random() * -16}s`);
    particle.style.setProperty('--drift', `${-40 + Math.random() * 80}px`);
    particle.style.setProperty('--color', particleColors[index % particleColors.length]);
    particle.style.left = `${Math.random() * 100}%`;
    particleLayer.appendChild(particle);
  }

  welcomeCard.addEventListener('pointermove', (event) => {
    const bounds = welcomeCard.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 3;
    const rotateX = (.5 - (event.clientY - bounds.top) / bounds.height) * 3;
    welcomeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  welcomeCard.addEventListener('pointerleave', () => {
    welcomeCard.style.transform = '';
  });
}

function celebrate(button) {
  if (reduceMotion.matches) return;
  const bounds = button.getBoundingClientRect();

  for (let index = 0; index < 22; index += 1) {
    const piece = document.createElement('span');
    const angle = (Math.PI * 2 * index) / 22;
    const distance = 70 + Math.random() * 80;
    piece.className = 'confetti';
    piece.style.left = `${bounds.left + bounds.width / 2}px`;
    piece.style.top = `${bounds.top + bounds.height / 2}px`;
    piece.style.background = particleColors[index % particleColors.length];
    piece.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--y', `${Math.sin(angle) * distance - 25}px`);
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

startButton.addEventListener('click', (event) => {
  const bounds = startButton.getBoundingClientRect();
  startButton.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`);
  startButton.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`);
  startButton.classList.remove('ripple');
  void startButton.offsetWidth;
  startButton.classList.add('ripple');
  message.textContent = '準備好了，祝你今天收穫滿滿！ ✨';
  message.classList.add('show');
  startButton.querySelector('span:first-child').textContent = '上課囉！';
  startButton.classList.add('started');
  celebrate(startButton);
});
