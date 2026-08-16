const todayElement = document.querySelector('#today');
const startButton = document.querySelector('#startButton');
const message = document.querySelector('#message');

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
});
