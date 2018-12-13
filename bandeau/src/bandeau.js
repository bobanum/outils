class Bandeau {
	constructor (mots, taille) {
		this.mots = mots || [];
		this.taille = taille || 48;
	}
	get mots() {
		if (this._mots === undefined) {
			this.mots = [];
		}
		return this._mots;
	}
	set mots(val) {
		if (val instanceof Array) {
			this._mots = val;
			this._mots.toString = function () {
				return this.join("\r\n");
			}
		} else if (!val) {
			this.mots = [];
		} else if (typeof val === "string") {
			this.mots = val.split(/\r\n|\n\r|\r|\n/);
		} else if (val instanceof HTMLElement && val.value !== undefined) {
			this.mots = val.value;
		} else if (val instanceof HTMLElement) {
			this.mots = val.innerHTML;
		} else if (val.toString) {
			this.mots = val.toString();
		} else {
			this.mots = [];
		}
	}
	dom_mot(mot) {
		var resultat, lignes, ligne, i, n;
		resultat = document.createElement('div');
		resultat.appendChild(document.createElement('div'));
		mot = mot.replace(/\\\|/g, "&#124;");
		lignes = mot.split("|");
		for (i = 0, n = lignes.length; i < n; i += 1) {
			ligne = document.createElement('div');
			resultat.appendChild(ligne);
			ligne.innerHTML = lignes[i];
		}
		resultat.appendChild(document.createElement('div'));
		return resultat;
	}
	dom_interface() {
		var resultat;
		resultat = document.createElement('div');
		resultat.classList.add('interface');
		resultat.appendChild(this.dom_options());
		resultat.appendChild(this.dom_page());
		return resultat;
	}
	dom_options() {
		var resultat;
		resultat = document.createElement('div');
		resultat.classList.add('options');
		resultat.appendChild(this.dom_form());
		return resultat;
	}
	dom_form() {
		var resultat;
		resultat = document.createElement('form');
		resultat.setAttribute('id', 'options');
		resultat.addEventListener('submit', function () { return false; });
		resultat.appendChild(this.form_mots());
		resultat.appendChild(this.form_taille());
		return resultat;
	}
	form_mots() {
		var resultat, label, champ;
		resultat = document.createElement('div');
		label = document.createElement('label');
		label.setAttribute('for', 'mots');
		label.innerHTML = "Les mots : ";
		champ = document.createElement('textarea');
		champ.setAttribute('name', 'mots');
		champ.setAttribute('id', 'mots');
		champ.setAttribute('rows', '6');
		champ.setAttribute('cols', '30');
		champ.innerHTML = this.mots;
		champ.addEventListener('input', Bandeau.evt.mots.input);
		resultat.appendChild(label);
		resultat.appendChild(champ);
		return resultat;
	}
	form_taille() {
		var resultat, label, champ;
		resultat = document.createElement('div');
		label = document.createElement('label');
		label.setAttribute('for', 'taille');
		label.innerHTML = "La taille : ";
		champ = document.createElement('input');
		champ.setAttribute('type', 'number');
		champ.setAttribute('name', 'taille');
		champ.setAttribute('id', 'taille');
		champ.setAttribute('min', '20');
		champ.setAttribute('max', '80');
		champ.setAttribute('step', '2.5');
		champ.setAttribute('size', '4');
		champ.setAttribute('orient', 'horizontal');
		champ.setAttribute('value', this.taille);
		champ.addEventListener('input', Bandeau.evt.taille.input);
		resultat.appendChild(label);
		resultat.appendChild(champ);
		return resultat;
	}
	dom_page() {
		var resultat, i, n, ligne, cell, contenu;
		resultat = document.createElement('div');
		resultat.classList.add('page');
		for (i = 0, n = this._mots.length; i < n; i += 1) {
			ligne = document.createElement('div');
			resultat.appendChild(ligne);
			cell = this.dom_mot(this._mots[i]);
			ligne.appendChild(cell);
			ligne.appendChild(cell.cloneNode(true));
			cell = document.createElement('div');
			cell.classList.add('languette');
			ligne.appendChild(cell);
		}
		return resultat;
	}
	init() {
	}
	static init() {
		var bandeau = new Bandeau(['a','b','c','d','e']);
		document.body.appendChild(bandeau.dom_interface());
		this.evt.mots.input.call(document.getElementById("mots"));
		this.evt.taille.input.call(document.getElementById("taille"));
	}
}
(function () {
	this.evt = {
		window: {
			load: function () {
				var bandeau = new Bandeau(['a','b','c','d','e']);
				Bandeau.init();
			}
		},
		mots: {
			input: function(e) {
				$("div.page").remove();
				var bandeau = new Bandeau(this);
				var $page = bandeau.dom_page();
				$(document.body).append($page);
				Bandeau.evt.taille.input.call(document.getElementById("taille"));
			}
		},
		taille: {
			input: function(e) {
				var taille = this.valueAsNumber;
				if (!taille) return false;
				$("table.page").css('font-size',taille+'px');
			}
		}
	}
	window.addEventListener("load", this.evt.window.load);
}.call(Bandeau));
//$(Bandeau.init);
