var spolecznoscinet = Array.from(document.querySelectorAll(".spolecznoscinet")).reduce((agg, el) => {
    var node = el.id.split("-")[1];
    var pbs = pbsjs
        .getAllWinningBids()
        .filter(x => x.adUnitCode.startsWith(node));
    var empty = el.children.length < 1;
    agg[el.id] = {
		id:el.id,
        el:el,
        empty: empty,
        rawSSP:{...pbs},
        ssp: pbs.length?[...pbs][0].bidderCode:"BEZ_SSP",
        google: !empty && !pbs.length ? "Jest" : "Niema"
    };
    return agg;
}, {});

Object.keys(spolecznoscinet).forEach(el => {
    var obj = spolecznoscinet[el]
    var el = obj.el
    var newEl = document.createElement('span');
    newEl.innerHTML = `id:${obj.id} Google/Direct:${obj.google} SSP:${obj.ssp}`;
    newEl.style.background = "red"
    el.after(newEl)
})
