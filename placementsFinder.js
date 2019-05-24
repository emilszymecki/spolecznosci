var isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object
var removeElements = (elms) => elms.forEach(el => el.remove());

var spolecznoscinet = Array.from(document.querySelectorAll(".spolecznoscinet")).reduce((agg, el) => {
    var node = el.id.split("-")[1];
    var pbs = pbsjs
        .getAllWinningBids()
        .filter(x => x.adUnitCode.startsWith(node));
    var empty = el.children.length < 1;
	//console.log(pbs)
    agg[el.id] = {
		id:el.id,
        el:el,
        empty: empty,
        SSP:isEmpty({...pbs})?{}:{...pbs}[0],
        google: !empty && !pbs.length
    };
    return agg;
}, {});

removeElements( document.querySelectorAll(".sspLabel") );

Object.keys(spolecznoscinet).forEach(el => {
    var obj = spolecznoscinet[el]
    var el = obj.el
	console.log(obj)
    var newEl = document.createElement('span');
    newEl.innerHTML = `id:${obj.id} Google/Direct:${obj.google} ${ !obj.google ? `SSP:${obj.SSP.bidderCode} CPM_PL:${obj.SSP.cpm} ${obj.SSP.currency} CPM_ORGINAL:${obj.SSP.originalCpm} ${obj.SSP.originalCurrency} ` : ''}`;
	newEl.classList.add('sspLabel');
    newEl.style.background = "red";
	newEl.style.margin = "auto";
	newEl.style.display = "table"
	newEl.style.padding = "10px"
    el.prepend(newEl)
})
