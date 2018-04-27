function footer()
{
	document.write('<footer>Ce site est l\'endroit où j\'entrepose mes algos de cube, dans le but que ça serve aux autres cubeurs, n\'hésitez donc pas à piocher des algos dedans !<br/>S\'il y a un problème quelconque, envoyez-moi un MP sur le discord francophone ou sur le forum Francocube :)</footer>');
}

function step(set) {
	var stage = '';
	switch(set)
	{
		case 'PLL': case 'ELL': case '2GLL': case 'COALL': case 'BLD': default: stage = 'pll'; break;
		case 'OLL' : case 'WV': case 'SV': case 'MW': case 'CLS': stage = 'wv'; break;
		case 'ELS': stage = 'els'; break;
		case '3SEO' : stage = 'vh'; break;
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
	if (set == 'BLD') {
		var categorie_algo = nom.substring(9).substring(3);
		nom = nom.substr(0,9);
	}
	var html = '<div class="nom">' + nom + '</div>';
	if (set == 'BLD') {
		html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=z2 (' + algo + ')\'" class="bouton_animation" title="Animation" target="_blank">';
		html += '<img class="image_gauche" src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=white&pzl=' + taille + '&case=' + algo + 'y2&stage=' + stage + '"/>';
		html += '<img class="image_droite" src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=white&pzl=' + taille + '&case=y2' + algo + 'y2&stage=' + stage + '"/>';
		html += '</a>';
		if (algo.length > 56) {
			html += '<div class="algo long" data-set="' + set + '">' + algo + '</div>';
		} else {
			html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
		}
	} else if (set == '3SEO') {
		html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=z2 (' + algo + ')\'" class="bouton_animation" title="Animation" target="_blank">';
		html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=white&pzl=' + taille + '&case=' + algo + 'y2&stage=' + stage + '&fd=nunuuununnnnllnllnnnnbbbbbbddddddddnnnnrrrrrrnnnuffnff"/>';
		html += '</a>';
		if (algo.length > 26) {
			html += '<div class="algo long" data-set="' + set + '">' + algo + '</div>';
		} else {
			html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
		}
	} else {
		html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=z2 (' + algo + ')\'" class="bouton_animation" title="Animation" target="_blank">'
		html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&bg=white&pzl=' + taille + '&case=' + algo + '&stage=' + stage + '"/>';
		html += '</a>';
		if (algo.length > 26) {
			html += '<div class="algo long" data-set="' + set + '">' + algo + '</div>';
		} else {
			html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
		}
	}
	return (html);
}

function html_algo_multiple(nom,algos,set,taille,stage) {
	var html = '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&bg=white&pzl=' + taille + '&case=' + algos[0].innerHTML + '&stage=' + stage + '"/>';
	html += '<div class="nom">' + nom + '</div>';
	for (var j=0; j < algos.length; j++)
	{
		var algo = algos[j].innerHTML;
		html += '<a href="http://alg.cubing.net/?puzzle=' + taille + 'x' + taille + 'x' + taille + '&alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation" title="Animation"></a>';
		html += '<div class="algo" data-set="' + set + '">' + algo + '</div>';
	}
	return (html);
}