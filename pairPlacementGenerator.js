var pairsGen = px => arr =>
	arr.reduce((agg, el) => {
	return agg.concat(
`<script type="text/javascript">
    	var spwidth = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;${
		el[0] == 0 ?`
		if(spwidth < ${px}){
			document.write('<div class="spolecznoscinet" id="spolecznosci-${el[1]}"></div>');
		}`
			: el[1] == 0
			? `
		if(spwidth > ${px}){
			document.write('<div class="spolecznoscinet" id="spolecznosci-${el[0]}"></div>');
		}`
			: `
		if(spwidth < ${px}){
        	document.write('<div class="spolecznoscinet" id="spolecznosci-${el[1]}"></div>');
    	}else{
        	document.write('<div class="spolecznoscinet" id="spolecznosci-${el[0]}"></div>');
    	}`
		}
	</script>

	`);
	}, "");
