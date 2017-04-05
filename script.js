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
	html += '</ul></section>';
	html += '<section><div class="en-tete">Les algos de LSLL</div><ul>';
	html += '<li><a href="wv.html">WV</a></li>';
	html += '<li><a href="mw.html">MW</a></li>';
	html += '<li><a href="sv.html">SV</a></li>';
	html += '<li><a href="els.html">ELS</a></li>';
	html += '<li><a href="cls.html">(en rédaction) CLS</a></li>';
	html += '</ul></section>';
	html += '<section><div class="en-tete">Autres Puzzles</div><ul>';
	html += '<li><a href="l2e.html">L2E du 5x5</a></li>';
	html += '<li><a href="l2e.html">(en rédaction) EG du 2x2</a></li>';
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

function step(set) {
	var stage = '';
	switch(set)
	{
		case 'PLL': case 'ELL': case '2GLL': default: stage = 'pll'; break;
		case 'OLL': stage = 'oll'; break;
		case 'WV': case 'SV': case 'MW': case 'CLS': stage = 'wv'; break;
		case 'ELS': stage = 'els'; break;
	}
	return (stage);
}

function liens()
{
	var listes_simples = document.getElementsByClassName('liste_cas_simple');
	for (var h=0; h < listes_simples.length; h++)
	{
		var liste_simple = listes_simples[h];
		var taille = liste_simple.getAttribute('data-taille');
		var set = liste_simple.getAttribute('data-set');
		var stage = step(set);
		var cas_simples = liste_simple.getElementsByClassName('cas');
		for (var i=0; i < cas_simples.length; i++)
		{
			var cas_simple = cas_simples[i]
			var nom = cas_simple.getElementsByClassName('nom')[0].innerHTML;
			var algo = cas_simple.getElementsByClassName('algo')[0].innerHTML;
			cas_simples[i].innerHTML = html_algo_simple(nom,algo,set,taille,stage);
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
			var set = algos[0].getAttribute('data-set');
			var stage = step(set);
			var algo = algos[0].innerHTML;
			cas_multiples[i].innerHTML = html_algo_multiple(nom,algos,set,taille,stage);
		}
	}
}

function html_algo_simple(nom,algo,set,taille,stage) {
	var html = '<div class="nom">' + nom + '</div>';
	html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&pzl=' + taille + '&case=' + algo + '&stage=' + stage + '"/>';
	html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation" title="Animation"></a>';
	html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
	return (html);
}

function html_algo_multiple(nom,algos,set,taille,stage) {
	var html = '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&pzl=' + taille + '&case=' + algos[0].innerHTML + '&stage=' + stage + '"/>';
	html += '<div class="nom">' + nom + '</div>';
	for (var j=0; j < algos.length; j++)
	{
		var algo = algos[j].innerHTML;
		html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation" title="Animation"></a>';
		html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
	}
	return (html);
}