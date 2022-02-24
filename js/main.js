import { UI_ELEMENTS } from "./view.js";

function setListeners () {
	UI_ELEMENTS.TOP_BUTTONS.SETTINGS.addEventListener('click', showSettings);
	UI_ELEMENTS.TOP_BUTTONS.EXIT.addEventListener('click', logOut);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.addEventListener('submit', sendMessage);
	UI_ELEMENTS.POPUP.FORM.addEventListener('submit', submitEmail);
	UI_ELEMENTS.POPUP.CLOSE.addEventListener('click', closePopup) 
}

function scrollToBottom () {
	const messageBody = document.getElementById('messages');
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function sendMessage (e) {
	e.preventDefault();
	const messageTemplate = document.getElementById('message_template');
	const message = messageTemplate.content.cloneNode(true);
	const messageText = message.getElementById('my-message__text')

	messageText.innerText = UI_ELEMENTS.BOTTOM_BUTTONS.INPUT.value

	UI_ELEMENTS.MESSAGES.WINDOW.append(message);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.reset();
	scrollToBottom ();
}

function logOut () {
	UI_ELEMENTS.POPUP.NAME.innerText = 'Авторизация'
	UI_ELEMENTS.POPUP.TEXT.innerText = 'Введите почту'
	UI_ELEMENTS.POPUP.BUTTON.innerText = 'Получить код'
	UI_ELEMENTS.POPUP.INPUT.placeholder = 'example@gmail.com'
	showPopup()
}


function showPopup () {
	UI_ELEMENTS.POPUP.CONTAINER.classList.add('show');
}

function closePopup () {
	UI_ELEMENTS.POPUP.CONTAINER.classList.remove('show');
}

function submitEmail (e) {
	e.preventDefault();
	UI_ELEMENTS.POPUP.NAME.innerText = 'Подтверждение'
	UI_ELEMENTS.POPUP.TEXT.innerText = 'Введите отправленный код'
	UI_ELEMENTS.POPUP.BUTTON.innerText = 'Войти'
	UI_ELEMENTS.POPUP.INPUT.placeholder = 'код'
	UI_ELEMENTS.POPUP.INPUT.value = '';
	//какая-то логика с фетч
	showPopup()
	
}

function showSettings (e) {
	e.preventDefault();
	UI_ELEMENTS.POPUP.NAME.innerText = 'Настройки'
	UI_ELEMENTS.POPUP.TEXT.innerText = 'Имя в чате'
	UI_ELEMENTS.POPUP.BUTTON.innerText = 'Изменить'
	UI_ELEMENTS.POPUP.INPUT.placeholder = 'Червячок'
	showPopup();
}



setListeners ();
scrollToBottom ();