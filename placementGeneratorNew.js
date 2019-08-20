var fnWriterSolo = ({id,name,type}) => {
	return(`
	<!-- kod w miejscu placementu ${name} -->
	<script type="text/javascript">
    var spwidth = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;
    if(spwidth ${type == "Desktop"? ">":"<" } 750) {
        document.write('<div class="spolecznoscinet" id="spolecznosci-${id}">
		<div class="extra-code">
        <!- 
            TU UMIEŚĆ KOD ZWROTNY
        -->
        </div>
		</div>');
    }
	</script>
	`)
}


var runner = () => {
	var tab = $('#sectionsGrid').find('tr').toArray().map(x => {
	var id = $(x).find('td').eq(0).text();
	var name = $(x).find('td').eq(1).text();
	var forms = $(x).find('td').eq(3).text();
	var type = $(x).find('td').eq(4).text();
	return {id,name,forms,type}
	})
	return tab
}

var head = `<!-- kod w HEAD strony -->
<script type="text/javascript">
    (function (d, x, a) {
        var z = d.createElement(x); z.type = 'text/javascript'; z.src = a; var s = d.getElementsByTagName(x)[0]; s.parentNode.insertBefore(z, s);
    })(document, 'script', '//s.spolecznosci.net/js/core2-min.js');
</script>`
var placements = runner().reduce((agg,x) => agg+fnWriterSolo(x),"")
var setFast = runner().map(x => x.name.split("_")[0]).map(x => {
	 var lang = "."+x.split(/\./g).slice(-1)
	 return x.replace(lang,"")
}).filter((x,i,arr) => arr.indexOf(x) == i).map(x => 'sad'+x )
var end = `<!-- kod przed zamknięciem BODY -->
<script type="text/javascript">
var spwidth = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;
var _qasp = _qasp || [];
    _qasp.push('go');
    if(spwidth < 750) {
        _qasp.push(['setFastPAID','${setFast.filter(x => new RegExp(/m\./).test(x))}']);
    } else {
        _qasp.push(['setFastPAID','${setFast.filter(x => !new RegExp(/m\./).test(x))}']);
    }
</script>`

var run = () =>{
	return(`
	${head}
	${placements}
	${end}
	`)
}
