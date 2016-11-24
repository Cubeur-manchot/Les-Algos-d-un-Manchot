function nav()
{
	var html = '<nav><section><div class="en-tete">Liste des pages du site</div><ul>';
	html += '<li><a href="pll.html">PLL</a></li>';
	html += '<li><a href="oll.html">OLL</a></li>';
	html += '<li><a href="ell.html">ELL</a></li>';
	html += '<li><a href="wv.html">WV</a></li>';
	html += '<li><a href="page_inexistante.html">SV (en apprentissage)</a></li>';
	html += '<li><a href="mw.html">MW (en rédaction)</a></li>';
	html += '<li><a href="page_inexistante.html">2GLL (indisponible)</a></li>';
	html += '<li><a href="page_inexistante.html">CLL (indisponible)</a></li>';
	html += '<li><a href="page_inexistante.html">PLL angles et AUFs (indisponible)</a></li>';
	html += '<li><a href="page_inexistante.html">PLL OH (en apprentissage)</a></li>';
	html += '<li><a href="page_inexistante.html">PLL Big Cubes (indisponible)</a></li>';
	html += '</ul></section>';
	html += '<section><div class="en-tete">Autres</div><ul>';
	html += '<li><a href="index.html">Accueil</a></li>';
	html += '<li><a href="algos_a_apprendre.html">Algos à apprendre</a></li>';
	html += '<li><a href="records.html">Records perso</a></li>';
	html += '<li><a href="http://forum.francocube.com/ucp.php?i=pm&mode=compose&u=4736">M\'envoyer un MP</a></li>';
	html += '<li><a href="https://drive.google.com/folderview?id=0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M&usp=sharing">Mon Drive</a></li>';
	html += '</ul></section></nav>';
	document.write(html);
}

function footer()
{
	document.write('<footer>Ce site est uniquement un endroit où j\'entrepose mes algos de cube, et aura uniquement ce but.<br/>De ce fait il ne remplace en aucun cas La Tête Dans Le Cube qui est un site visant à centraliser toutes les connaissances sur le cube.</footer>');
}

function liens()
{
	var cas = document.getElementsByClassName('cas');
	var noms = document.getElementsByClassName('nom');
	var algos = document.getElementsByClassName('algo');
	for (var i=0; i < algos.length; i++)
	{
		var nom = noms[i].innerHTML;
		var algo = algos[i].innerHTML;
		var step = algos[i].getAttribute('data-set');
		switch(step)
		{
			case 'PLL': case 'ELL': default: step = 'pll'; break;
			case 'OLL': step = 'oll'; break;
			case 'WV': case 'MW': step = 'wv'; break;
		}
		var html = '<div class="nom">' + nom + '</div>';
		html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&case=' + algo + '&stage=' + step + '"/>';
		html += '<a href="http://alg.cubing.net/?alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation" title="Animation"></a>';
		html += '<div class="algo" data-set="' + step + '">' + algo + '</div>';
		cas[i].innerHTML = html;
	}
}