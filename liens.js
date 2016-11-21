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
		switch(step) // syntaxe à revoir
		{
			case 'PLL' : step = 'pll'; break
			case 'OLL' : step = 'oll'; break
			case 'COLL', 'OLLCP', 'CMLL' : step = 'coll'; break
			case 'ELL' : step = 'ell'; break
		}
		var html = '<div class="nom">' + nom + '</div>';
		html += '<img src="http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&case=' + algo + '&step=' + step + '"/>';
		html += '<div class="algo" data-set="' + step + '">' + algo + '</div>';
		html += '<a href="http://alg.cubing.net/?alg=' + algo + '&setup=(' + algo + ')\'" class="bouton_animation">Animation</a>';
		cas[i].innerHTML = html;
	}
}