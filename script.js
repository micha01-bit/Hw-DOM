 "use strict";

// Получаем ссылки на элементы формы и список комментариев
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('.comments');

// Объявляем переменные для хранения валидности полей
let isNameValid = false;
let isTextValid = false;

// Функция для проверки валидности имени
function validateName() {
  if (nameInput.value.trim() !== "") {
    isNameValid = true;
  } else {
    isNameValid = false;
  }
}

// Функция для проверки валидности комментария
function validateText() {
  if (textInput.value.trim() !== "") {
    isTextValid = true;
  } else {
    isTextValid = false;
  }
}

// Обработчики для валидации при вводе
nameInput.addEventListener('input', () => {
  validateName();
});

textInput.addEventListener('input', () => {
  validateText();
});

// Обработчик клика по кнопке "Написать"
addButton.addEventListener('click', () => {
  // Проверяем валидность полей
  validateName();
  validateText();

  if (!isNameValid || !isTextValid) {
    alert("Пожалуйста, заполните оба поля: имя и комментарий.");
    return;
  }

  const name = nameInput.value.trim();
  const commentText = textInput.value.trim();

  // Получаем текущие дату и время в нужном формате
  const now = new Date();
  
  // Форматируем дату и время: дд.мм.гг чч:мм
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() +1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const dateStr = `${day}.${month}.${year} ${hours}:${minutes}`;

  // Создаем шаблонную строку нового комментария с кнопкой лайка
  const newCommentHTML = `
        <li class="comment">
          <div class="comment-header">
            <div>${name}</div>
            <div>${dateStr}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${commentText}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>`;

  // Добавляем новый комментарий в список
  commentsList.innerHTML += newCommentHTML;

  // Очищаем поля формы после добавления
  nameInput.value = "";
  textInput.value = "";
});

// Обработчик делегирования для лайков
commentsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-button')) {
    const likeButton = event.target;
    const commentItem = likeButton.closest('.comment');
    const likesCounterSpan = commentItem.querySelector('.likes-counter');

    let likesCount = parseInt(likesCounterSpan.textContent);

    if (likeButton.classList.contains('-active-like')) {
      // Убираем лайк
      likeButton.classList.remove('-active-like');
      likesCount -=1;
    } else {
      // ставим лайк
      likeButton.classList.add('-active-like');
      likesCount +=1;
    }

    likesCounterSpan.textContent= likesCount;
  }
});