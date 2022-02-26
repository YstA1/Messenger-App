export const UI_ELEMENTS = {
	TOP_BUTTONS: {
		SETTINGS: document.getElementById("settings"),
		EXIT: document.getElementById("exit"),
	},

	BOTTOM_BUTTONS : {
		FORM: document.getElementById("form"),
		INPUT: document.getElementById("input"),
		SEND: document.getElementById("send"),
	},
	TEMPLATE: {
		NAME: document.getElementsByClassName("my-message__name")
	},
	MESSAGES: {
		WINDOW: document.getElementById("messages-window"),
		MY_MESSAGE: document.getElementsByClassName("my-message"),
		MY_MESSAGE_NAME: document.getElementsByClassName("my-message__name"),
		FRIEND_MESSAGE: document.getElementsByClassName("friend-message"),
	},
	POPUP: {
		CONTAINER: document.getElementById('popup_container'),
		CLOSE: document.getElementById('popup_close'),
		NAME: document.getElementById("popup_name"),
		TEXT: document.getElementById("popup_main-text"),
		FORM: document.getElementById("popup_form"),
		INPUT: document.getElementById("popup_main_input"),
		BUTTON: document.getElementById("popup_main-button"),
		
	},
}