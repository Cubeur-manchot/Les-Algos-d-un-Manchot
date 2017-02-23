function nav()
{
	var html = '<nav><section><div class="en-tete">Les algos de LL</div><ul>';
	html += '<li><a href="oll.html">OLL</a></li>';
	html += '<li><a href="pll.html">PLL</a></li>';
	html += '<li><a href="pll_oh.html">PLL OH</a></li>';
	html += '<li><a href="pll_big_cubes.html">PLL Big Cubes</a></li>';
	html += '<li><a href="ell.html">ELL</a></li>';
	html += '<li><a href="6-9htm.html">6-9HTM 1LLL</a></li>';
	html += '<li><a href="2gll.html">(en rédaction) 2GLL</a></li>';
	html += '<li><a href="tripod_1lll.html">(en rédaction) Tripod 1LLL</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) CLL</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) PLL angles et AUFs</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) 22LL</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) Line 1LLL</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) Flipped Line 1LLL</a></li>';
	html += '</ul></section>';
	html += '<section><div class="en-tete">Les algos de LSLL</div><ul>';
	html += '<li><a href="wv.html">WV</a></li>';
	html += '<li><a href="mw.html">MW</a></li>';
	html += '<li><a href="sv.html">(en rédaction) SV</a></li>';
	html += '<li><a href="page_inexistante.html">(indisponible) CLS</a></li>';
	html += '</ul></section>';
	html += '<section><div class="en-tete">Autres pages du site</div><ul>';
	html += '<li><a href="index.html">Accueil</a></li>';
	html += '<li><a href="365_en_365.html">365 en 365</a></li>';
	html += '<li><a href="records.html">Records perso</a></li>';
	html += '<li><a href="http://forum.francocube.com/ucp.php?i=pm&mode=compose&u=4736">M\'envoyer un MP</a></li>';
	html += '<li><a href="https://drive.google.com/folderview?id=0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M&usp=sharing">Mon Drive</a></li>';
	html += '<li><a href="2_sides_pll.html">Reconnaissance des PLL</a></li>';
	html += '</ul></section></nav>';
	document.write(html);
}

function footer()
{
	document.write('<footer>Ce site est uniquement un endroit où j\'entrepose mes algos de cube, et aura uniquement ce but.<br/>De ce fait il ne remplace en aucun cas La Tête Dans Le Cube qui est un site visant à centraliser toutes les connaissances sur le cube.</footer>');
}

function liens()
{
	var listes_simples = document.getElementsByClassName('liste_cas_simple');
	for (var h=0; h < listes_simples.length; h++)
	{
		var liste_simples = listes_simples[h];
		var taille = liste_simples.getAttribute('data-taille');
		var cas_simples = liste_simples.getElementsByClassName('cas');
		for (var i=0; i < cas_simples.length; i++)
		{
			var nom = cas_simples[i].getElementsByClassName('nom')[0].innerHTML;
			var algo = cas_simples[i].getElementsByClassName('algo')[0].innerHTML;
			var stage = cas_simples[i].getElementsByClassName('algo')[0].getAttribute('data-set');
			var stage0 = stage;
			switch(stage)
			{
				case 'PLL': case 'ELL': case '2GLL': default: stage = 'pll'; break;
				case 'OLL': stage = 'oll'; break;
				case 'WV': case 'MW': stage = 'wv'; break;
			}
			var html = '<div class="nom">' + nom + '</div>';
			html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&pzl=' + taille + '&case=' + algo + '&stage=' + stage + '"/>';
			html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation" title="Animation"></a>';
			html += '<div class="algo" data-set="' + stage0 + '">' + algo + '</div>';
			cas_simples[i].innerHTML = html;
		}
	}
	var listes_multiples = document.getElementsByClassName('liste_cas_multiple');
	for (var h=0; h < listes_multiples.length; h++)
	{
		var cas_multiples = listes_multiples[h].getElementsByClassName('cas');
		for (var i=0; i < cas_multiples.length; i++)
		{
			var nom = cas_multiples[i].getElementsByClassName('nom')[0].innerHTML;
			var algos = cas_multiples[i].getElementsByClassName('algo');
			var stage = algos[0].getAttribute('data-set');
			var stage2 = stage;
			switch(stage)
			{
				case 'PLL': case 'ELL': case '2GLL': default: stage2 = 'pll'; break;
				case 'OLL': stage2 = 'oll'; break;
				case 'WV': case 'MW': stage2 = 'wv'; break;
			}
			var algo = algos[0].innerHTML;
			var html = '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&case=' + algo + '&stage=' + stage + '"/>';
			html += '<div class="nom">' + nom + '</div>';
			for (var j=0; j < algos.length; j++)
			{
				algo = algos[j].innerHTML;
				html += '<a href="http://alg.cubing.net/?alg=' + algo + '&setup=(' + algo + ')\'" class="bouton algo' + j + '" title="Animation"></a>';
				html += '<div class="algo" data-set="' + stage2 + '">' + algo + '</div>';
			}
			cas_multiples[i].innerHTML = html;
		}
	}
}