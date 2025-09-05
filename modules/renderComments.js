// render.js
import { escapeHtml } from './utils.js'

export function renderComments(comments, container) {
    container.innerHTML = ''

    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.className = 'comment'

        li.innerHTML = `
      <div class="comment-header">
        <div>${escapeHtml(comment.name)}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${escapeHtml(comment.text)}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likesCount}</span>
          <button class="like-button ${comment.liked ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>`

        // Добавляем обработчик клика для цитирования
        li.addEventListener('click', (event) => {
            // Если клик по кнопке лайка — ничего не делаем
            if (event.target.classList.contains('like-button')) {
                return
            }

            // Иначе вставляем цитату
            const commentTextDiv = li.querySelector('.comment-text')

            // Вставляем цитату в поле
            const textInput = document.querySelector('.add-form-text')

            // Добавляем цитату с ">" в начало строки
            textInput.value += `> ${commentTextDiv.textContent}\n\n`

            // Валидируем текст (если есть функция)
            if (typeof validateText === 'function') {
                validateText()
            }
        })

        container.appendChild(li)
    })
}
