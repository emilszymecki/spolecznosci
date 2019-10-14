function searchPartner(){
	var scripts = [...document.querySelectorAll('script'),...document.querySelectorAll('link')].map(x => x.href || x.src).filter(x => x).map(x => x.toLowerCase());
	var windowKeys = Object.keys(window).map(x => x.toLowerCase());
	var prebidCheck = Object.keys(window).filter(x => window[x] instanceof Object).filter(x => window[x].hasOwnProperty("requestBids"))
	var adDict={
		optadKeys:["optad","pbjs325474","pbjs325474hb","optad360"],
		yieldBird:["yieldbird"],
		ezoic:["ezoic","ez_","_ez","ezslot"],
		spolecznosci:["spolecznosci","pbsjs"],
		yieldlove:["yieldlove","pbjsYLHH","YLHH"],
		adv_media:["advmedia","epbjs"],
		way2grow:["wtg-ads","waytogrow","w2g"],
		adkontekst:["adkontekst"],
		Adform:["adform", "_adform"],
		Smart:["smartad","sas_"],
	}
	var partnerChecker = (dict) => dict.flatMap(x => [...scripts,...windowKeys].filter(y => y.includes(x)) ).length
	return ({
		prebid:{
			prebidCheck:prebidCheck.length > 0,
			prebidArr:prebidCheck || [],
			prebidSSP:prebidCheck.map(x => [...new Set(window[x].adUnits.flatMap(x => x.bids.flatMap(y => y.bidder)))].toString()) || []
		},
		gTag: [... new Set(document.body.innerHTML.match(/ca-pub-[0-9]{16}/g))].toString(),
		spolecznosci:  partnerChecker(adDict.spolecznosci),
		optad:  partnerChecker(adDict.optadKeys),
		yieldbird: partnerChecker(adDict.yieldBird),
		ezoic: partnerChecker(adDict.ezoic),
		yieldlove:  partnerChecker(adDict.yieldlove),
		adv_media:  partnerChecker(adDict.adv_media),
		way2grow:  partnerChecker(adDict.way2grow),
		adkontekst:  partnerChecker(adDict.adkontekst),
		SSP:{
			Adform:partnerChecker(adDict.Adform),
			Smart:partnerChecker(adDict.Smart),
		}
	})
}

searchPartner()

console.table(( ({ SSP,spolecznosci,optad,yieldbird,ezoic,yieldlove,adv_media,way2grow,adkontekst,prebid,gTag }) => ({ ...SSP,spolecznosci,optad,yieldbird,ezoic,yieldlove,adv_media,way2grow,adkontekst,...prebid,gTag }) )(searchPartner()))
	
