// main.js
import { commentsData } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { setupHandlers } from './modules/handlersEvent.js'

const commentsContainer = document.getElementById('comments')

// Изначальный рендер при загрузке страницы
renderComments(commentsData, commentsContainer)

// Установка обработчиков и логики взаимодействия
setupHandlers()
