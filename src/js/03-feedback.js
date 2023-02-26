import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state'; 


form.addEventListener(
  'input',
  throttle(e => {

    const objectToSave = { email: email.value, message: message.value };

    // Записуємо у локальне сховище об'єкт з полями.
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500) // Оновлення сховища раз на 500 мілісекунд
);


form.addEventListener('submit', e => {

  e.preventDefault(); 

  // Перевіряємо чи заповнені всі поля форми
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }

  console.log({ email: email.value, message: message.value });

  form.reset(); 
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

// Метод load який буде абстрагувати повторюваний код перевірки помилок парса
const load = key => {
  try {
    const serializedState = localStorage.getItem(key); 

    // Якщо елемента немає, то повернемо undefined, інакше розпарсимо елемент.
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {

    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);

// Перевіряємо стан сховища.
// Якщо  в сховищі є збережені дані, то заповнимо ними поля форми.
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
} 