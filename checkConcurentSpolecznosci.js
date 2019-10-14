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
		optad: ["ca-pub-5512390705137507"],
		yieldBird: [
			"ca-pub-8241049497608997",
			"ca-pub-9467340974789471",
			"ca-pub-0958205548775696",
			"ca-pub-6512936480753445"
		],
		way2grow: [
			"ca-pub-4910050017906143",
			"ca-pub-9328633604439863",
			"ca-pub-3268638132077067",
			"ca-pub-7683628640306220"
		],
		onet: ["ca-pub-5786819153313314"],
		polskaprese: ["ca-pub-4278860704973981"],
		yieldriser: ["ca-pub-6918582494067064"],
		adv_media: ["ca-pub-1409765517756851", "ca-pub-4075894099602271"],
		moneytizer: ["ca-pub-3700011705422030"]
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
		prebid,
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
		...prebid,
	}))(searchPartner())
);
