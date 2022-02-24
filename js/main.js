import { UI_ELEMENTS } from "./view.js";

function setListeners () {
	UI_ELEMENTS.TOP_BUTTONS.SETTINGS.addEventListener('click', showSettings);
	UI_ELEMENTS.TOP_BUTTONS.EXIT.addEventListener('click', logOut);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.addEventListener('submit', startMessage);
	
}

function scrollToBottom () {
	const messageBody = document.getElementById('messages');
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function startMessage (e) {
	e.preventDefault();
	sendMessage();
}

function sendMessage () {
	const messageTemplate = document.getElementById('message_template');
	const message = messageTemplate.content.cloneNode(true);
	const messageText = message.getElementById('my-message__text')

	messageText.innerText = UI_ELEMENTS.BOTTOM_BUTTONS.INPUT.value

	UI_ELEMENTS.MESSAGES.WINDOW.append(message);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.reset();
	scrollToBottom ();
}

setListeners ();
scrollToBottom ();



function showSettings () {
}

function logOut () {
	renderPopup ()
}

function renderPopup () {
	const POPUP_CONTAINER = getPopup();
	const POPUP_CLOSE = POPUP_CONTAINER.getElementsByClassName('popup_close')[0]
	POPUP_CLOSE.addEventListener('click', () => {
		closePopup (POPUP_CONTAINER)
	})
	showPopup(POPUP_CONTAINER);
}

function getPopup () {
	
	return document.getElementById('popup_container');
}
function showPopup (POPUP_CONTAINER) {
	POPUP_CONTAINER.classList.add('show');
}

function closePopup (POPUP_CONTAINER) {
	POPUP_CONTAINER.classList.remove('show');
}
