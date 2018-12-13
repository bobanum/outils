/*jslint browser:true, esnext:true*/
class Panonceau {
	static load() {
		document.body.appendChild(this.dom_form());
//		document.body.appendChild(this.dom_page("Ouvert", "Fermé"));
	}
	static dessiner(texte) {
		this.supprimerPages();
		texte = texte.split(/\r\n|\n\r|\r|\n/);
		texte = texte.map(ligne => ligne.split("|"));
		texte.forEach(ligne => {
			document.body.appendChild(this.dom_page(...ligne));
		});
		console.log(texte);
	}
	static supprimerPages() {
		var pages = Array.from(document.body.querySelectorAll("div.page"))
		pages.forEach(page => page.parentNode.removeChild(page));
	}
	static dom_form() {
		var resultat = document.createElement("form");
		var fieldset = resultat.appendChild(document.createElement("fieldset"));
		fieldset.addEventListener("input", (e) => {
			this.dessiner(e.target.form.texte.value);
		})
		var champ = fieldset.appendChild(this.dom_champTexte());
		return resultat;
	}
	static dom_champTexte() {
		var resultat = document.createElement("div");
		var label = resultat.appendChild(document.createElement("label"))
		label.setAttribute("for", "texte");
		label.innerHTML = "Texte";
		var input = resultat.appendChild(document.createElement("textarea"))
		input.setAttribute("name", "texte");
		input.setAttribute("id", "texte");
		input.setAttribute("rows", "5");
		input.setAttribute("cols", "35");
		return resultat;
	}
	static dom_page(recto, verso) {
		verso = verso || recto
		var resultat = document.createElement("div");
		resultat.classList.add("page");
		resultat.appendChild(this.dom_cote(recto));
		resultat.appendChild(this.dom_cote(verso));
		return resultat;
	}
	static dom_cote(html) {
		var resultat = document.createElement("div");
		resultat.classList.add("cote");
		var texte = resultat.appendChild(document.createElement("div"));
		texte.classList.add("texte");
		texte.innerHTML = html;
		var trait = resultat.appendChild(document.createElement("div"));
		trait.classList.add("trait");
		return resultat;
	}
	static init() {
		window.addEventListener("load", () => {
			this.load();
		});
	}
}
Panonceau.init();
