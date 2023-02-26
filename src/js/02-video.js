import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');

// Створюємо екземпляр
const player = new Player(iframe);

// Відстежуємо події timeupdate 
player.on('timeupdate', throttle(e => {

  //Потім зберегаємо час відтворення у локальне сховище
  localStorage.setItem('videoplayer-current-time', e.seconds);
}, 1000) // Час відтворення оновлюється у сховищі не частіше, ніж раз на секунду
);

// Відновлюємо відтворення зі збереженої позиції під час перезавантаження сторінки.
// Якщо localStorage пустий, то getItem поверне null.
player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0)