var isEmpty = obj =>
	Object.entries(obj).length === 0 && obj.constructor === Object;
var removeElements = elms => elms.forEach(el => el.remove());
var spolecznosciPlacement = (x, counter = 0) => {
	console.log(x, counter, x.parentNode);
	if (counter > 5) {
		return null;
	}
	if (x.parentNode == null) {
		return "iframe";
	}
	if (x.id.startsWith("spolecznosci")) {
		return x.id;
	}
	return spolecznosciPlacement(x.parentNode, counter + 1);
};

var google = [...document.querySelectorAll(".adsbygoogle")].reduce((agg, x) => {
	var exist = spolecznosciPlacement(x);
	agg[exist] = {
		id: exist,
		type:
			x.dataset.adClient === "ca-pub-2365165112249593"
				? "Adex"
				: "Adsense"
	};
	return agg;
}, {});

var spolecznoscinet = [...document.querySelectorAll(".spolecznoscinet")].reduce(
	(agg, el) => {
		var node = el.id.split("-")[1];
		var pbs = pbsjs
			.getAllWinningBids()
			.filter(x => x.adUnitCode.startsWith(node));
		var empty = el.children.length < 1;
		//console.log(pbs)
		agg[el.id] = {
			id: el.id,
			el: el,
			empty: empty,
			SSP: isEmpty({ ...pbs }) ? false : { ...pbs }[0],
			google: isEmpty({ ...google[el.id] }) ? false : google[el.id].type,
			direct: isEmpty({ ...pbs }) && isEmpty({ ...google[el.id] })
		};
		return agg;
	},
	{}
);

removeElements( document.querySelectorAll(".sspLabel") );

Object.keys(spolecznoscinet).forEach(el => {
	var obj = spolecznoscinet[el];
	var el = obj.el;
	console.log(obj);
	var newEl = document.createElement("span");
	newEl.innerHTML = `id:${obj.id}  
	${
		obj.SSP
			? `SSP:${obj.SSP.bidderCode} CPM_PL:${obj.SSP.cpm} ${obj.SSP.currency} CPM_ORGINAL:${obj.SSP.originalCpm} ${obj.SSP.originalCurrency} `
			: ""
	}
	${obj.google ? `Google:${obj.google} ` : ""}
	${obj.direct ? `Directowa:${obj.direct} ` : ""}
	${obj.empty ? `Pusta:${obj.empty} ` : ""}
	`;
	newEl.classList.add("sspLabel");
	newEl.style.background = "red";
	newEl.style.margin = "auto";
	newEl.style.display = "table";
	newEl.style.padding = "10px";
	el.prepend(newEl);
});
