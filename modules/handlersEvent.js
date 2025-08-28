import { commentsData } from './commentsData.js'
import { renderComments } from './renderComments.js'

export function setupHandlers() {
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')
    const commentsContainer = document.getElementById('comments')

    let isNameValid = false
    let isTextValid = false

    function validateName() {
        isNameValid = nameInput.value.trim() !== ''
    }

    function validateText() {
        isTextValid = textInput.value.trim() !== ''
    }

    nameInput.addEventListener('input', validateName)
    textInput.addEventListener('input', validateText)

    // Обработка лайков через делегирование
    commentsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const index = parseInt(event.target.dataset.index)
            const comment = commentsData[index]

            if (comment.liked) {
                comment.liked = false
                comment.likesCount--
            } else {
                comment.liked = true
                comment.likesCount++
            }

            renderComments(commentsData, commentsContainer)
        }
    })

    // Обработка кнопки "Написать"
    addButton.addEventListener('click', () => {
        validateName()
        validateText()

        if (isNameValid && isTextValid) {
            const now = new Date()

            const day = String(now.getDate()).padStart(2, '0')
            const month = String(now.getMonth() + 1).padStart(2, '0')
            const yearShort = String(now.getFullYear()).slice(-2)

            const hours = String(now.getHours()).padStart(2, '0')
            const minutes = String(now.getMinutes()).padStart(2, '0')

            const dateStr = `${day}.${month}.${yearShort} ${hours}:${minutes}`

            // Создаем новый комментарий
            commentsData.push({
                name: nameInput.value.trim(),
                date: dateStr,
                text: textInput.value.trim(),
                likesCount: 0,
                liked: false,
            })

            // Очищаем поля формы и валидность
            nameInput.value = ''
            textInput.value = ''

            validateName()
            validateText()

            renderComments(commentsData, document.getElementById('comments'))
        }
    })
}
