function searchPartner() {
	var scripts = [
		...document.querySelectorAll("script"),
		...document.querySelectorAll("link")
	]
		.map(x => x.href || x.src)
		.filter(x => x)
		.map(x => x.toLowerCase());
	var windowKeys = Object.keys(window).map(x => x.toLowerCase());
	var prebidCheck = Object.keys(window)
		.filter(x => window[x] instanceof Object)
		.filter(x => window[x].hasOwnProperty("requestBids"));
	var gKeysResseler = {
		spolecznosci: ["ca-pub-2365165112249593"],
		yeldbird: [
			"ca-pub-0206338760093719",
			"ca-pub-7756348393895452",
			"ca-pub-4307100594778012",
			"ca-pub-9914992914910847"
		],
		wp: [
			"ca-pub-5995202563537249",
			"ca-pub-5443361439335742",
			"ca-pub-6523315197642632",
			"ca-pub-5599500498136891",
			"ca-pub-9335149169362677"
		],
		waytogrow: ["ca-pub-7235212965293571", "ca-pub-9934065421505939"],
		onet: [
			"ca-pub-1641094773980998",
			"ca-pub-3179454501132977",
			"ca-pub-4069369533017132",
			"ca-pub-4314242355228518",
			"ca-pub-5310645159024207",
			"ca-pub-7793577536995585",
			"ca-pub-8329097311586633",
			"ca-pub-9378634550872293"
		],
		interia: ["ca-pub-9136549947088673", "ca-pub-1636271870028934"],
		polskaprese: ["ca-pub-2469667141331842", "ca-pub-3299786496633692"],
		yieldlove: ["ca-pub-1274416353693598", "ca-pub-8813347375005258"],
		advantage_media: [
			"ca-pub-6396844742497208",
			"ca-pub-1966721192709606",
			"ca-pub-2011734697823029",
			"ca-pub-6644558441501035",
			"ca-pub-7958959566206860",
			"ca-pub-4152552776930088"
		],
		rtbnow: ["ca-pub-9655409891876729"],
		yieldriser: ["ca-pub-8655001720710332", "ca-pub-3191894791526522"]
	};
	var adDict = {
		optad: ["optad", "pbjs325474", "pbjs325474hb", "optad360"],
		yieldBird: ["yieldbird"],
		ezoic: ["ezoic", "ez_", "_ez", "ezslot"],
		spolecznosci: ["spolecznosci", "pbsjs"],
		yieldlove: ["yieldlove", "pbjsYLHH", "YLHH"],
		adv_media: ["advmedia", "epbjs"],
		way2grow: ["wtg-ads", "waytogrow", "w2g"],
		adkontekst: ["adkontekst"],
		Adform: ["adform", "_adform"],
		Smart: ["smartad", "sas_"]
	};
	var partnerChecker = dict =>
		dict.flatMap(x =>
			[...scripts, ...windowKeys].filter(y => y.includes(x))
		).length;
	return {
		prebid: {
			prebidCheck: prebidCheck.length > 0,
			prebidArr: prebidCheck || [],
			prebidSSP:
				prebidCheck.map(x =>
					[
						...new Set(
							window[x].adUnits.flatMap(x =>
								x.bids.flatMap(y => y.bidder)
							)
						)
					].toString()
				) || []
		},
		gTag: [
			...new Set(document.body.innerHTML.match(/ca-pub-[0-9]{16}/g))
		].map(x =>
			[
				x,
				Object.keys(gKeysResseler).find(key =>
					gKeysResseler[key].includes(x)
				)
			].toString()
		),
		spolecznosci: partnerChecker(adDict.spolecznosci),
		optad: partnerChecker(adDict.optad),
		yieldbird: partnerChecker(adDict.yieldBird),
		ezoic: partnerChecker(adDict.ezoic),
		yieldlove: partnerChecker(adDict.yieldlove),
		adv_media: partnerChecker(adDict.adv_media),
		way2grow: partnerChecker(adDict.way2grow),
		adkontekst: partnerChecker(adDict.adkontekst),
		SSP: {
			Adform: partnerChecker(adDict.Adform),
			Smart: partnerChecker(adDict.Smart)
		}
	};
}

searchPartner();

console.table(
	(({
		SSP,
		spolecznosci,
		optad,
		yieldbird,
		ezoic,
		yieldlove,
		adv_media,
		way2grow,
		adkontekst,
		gTag,
		prebid
	}) => ({
		...SSP,
		spolecznosci,
		optad,
		yieldbird,
		ezoic,
		yieldlove,
		adv_media,
		way2grow,
		adkontekst,
		gTag,
		...prebid
	}))(searchPartner())
);
