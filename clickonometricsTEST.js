var AdsForms = {
  banner: "Banner",
  bannermob: "BannerMobile",
  billboard: "Billboard",
  dbb: "DoubleBillboard",
  doubebil: "DoubleBillboard",
  doublebi: "DoubleBillboard",
  doublebl: "DoubleBillboard",
  doubleil: "DoubleBillboard",
  dublebil: "DoubleBillboard",
  halfpage: "Halfpage",
  inters: "Interstitial",
  leaderboard: "Leaderboard",
  outstream: "Outstream",
  rect: "Rectangle",
  screen: "Screening",
  sky: "Skyscraper",
  sticky: "Sticky",
  triplelboard: "TripleBillboard",
  wideboard: "Wideboard",
  prerol: "Preroll"
};

var resolutionToAd ={
    '160x600':["Skyscraper"],
    '300x250':["Interstitial","Rectangle"],
    '300x600':["Halfpage"],
    '320x100':["Banner","BannerMobile"],
    '750x200':["Billboard","DoubleBillboard","Leaderboard","Screening","TripleBillboard","Wideboard"],  
};



$('table').find('tbody').find('.section_name').toArray().forEach( el => {
    var patt = new RegExp(/\d+/g);
    var grabNum = (txt,pattern) => pattern.exec(txt);

    var txt = $(el).text().trim().toLowerCase()
    var executorAll = grabNum(txt,patt)
    var keys = Object.keys(AdsForms)
    var ResolutionKeys = Object.keys(resolutionToAd)
    var spl = txt.split("_")

    var placement = spl.reduce( (arr,x) => {
        var executor = grabNum(x,patt)
        var num = executor === null?(executorAll === null?"1":executorAll):executor
        
        var tst = keys.filter( y => {
            return x.indexOf(y) !== -1
        }).map(x => [AdsForms[x],num[0]])
        return arr.concat(tst)
    },[]).sort( (a,b) => b[0].length - a[0].length )[0] || ["ERROR"]
    
    var resolution = ResolutionKeys.filter( x => {
    var arr = resolutionToAd[x]
    return arr.includes(placement[0])
  })

  var getId = clikonometrics.filter(x => x[1].includes(`${resolution}_${placement[1]}`)).flatMap(x => x)
  console.log($(el).text(),getId[0],getId[1])
  $(el).text($(el).text()+" "+)
})

var clikonometrics = [["12460781", "160x600_1"],
["12460782", "160x600_2"],
["12460783", "160x600_3"],
["12460778", "300x250_1"],
["12460779", "300x250_2"],
["12460780", "300x250_3"],
["12460784", "300x600_1"],
["12460785", "300x600_2"],
["12460786", "300x600_3"],
["12460787", "320x100_1"],
["12460788", "320x100_2"],
["12460789", "320x100_3"],
["12460775", "750x200_1"],
["12460776", "750x200_2"],
["12460777", "750x200_3"],]
