var buttons = require("sdk/ui/button/toggle");
var data = require("sdk/self")
	.data;
var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
if (!ss.storage.ev || ss.storage.ev.update === true || ss.storage.ev.update === null) ss.storage.ev = {
	channels: {
		"UCQJT7rpynlR7SSdn3OyuI_Q": {
			name: "0LoLEventVods",
			run: true
		},
		"UCeyxJjDWDBg6moUMDj9j4Kg": {
			name: "1CSEventVods",
			run: true
		},
		"UCr5TB_3vBI0-WHuDCd3du9g": {
			name: "2DotaVods",
			run: true
		},
		"UCY7yjSdhxcw5lQhnSF4Wk-A": {
			name: "2DotaVods 2",
			run: true
		},
		"UC6cCL29i24P9wT8Kws2iq4Q": {
			name: "3HSVods",
			run: true
		},
		"UCzSItlUKaVNWbd7ybbfnFhg": {
			name: "3MLG",
			run: true
		},
		"UCxtHAOtBzl3nWm1d80GZhlQ": {
			name: "3ECS",
			run: true
		},
		"UCPhab209KEicqPJFAk9IZEA": {
			name: "4Onivia",
			run: true
		},
		"UCK7CPGf74Fpes6kKLMuAdBg": {
			name: "4ELEAGUE",
			run: true
		},
		"UCPq2ETz4aAGo2Z-8JisDPIA": {
			name: "4ESL Counter-Strike",
			run: true
		},
		"UC0G2qz-hoaCswQNgoWU_LTw": {
			name: "5ESL",
			run: true
		},
		"UCbEhNEf6zVdmd4C61Ayvv2w": {
			name: "5joindota",
			run: true
		},
		"UCQfAxSNTJvLISaFNJ0Dmg8w": {
			name: "5Beyond The Summit",
			run: true
		},
		"UCLhS7bMcch5vodboEGpIPlg": {
			name: "6What A Play",
			run: true
		},
		"UCvqRdlKsE5Q8mf8YXbdIJLw": {
			name: "6LolEsports",
			run: true
		},
		"UC-I8d_BjKP6MMsYjZhAtjIA": {
			name: "6LolEsports Latino",
			run: true
		},
		"UCmvoPMHe9l0ytr9ONu5-1vw": {
			name: "6Riot Games Latino",
			run: true
		},
		"UCJ6EyrObjc396m3MToJhblQ": {
			name: "6LolEsports Oce",
			run: true
		},
		"UCiN3B0QRdL4wn1TMJ_cJyMQ": {
			name: "6LolEsports Japan",
			run: true
		},
		"UC48rkTlXjRd6pnqqBkdV0Mw": {
			name: "6LolEsports Brasil",
			run: true
		},
		"UCCqnLewexMM7LwGzqpMpPrA": {
			name: "6Garena TW",
			run: true
		},
		"UCGA73hIgOhANAW_ruTXDKig": {
			name: "6Alphadraft",
			run: true
		},
		"UCPvn7OUsnyc9hINqbY7EmCA": {
			name: "6CSGO TV",
			run: true
		},
		"UC3EVJoJw7OajdrYmBfCvcdw": {
			name: "6FaceIt",
			run: true
		},
		"UCBvPF-tKhZVrp_mW_sXAKsg": {
			name: "6Game On",
			run: true
		},
		"UCbHRJG9q56QvNypQTYNOAtQ": {
			name: "6CoolDota2 TV",
			run: true
		},
		"UCTQ4Q67NXJVn_dr_BCbh2EA": {
			name: "6Hefla TV",
			run: true
		},
		"UCJN4ouJkqCpo6OwoK_bEWbA": {
			name: "6Rasmus TV",
			run: true
		},
		"UCrZTN5qnHqGhZglG3wUWKng": {
			name: "6Reynad",
			run: true
		},
		"UCP5L0BTkW1pYxlyo6jF2Gvw": {
			name: "6TempoStorm",
			run: true
		},
		"UClMlqyYOEqfWNOFT_KMVaeA": {
			name: "6Twitch Dota 2 Vods",
			run: true
		},
		"UCFop53hSZZHsW7_vGDTqCZg": {
			name: "6CSGO #3",
			run: true
		},
		"UC2u0VkSazsN_of3ifcBKTsA": {
			name: "6Hearthstone #2",
			run: true
		},
		"UCv3orfdLg5rLIg6qnkCcitA": {
			name: "6LoL Esports VODs & Highlights",
			run: true
		},
		"UCIquhTRs7QJrzCfiAMwfV8w": {
			name: "3Dreamhack Media",
			run: true
		}
	},
	related: true,
	comments: true,
	length: true,
    update: true
};
if(ss.storage.ev.update) ss.storage.ev.update = false;
var settings = require("sdk/panel")
	.Panel({
		contentURL: "./html/settings.html",
		contentScriptFile: ['./js/jquery.min.js', './js/angular.min.js', './js/settings.js'],
		contentStyleFile: './css/popup.css',
		height: 600,
		onHide: handleHide
	});
settings.on("show", function () {
	settings.port.emit("loadData", ss.storage.ev);
});
settings.port.on("saveData", function (data) {
	ss.storage.ev = data;
});
settings.port.on("patreon", function () {
	tabs.open("http://www.patreon.com/Eventvods");
})
var button = buttons.ToggleButton({
	id: "eventvods-settings",
	label: "EventVODs Settings",
	icon: {
		"16": "./img/icon-16.png",
		"32": "./img/icon-32.png",
		"64": "./img/icon-64.png",
		"128": "./img/icon-128.png"
	},
	onChange: handleOpen
});

function handleOpen(state) {
	if (state.checked) {
		settings.show({
			position: button
		});
	}
}

function handleHide() {
	button.state('window', {
		checked: false
	});
}
var pm = pageMod.PageMod({
	include: ["https://www.youtube.com/watch?v=*", "https://youtube.com/watch?v=*", 'http://www.youtube.com/watch?v=*', 'https://youtube.com/watch?v=*'],
	contentScriptFile: ["./js/jquery.min.js", "./js/content_script.js"],
	onAttach: function (worker) {
		worker.port.emit("sendData", ss.storage.ev);
	}
});
