function getKeys() {
  var temp = [];
  for (var b in window) {
    if (window.hasOwnProperty(b) && typeof window[b] == "object") {
      temp.push([b, window[b]]);
    }
  }

  var tempNoNull = temp.filter(
    x => x[1] !== null && x[1].constructor == Object
  );
  var filterOnlyVersion = tempNoNull.filter(x =>
    x[1].hasOwnProperty("requestBids")
  );

  return filterOnlyVersion;
}

function getInfoPrebid([key, prebid] = arr) {
  return {
    [key]: {
	  allSSP:new Set(prebid.adUnits.flatMap(x => x.bids.flatMap(y => y.bidder))),
      adsUnitLength: prebid.que.length,
      allBidsPlacement: Object.values(prebid.getBidResponses())
        .flatMap(x => x.bids)
        .flatMap(x => ({
          adUnitCode: x.adUnitCode,
          bidderCode: x.bidderCode,
          size: x.size,
          height: x.height,
          cpm: x.cpm,
          currency: x.currency
        })),
      highestCpmBids: prebid.getAllWinningBids().map(x => ({
        adUnitCode: x.adUnitCode,
        bidderCode: x.bidderCode,
        size: x.size,
        height: x.height,
        cpm: x.cpm,
        currency: x.currency
      }))
    }
  };
}

getKeys().map(getInfoPrebid);
