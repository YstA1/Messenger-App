import { UI_ELEMENTS } from "./view.js";

let token = '';
let userName = 'Я';

function setListeners () {
	UI_ELEMENTS.TOP_BUTTONS.SETTINGS.addEventListener('click', showSettings);
	UI_ELEMENTS.TOP_BUTTONS.EXIT.addEventListener('click', logOut);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.addEventListener('submit', sendMessage);
	UI_ELEMENTS.POPUP.CLOSE.addEventListener('click', closePopup) 
}
setListeners ();

function scrollToBottom () {
	const messageBody = document.getElementById('messages');
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}
scrollToBottom ();

function sendMessage (e) {
	e.preventDefault();
	const messageTemplate = document.getElementById('message_template');
	const message = messageTemplate.content.cloneNode(true);
	const messageText = message.getElementById('my-message__text')
	const messageName = message.getElementById('my-message__name')

	messageName.innerText = userName;
	messageText.innerText = UI_ELEMENTS.BOTTOM_BUTTONS.INPUT.value

	UI_ELEMENTS.MESSAGES.WINDOW.append(message);
	UI_ELEMENTS.BOTTOM_BUTTONS.FORM.reset();
	scrollToBottom ();
}

function showPopup () {
	UI_ELEMENTS.POPUP.CONTAINER.classList.add('show');
}

function closePopup () {
	UI_ELEMENTS.POPUP.CONTAINER.classList.remove('show');
}

function renderPopup (name, text, button, input, value) {
	UI_ELEMENTS.POPUP.NAME.innerText = name;
	UI_ELEMENTS.POPUP.TEXT.innerText = text;
	UI_ELEMENTS.POPUP.BUTTON.innerText = button;
	UI_ELEMENTS.POPUP.INPUT.placeholder = input;
	UI_ELEMENTS.POPUP.INPUT.value = value;
	checkPopup(name)
}

function checkPopup (name) {
	if (name === "Настройки") {
		UI_ELEMENTS.POPUP.FORM.removeEventListener('submit', sendEmail);
		UI_ELEMENTS.POPUP.FORM.removeEventListener('submit', checkCode);
		UI_ELEMENTS.POPUP.FORM.addEventListener('submit', submitName);
	}
	if (name === "Авторизация") {
		UI_ELEMENTS.POPUP.FORM.addEventListener('submit', sendEmail);
	}
	if (name === "Подтверждение") {
		UI_ELEMENTS.POPUP.FORM.removeEventListener('submit', sendEmail);
		UI_ELEMENTS.POPUP.FORM.addEventListener('submit', checkCode);
	}
}










function logOut () {
	renderPopup("Авторизация", "Введите почту", "Получить код", "example@gmail.com", "")
	showPopup()
}

function sendEmail (e) {
	e.preventDefault();
	(async () => {
		const chatServiceResponse = await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
		  method: 'POST',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({email: UI_ELEMENTS.POPUP.INPUT.value})
		});
		
		const content = await chatServiceResponse.json();
		console.log(content);
	  })();
	renderPopup("Подтверждение", "Введите отправленный код", "Войти", "код", "")
	showPopup()
}

function showSettings (e) {
	e.preventDefault();
	renderPopup("Настройки", "Имя в чате", "Изменить", "Червячок", "")
	showPopup();
	//какая-то логика с фетч
}



function checkCode (e) {
	e.preventDefault();
	(async () => {
		token = UI_ELEMENTS.POPUP.INPUT.value;
	
		const chatGetMe = await fetch('https://chat1-341409.oa.r.appspot.com/api/user/me', {
		  method: 'GET',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		  },
		});

		const responseStatus = chatGetMe.status;
		if (responseStatus === 200) {
			closePopup();
		}
		else {
			alert("Неверный код");
			UI_ELEMENTS.POPUP.FORM.reset();
		}
		const response = await chatGetMe.json();
		console.log(response);
	  })();
}


function submitName (e) {
	e.preventDefault();
	(async () => {
		const chatPatchName = await fetch('https://chat1-341409.oa.r.appspot.com/api/user', {
		  method: 'PATCH',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		  },
		  body: JSON.stringify({name: UI_ELEMENTS.POPUP.INPUT.value})
		});
		const content = await chatPatchName.json();
		console.log(content);



		
		userName = content.name;
		Array.from(UI_ELEMENTS.MESSAGES.MY_MESSAGE_NAME).forEach(element => element.innerText = userName)





		const responseStatus = chatPatchName.status;
		if (responseStatus === 200) {
			closePopup();
		}
		else {
			alert("Некорректно введенное имя");
			UI_ELEMENTS.POPUP.FORM.reset();
		}
	})()
}





